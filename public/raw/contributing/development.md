# Development

> Contributor setup, local checkout workflows, and validation commands for llama-crab development.

Contributors should validate the layer they touch and keep examples
aligned with the public documentation.

This page is for contributors and for applications that intentionally
consume a local source checkout. User-facing install and runtime guides
avoid repository paths and wrapper scripts.

The workspace is at version `0.1.8` and **MSRV is 1.88** (pinned in
`rust-toolchain.toml`).

## Local Rust dependency

Use a path dependency only while developing against this repository:

```toml
[dependencies]
llama-crab = { path = "../llama-crab/crates/llama-crab" }
```

For normal applications, prefer the published crate:

```toml
[dependencies]
llama-crab = "0.1.8"
```

## Repository package map

<table>
<thead>
  <tr>
    <th>
      Path
    </th>
    
    <th>
      Package
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        crates/llama-crab
      </code>
    </td>
    
    <td>
      High-level Rust API.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        crates/llama-crab-sys
      </code>
    </td>
    
    <td>
      Low-level llama.cpp, GGML, GGUF, and mtmd bindings.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        crates/llama-crab-server
      </code>
    </td>
    
    <td>
      HTTP server binary and OpenAI-compatible routes.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        crates/tauri-plugin-llama-crab
      </code>
    </td>
    
    <td>
      Tauri v2 plugin.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        packages/core
      </code>
    </td>
    
    <td>
      Shared TypeScript contracts and helpers (<code>
        @llama-crab/core
      </code>
      
       v0.1.8).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        packages/tauri
      </code>
    </td>
    
    <td>
      TypeScript Tauri client (<code>
        @llama-crab/tauri
      </code>
      
       v0.1.8).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        examples/
      </code>
      
       (in the examples repo)
    </td>
    
    <td>
      Runnable example crates — see <a href="/contributing/examples">
        Examples
      </a>
      
      .
    </td>
  </tr>
</tbody>
</table>

The previous `docs/` folder and `Publish docs site` GitHub Actions
workflow have been removed from the source repository as of release
0.1.5. The user guide now lives at
[https://llama-crab.nlp.rocks/](https://llama-crab.nlp.rocks/); this Docusaurus site is the source
for that published guide.

## Server from checkout

The user documentation starts from the installed binary:

```bash [Terminal]
cargo install llama-crab-server --features mtmd --force
llama-crab-server --model /path/to/model.gguf
```

From a repository checkout, run the same server through Cargo:

```bash [Terminal]
cargo run -p llama-crab-server -- --model /path/to/model.gguf
```

For multimodal server work, enable the feature explicitly:

```bash [Terminal]
cargo run -p llama-crab-server --features mtmd -- \
  --model /models/vision.gguf \
  --mmproj /models/mmproj.gguf
```

For HF model resolution in 0.1.8, enable `hf-hub` as well:

```bash [Terminal]
cargo run -p llama-crab-server --features hf-hub -- \
  --model Qwen/Qwen2.5-0.5B-Instruct-GGUF \
  --hf-filename qwen2.5-0.5b-instruct-q4_k_m.gguf
```

## Example repository

Runnable examples live in
[`llama-crab-examples`](https://github.com/DominguesM/llama-crab-examples),
not in this source repository. Use that repository when validating
example workflows locally:

```bash [Terminal]
git clone https://github.com/DominguesM/llama-crab-examples
cd llama-crab-examples
./run.sh quickstart
```

The wrapper resolves the model target, calls
`./scripts/download_models.sh`, then runs the right binary in release
mode. The wrapper is wired to the `llama-crab = "0.1.8"` published
crate; bump that pin when the workspace version moves.

Useful targets include:

<table>
<thead>
  <tr>
    <th>
      Area
    </th>
    
    <th>
      Targets
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Text and chat
    </td>
    
    <td>
      <code>
        quickstart
      </code>
      
      , <code>
        simple
      </code>
      
      , <code>
        streaming
      </code>
      
      , <code>
        chat
      </code>
      
      , <code>
        stateful_chat
      </code>
      
      , <code>
        speculative
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Embeddings and ranking
    </td>
    
    <td>
      <code>
        embeddings
      </code>
      
      , <code>
        embedding_search
      </code>
      
      , <code>
        reranker
      </code>
      
      , <code>
        rerank
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Multimodal
    </td>
    
    <td>
      <code>
        vision
      </code>
      
      , <code>
        mtmd
      </code>
      
      , <code>
        lfm_vl
      </code>
      
      , <code>
        multimodal_http
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Server
    </td>
    
    <td>
      <code>
        server_lfm
      </code>
      
      , <code>
        multimodal_http
      </code>
      
      , <code>
        rerank
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Structured output and tools
    </td>
    
    <td>
      <code>
        structured
      </code>
      
      , <code>
        tools
      </code>
      
      , <code>
        tool_calls_qwen
      </code>
    </td>
  </tr>
</tbody>
</table>

Without arguments, the wrapper prints the available example names:

```bash [Terminal]
./run.sh
```

Downloaded model files are stored in `./models/`. If the file is
already present, download is skipped. To skip download checks entirely:

```bash [Terminal]
LLAMA_CRAB_SKIP_DOWNLOAD=1 ./run.sh quickstart
```

You can run example binaries directly once model files exist:

```bash [Terminal]
cargo run --release --bin run_quickstart -- models/qwen2.5-0.5b-instruct-q4_k_m.gguf
cargo run --release --bin run_streaming -- models/qwen2.5-0.5b-instruct-q4_k_m.gguf
```

Vision examples take the text model, projector, image path, and
optional prompt. See [Text and chat examples](/examples/text-and-chat)
for the detailed example pages.

## Model download helper

Use the example repository helper when you need the same model names
as the examples:

```bash [Terminal]
./scripts/download_models.sh smol
./scripts/download_models.sh bge
./scripts/download_models.sh lfm-vl
```

The download helper prefers the Hugging Face CLI (`hf download`) and
falls back to a Python module when the `hf` executable is broken (this
fallback was added in 0.1.2).

## TypeScript package work

From the repository root:

```bash [Terminal]
pnpm --filter @llama-crab/core typecheck
pnpm --filter @llama-crab/core test
pnpm --filter @llama-crab/tauri typecheck
pnpm --filter @llama-crab/tauri test
```

The Tauri package builds `@llama-crab/core` first in its `build`,
`typecheck`, and `test` scripts, so the workspace order is automatic.

## Validation

Common validation commands:

```bash [Terminal]
cargo fmt --all -- --check
cargo check --workspace --all-targets
cargo clippy --workspace --all-targets -- -D warnings
cargo test --workspace --all-features
cargo doc --workspace --all-features --no-deps
pnpm typecheck
pnpm test
```

The `CONTRIBUTING.md` checklist asks for all of these to be green
before opening a pull request. Use narrower package or crate commands
while iterating, then run the broader checks before publishing or
opening a PR.
