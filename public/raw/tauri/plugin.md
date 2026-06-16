# Tauri Plugin

> Install and understand the llama-crab Tauri plugin.

`tauri-plugin-llama-crab` embeds local llama-crab inference inside a Tauri 2 application. It registers a plugin named `llama-crab`, manages loaded models in Tauri state, and exposes IPC commands for loading/unloading models, chat and text completions (with streaming), embeddings, reranking, tokenizer helpers and cancellation.

The TypeScript package `@llama-crab/tauri` provides an OpenAI-like client on top of those IPC commands. For most app code, prefer the TypeScript client instead of invoking plugin commands directly.

## Installation

Add the plugin crate to your Tauri app:

```toml
# src-tauri/Cargo.toml
[dependencies]
tauri-plugin-llama-crab = { version = "0.1" }
```

## Register the plugin

The default entry point uses `Config::default()`:

```rust
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_llama_crab::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

### Apply plugin-wide defaults

`init_with_config` takes a `Config` struct with defaults that every `load_model` call will inherit. Anything left as `None` lets the per-request field win, with the `llama-crab` defaults as the final fallback.

```rust
use tauri_plugin_llama_crab::Config;

let config = Config {
    default_n_ctx: Some(4096),
    default_n_gpu_layers: Some(99),
    ..Config::default()
};

tauri::Builder::default()
    .plugin(tauri_plugin_llama_crab::init_with_config(config))
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
```

The available `Config` fields are: `default_n_ctx`, `default_n_batch`, `default_n_ubatch`, `default_n_threads`, `default_n_threads_batch`, `default_n_gpu_layers` and `default_model_name`.

### Enable multimodal (vision)

Build the plugin with the `mtmd` cargo feature and supply an `mmproj_path` to `load_model`:

```toml
[dependencies]
tauri-plugin-llama-crab = { version = "0.1", features = ["mtmd"] }
```

The plugin pulls in `base64` and `image` when `mtmd` is enabled. The chat pipeline then accepts `data:image/...;base64,...` URLs and local file paths through `image_url` content parts. Audio input is not supported yet.

## Runtime flow

1. The frontend asks to load a model.
2. `load_model` creates a model id (`Uuid::new_v4`) if one was not provided.
3. The plugin loads `LlamaParams` on a blocking worker thread named `llama-crab-model-worker`.
4. The loaded model id and `WorkerHandle` are stored in `PluginState` keyed by id.
5. Generation, chat, embedding, rerank and tokenizer commands look up the worker by model id.
6. `unload_model` removes the model from state and asks the worker to shut down.
7. With the `mtmd` feature, after the model loads the worker also receives a `MtmdContext` initialised from `mmproj_path`.

## Commands

All commands are registered under the `plugin:llama-crab|<command_name>` IPC prefix and exposed by the `LlamaCrabTauri` client.

<table>
<thead>
  <tr>
    <th>
      Command
    </th>
    
    <th>
      Input
    </th>
    
    <th>
      Output
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        load_model
      </code>
    </td>
    
    <td>
      <code>
        LoadModelRequest
      </code>
      
       with <code>
        path
      </code>
      
      , optional <code>
        id
      </code>
      
      , <code>
        kind
      </code>
      
      , <code>
        mobile_preset
      </code>
      
      , <code>
        pooling
      </code>
      
      , <code>
        embeddings
      </code>
      
      , <code>
        mmproj_path
      </code>
      
      , <code>
        n_ctx
      </code>
      
      , <code>
        n_batch
      </code>
      
      , <code>
        n_ubatch
      </code>
      
      , <code>
        n_gpu_layers
      </code>
      
      , <code>
        n_threads
      </code>
      
      , <code>
        n_threads_batch
      </code>
      
      , <code>
        use_mmap
      </code>
      
      , <code>
        flash_attn
      </code>
      
      , <code>
        offload_kqv
      </code>
      
      .
    </td>
    
    <td>
      <code>
        LoadModelResponse
      </code>
      
       with <code>
        id
      </code>
      
      , <code>
        object: "model"
      </code>
      
      , <code>
        created
      </code>
      
      , <code>
        owned_by
      </code>
      
      , <code>
        path
      </code>
      
      , optional <code>
        kind
      </code>
      
      , <code>
        mobilePreset
      </code>
      
      , <code>
        pooling
      </code>
      
      , <code>
        mmprojPath
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        unload_model
      </code>
    </td>
    
    <td>
      Model id (<code>
        String
      </code>
      
      ).
    </td>
    
    <td>
      <code>
        null
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        list_models
      </code>
    </td>
    
    <td>
      None.
    </td>
    
    <td>
      <code>
        ModelListResponse
      </code>
      
       with <code>
        object: "list"
      </code>
      
       and <code>
        data: LoadedModelInfo[]
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        retrieve_model
      </code>
    </td>
    
    <td>
      Model id.
    </td>
    
    <td>
      <code>
        LoadedModelInfo
      </code>
      
       for that id.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create_chat_completion
      </code>
    </td>
    
    <td>
      <code>
        ChatCompletionRequest
      </code>
      
       (<code>
        model
      </code>
      
      , <code>
        messages
      </code>
      
      , optional <code>
        maxTokens
      </code>
      
      , <code>
        minTokens
      </code>
      
      , <code>
        temperature
      </code>
      
      , <code>
        topP
      </code>
      
      , <code>
        topK
      </code>
      
      , <code>
        tfsZ
      </code>
      
      , <code>
        minP
      </code>
      
      , <code>
        typicalP
      </code>
      
      , <code>
        minKeep
      </code>
      
      , <code>
        penaltyLastN
      </code>
      
      , <code>
        repeatPenalty
      </code>
      
      , <code>
        frequencyPenalty
      </code>
      
      , <code>
        presencePenalty
      </code>
      
      , <code>
        mirostatMode
      </code>
      
      /<code>
        Tau
      </code>
      
      /<code>
        Eta
      </code>
      
      , <code>
        seed
      </code>
      
      , <code>
        tools
      </code>
      
      , <code>
        toolChoice
      </code>
      
      , <code>
        responseFormat
      </code>
      
      , <code>
        jsonSchema
      </code>
      
      , <code>
        grammar
      </code>
      
      , <code>
        grammarRoot
      </code>
      
      , <code>
        stop
      </code>
      
      , <code>
        template
      </code>
      
      , <code>
        logprobs
      </code>
      
      , <code>
        topLogprobs
      </code>
      
      , <code>
        n
      </code>
      
      , <code>
        user
      </code>
      
      ).
    </td>
    
    <td>
      <code>
        ChatCompletionResponse
      </code>
      
       (OpenAI-like with <code>
        usage
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        stream_chat_completion
      </code>
    </td>
    
    <td>
      <code>
        ChatCompletionRequest
      </code>
      
       plus a Tauri <code>
        Channel<ChatCompletionChunk>
      </code>
      
      .
    </td>
    
    <td>
      Stream of <code>
        ChatCompletionChunk
      </code>
      
       events on the channel; the first event carries <code>
        delta.role = "assistant"
      </code>
      
       and the last carries <code>
        finish_reason
      </code>
      
      ; tool-call deltas ride in <code>
        delta.tool_calls
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create_completion
      </code>
    </td>
    
    <td>
      <code>
        CompletionRequest
      </code>
      
       (<code>
        model
      </code>
      
      , <code>
        prompt
      </code>
      
       as string or array, optional sampling/structured/grammar fields, <code>
        echo
      </code>
      
      , <code>
        suffix
      </code>
      
      , <code>
        logprobs
      </code>
      
      , <code>
        n
      </code>
      
      , <code>
        stop
      </code>
      
      , <code>
        user
      </code>
      
      ).
    </td>
    
    <td>
      <code>
        CompletionResponse
      </code>
      
       (OpenAI legacy shape).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        stream_completion
      </code>
    </td>
    
    <td>
      <code>
        CompletionRequest
      </code>
      
       (must be a single prompt with <code>
        n=1
      </code>
      
      ) plus a Tauri <code>
        Channel<CompletionChunkFrame>
      </code>
      
      .
    </td>
    
    <td>
      Stream of <code>
        CompletionChunkFrame
      </code>
      
       events on the channel.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create_embedding
      </code>
    </td>
    
    <td>
      <code>
        EmbeddingRequest
      </code>
      
       (<code>
        model
      </code>
      
      , <code>
        input
      </code>
      
       as string or array, <code>
        encodingFormat: "float" | "base64"
      </code>
      
      , <code>
        normalize
      </code>
      
       defaults to <code>
        true
      </code>
      
      , <code>
        user
      </code>
      
      ).
    </td>
    
    <td>
      <code>
        EmbeddingResponse
      </code>
      
       with <code>
        EmbeddingItem[]
      </code>
      
       and <code>
        usage
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        create_rerank
      </code>
    </td>
    
    <td>
      <code>
        RerankRequest
      </code>
      
       (<code>
        model
      </code>
      
      , <code>
        query
      </code>
      
      , <code>
        documents: string[]
      </code>
      
      , <code>
        topN
      </code>
      
      ).
    </td>
    
    <td>
      <code>
        RerankResponse
      </code>
      
       with results sorted by descending <code>
        relevance_score
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tokenize
      </code>
    </td>
    
    <td>
      <code>
        TokenizeRequest
      </code>
      
       (<code>
        model
      </code>
      
      , <code>
        input: string
      </code>
      
      ).
    </td>
    
    <td>
      <code>
        TokenizeResponse
      </code>
      
       with <code>
        tokens: number[]
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tokenize_count
      </code>
    </td>
    
    <td>
      <code>
        TokenizeRequest
      </code>
      
       (<code>
        model
      </code>
      
      , <code>
        input: string
      </code>
      
      ).
    </td>
    
    <td>
      <code>
        TokenizeCountResponse
      </code>
      
       with <code>
        count: number
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        detokenize
      </code>
    </td>
    
    <td>
      <code>
        DetokenizeRequest
      </code>
      
       (<code>
        model
      </code>
      
      , <code>
        tokens: number[]
      </code>
      
      ).
    </td>
    
    <td>
      <code>
        DetokenizeResponse
      </code>
      
       with <code>
        text: string
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        cancel
      </code>
    </td>
    
    <td>
      Request id returned by a streaming command (via the chunk's <code>
        requestId
      </code>
      
       field).
    </td>
    
    <td>
      <code>
        null
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

The IPC command prefix used by `@llama-crab/tauri` is `plugin:llama-crab|`, for example:

```text
plugin:llama-crab|load_model
plugin:llama-crab|create_chat_completion
plugin:llama-crab|stream_chat_completion
plugin:llama-crab|create_completion
plugin:llama-crab|stream_completion
plugin:llama-crab|create_embedding
plugin:llama-crab|create_rerank
plugin:llama-crab|tokenize
plugin:llama-crab|tokenize_count
plugin:llama-crab|detokenize
plugin:llama-crab|cancel
```

## Worker behavior

`WorkerHandle::load` starts a thread named `llama-crab-model-worker` and waits for model loading to finish. All completion, embedding, rerank and tokenizer work is sent to that worker over an internal `mpsc` channel, and inference runs on the worker thread (the plugin uses `tauri::async_runtime::spawn_blocking` to drive it from async commands).

When the `mtmd` feature is enabled, the worker also owns a `MtmdContext` initialised from `mmproj_path`. Chat requests whose messages contain an `image_url` (or `input_audio`) part are routed through the multimodal path, with images decoded from base64 data URLs or loaded from disk. Audio input is currently rejected with `mediaDecode` and falls through `multimodalNotEnabled` when the `mtmd` feature is off.

## Streaming and cancellation

`stream_chat_completion` and `stream_completion` register the request id in `PluginState` and forward `ChatCompletionChunk` / `CompletionChunkFrame` events over the user-supplied Tauri `Channel`. Each chunk carries the original `requestId` so that the caller can later cancel the stream:

```tstitle="Cancel an in-flight stream"
await invoke("plugin:llama-crab|cancel", { requestId })
```

When cancellation fires (or the `AbortSignal` from the TypeScript client triggers it), the worker callback checks the cancellation flag and returns `StreamControl::Stop` to break out of the sampling loop. A final chunk with `finish_reason: "stop"` (or `"length"`, `"tool_calls"`) is always sent before the stream closes.

## Errors

Plugin errors serialize as camelCase objects with a discriminating `kind`:

```json
{
  "kind": "modelNotFound",
  "message": "model `local` is not loaded"
}
```

The `kind` values emitted by the current plugin are:

<table>
<thead>
  <tr>
    <th>
      Kind
    </th>
    
    <th>
      Meaning
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        invalidRequest
      </code>
    </td>
    
    <td>
      The payload failed validation (empty messages, unknown chat template, sampler init failure, multimodal request without <code>
        mtmd
      </code>
      
      , etc.).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        modelNotFound
      </code>
    </td>
    
    <td>
      The request targeted a model id that is not loaded.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        workerSpawnFailed
      </code>
    </td>
    
    <td>
      The OS refused to spawn the worker thread or the <code>
        LoadMtmd
      </code>
      
       IPC channel could not be sent on.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        workerDisconnected
      </code>
    </td>
    
    <td>
      The worker thread is no longer running and the request could not be delivered.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        workerPanicked
      </code>
    </td>
    
    <td>
      <code>
        spawn_blocking
      </code>
      
       returned a <code>
        JoinError
      </code>
      
       because the worker panicked.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        multimodalNotEnabled
      </code>
    </td>
    
    <td>
      A multimodal chat request was sent to a plugin built without the <code>
        mtmd
      </code>
      
       feature.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        multimodalSetup
      </code>
    </td>
    
    <td>
      The <code>
        mmproj
      </code>
      
       projector failed to initialise (load failure or <code>
        MtmdBitmap::from_*
      </code>
      
       error).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mediaDecode
      </code>
    </td>
    
    <td>
      The <code>
        image_url
      </code>
      
       payload could not be decoded (malformed data URL, bad base64, unsupported image format, audio input not supported).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        inference
      </code>
    </td>
    
    <td>
      The underlying <code>
        llama-crab
      </code>
      
       call returned a <code>
        LlamaError
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

## Request / response shape

- Snake_case at the public client boundary (the `ModelLoadParams` / `ChatCompletionCreateParams` types from `@llama-crab/core`) is mapped to camelCase inside `Internal*Request` payloads before reaching the plugin.
- All IPC payloads use serde's `rename_all = "camelCase"`, so fields like `mobile_preset`, `n_ctx`, `mmproj_path` and `llama_crab` travel as `mobilePreset`, `nCtx`, `mmprojPath` and `llamaCrab`.
- The `LoadModelRequest` type accepts both `kind: "chat" | "completion" | "embedding" | "rerank" | "multimodal"` and explicit `embeddings` / `pooling` overrides. If `kind` is `embedding` or `rerank`, the plugin enables embeddings automatically; if `kind` is `rerank`, the plugin also defaults `pooling` to `rank`.
- `MobilePresetName` serializes to `low-ram`, `balanced` or `gpu-max`. `PoolingName` serializes to `unspecified`, `none`, `mean`, `cls`, `last` or `rank`.
