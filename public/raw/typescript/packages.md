# Packages

> TypeScript packages for shared contracts and Tauri frontend clients.

llama-crab publishes TypeScript packages for applications that need shared request/response contracts or a Tauri frontend client. Both packages are versioned `0.1.8` at the time of writing and live in the workspace `packages/` directory (a pnpm workspace declared by `pnpm-workspace.yaml`).

Use `@llama-crab/core` when you are building an adapter and need stable request and response contracts. Use `@llama-crab/tauri` when your frontend runs inside a Tauri app with `tauri-plugin-llama-crab` installed.

## Package overview

<table>
<thead>
  <tr>
    <th>
      Package
    </th>
    
    <th>
      Version
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        @llama-crab/core
      </code>
    </td>
    
    <td>
      <code>
        0.1.8
      </code>
    </td>
    
    <td>
      OpenAI-like TypeScript contracts and pure mapping helpers. No runtime client.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        @llama-crab/tauri
      </code>
    </td>
    
    <td>
      <code>
        0.1.8
      </code>
    </td>
    
    <td>
      Tauri-specific client built on <code>
        @llama-crab/core
      </code>
      
       and <code>
        @tauri-apps/api ^2.0.0
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

Both packages ship dual ESM/CJS bundles from `dist/` (via `tsup`):

```json
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

## `@llama-crab/core`

`@llama-crab/core` contains type definitions and pure conversion helpers. It does not talk to HTTP, Tauri, or Rust directly.

### Install

<tabs>
<tabs-item icon="i-simple-icons-npm" label="npm">

```bash [Terminal]
npm install @llama-crab/core
```

</tabs-item>

<tabs-item icon="i-simple-icons-yarn" label="Yarn">

```bash [Terminal]
yarn add @llama-crab/core
```

</tabs-item>

<tabs-item icon="i-simple-icons-pnpm" label="pnpm">

```bash [Terminal]
pnpm add @llama-crab/core
```

</tabs-item>

<tabs-item icon="i-simple-icons-bun" label="Bun">

```bash [Terminal]
bun add @llama-crab/core
```

</tabs-item>
</tabs>

::

### Public types

<table>
<thead>
  <tr>
    <th>
      Type
    </th>
    
    <th>
      Purpose
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        ChatCompletionCreateParams
      </code>
    </td>
    
    <td>
      OpenAI-like chat completion request type.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ChatCompletion
      </code>
    </td>
    
    <td>
      Non-streaming chat response type.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ChatCompletionChunk
      </code>
    </td>
    
    <td>
      Streaming chat chunk type.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ChatCompletionMessageParam
      </code>
      
      , <code>
        ChatCompletionTool
      </code>
      
      , <code>
        ChatCompletionContentPart
      </code>
    </td>
    
    <td>
      Messages, tool definitions and content parts (text, <code>
        image_url
      </code>
      
      , <code>
        input_audio
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        CompletionCreateParams
      </code>
      
      , <code>
        Completion
      </code>
      
      , <code>
        CompletionChunk
      </code>
    </td>
    
    <td>
      OpenAI legacy text completion shapes.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        EmbeddingCreateParams
      </code>
      
      , <code>
        EmbeddingCreateResponse
      </code>
      
      , <code>
        Embedding
      </code>
    </td>
    
    <td>
      OpenAI-like embedding shapes (<code>
        float
      </code>
      
       or <code>
        base64
      </code>
      
       encoding).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        RerankCreateParams
      </code>
      
      , <code>
        RerankResponse
      </code>
    </td>
    
    <td>
      llama-crab namespace compatible with the server <code>
        /v1/rerank
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        TokenizeParams
      </code>
      
      , <code>
        TokenizeResponse
      </code>
      
      , <code>
        TokenizeCountResponse
      </code>
      
      , <code>
        DetokenizeParams
      </code>
      
      , <code>
        DetokenizeResponse
      </code>
    </td>
    
    <td>
      llama-crab extras namespace.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ModelLoadParams
      </code>
    </td>
    
    <td>
      Snake_case model load request used by adapters.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        ModelObject
      </code>
      
      , <code>
        ModelListResponse
      </code>
    </td>
    
    <td>
      Model-listing contracts.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        InternalChatRequest
      </code>
      
      , <code>
        InternalCompletionRequest
      </code>
      
      , <code>
        InternalEmbeddingRequest
      </code>
      
      , <code>
        InternalRerankRequest
      </code>
    </td>
    
    <td>
      camelCase payloads the adapters actually send.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        LlamaCrabSpecificOptions
      </code>
    </td>
    
    <td>
      The <code>
        llama_crab.*
      </code>
      
       namespace (<code>
        template
      </code>
      
      , <code>
        top_k
      </code>
      
      , <code>
        grammar
      </code>
      
      , <code>
        grammar_root
      </code>
      
      , <code>
        json_schema
      </code>
      
      , <code>
        pooling
      </code>
      
      , <code>
        normalize
      </code>
      
      , <code>
        mmproj_path
      </code>
      
      ).
    </td>
  </tr>
</tbody>
</table>

### Helpers

<table>
<thead>
  <tr>
    <th>
      Helper
    </th>
    
    <th>
      Purpose
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        toInternalChatCompletionRequest
      </code>
      
       (alias <code>
        toInternalChatRequest
      </code>
      
      )
    </td>
    
    <td>
      Validates and converts public chat params to the internal adapter request.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        toInternalCompletionRequest
      </code>
    </td>
    
    <td>
      Same, for text completions.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        toInternalEmbeddingRequest
      </code>
    </td>
    
    <td>
      Same, for embeddings.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        toInternalRerankRequest
      </code>
    </td>
    
    <td>
      Same, for rerank.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        toInternalTokenizeRequest
      </code>
      
      , <code>
        toInternalDetokenizeRequest
      </code>
    </td>
    
    <td>
      Same, for tokenize / detokenize.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        toChatCompletion
      </code>
    </td>
    
    <td>
      Builds a non-streaming chat completion response.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        toChatCompletionChunk
      </code>
    </td>
    
    <td>
      Converts a chunk-shaped value (or a token event) to a streaming chunk.
    </td>
  </tr>
</tbody>
</table>

### Errors

<table>
<thead>
  <tr>
    <th>
      Error
    </th>
    
    <th>
      Code
    </th>
    
    <th>
      Thrown when
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        LlamaCrabError
      </code>
    </td>
    
    <td>
      —
    </td>
    
    <td>
      Base class.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        InvalidRequestError
      </code>
    </td>
    
    <td>
      <code>
        invalid_request
      </code>
    </td>
    
    <td>
      Public request is missing required fields (e.g. empty <code>
        messages
      </code>
      
      , empty <code>
        documents
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        UnsupportedFeatureError
      </code>
    </td>
    
    <td>
      <code>
        unsupported_feature
      </code>
    </td>
    
    <td>
      The adapter does not support a feature (the Tauri client no longer raises this for chat features, but the class is exported for other adapters).
    </td>
  </tr>
</tbody>
</table>

### Example

```ts
import { toInternalChatCompletionRequest } from "@llama-crab/core"

const request = toInternalChatCompletionRequest({
  model: "local",
  messages: [{ role: "user", content: "Hello" }],
  max_tokens: 64,
  llama_crab: {
    template: "chatml",
    top_k: 40,
  },
})
```

## `@llama-crab/tauri`

`@llama-crab/tauri` depends on `@llama-crab/core` (as `workspace:*`) and `@tauri-apps/api ^2.0.0`. It exposes `LlamaCrabTauri`, which is a small OpenAI-style wrapper over the `plugin:llama-crab|<command>` IPC calls.

### Install

<tabs>
<tabs-item icon="i-simple-icons-npm" label="npm">

```bash [Terminal]
npm install @llama-crab/tauri
```

</tabs-item>

<tabs-item icon="i-simple-icons-yarn" label="Yarn">

```bash [Terminal]
yarn add @llama-crab/tauri
```

</tabs-item>

<tabs-item icon="i-simple-icons-pnpm" label="pnpm">

```bash [Terminal]
pnpm add @llama-crab/tauri
```

</tabs-item>

<tabs-item icon="i-simple-icons-bun" label="Bun">

```bash [Terminal]
bun add @llama-crab/tauri
```

</tabs-item>
</tabs>

::

### Client surface

<table>
<thead>
  <tr>
    <th>
      Resource
    </th>
    
    <th>
      Methods
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        client.models
      </code>
    </td>
    
    <td>
      <code>
        load(params)
      </code>
      
      , <code>
        unload(id)
      </code>
      
      , <code>
        list()
      </code>
      
      , <code>
        retrieve(id)
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        client.chat.completions
      </code>
    </td>
    
    <td>
      <code>
        create(params, options?)
      </code>
      
       — returns <code>
        ChatCompletion
      </code>
      
       or <code>
        AsyncIterable<ChatCompletionChunk>
      </code>
      
       when <code>
        stream: true
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        client.completions
      </code>
    </td>
    
    <td>
      <code>
        create(params, options?)
      </code>
      
       — returns <code>
        Completion
      </code>
      
       or <code>
        AsyncIterable<CompletionChunk>
      </code>
      
       when <code>
        stream: true
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        client.embeddings
      </code>
    </td>
    
    <td>
      <code>
        create(params)
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        client.rerank
      </code>
    </td>
    
    <td>
      <code>
        create(params)
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        client.extras
      </code>
    </td>
    
    <td>
      <code>
        tokenize(params)
      </code>
      
       (with <code>
        tokenize.count(params)
      </code>
      
      ) and <code>
        detokenize(params)
      </code>
    </td>
  </tr>
</tbody>
</table>

`CallOptions = { signal?: AbortSignal }`. The streaming variants use the `AbortSignal` to drive `plugin:llama-crab|cancel` automatically.

### Example

```ts
import { LlamaCrabTauri } from "@llama-crab/tauri"

const client = new LlamaCrabTauri()

await client.models.load({
  model: "local",
  path: "/models/model.gguf",
})

const response = await client.chat.completions.create({
  model: "local",
  messages: [{ role: "user", content: "Say hello." }],
})

const stream = await client.completions.create({
  model: "local",
  prompt: "Rust is",
  max_tokens: 16,
  stream: true,
})

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.text ?? "")
}
```

For a deeper walkthrough of the client (multimodal, tools, response_format, logprobs, cancel, errors), see the [Tauri TypeScript client guide](/tauri/typescript-client).

## Versioning

Both packages are published independently but kept in lockstep with the workspace: the workspace `package.json` and every `packages/*/package.json` currently report `0.1.8`. The Rust plugin crate, by contrast, is versioned through the workspace `[workspace.package]` block (currently `0.1.8` as well). Bump them together when shipping breaking IPC or contract changes.
