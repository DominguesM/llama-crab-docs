# llama-crab documentation

> Run local GGUF models from Rust, HTTP, Tauri, and TypeScript applications.

`llama-crab` helps you run local GGUF models from applications. It provides a
Rust SDK, an installable HTTP server with OpenAI-compatible routes, a Tauri
integration, and TypeScript client contracts.

The current workspace version is **0.1.8** (Rust crates and TypeScript
packages are released in lockstep). The Minimum Supported Rust Version is
**1.88** and is pinned in `rust-toolchain.toml`.

Start with the surface you plan to use:

<table>
<thead>
  <tr>
    <th>
      Audience
    </th>
    
    <th>
      Start here
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      You want to run a model quickly
    </td>
    
    <td>
      <a href="/getting-started/installation">
        Getting started
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      You are writing a Rust application
    </td>
    
    <td>
      <a href="/rust/lifecycle">
        Rust SDK
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      You need an HTTP API
    </td>
    
    <td>
      <a href="/server/running">
        Server
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      You are building a Tauri app
    </td>
    
    <td>
      <a href="/tauri/plugin">
        Tauri
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      You consume the TypeScript packages
    </td>
    
    <td>
      <a href="/typescript/packages">
        TypeScript
      </a>
    </td>
  </tr>
  
  <tr>
    <td>
      You are contributing to llama-crab itself
    </td>
    
    <td>
      <a href="/contributing/development">
        Contributing
      </a>
    </td>
  </tr>
</tbody>
</table>

## Product surfaces

- `llama-crab` (v0.1.8): Rust SDK for loading models and running inference in-process.
- `llama-crab-server` (v0.1.8): command-line HTTP server for local model serving with OpenAI-compatible routes.
- `tauri-plugin-llama-crab` (v0.1.8): local inference inside a Tauri v2 desktop app.
- `@llama-crab/core` (v0.1.8): shared TypeScript request and response contracts.
- `@llama-crab/tauri` (v0.1.8): TypeScript client for the Tauri plugin.

## API reference

- [Rust API](https://docs.rs/llama-crab) — published `rustdoc` for the safe crate.
- [Rust API (FFI)](https://docs.rs/llama-crab-sys) — low-level bindings to llama.cpp, ggml, gguf, and mtmd.
- [TypeScript API](https://www.npmjs.com/package/@llama-crab/core) — see the package README and the generated `dist/index.d.ts`.

The project guide (this site) is published at
[https://llama-crab.nlp.rocks/](https://llama-crab.nlp.rocks/). Earlier GitHub Pages URLs under
`dominguesm.github.io/llama-crab/...` were retired in release 0.1.5 — the
docs/ folder and the `Publish docs site` workflow have been removed from
the source repository.

The guides explain recommended usage. The generated API references are the
source of truth for exact signatures.
