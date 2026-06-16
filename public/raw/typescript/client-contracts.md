# Client Contracts

> Public and internal TypeScript contracts used by llama-crab clients and adapters.

The TypeScript packages separate public OpenAI-like contracts from the smaller internal contract used by adapters. This page describes the actual mapping, the content handling rules, and the response shapes the Tauri client materialises.

## Chat request mapping

`toInternalChatCompletionRequest` (alias `toInternalChatRequest`) validates the public `ChatCompletionCreateParams` and produces an `InternalChatRequest`. Both helpers throw `InvalidRequestError` when `model` is empty or `messages` is empty.

<table>
<thead>
  <tr>
    <th>
      Public field
    </th>
    
    <th>
      Internal field
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
      <code>
        model
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        messages
      </code>
    </td>
    
    <td>
      <code>
        messages
      </code>
      
       (with <code>
        developer
      </code>
      
       mapped to <code>
        system
      </code>
      
      )
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        user
      </code>
    </td>
    
    <td>
      <code>
        user
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        max_tokens
      </code>
    </td>
    
    <td>
      <code>
        maxTokens
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        min_tokens
      </code>
    </td>
    
    <td>
      <code>
        minTokens
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        temperature
      </code>
    </td>
    
    <td>
      <code>
        temperature
      </code>
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
        topP
      </code>
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
        seed
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        stop
      </code>
      
       (string or <code>
        string[]
      </code>
      
      )
    </td>
    
    <td>
      <code>
        stop: string[]
      </code>
      
       (a single string becomes a one-item array)
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        n
      </code>
    </td>
    
    <td>
      <code>
        n
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tools
      </code>
    </td>
    
    <td>
      <code>
        tools
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tool_choice
      </code>
    </td>
    
    <td>
      <code>
        toolChoice
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        response_format
      </code>
    </td>
    
    <td>
      <code>
        responseFormat
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        logprobs
      </code>
    </td>
    
    <td>
      <code>
        logprobs
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        top_logprobs
      </code>
    </td>
    
    <td>
      <code>
        topLogprobs
      </code>
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
        frequencyPenalty
      </code>
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
        presencePenalty
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        llama_crab.template
      </code>
    </td>
    
    <td>
      <code>
        template
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        llama_crab.top_k
      </code>
    </td>
    
    <td>
      <code>
        topK
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        llama_crab.grammar
      </code>
    </td>
    
    <td>
      <code>
        grammar
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        llama_crab.grammar_root
      </code>
    </td>
    
    <td>
      <code>
        grammarRoot
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        llama_crab.json_schema
      </code>
    </td>
    
    <td>
      <code>
        jsonSchema
      </code>
    </td>
  </tr>
</tbody>
</table>

`dropUndefined` strips any field that resolved to `undefined`, so internal requests never carry empty values.

The public `developer` role maps to internal `system`. Other supported internal roles are `user`, `assistant`, and `tool`. The same mapping also applies to assistant `tool_calls` echoed back in tool-role messages.

## Other request mappers

`toInternalCompletionRequest`, `toInternalEmbeddingRequest`, `toInternalRerankRequest`, `toInternalTokenizeRequest` and `toInternalDetokenizeRequest` follow the same shape — they validate required fields and translate snake_case to camelCase.

<table>
<thead>
  <tr>
    <th>
      Helper
    </th>
    
    <th>
      Public → internal field changes
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        toInternalCompletionRequest
      </code>
    </td>
    
    <td>
      <code>
        max_tokens → maxTokens
      </code>
      
      , <code>
        min_tokens → minTokens
      </code>
      
      , <code>
        top_p → topP
      </code>
      
      , <code>
        top_k → topK
      </code>
      
      , <code>
        stop → stop[]
      </code>
      
      , <code>
        frequency_penalty → frequencyPenalty
      </code>
      
      , <code>
        presence_penalty → presencePenalty
      </code>
      
      , <code>
        logprobs
      </code>
      
      , <code>
        echo
      </code>
      
      , <code>
        suffix
      </code>
      
      , <code>
        n
      </code>
      
      , <code>
        grammar
      </code>
      
      , <code>
        grammarRoot
      </code>
      
      , <code>
        jsonSchema
      </code>
      
      , <code>
        llama_crab.*
      </code>
      
       passthrough.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        toInternalEmbeddingRequest
      </code>
    </td>
    
    <td>
      <code>
        encoding_format → encodingFormat
      </code>
      
      , <code>
        llama_crab.normalize → normalize
      </code>
      
      , <code>
        user
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        toInternalRerankRequest
      </code>
    </td>
    
    <td>
      <code>
        top_n → topN
      </code>
      
      , <code>
        documents
      </code>
      
      , <code>
        query
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        toInternalTokenizeRequest
      </code>
    </td>
    
    <td>
      passthrough (only validates <code>
        model
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        toInternalDetokenizeRequest
      </code>
    </td>
    
    <td>
      passthrough (only validates <code>
        model
      </code>
      
      ).
    </td>
  </tr>
</tbody>
</table>

`toInternalEmbeddingRequest` accepts only `Pick<LlamaCrabSpecificOptions, "normalize">` under `llama_crab`.

## Content handling

String content is passed through unchanged. Text content parts (`type: "text"`) are concatenated in order before they reach the Rust plugin. The plugin then re-tokenises the joined text per message; image and audio content parts are routed to the multimodal path:

```ts
{
  role: "user",
  content: [
    { type: "text", text: "Hello " },
    { type: "text", text: "there" },
  ],
}
```

Image content parts follow the OpenAI `image_url` shape and are accepted by the client as long as the Rust plugin was built with the `mtmd` cargo feature. The plugin supports `data:image/...;base64,...` URLs and local file paths. Audio content parts are typed (`input_audio` with `wav` or `mp3`) but the plugin currently rejects them with a `mediaDecode` error. The Tauri client does not throw `UnsupportedFeatureError` for either; the failure surfaces from the Rust side.

## Response mapping

`toChatCompletion` produces a complete `ChatCompletion` object. It accepts either an existing `ChatCompletion` (pass-through) or a `(params, text, finishReason?, metadata?)` tuple:

```ts
{
  id: "<generated chatcmpl-…>",
  object: "chat.completion",
  created: <unix seconds>,
  model: <params.model>,
  choices: [
    {
      index: 0,
      message: { role: "assistant", content: text },
      finish_reason: <normalised>
    }
  ],
  usage: null
}
```

`toChatCompletionChunk` accepts either a `ChatCompletionChunk`-shaped value (it backfills `object: "chat.completion.chunk"` and `usage ?? null`) or a token event `{ requestId, token, index, done?, stopReason? }`. Token events build a chunk with `id: "chatcmpl-<requestId>"`, a single `choices[0]` whose `delta.content` is the token (or empty when `done` is set), and `finish_reason` populated only on the terminal chunk.

Finish reasons are normalised as follows:

<table>
<thead>
  <tr>
    <th>
      Internal reason
    </th>
    
    <th>
      Public reason
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        length
      </code>
    </td>
    
    <td>
      <code>
        length
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        stop
      </code>
      
       or <code>
        eos
      </code>
    </td>
    
    <td>
      <code>
        stop
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tool_calls
      </code>
    </td>
    
    <td>
      <code>
        tool_calls
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        content_filter
      </code>
    </td>
    
    <td>
      <code>
        content_filter
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Other or missing
    </td>
    
    <td>
      <code>
        null
      </code>
    </td>
  </tr>
</tbody>
</table>

When the Rust plugin emits a `ChatCompletionChunk` directly (it does for streaming), the chunk is forwarded as-is. The chunk shape is:

```ts
{
  id: string,
  object: "chat.completion.chunk",
  created: number,
  model: string,
  choices: ChatCompletionChunkChoice[],
  usage: Usage | null,
  requestId?: string
}
```

`ChatCompletionChunkChoice.delta` carries `role?`, `content?` and an optional `tool_calls` array with `id`, `type` and `function.{name, arguments}` deltas. The terminal chunk contains `delta: {}` (or `ChatChunkDelta::default()`) and a populated `finish_reason`.

## Token / completion request lifecycle

1. The TypeScript client (`@llama-crab/tauri`) converts the public request via the matching `toInternal*Request` helper.
2. `LlamaCrabTauriIpc` builds the camelCase IPC payload (snake_case public fields are converted: `n_ctx → nCtx`, `n_gpu_layers → nGpuLayers`, `mobile_preset → mobilePreset`, `mmproj_path → mmprojPath`, `n_batch → nBatch`, `n_ubatch → nUbatch`, `n_threads → nThreads`, `n_threads_batch → nThreadsBatch`, `use_mmap → useMmap`, `flash_attn → flashAttn`, `offload_kqv → offloadKqv`).
3. The client opens a Tauri `Channel<T>` for streaming commands and invokes `plugin:llama-crab|<command>` with `{ payload, onChunk }`.
4. The Rust plugin maps the internal payload to its `ChatCompletionRequest` / `CompletionRequest` / etc. and runs inference on the worker thread.
5. Streaming chunks flow back over the channel. The client materialises them as `AsyncIterable<T>` and yields them to the consumer.
6. When the consumer breaks out of the loop or aborts an `AbortSignal`, the client invokes `plugin:llama-crab|cancel` with the `requestId` captured from the first chunk.

## Validation errors

`toInternal*Request` throws `InvalidRequestError` (with `code: "invalid_request"`) when:

- `model` is missing or empty.
- `messages` is empty (chat).
- `prompt` is an empty array (completion).
- `input` is an empty array (embedding).
- `documents` is empty (rerank).

The Tauri client also forwards the Rust-side `PluginError` payloads (`kind` discriminator: `invalidRequest`, `modelNotFound`, `workerSpawnFailed`, `workerDisconnected`, `workerPanicked`, `multimodalNotEnabled`, `multimodalSetup`, `mediaDecode`, `inference`) when an `invoke` rejects.
