# Crates and packages

> Stable package contracts for Rust crates and TypeScript packages.

This section captures stable package contracts that are useful while
installing, configuring, or operating `llama-crab`.

Use the package that matches the integration surface in your application.
The workspace version is `0.1.8` and all packages are released in
lockstep.

## Rust crates

<table>
<thead>
  <tr>
    <th>
      Crate
    </th>
    
    <th>
      Version
    </th>
    
    <th>
      Role
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        llama-crab
      </code>
    </td>
    
    <td>
      0.1.8
    </td>
    
    <td>
      Safe high-level Rust API for model loading, completion, chat, embeddings, multimodal helpers, sampling, and structured output.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        llama-crab-sys
      </code>
    </td>
    
    <td>
      0.1.8
    </td>
    
    <td>
      Low-level FFI and native build crate for llama.cpp, GGML, GGUF, and mtmd bindings.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        llama-crab-server
      </code>
    </td>
    
    <td>
      0.1.8
    </td>
    
    <td>
      HTTP server exposing local model inference through OpenAI-compatible routes and extras.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tauri-plugin-llama-crab
      </code>
    </td>
    
    <td>
      0.1.8
    </td>
    
    <td>
      Tauri v2 command plugin that wraps local model state for desktop applications.
    </td>
  </tr>
</tbody>
</table>

`llama-crab` and `llama-crab-sys` are published in lockstep as of
`0.1.8`. Downstream consumers can pin `llama-crab = "0.1.8"` without
manual coordination of the FFI version.

## TypeScript packages

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
      Role
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
      0.1.8
    </td>
    
    <td>
      Shared TypeScript contracts, request mappers, and error classes.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        @llama-crab/tauri
      </code>
    </td>
    
    <td>
      0.1.8
    </td>
    
    <td>
      Tauri adapter that uses the plugin commands from frontend code.
    </td>
  </tr>
</tbody>
</table>

Both packages ship `dist/index.cjs` (CJS), `dist/index.js` (ESM), and
`dist/index.d.ts` (types). `sideEffects: false` and `types` are pinned in
the package manifest. The Tauri package depends on `@llama-crab/core` at
the same version and rebuilds it before its own `build`/`typecheck`/
`test` scripts run.

## Generated references

- Rust API reference is published at
[https://docs.rs/llama-crab](https://docs.rs/llama-crab) and [https://docs.rs/llama-crab-sys](https://docs.rs/llama-crab-sys).
- The TypeScript API is documented in the package README and the
generated `dist/index.d.ts` for `@llama-crab/core` and
`@llama-crab/tauri`.

Earlier GitHub Pages URLs under `dominguesm.github.io/llama-crab/api/...`
were retired in release 0.1.5 — the docs/ folder and the
`Publish docs site` workflow have been removed from the source
repository. Use the URLs above for current API documentation.

Repository layout and contributor commands are covered in
[Development](/contributing/development).
