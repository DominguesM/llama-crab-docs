# Streaming

> Server-sent event protocol for /v1/completions and /v1/chat/completions.

Both text and chat completions support streaming. Set `"stream": true` on the request body to receive server-sent events (SSE) instead of a single JSON response. The streaming path is implemented in `crates/llama-crab-server/src/main.rs` at the `completions` and `chat_completions` handlers, and the SSE adapter is `sse_response` (`main.rs:2481`).

## SSE envelope

Every frame is one of:

<table>
<thead>
  <tr>
    <th>
      Frame shape
    </th>
    
    <th>
      When emitted
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        data: {…JSON…}\n\n
      </code>
      
       (default <code>
        event:
      </code>
      
      )
    </td>
    
    <td>
      A <code>
        StreamFrame
      </code>
      
       from the worker.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        event: error\ndata: <message>\n\n
      </code>
    </td>
    
    <td>
      The worker reported a failure mid-stream.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        data: [DONE]\n\n
      </code>
    </td>
    
    <td>
      Always the last frame.
    </td>
  </tr>
</tbody>
</table>

The `[DONE]` sentinel is **always** emitted at the end of the stream, even after an `error` event (`main.rs:2504`). Clients should consume frames by reading the `data:` field and stop when the value equals `[DONE]`. Treat any `event: error` frame as a failed request.

The HTTP response uses the standard `text/event-stream` content type, set by `axum::response::sse::Sse`. The server installs `KeepAlive::default()` (`main.rs:2491`) — axum sends a comment-only frame every ~15 seconds to keep the connection open through intermediaries.

## `object` discriminators

The streaming frames mirror the OpenAI wire format. The `object` field on each frame tells the client which decoder to use:

<table>
<thead>
  <tr>
    <th>
      Endpoint
    </th>
    
    <th>
      <code>
        object
      </code>
      
       value
    </th>
    
    <th>
      Body field with content
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        POST /v1/completions
      </code>
      
       (<code>
        stream: true
      </code>
      
      )
    </td>
    
    <td>
      <code>
        text_completion
      </code>
    </td>
    
    <td>
      <code>
        choices[0].text
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        POST /v1/chat/completions
      </code>
      
       (<code>
        stream: true
      </code>
      
      )
    </td>
    
    <td>
      <code>
        chat.completion.chunk
      </code>
    </td>
    
    <td>
      <code>
        choices[0].delta.content
      </code>
    </td>
  </tr>
</tbody>
</table>

## Chat streaming

```bash
curl -N http://127.0.0.1:8080/v1/chat/completions \
  -H 'content-type: application/json' \
  -d '{
    "model": "local-chat",
    "stream": true,
    "messages": [{ "role": "user", "content": "Count to three." }],
    "max_tokens": 32
  }'
```

The stream starts with a role-announce frame:

```json
{
  "id": "chatcmpl-1749900000",
  "object": "chat.completion.chunk",
  "created": 1749900000,
  "model": "llama-crab",
  "choices": [
    {
      "index": 0,
      "delta": { "role": "assistant" },
      "finish_reason": null
    }
  ]
}
```

Subsequent frames carry content deltas in `choices[0].delta.content`:

```json
{
  "id": "chatcmpl-1749900000",
  "object": "chat.completion.chunk",
  "created": 1749900000,
  "model": "llama-crab",
  "choices": [
    {
      "index": 0,
      "delta": { "content": "One" },
      "finish_reason": null
    }
  ]
}
```

When the model emits a tool call, the server parses the running text through a `ToolCallStream` (`main.rs:1620`). The text is split into `delta.content` frames (text-only path) and `delta.tool_calls` frames (tool path). Content frames are suppressed while a tool call is being assembled — once a tool call starts, all subsequent text becomes part of the tool arguments and is delivered as `delta.tool_calls[].function.arguments`. When the call finishes, content frames resume only if the model returns to plain text.

A tool-call delta frame looks like:

```json
{
  "object": "chat.completion.chunk",
  "choices": [
    {
      "index": 0,
      "delta": {
        "tool_calls": [
          {
            "index": 0,
            "id": "call_0",
            "type": "function",
            "function": {
              "name": "get_weather",
              "arguments": "{\"city\":\""
            }
          }
        ]
      },
      "finish_reason": null
    }
  ]
}
```

Subsequent deltas for the same tool call reuse the same `index` and may omit `id` and `type`. The `stream_frame_tool_call_delta` helper (`main.rs:2436`) drops a frame entirely when none of `id`, `name`, or `arguments` is set.

The final chat frame has an empty `delta` and a `finish_reason` of `stop`, `length`, or `tool_calls`. The same identifier (`id`), `created` timestamp, and `model` are reused across every frame of a single stream.

### Chat logprobs in streams

When the request sets `logprobs: true` (with optional `top_logprobs`), per-token logprobs are attached to each stream frame in `choices[0].logprobs`:

```json
"logprobs": {
  "content": [
    { "token": "One", "logprob": -0.4, "bytes": null,
      "top_logprobs": [{ "token": "One", "logprob": -0.4, "bytes": null }, ...] }
  ],
  "refusal": null
}
```

The wire shape matches the OpenAI chat logprobs format. `bytes` and `refusal` are always `null` (the server does not yet emit token-byte breakdowns or refusal content).

## Text completion streaming

```bash
curl -N http://127.0.0.1:8080/v1/completions \
  -H 'content-type: application/json' \
  -d '{
    "model": "local",
    "stream": true,
    "prompt": "One short sentence:",
    "max_tokens": 32
  }'
```

Each frame uses `object: "text_completion"` and carries the generated text in `choices[0].text`:

```json
{
  "id": "cmpl-1749900000",
  "object": "text_completion",
  "created": 1749900000,
  "model": "llama-crab",
  "choices": [
    {
      "index": 0,
      "text": "The quick brown fox",
      "logprobs": null,
      "finish_reason": null
    }
  ]
}
```

The final frame carries an empty `text` and a `finish_reason` of `stop`, `length`, or `tool_calls`. When `logprobs` was set on the request, each frame's `choices[0].logprobs` mirrors the non-streaming `CompletionLogprobsResponse` shape (`tokens`, `text_offset`, `token_logprobs`, `top_logprobs`).

<callout color="warning" icon="i-lucide-alert-triangle">

Streaming text completions accept **exactly one prompt**. A `prompt` array with more than one entry causes a mid-stream `error` frame followed by `[DONE]` (`main.rs:1017-1024`).

</callout>

## Error frames

When the worker fails after the SSE response has started, the stream emits:

```text
event: error
data: <plain error message>
```

followed by the usual `data: [DONE]` terminator. The data is the worker's error string verbatim — there is no JSON envelope, and no `error` type. Common triggers include:

- Prompt evaluation failures (e.g. context overflow).
- Multimodal bitmap load errors.
- Stream control requests that abort generation.

## Client guidance

A minimal browser or Node SSE reader should:

1. Read each `data:` frame.
2. Stop when the data is `[DONE]`.
3. Treat any `event: error` frame as a failed request.
4. For chat, append `choices[0].delta.content` (and append tool-call deltas when present).
5. For text completions, append `choices[0].text` when present.
6. Use the `object` field to switch between text and chat decoders.

The server does not provide a per-frame usage summary. Compute token usage from the non-streaming response (the same request with `stream: false`) if you need it, or rely on the framework's tokenizer separately.

## Behaviour changes vs. 0.1.4

Streaming is part of the server's 0.1.4 introduction; no breaking changes to the SSE protocol have shipped in 0.1.5. The 0.1.4 release added the high-level streaming completion APIs (`create_completion_stream`, `CompletionChunk`, `StreamControl`) used by the worker on the server side. The wire protocol is the same in 0.1.5.
