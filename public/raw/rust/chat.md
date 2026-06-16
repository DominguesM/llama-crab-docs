# Chat

> Render role-tagged messages into chat prompts and generate responses.

Chat generation renders role-tagged messages into a model prompt with a
<span>

`BuiltinTemplate`

</span>

 (or a custom Jinja2-subset template), then runs text
completion against that prompt. Templates, tool definitions and the
streaming tool-call parser live in the `llama_crab::chat` module; the
high-level driver lives in `llama_crab::high_level::chat_completion`.

`ChatMessage` and `Role` are re-exported from the crate root, so most
imports look like:

```rust
use llama_crab::{ChatMessage, Role};
```

## Minimal chat

The default path uses the `Plain` template. Most instruct GGUFs expect a
chat-specific template (ChatML, Llama-3, etc.), so prefer the explicit
helper shown in the next section for real models.

```rust
use llama_crab::{ChatMessage, Llama, LlamaParams, Role};

let mut llama = Llama::load(LlamaParams::new("models/model.gguf").with_n_ctx(2048))?;
let messages = vec![
    ChatMessage::new(Role::System, "You are a concise assistant."),
    ChatMessage::new(Role::User, "What is Rust in one sentence?"),
];

let assistant = llama.create_chat_completion(&messages, 64)?;
println!("{}", assistant.content);
```

## Pick a template

The plain helper always uses `BuiltinTemplate::Plain`. Pick the template
that matches the model family with `create_chat_completion_with`:

```rust
use llama_crab::chat::BuiltinTemplate;
use llama_crab::high_level::chat_completion::create_chat_completion_with;
use llama_crab::{ChatMessage, Llama, LlamaParams, Role};

let mut llama = Llama::load(LlamaParams::new("models/model.gguf").with_n_ctx(2048))?;
let messages = vec![
    ChatMessage::new(Role::System, "Always answer in English. Be concise."),
    ChatMessage::new(Role::User, "Introduce yourself."),
];

let response = create_chat_completion_with(
    &mut llama,
    &messages,
    BuiltinTemplate::ChatMl,
    &[], // no tools
    128,
)?;
println!("{}", response.content);
```

The full set of `BuiltinTemplate` variants is: `ChatMl`, `MistralInstruct`,
`Llama3`, `Alpaca`, `Vicuna`, `OpenChat`, `Zephyr`, `Gemma`, `Phi3`,
`CommandR`, `DeepSeek`, `Granite`, `OpenAssistant` and `Plain`. Each has
a canonical lowercase name on `BuiltinTemplate::as_str()`, and
`BuiltinTemplate::from_str_ci(name)` parses a string back to the enum
(case-insensitive, multiple aliases — `qwen`/`openhermes` → `ChatMl`,
`llama-3`/`llama3` → `Llama3`, `gemma`/`gemma-2`/`gemma-4` → `Gemma`, etc.).

`chat::detect_chat_format(&metadata)` inspects a model's GGUF metadata
(`general.architecture`, `general.name`, `tokenizer.chat_template`) and
returns a sensible `BuiltinTemplate` guess. Use it when you do not want to
hard-code a value.

## Conversation history

`llama-crab` does not own your application state. Keep the conversation as
a `Vec<ChatMessage>`, append each user message, generate, then append the
assistant reply:

```rust
use llama_crab::chat::BuiltinTemplate;
use llama_crab::high_level::chat_completion::create_chat_completion_with;
use llama_crab::{ChatMessage, Llama, Role};

let mut history: Vec<ChatMessage> = Vec::new();
history.push(ChatMessage::new(Role::System, "You are a helpful assistant."));
history.push(ChatMessage::new(Role::User, "Hi!"));

let response = create_chat_completion_with(
    &mut llama,
    &history,
    BuiltinTemplate::ChatMl,
    &[],
    96,
)?;
history.push(ChatMessage::new(Role::Assistant, response.content));

// Next turn:
history.push(ChatMessage::new(Role::User, "Tell me a joke."));
let response = create_chat_completion_with(
    &mut llama,
    &history,
    BuiltinTemplate::ChatMl,
    &[],
    96,
)?;
history.push(ChatMessage::new(Role::Assistant, response.content));
```

The `stateful_chat` example in `llama-crab-examples` wraps this pattern
with `/clear` and `/save` commands.

## Streaming chat

`create_chat_completion_stream` (Plain template) and
`create_chat_completion_stream_with` (chosen template + tools) drive the
streaming completion underneath. The callback receives `CompletionChunk`
values; the returned `ChatMessage` contains the final assistant content.

```rust
use llama_crab::chat::BuiltinTemplate;
use llama_crab::high_level::chat_completion::create_chat_completion_stream_with;
use llama_crab::{ChatMessage, CompletionOptions, Llama, Role, StreamControl};

let messages = vec![ChatMessage::new(Role::User, "Hello!")];
let assistant = create_chat_completion_stream_with(
    &mut llama,
    &messages,
    BuiltinTemplate::ChatMl,
    &[],
    CompletionOptions::new(64),
    |chunk| {
        print!("{}", chunk.text);
        StreamControl::Continue
    },
)?;
println!("\nfinal: {}", assistant.content);
```

The high-level method `llama.create_chat_completion_stream(messages, max_tokens, on_chunk)`
is also available as a shortcut for the Plain template.

## Tool calling

`llama_crab::chat::tool_call` provides tool definitions, a stateful
parser and OpenAI-style streaming deltas. Five wire formats are
supported via `ToolFormat`:

<table>
<thead>
  <tr>
    <th>
      Format
    </th>
    
    <th>
      Token wrapping
    </th>
    
    <th>
      Suggested for
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ChatMl
      </code>
      
       (default)
    </td>
    
    <td>
      <code>
        <tool_call>{...}</tool_call>
      </code>
    </td>
    
    <td>
      Qwen 2.5, Hermes, generic ChatML
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Mistral
      </code>
    </td>
    
    <td>
      <code>
        [TOOL_CALLS][{...}]
      </code>
    </td>
    
    <td>
      Mistral / Mixtral
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Llama3
      </code>
    </td>
    
    <td>
      `<
    </td>
    
    <td>
      python_tag
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Plain
      </code>
    </td>
    
    <td>
      (none, raw JSON)
    </td>
    
    <td>
      Custom prompts
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        Functionary
      </code>
    </td>
    
    <td>
      `<
    </td>
    
    <td>
      start
    </td>
  </tr>
</tbody>
</table>

`ToolFormat::from_chat_format(name)` auto-detects the format from the
chat template name. `ToolParser` is the stateful byte-by-byte parser for
non-streaming use; `ToolCallStream` emits `ToolCallDelta { index, id, name, arguments, completed }` chunks and is the right tool for SSE-style
streams.

The lower-level chat module also ships a pure-Rust Jinja2-subset
renderer in `chat::render_template(template, messages, tools, add_generation_prompt)`.
This is the path to use when the model ships a custom template string
that none of the `BuiltinTemplate` variants cover.

### Defining a tool

```rust
use llama_crab::chat::ToolDefinition;
use serde_json::json;

let get_weather = ToolDefinition::new(
    "get_weather",
    "Return the current weather for a city.",
)
.with_parameters(json!({
    "type": "object",
    "properties": {
        "city": { "type": "string" }
    },
    "required": ["city"]
}));
```

### Parsing a non-streaming response

```rust
use llama_crab::chat::tool_call::{extract_tool_calls, ToolFormat};

let raw = r#"<tool_call>{"name":"get_weather","arguments":{"city":"Tokyo"}}</tool_call>"#;
for call in extract_tool_calls(ToolFormat::ChatMl, raw).into_iter().flatten() {
    println!("call: {} -> {}", call.name, call.arguments);
}
```

### Streaming deltas (OpenAI-style)

```rust
use llama_crab::chat::tool_call::{ToolCallStream, ToolFormat};

let mut stream = ToolCallStream::new(ToolFormat::ChatMl);
let mut deltas = Vec::new();
deltas.extend(stream.feed("<tool_call>"));
deltas.extend(stream.feed(r#"{"name":"#));
deltas.extend(stream.feed(r#""get_weather""#));
deltas.extend(stream.feed(r#","arguments":{"city":"Tokyo"}}"#));
deltas.extend(stream.feed("</tool_call>"));
deltas.extend(stream.finish());

for d in deltas {
    if let Some(id) = d.id { println!("id[{d.index}] = {id}"); }
    if let Some(name) = d.name { println!("name[{d.index}] = {name}"); }
    if let Some(args) = d.arguments { print!("args[{d.index}] += {args}"); }
    if let Some(call) = d.completed { println!("done[{}] = {}", d.index, call.name); }
}
```

`extract_tool_calls` and `ToolCallStream` live in
`llama_crab::chat::tool_call`. The `tools` example in
`llama-crab-examples` shows the full application loop: describe the tool
in the system prompt, ask the model for a JSON call, parse the call, run
the function, and append a `Role::Tool` result message via
`ChatMessage::tool_result(id, content)`.

## Custom Jinja2 templates

`chat::render_template` evaluates a small but useful Jinja2 subset. The
template sees `messages`, `tools` and `add_generation_prompt` as
implicit variables. The supported features are documented in the
`chat::template` rustdoc; in short:

- `{{ expr }}` interpolation, attribute access via `.` or `["key"]`,
filters (`length`, `upper`, `lower`, `trim`, `default`, `tojson`,
`string`, `int`, `abs`).
- `{% if cond %} ... {% elif %} ... {% else %} ... {% endif %}`.
- `{% for x in items %} ... {% endfor %}`.
- `{% set name = expr %}`.
- String, number, boolean, `None`, list and dict literals.
- Operators `+ - * / == != < <= > >= and or not in`.

Unsupported features (returns `TemplateError::Unsupported`): `extends`,
`include`, `macro`, `import`, custom filters, line statements.

If you need richer Jinja, fall back to a `BuiltinTemplate` or pre-render
the template outside the SDK.
