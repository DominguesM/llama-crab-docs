# TypeScript section update notes

## Source of truth

- `packages/core/` (`@llama-crab/core` v0.1.8)
- `packages/tauri/` (`@llama-crab/tauri` v0.1.8)
- `pnpm-workspace.yaml`, root `package.json`
- `CHANGELOG.md` (v0.1.0 → v0.1.5)

## What changed in the docs

### `content/5.typescript/1.packages.md`

- Added a `Package overview` table with the current `0.1.8` versions, descriptions, and the `dist` export map (ESM/CJS/types).
- Documented the install command for both packages using the same install snippet format as the rest of the docs (npm / Yarn / pnpm / Bun tabs).
- Documented the public type catalogue of `@llama-crab/core`: `ChatCompletionCreateParams`, `ChatCompletion`, `ChatCompletionChunk`, `ChatCompletionMessageParam`, `ChatCompletionTool`, `ChatCompletionContentPart`, `CompletionCreateParams`, `Completion`, `CompletionChunk`, `EmbeddingCreateParams`, `EmbeddingCreateResponse`, `Embedding`, `RerankCreateParams`, `RerankResponse`, `TokenizeParams`, `TokenizeResponse`, `TokenizeCountResponse`, `DetokenizeParams`, `DetokenizeResponse`, `ModelLoadParams`, `ModelObject`, `ModelListResponse`, `InternalChatRequest`, `InternalCompletionRequest`, `InternalEmbeddingRequest`, `InternalRerankRequest`, `LlamaCrabSpecificOptions`.
- Documented the helper catalogue: `toInternalChatCompletionRequest` (alias `toInternalChatRequest`), `toInternalCompletionRequest`, `toInternalEmbeddingRequest`, `toInternalRerankRequest`, `toInternalTokenizeRequest`, `toInternalDetokenizeRequest`, `toChatCompletion`, `toChatCompletionChunk`.
- Documented the error classes: `LlamaCrabError`, `InvalidRequestError` (`invalid_request`), `UnsupportedFeatureError` (`unsupported_feature`).
- Documented the full client surface of `@llama-crab/tauri`: `client.models`, `client.chat.completions`, `client.completions` (new vs. old doc), `client.embeddings`, `client.rerank`, `client.extras` (with `tokenize.count`).
- Documented `CallOptions = { signal?: AbortSignal }` and the streaming cancellation lifecycle.
- Added a versioning note: both packages are at `0.1.8` and the workspace `package.json` matches.

### `content/5.typescript/2.client-contracts.md`

- Replaced the partial public-to-internal mapping with the actual mapping (every field documented in `packages/core/src/chat-completions.ts`).
- Documented the other request mappers (`toInternalCompletionRequest`, `toInternalEmbeddingRequest`, `toInternalRerankRequest`, `toInternalTokenizeRequest`, `toInternalDetokenizeRequest`).
- Updated the content handling section: text parts are concatenated, image parts are accepted by the multimodal plugin (mtmd), audio parts are typed but rejected with `mediaDecode`. The old "image and audio content parts are currently rejected" wording is gone for the Tauri path.
- Documented `toChatCompletion` and `toChatCompletionChunk` overloads and the actual `ChatCompletionChunk` shape (including `requestId`).
- Documented the full snake_case → camelCase IPC payload mapping inside `LlamaCrabTauriIpc.load` (`n_ctx → nCtx`, `n_gpu_layers → nGpuLayers`, `mobile_preset → mobilePreset`, `mmproj_path → mmprojPath`, `n_batch → nBatch`, `n_ubatch → nUbatch`, `n_threads → nThreads`, `n_threads_batch → nThreadsBatch`, `use_mmap → useMmap`, `flash_attn → flashAttn`, `offload_kqv → offloadKqv`).
- Removed the "Unsupported feature errors" table that claimed the Tauri client throws `UnsupportedFeatureError` for `n>1`, `tools`, `tool_choice`, `response_format`, `logprobs`, image input and audio input. The current Tauri client does not throw that error; the class is still exported for future adapters but the table was misleading.
- Documented the validation rules that **do** throw `InvalidRequestError` (missing `model`, empty `messages`, empty `prompt` array, empty `input` array, empty `documents`).
- Documented the request lifecycle: `toInternal*Request` → `LlamaCrabTauriIpc` IPC payload → `plugin:llama-crab|<command>` → worker thread → chunks over the Tauri `Channel` → `AsyncIterable<T>` → `plugin:llama-crab|cancel` on `AbortSignal`.

## Breaking changes vs. the v0.1.x baseline

<table>
<thead>
  <tr>
    <th>
      Area
    </th>
    
    <th>
      Before (doc)
    </th>
    
    <th>
      After (real code)
    </th>
    
    <th>
      Impact
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        stop
      </code>
      
       field
    </td>
    
    <td>
      <code>
        stop → stopSequences
      </code>
    </td>
    
    <td>
      <code>
        stop → stop: string[]
      </code>
    </td>
    
    <td>
      Internal request field name is <code>
        stop
      </code>
      
      , not <code>
        stopSequences
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        UnsupportedFeatureError
      </code>
    </td>
    
    <td>
      Tauri client throws for <code>
        n>1
      </code>
      
      , <code>
        tools
      </code>
      
      , <code>
        tool_choice
      </code>
      
      , <code>
        response_format
      </code>
      
      , <code>
        logprobs
      </code>
      
      , image/audio
    </td>
    
    <td>
      Tauri client does not throw; the plugin handles all of these
    </td>
    
    <td>
      Old code that caught the error is dead.
    </td>
  </tr>
  
  <tr>
    <td>
      Client resources
    </td>
    
    <td>
      <code>
        client.models
      </code>
      
      , <code>
        client.chat.completions
      </code>
      
       only
    </td>
    
    <td>
      <code>
        client.models
      </code>
      
      , <code>
        client.chat.completions
      </code>
      
      , <code>
        client.completions
      </code>
      
      , <code>
        client.embeddings
      </code>
      
      , <code>
        client.rerank
      </code>
      
      , <code>
        client.extras
      </code>
    </td>
    
    <td>
      New resources available.
    </td>
  </tr>
  
  <tr>
    <td>
      Embeddings, rerank, tokenize
    </td>
    
    <td>
      Documented as Tauri-client features?
    </td>
    
    <td>
      Exposed as <code>
        client.embeddings
      </code>
      
      , <code>
        client.rerank
      </code>
      
      , <code>
        client.extras.*
      </code>
    </td>
    
    <td>
      Adapters that previously talked to the IPC directly can now use the client.
    </td>
  </tr>
  
  <tr>
    <td>
      Helper set
    </td>
    
    <td>
      <code>
        toInternalChatRequest
      </code>
      
      , <code>
        toChatCompletion
      </code>
      
      , <code>
        toChatCompletionChunk
      </code>
      
       listed
    </td>
    
    <td>
      Same set, plus <code>
        toInternalChatCompletionRequest
      </code>
      
       alias, <code>
        toInternalCompletionRequest
      </code>
      
      , <code>
        toInternalEmbeddingRequest
      </code>
      
      , <code>
        toInternalRerankRequest
      </code>
      
      , <code>
        toInternalTokenizeRequest
      </code>
      
      , <code>
        toInternalDetokenizeRequest
      </code>
    </td>
    
    <td>
      More helpers exported, all listed in the package's <code>
        index.ts
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      Package versions
    </td>
    
    <td>
      Not stated
    </td>
    
    <td>
      Both at <code>
        0.1.8
      </code>
      
       (workspace <code>
        0.1.8
      </code>
      
      )
    </td>
    
    <td>
      Readers know which version the docs describe.
    </td>
  </tr>
  
  <tr>
    <td>
      Snake_case → camelCase mapping
    </td>
    
    <td>
      Mentioned in passing for chat
    </td>
    
    <td>
      Fully tabulated in the contracts page
    </td>
    
    <td>
      Adapter authors can copy the table verbatim.
    </td>
  </tr>
</tbody>
</table>

## Open questions for reviewers

1. **Internal field name stop vs stopSequences**: the old doc said `stop → stopSequences`. The current `InternalChatRequest` type only declares `stop: string[]`. Confirm the old name was a typo and that the type is stable.
2. **UnsupportedFeatureError future use**: should the doc keep a short note explaining the class exists for adapter authors even though the Tauri client no longer throws it? The current rewrite just describes the validation errors that **do** throw.
3. **Streaming text completions**: `client.completions.create({ stream: true })` returns `AsyncIterable<CompletionChunk>`. The `stream_completion` command requires a single prompt and `n=1`; the docs mention this constraint, but it is worth confirming whether the Rust side will lift it or if the TS client should pre-validate.
4. **ModelLoadParams snake_case field coverage**: the IPC layer translates `n_ctx`, `n_gpu_layers`, `n_batch`, `n_ubatch`, `n_threads`, `n_threads_batch`, `use_mmap`, `flash_attn`, `offload_kqv`, `mobile_preset`, `pooling`, `mmproj_path`, `embeddings`, `kind`. Are any of these documented on `@llama-crab/core`'s public type but not on the Tauri client? (Spot-checked: yes, the IPC layer only passes a fixed set; the contract page lists all of them.)
5. **Workspace versioning**: `package.json` (root) is at the same version as the workspace packages. If the team plans to publish `@llama-crab/core` and `@llama-crab/tauri` independently, the doc may need a short note on how to consume the right version.
6. **Bundle output**: both packages publish `dist/index.cjs`, `dist/index.js`, `dist/index.d.ts`. The contracts page does not mention side-effects, `module`/`main` resolution order, or Node ESM caveats. Worth adding a one-liner if the docs are read by adapter authors.
