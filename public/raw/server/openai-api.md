# OpenAI-Compatible API

> HTTP routes, request and response schemas, errors, and curl examples for llama-crab-server.

`llama-crab-server` mirrors the subset of the OpenAI REST surface that is meaningful for a single-model local server. Every route below is registered explicitly in `crates/llama-crab-server/src/main.rs:659`. The server is not a full OpenAI client replacement — unsupported fields or invalid combinations are returned as `400` errors with a JSON `{"error": {"message", "type": "invalid_request"}}` envelope (`main.rs:2507`).

The `model` and `user` fields on every request body are accepted for compatibility and otherwise ignored. Responses always report the value of `--model-name` (default `llama-crab`).

## Route table

<table>
<thead>
  <tr>
    <th>
      Method
    </th>
    
    <th>
      Path
    </th>
    
    <th>
      Handler
    </th>
    
    <th>
      Streaming
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        GET
      </code>
    </td>
    
    <td>
      <code>
        /health
      </code>
    </td>
    
    <td>
      <code>
        health
      </code>
      
       (<code>
        main.rs:690
      </code>
      
      )
    </td>
    
    <td>
      No
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        GET
      </code>
    </td>
    
    <td>
      <code>
        /v1/models
      </code>
    </td>
    
    <td>
      <code>
        models
      </code>
      
       (<code>
        main.rs:694
      </code>
      
      )
    </td>
    
    <td>
      No
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        POST
      </code>
    </td>
    
    <td>
      <code>
        /v1/completions
      </code>
    </td>
    
    <td>
      <code>
        completions
      </code>
      
       (<code>
        main.rs:707
      </code>
      
      )
    </td>
    
    <td>
      Optional SSE
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        POST
      </code>
    </td>
    
    <td>
      <code>
        /v1/chat/completions
      </code>
    </td>
    
    <td>
      <code>
        chat_completions
      </code>
      
       (<code>
        main.rs:732
      </code>
      
      )
    </td>
    
    <td>
      Optional SSE
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        POST
      </code>
    </td>
    
    <td>
      <code>
        /v1/embeddings
      </code>
    </td>
    
    <td>
      <code>
        embeddings
      </code>
      
       (<code>
        main.rs:757
      </code>
      
      )
    </td>
    
    <td>
      No
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        POST
      </code>
    </td>
    
    <td>
      <code>
        /v1/rerank
      </code>
    </td>
    
    <td>
      <code>
        rerank
      </code>
      
       (<code>
        main.rs:772
      </code>
      
      )
    </td>
    
    <td>
      No
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        POST
      </code>
    </td>
    
    <td>
      <code>
        /v1/reranking
      </code>
    </td>
    
    <td>
      <code>
        rerank
      </code>
      
       alias
    </td>
    
    <td>
      No
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        POST
      </code>
    </td>
    
    <td>
      <code>
        /rerank
      </code>
    </td>
    
    <td>
      <code>
        rerank
      </code>
      
       alias
    </td>
    
    <td>
      No
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        POST
      </code>
    </td>
    
    <td>
      <code>
        /reranking
      </code>
    </td>
    
    <td>
      <code>
        rerank
      </code>
      
       alias
    </td>
    
    <td>
      No
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        POST
      </code>
    </td>
    
    <td>
      <code>
        /extras/tokenize
      </code>
    </td>
    
    <td>
      <code>
        tokenize
      </code>
      
       (<code>
        main.rs:784
      </code>
      
      )
    </td>
    
    <td>
      No
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        POST
      </code>
    </td>
    
    <td>
      <code>
        /extras/tokenize/count
      </code>
    </td>
    
    <td>
      <code>
        tokenize_count
      </code>
      
       (<code>
        main.rs:796
      </code>
      
      )
    </td>
    
    <td>
      No
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        POST
      </code>
    </td>
    
    <td>
      <code>
        /extras/detokenize
      </code>
    </td>
    
    <td>
      <code>
        detokenize
      </code>
      
       (<code>
        main.rs:811
      </code>
      
      )
    </td>
    
    <td>
      No
    </td>
  </tr>
</tbody>
</table>

The four `/v1/rerank`, `/v1/reranking`, `/rerank`, `/reranking` paths share the same handler and behave identically.

## `GET /health`

Liveness probe. Always returns `200 OK` as long as the axum process is running; the handler does not inspect the worker state.

```bash
curl http://127.0.0.1:8080/health
```

```json
{ "status": "ok" }
```

## `GET /v1/models`

Returns the loaded model in OpenAI's `/v1/models` shape. The `data` array always has exactly one entry — the server is single-model.

```bash
curl http://127.0.0.1:8080/v1/models
```

```json
{
  "object": "list",
  "data": [
    {
      "id": "llama-crab",
      "object": "model",
      "created": 1749900000,
      "owned_by": "me",
      "permissions": []
    }
  ]
}
```

`id` comes from `--model-name`, `created` is the unix timestamp at request time, `permissions` is always an empty array.

## `POST /v1/completions`

OpenAI-style legacy text completions. The handler accepts `stream: true` and switches to SSE in that case — see [Streaming](/server/streaming) for the wire format.

### Request body (`CompletionRequest`, `main.rs:138`)

<table>
<thead>
  <tr>
    <th>
      Field
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Required
    </th>
    
    <th>
      Default
    </th>
    
    <th>
      Notes
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        model
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      No
    </td>
    
    <td>
      ignored
    </td>
    
    <td>
      Logged and discarded.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        prompt
      </code>
    </td>
    
    <td>
      string | string<span>
        
      </span>
    </td>
    
    <td>
      <strong>
        Yes
      </strong>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      <code>
        #[serde(untagged)]
      </code>
      
       — a single string or a list.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        user
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      No
    </td>
    
    <td>
      ignored
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        max_tokens
      </code>
    </td>
    
    <td>
      integer
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        16
      </code>
    </td>
    
    <td>
      Hard cap on generated tokens.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        min_tokens
      </code>
    </td>
    
    <td>
      integer
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        0
      </code>
    </td>
    
    <td>
      Floor on generated tokens.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        logprobs
      </code>
    </td>
    
    <td>
      integer
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        0
      </code>
    </td>
    
    <td>
      Number of top candidates per token to return.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        n
      </code>
    </td>
    
    <td>
      integer
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        1
      </code>
    </td>
    
    <td>
      Number of choices. Must be <code>
        > 0
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        best_of
      </code>
    </td>
    
    <td>
      integer
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        n
      </code>
    </td>
    
    <td>
      Must be <code>
        > 0
      </code>
      
       and <code>
        >= n
      </code>
      
      . The server generates <code>
        best_of
      </code>
      
       candidates and ranks them by mean per-token logprob, returning the top <code>
        n
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        stop
      </code>
    </td>
    
    <td>
      string | string<span>
        
      </span>
      
       | null
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        []
      </code>
    </td>
    
    <td>
      Custom deserializer — empty strings preserved.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        stream
      </code>
    </td>
    
    <td>
      boolean
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      Switches the response to SSE.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        echo
      </code>
    </td>
    
    <td>
      boolean
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      Echoes the prompt back as a prefix of the completion.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        suffix
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        null
      </code>
    </td>
    
    <td>
      Appended after the completion.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        logit_bias
      </code>
    </td>
    
    <td>
      object <code>
        {string: number}
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        {}
      </code>
    </td>
    
    <td>
      Token biases.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        logit_bias_type
      </code>
    </td>
    
    <td>
      <code>
        "input_ids"
      </code>
      
       | <code>
        "tokens"
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        "input_ids"
      </code>
    </td>
    
    <td>
      <code>
        tokens
      </code>
      
       tokenizes the key as text.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        temperature
      </code>
      
      , <code>
        top_k
      </code>
      
      , <code>
        top_p
      </code>
      
      , <code>
        tfs_z
      </code>
      
      , <code>
        min_p
      </code>
      
      , <code>
        typical_p
      </code>
      
      , <code>
        min_keep
      </code>
    </td>
    
    <td>
      number
    </td>
    
    <td>
      No
    </td>
    
    <td>
      sampler defaults
    </td>
    
    <td>
      See <a href="#sampling-fields">
        Sampling fields
      </a>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        repeat_penalty
      </code>
      
      , <code>
        frequency_penalty
      </code>
      
      , <code>
        presence_penalty
      </code>
      
      , <code>
        penalty_last_n
      </code>
    </td>
    
    <td>
      number
    </td>
    
    <td>
      No
    </td>
    
    <td>
      sampler defaults
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mirostat_mode
      </code>
      
      , <code>
        mirostat_tau
      </code>
      
      , <code>
        mirostat_eta
      </code>
    </td>
    
    <td>
      number
    </td>
    
    <td>
      No
    </td>
    
    <td>
      sampler defaults
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        seed
      </code>
    </td>
    
    <td>
      <code>
        u32
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      none
    </td>
    
    <td>
      Deterministic sampling seed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        grammar
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      No
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Raw GBNF grammar. Takes precedence when non-empty.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        json_schema
      </code>
    </td>
    
    <td>
      object
    </td>
    
    <td>
      No
    </td>
    
    <td>
      —
    </td>
    
    <td>
      JSON Schema converted to GBNF.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        response_format
      </code>
    </td>
    
    <td>
      object
    </td>
    
    <td>
      No
    </td>
    
    <td>
      —
    </td>
    
    <td>
      See <a href="#structured-output">
        Structured output
      </a>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        grammar_root
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        "root"
      </code>
    </td>
    
    <td>
      GBNF root rule name.
    </td>
  </tr>
</tbody>
</table>

The `sampling` and `structured` fields are flattened into the top level (no nested `sampling: {...}` object).

### Response body (`CompletionResponse`, `main.rs:180`)

```json
{
  "id": "cmpl-1749900000",
  "object": "text_completion",
  "created": 1749900000,
  "model": "llama-crab",
  "choices": [
    {
      "text": "The capital of France is Paris.",
      "index": 0,
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": { "prompt_tokens": 6, "completion_tokens": 6, "total_tokens": 12 }
}
```

`finish_reason` is one of `stop`, `length`, or `tool_calls` (`main.rs:2520`). When `logprobs > 0`, the `logprobs` object contains `tokens`, `text_offset`, `token_logprobs` and `top_logprobs` (`CompletionLogprobsResponse`, `main.rs:199`). For `n > 1` or `best_of > n` the `choices` array contains one entry per requested choice, sorted by mean per-token logprob.

### Example

```bash
curl http://127.0.0.1:8080/v1/completions \
  -H 'content-type: application/json' \
  -d '{
    "model": "local",
    "prompt": "Write one sentence about local inference:",
    "max_tokens": 64,
    "stop": ["\n"]
  }'
```

## `POST /v1/chat/completions`

OpenAI chat completions with optional streaming, tool calling, structured output, and multimodal content (when the binary was built with `--features mtmd`).

### Request body (`ChatRequest`, `main.rs:207`)

<table>
<thead>
  <tr>
    <th>
      Field
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Required
    </th>
    
    <th>
      Default
    </th>
    
    <th>
      Notes
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        model
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      No
    </td>
    
    <td>
      ignored
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        messages
      </code>
    </td>
    
    <td>
      message<span>
        
      </span>
    </td>
    
    <td>
      <strong>
        Yes
      </strong>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      At least one message. See <a href="#messages">
        Messages
      </a>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        user
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      No
    </td>
    
    <td>
      ignored
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        max_tokens
      </code>
    </td>
    
    <td>
      integer
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        16
      </code>
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        min_tokens
      </code>
    </td>
    
    <td>
      integer
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        0
      </code>
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        logprobs
      </code>
    </td>
    
    <td>
      boolean
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      Enables chat-style logprobs in the response.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        top_logprobs
      </code>
    </td>
    
    <td>
      integer
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        0
      </code>
    </td>
    
    <td>
      Number of top candidates per token. Requires <code>
        logprobs: true
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        n
      </code>
    </td>
    
    <td>
      integer
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        1
      </code>
    </td>
    
    <td>
      Number of choices. <code>
        best_of
      </code>
      
       is not exposed for chat and collapses to <code>
        n
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        stream
      </code>
    </td>
    
    <td>
      boolean
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      SSE response.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        template
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        "chatml"
      </code>
    </td>
    
    <td>
      Built-in chat template name. See <a href="#templates">
        Templates
      </a>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        stop
      </code>
    </td>
    
    <td>
      string | string<span>
        
      </span>
      
       | null
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        []
      </code>
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tools
      </code>
    </td>
    
    <td>
      tool<span>
        
      </span>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        []
      </code>
    </td>
    
    <td>
      See <a href="#tools">
        Tools
      </a>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tool_choice
      </code>
    </td>
    
    <td>
      string | object
    </td>
    
    <td>
      No
    </td>
    
    <td>
      unset
    </td>
    
    <td>
      <code>
        "none"
      </code>
      
      , <code>
        "auto"
      </code>
      
      , <code>
        {"name": "..."}
      </code>
      
      , or <code>
        {"function": {"name": "..."}}
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        function_call
      </code>
    </td>
    
    <td>
      string | object
    </td>
    
    <td>
      No
    </td>
    
    <td>
      unset
    </td>
    
    <td>
      Same accepted shapes as <code>
        tool_choice
      </code>
      
      ; validated against <code>
        tools
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        logit_bias
      </code>
    </td>
    
    <td>
      object
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        {}
      </code>
    </td>
    
    <td>
      Same as completions.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        logit_bias_type
      </code>
    </td>
    
    <td>
      <code>
        "input_ids"
      </code>
      
       | <code>
        "tokens"
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        "input_ids"
      </code>
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      Sampling fields
    </td>
    
    <td>
      number
    </td>
    
    <td>
      No
    </td>
    
    <td>
      sampler defaults
    </td>
    
    <td>
      See <a href="#sampling-fields">
        Sampling fields
      </a>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        grammar
      </code>
      
      , <code>
        json_schema
      </code>
      
      , <code>
        response_format
      </code>
      
      , <code>
        grammar_root
      </code>
    </td>
    
    <td>
      mixed
    </td>
    
    <td>
      No
    </td>
    
    <td>
      —
    </td>
    
    <td>
      See <a href="#structured-output">
        Structured output
      </a>
      
      .
    </td>
  </tr>
</tbody>
</table>

### Messages

`messages[].role` accepts the standard OpenAI roles plus the legacy `function` role (normalized to `tool`). Unknown roles produce a `400` error.

```json
{ "role": "user", "content": "Hello" }
```

`content` accepts a string, `null`, or an array of parts (`main.rs:2644`). Supported part types:

<table>
<thead>
  <tr>
    <th>
      <code>
        type
      </code>
    </th>
    
    <th>
      Shape
    </th>
    
    <th>
      Notes
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        text
      </code>
    </td>
    
    <td>
      <code>
        { "type": "text", "text": "..." }
      </code>
    </td>
    
    <td>
      Plain text.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        image_url
      </code>
    </td>
    
    <td>
      <code>
        { "type": "image_url", "image_url": "..." | { "url": "...", "detail": "..." } }
      </code>
    </td>
    
    <td>
      Multimodal. Requires <code>
        --mmproj
      </code>
      
       and the <code>
        mtmd
      </code>
      
       Cargo feature. The URL must be a local file path or a <code>
        file://
      </code>
      
       URL.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        audio_url
      </code>
    </td>
    
    <td>
      <code>
        { "type": "audio_url", "audio_url": "..." }
      </code>
    </td>
    
    <td>
      Multimodal. <strong>
        Currently rejected
      </strong>
      
       by the multimodal bitmap loader (<code>
        unsupported multimodal chat content part type
      </code>
      
      ). Reserved for future use.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        video_url
      </code>
    </td>
    
    <td>
      <code>
        { "type": "video_url", "video_url": "..." }
      </code>
    </td>
    
    <td>
      Same as <code>
        audio_url
      </code>
      
       — reserved, currently rejected.
    </td>
  </tr>
</tbody>
</table>

### Templates

The `template` field selects a built-in chat template (`main.rs:2381`). Names are matched case-insensitively. Unknown names fall back to `chatml`. The recognized built-ins drive the prompt renderer and the tool-call format:

<table>
<thead>
  <tr>
    <th>
      Template
    </th>
    
    <th>
      Tool format
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        chatml
      </code>
      
       (default)
    </td>
    
    <td>
      <code>
        ToolFormat::ChatMl
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mistral-instruct
      </code>
    </td>
    
    <td>
      <code>
        ToolFormat::Mistral
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        plain
      </code>
    </td>
    
    <td>
      <code>
        ToolFormat::Plain
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      everything else
    </td>
    
    <td>
      <code>
        ToolFormat::default()
      </code>
    </td>
  </tr>
</tbody>
</table>

### Tools

```json
{
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_weather",
        "description": "Get the current weather",
        "parameters": {
          "type": "object",
          "properties": { "city": { "type": "string" } },
          "required": ["city"]
        }
      }
    }
  ]
}
```

`type` must be `"function"`. `function.parameters` is a JSON Schema; when omitted the server substitutes an empty object schema `{"type":"object","properties":{},"required":[]}`.

`tool_choice` accepts `"none"`, `"auto"`, or an object of the form `{"name": "tool"}` / `{"function": {"name": "tool"}}`. If the named tool is not present in `tools` the server returns `400 tool_choice references unknown tool: <name>`. `function_call` is validated with the same logic.

### Response body (`ChatResponse`, `main.rs:376`)

```json
{
  "id": "chatcmpl-1749900000",
  "object": "chat.completion",
  "created": 1749900000,
  "model": "llama-crab",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "llama-crab is a Rust binding to llama.cpp.",
        "tool_calls": []
      },
      "logprobs": null,
      "finish_reason": "stop"
    }
  ],
  "usage": { "prompt_tokens": 18, "completion_tokens": 9, "total_tokens": 27 }
}
```

When tool calls are extracted from the model's output, `content` is `null` and `tool_calls` is populated:

```json
{
  "message": {
    "role": "assistant",
    "content": null,
    "tool_calls": [
      {
        "id": "call_0",
        "type": "function",
        "function": {
          "name": "get_weather",
          "arguments": "{\"city\":\"Paris\"}"
        }
      }
    ]
  },
  "finish_reason": "tool_calls"
}
```

`finish_reason` is `stop`, `length`, or `tool_calls`. Chat logprobs (when `logprobs: true`) are returned as `{ content: [...], refusal: null }` with per-token `token`, `logprob`, `bytes` (`bytes` is always `null`) and `top_logprobs`.

### Example

```bash
curl http://127.0.0.1:8080/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{
    "model": "local-chat",
    "messages": [
      { "role": "system", "content": "Answer briefly." },
      { "role": "user", "content": "What is llama-crab?" }
    ],
    "max_tokens": 128,
    "temperature": 0.7
  }'
```

## `POST /v1/embeddings`

Requires the server to be started with `--embeddings` or `--reranking` (`main.rs:1817`).

### Request body (`EmbeddingRequest`, `main.rs:450`)

<table>
<thead>
  <tr>
    <th>
      Field
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Required
    </th>
    
    <th>
      Default
    </th>
    
    <th>
      Notes
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        model
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      No
    </td>
    
    <td>
      ignored
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        input
      </code>
    </td>
    
    <td>
      string | string<span>
        
      </span>
    </td>
    
    <td>
      <strong>
        Yes
      </strong>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      One text or a batch.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        user
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      No
    </td>
    
    <td>
      ignored
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        normalize
      </code>
    </td>
    
    <td>
      boolean
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      L2-normalizes the embedding.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        encoding_format
      </code>
    </td>
    
    <td>
      <code>
        "float"
      </code>
      
       | <code>
        "base64"
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      <code>
        "float"
      </code>
    </td>
    
    <td>
      <code>
        base64
      </code>
      
       returns little-endian f32 bytes encoded as a single base64 string per item.
    </td>
  </tr>
</tbody>
</table>

### Response body (`EmbeddingResponse`, `main.rs:463`)

```json
{
  "object": "list",
  "data": [
    { "object": "embedding", "embedding": [0.0123, -0.0456, ...], "index": 0 },
    { "object": "embedding", "embedding": [0.0789, 0.0234, ...], "index": 1 }
  ],
  "model": "local-embed",
  "usage": { "prompt_tokens": 4, "total_tokens": 4 }
}
```

The `usage` object intentionally does not include `completion_tokens` (it's a text-input endpoint). When `encoding_format: "base64"` is used, each item gains an `"encoding_format": "base64"` field and the `embedding` is a base64-encoded string of 4-byte little-endian f32 values.

### Example

```bash
curl http://127.0.0.1:8080/v1/embeddings \
  -H 'content-type: application/json' \
  -d '{
    "model": "local-embed",
    "input": ["first document", "second document"],
    "normalize": true,
    "encoding_format": "float"
  }'
```

## `POST /v1/rerank` (and aliases)

Requires `--reranking`. Four paths share the same handler: `/v1/rerank`, `/v1/reranking`, `/rerank`, `/reranking`.

### Request body (`RerankRequest`, `main.rs:500`)

<table>
<thead>
  <tr>
    <th>
      Field
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Required
    </th>
    
    <th>
      Default
    </th>
    
    <th>
      Notes
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        model
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      No
    </td>
    
    <td>
      ignored
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        query
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      <strong>
        Yes
      </strong>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      —
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        documents
      </code>
    </td>
    
    <td>
      string<span>
        
      </span>
    </td>
    
    <td>
      <strong>
        Yes
      </strong>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Non-empty.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        top_n
      </code>
    </td>
    
    <td>
      integer
    </td>
    
    <td>
      No
    </td>
    
    <td>
      all
    </td>
    
    <td>
      Truncate the result list to the top N by score.
    </td>
  </tr>
</tbody>
</table>

### Response body (`RerankResponse`, `main.rs:512`)

```json
{
  "model": "local-reranker",
  "results": [
    { "index": 0, "document": "Runs on your machine", "relevance_score": 0.8712 },
    { "index": 1, "document": "Hosted API", "relevance_score": 0.0234 }
  ]
}
```

Results are sorted by `relevance_score` descending. `document` is included for every result; the wire shape uses `skip_serializing_if = "Option::is_none"` on the field but in practice it is always populated.

### Example

```bash
curl http://127.0.0.1:8080/v1/rerank \
  -H 'content-type: application/json' \
  -d '{
    "model": "local-reranker",
    "query": "local inference",
    "documents": ["Runs on your machine", "Hosted API"],
    "top_n": 1
  }'
```

## Extras

### `POST /extras/tokenize`

Tokenize text using the loaded model's vocabulary.

```bash
curl http://127.0.0.1:8080/extras/tokenize \
  -H 'content-type: application/json' \
  -d '{ "input": "hello" }'
```

```json
{ "tokens": [15339, 29888] }
```

### `POST /extras/tokenize/count`

Return only the token count.

```bash
curl http://127.0.0.1:8080/extras/tokenize/count \
  -H 'content-type: application/json' \
  -d '{ "input": "hello" }'
```

```json
{ "count": 2 }
```

### `POST /extras/detokenize`

Convert a token id list back to text. Token ids are `i32` to match the llama.cpp vocabulary representation; negative ids and reserved tokens are accepted.

```bash
curl http://127.0.0.1:8080/extras/detokenize \
  -H 'content-type: application/json' \
  -d '{ "tokens": [15339, 29888] }'
```

```json
{ "text": "hello" }
```

## Sampling fields

These are flattened into the top level of both `CompletionRequest` and `ChatRequest` (`SamplingRequest`, `main.rs:246`). All are optional and override the corresponding defaults of `SamplingOptions::default()` (completions) or `SamplingOptions::chat()` (chat completions).

<table>
<thead>
  <tr>
    <th>
      Field
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Notes
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        temperature
      </code>
    </td>
    
    <td>
      <code>
        f32
      </code>
    </td>
    
    <td>
      Sampler temperature.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        top_k
      </code>
    </td>
    
    <td>
      <code>
        i32
      </code>
    </td>
    
    <td>
      Top-K truncation.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        top_p
      </code>
    </td>
    
    <td>
      <code>
        f32
      </code>
    </td>
    
    <td>
      Nucleus sampling.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tfs_z
      </code>
    </td>
    
    <td>
      <code>
        f32
      </code>
    </td>
    
    <td>
      Tail-free sampling.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        min_p
      </code>
    </td>
    
    <td>
      <code>
        f32
      </code>
    </td>
    
    <td>
      Minimum-p sampling.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        typical_p
      </code>
    </td>
    
    <td>
      <code>
        f32
      </code>
    </td>
    
    <td>
      Typical-p sampling.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        min_keep
      </code>
    </td>
    
    <td>
      <code>
        usize
      </code>
    </td>
    
    <td>
      Minimum number of candidates to keep.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        penalty_last_n
      </code>
    </td>
    
    <td>
      <code>
        i32
      </code>
    </td>
    
    <td>
      Window for repeat penalty.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        repeat_penalty
      </code>
    </td>
    
    <td>
      <code>
        f32
      </code>
    </td>
    
    <td>
      Repeat penalty multiplier.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        frequency_penalty
      </code>
    </td>
    
    <td>
      <code>
        f32
      </code>
    </td>
    
    <td>
      OpenAI-style frequency penalty.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        presence_penalty
      </code>
    </td>
    
    <td>
      <code>
        f32
      </code>
    </td>
    
    <td>
      OpenAI-style presence penalty.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mirostat_mode
      </code>
    </td>
    
    <td>
      <code>
        i32
      </code>
    </td>
    
    <td>
      <code>
        0
      </code>
      
       disables mirostat.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mirostat_tau
      </code>
    </td>
    
    <td>
      <code>
        f32
      </code>
    </td>
    
    <td>
      Mirostat target entropy.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mirostat_eta
      </code>
    </td>
    
    <td>
      <code>
        f32
      </code>
    </td>
    
    <td>
      Mirostat learning rate.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        seed
      </code>
    </td>
    
    <td>
      <code>
        u32
      </code>
    </td>
    
    <td>
      Deterministic seed.
    </td>
  </tr>
</tbody>
</table>

## Structured output

`StructuredRequest` (`main.rs:280`) is resolved by `grammar_text` (`main.rs:2339`) in this priority order:

1. `grammar` — raw GBNF grammar. Used verbatim when non-empty.
2. `json_schema` — JSON Schema converted to GBNF via `json_schema_grammar`.
3. `response_format` — accepts:

  - `{ "type": "text" }` — no grammar.
  - `{ "type": "json_object" }` — the global `json_object_grammar()` unless `schema` is present, in which case the schema is converted.
  - `{ "type": "json_schema", "json_schema": { "schema": ... } }` — schema-backed grammar. `schema` may also be provided at the top level of `response_format`.
  - Any other type — `400` error: `unsupported response_format type: <v>`.
4. `grammar_root` — the GBNF root rule name (default `"root"`).

The grammar sampler is then chained with the base sampler (`build_request_sampler`, `main.rs:2321`).

## Error envelope

Non-streaming routes return errors as JSON:

```json
{
  "error": {
    "message": "n must be greater than zero",
    "type": "invalid_request"
  }
}
```

<table>
<thead>
  <tr>
    <th>
      Status
    </th>
    
    <th>
      Trigger
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        400
      </code>
    </td>
    
    <td>
      Worker validation failure (see below).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        500
      </code>
    </td>
    
    <td>
      Job channel closed or oneshot reply dropped.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        400
      </code>
      
       (plain text)
    </td>
    
    <td>
      Axum JSON deserialization failure (malformed body, missing required field).
    </td>
  </tr>
</tbody>
</table>

Validation failures that surface as `400 invalid_request` include:

- `n must be greater than zero`
- `best_of must be greater than zero`
- `best_of must be greater than or equal to n`
- `encoding_format must be 'float' or 'base64', got '<v>'`
- `unsupported logit_bias_type: <v>`
- `invalid logit_bias token id: <k>`
- `unsupported response_format type: <v>`
- `response_format json_schema requires a schema`
- `tool_choice references unknown tool: <name>`
- `function_call references unknown tool: <name>`
- `unsupported chat tool type: <v>`
- `unsupported chat content part type: <v>`
- `unsupported stop sequence value: <v>`
- `reranking endpoint not enabled (start with --reranking)`
- `multimodal chat content requires --mmproj`
- `multimodal chat content requires llama-crab-server built with the 'mtmd' feature`
- `logprobs are not supported for multimodal chat`

## Versioning

The OpenAI-compatible routes and the schemas above first shipped in **0.1.4 (2026-06-14)**; the 0.1.5 release only moved the documentation site and did not touch the server; **0.1.6 (2026-06-15)** added opt-in Hugging Face support to the server — the `hf-hub` Cargo feature and the `--hf-filename` / `LLAMA_CRAB_HF_FILENAME` flag — without changing the OpenAI route surface. The full changelog is at [`llama-crab/CHANGELOG.md`](https://github.com/DominguesM/llama-crab/blob/main/CHANGELOG.md).
