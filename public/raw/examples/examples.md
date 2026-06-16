# Examples

> Runnable Rust and Tauri examples that cover every public feature of llama-crab 0.1.8.

Runnable programs live in the separate
[`llama-crab-examples`](https://github.com/DominguesM/llama-crab-examples)
repository. Each example is a self-contained Cargo crate (one `[[bin]]`
per crate) so you can copy-paste the parts you need into your own
project without dragging in the rest.

The workspace pins **llama-crab 0.1.8** and enables the `hf-hub` and
`common` cargo features by default. Most examples point at a Hugging
Face repo id and `Llama::load` resolves it on first run, downloads
the GGUF, and caches it under `~/.cache/huggingface/hub` (or
`$HF_HOME/hub`).

## TL;DR — run an example

```bash [Terminal]
git clone https://github.com/DominguesM/llama-crab-examples
cd llama-crab-examples
cargo run --release --bin quickstart
```

The first run downloads `qwen2.5-0.5b-instruct-q4_k_m.gguf` (~400 MB)
and compiles `llama-crab-sys` (~3 min on a 16-core machine).
Subsequent runs reuse the cached GGUF and only rebuild the example
crate.

## All examples

<table>
<thead>
  <tr>
    <th>
      Example
    </th>
    
    <th>
      Default model (HF repo / file)
    </th>
    
    <th>
      Size
    </th>
    
    <th>
      What it shows
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        quickstart
      </code>
    </td>
    
    <td>
      <code>
        Qwen/Qwen2.5-0.5B-Instruct-GGUF
      </code>
      
       / <code>
        qwen2.5-0.5b-instruct-q4_k_m.gguf
      </code>
    </td>
    
    <td>
      ~400 MB
    </td>
    
    <td>
      Load → tokenize → complete → chat → FIM
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        simple
      </code>
    </td>
    
    <td>
      same as <code>
        quickstart
      </code>
    </td>
    
    <td>
      ~400 MB
    </td>
    
    <td>
      One-shot <code>
        create_completion
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        streaming
      </code>
    </td>
    
    <td>
      same as <code>
        quickstart
      </code>
    </td>
    
    <td>
      ~400 MB
    </td>
    
    <td>
      High-level <code>
        create_completion_stream
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        stateful_chat
      </code>
    </td>
    
    <td>
      same as <code>
        quickstart
      </code>
    </td>
    
    <td>
      ~400 MB
    </td>
    
    <td>
      REPL with growing history, <code>
        /clear
      </code>
      
      , <code>
        /save
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        chat
      </code>
    </td>
    
    <td>
      same as <code>
        quickstart
      </code>
    </td>
    
    <td>
      ~400 MB
    </td>
    
    <td>
      One-shot chat + <code>
        BuiltinTemplate::ChatMl
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        structured
      </code>
    </td>
    
    <td>
      same as <code>
        quickstart
      </code>
    </td>
    
    <td>
      ~400 MB
    </td>
    
    <td>
      <code>
        json_schema_grammar()
      </code>
      
       + grammar sampler
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        speculative
      </code>
    </td>
    
    <td>
      same as <code>
        quickstart
      </code>
    </td>
    
    <td>
      ~400 MB
    </td>
    
    <td>
      <code>
        PromptLookupDecoding
      </code>
      
       drafting
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tools
      </code>
    </td>
    
    <td>
      same as <code>
        quickstart
      </code>
    </td>
    
    <td>
      ~400 MB
    </td>
    
    <td>
      Function-calling + JSON extraction
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        embeddings
      </code>
    </td>
    
    <td>
      <code>
        CompendiumLabs/bge-small-en-v1.5-gguf
      </code>
      
       / <code>
        bge-small-en-v1.5-q4_k_m.gguf
      </code>
    </td>
    
    <td>
      ~30 MB
    </td>
    
    <td>
      L2-normalized embedding + raw vector preview
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        embedding_search
      </code>
    </td>
    
    <td>
      same as <code>
        embeddings
      </code>
    </td>
    
    <td>
      ~30 MB
    </td>
    
    <td>
      Embed + cosine ranking over a fixed corpus
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        reranker
      </code>
    </td>
    
    <td>
      <code>
        turingevo/bge-reranker-base-Q4_K_M-GGUF
      </code>
      
       / <code>
        bge-reranker-base-q4_k_m.gguf
      </code>
    </td>
    
    <td>
      ~220 MB
    </td>
    
    <td>
      <code>
        Llama::rerank
      </code>
      
       over a short list
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mtmd
      </code>
    </td>
    
    <td>
      <code>
        unsloth/LFM2.5-VL-1.6B-GGUF
      </code>
      
       / <code>
        LFM2.5-VL-1.6B-Q4_K_M.gguf
      </code>
      
       + <code>
        mmproj-BF16.gguf
      </code>
    </td>
    
    <td>
      ~1.4 GB
    </td>
    
    <td>
      Raw <code>
        mtmd.h
      </code>
      
       API: bitmap → chunks → eval
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        vision
      </code>
    </td>
    
    <td>
      same as <code>
        mtmd
      </code>
    </td>
    
    <td>
      ~1.4 GB
    </td>
    
    <td>
      High-level <code>
        MtmdContext
      </code>
      
       API
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        lfm_vl_vision
      </code>
    </td>
    
    <td>
      same as <code>
        mtmd
      </code>
    </td>
    
    <td>
      ~1.4 GB
    </td>
    
    <td>
      LFM2.5-VL multimodal REPL
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        server_lfm
      </code>
    </td>
    
    <td>
      same as <code>
        mtmd
      </code>
    </td>
    
    <td>
      ~1.4 GB
    </td>
    
    <td>
      Spawns <code>
        llama-crab-server
      </code>
      
       with the resolved model
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        tauri-chat-lfm
      </code>
    </td>
    
    <td>
      <code>
        LiquidAI/LFM2.5-350M-GGUF
      </code>
      
       / <code>
        LFM2.5-350M-Q4_K_M.gguf
      </code>
    </td>
    
    <td>
      ~229 MB
    </td>
    
    <td>
      Tauri 2 chat app with download progress
    </td>
  </tr>
</tbody>
</table>

The two vision example families both need a vision-language GGUF **and**
its `mmproj` projector. The text side is downloaded through
`llama-crab`'s `hf-hub` integration; the `mmproj` side is fetched
through a small `hf-hub` helper in each example.

## Running by hand

Every example exposes a `[[bin]]` named after the example folder. The
default arguments are baked into the source — running
`cargo run --release --bin <name>` works out of the box. CLI
arguments, when present, follow this convention:

```bash [Terminal]
cargo run --release --bin <name> -- \
    <hf_repo> <hf_filename> [extra args...]
```

For vision examples, the second positional argument is the text
filename and the third is the `mmproj` filename:

```bash [Terminal]
cargo run --release --bin vision -- \
    unsloth/LFM2.5-VL-1.6B-GGUF \
    LFM2.5-VL-1.6B-Q4_K_M.gguf \
    mmproj-BF16.gguf
```

## Using a different model

Any HF repo id that contains a `.gguf` can be used. If the repo
contains multiple `.gguf` files you must pass the filename as the
second positional argument; the auto-pick path refuses to guess
(there is a clear error in that case).

For local files, pass the path instead of the repo id — `Llama::load`
auto-detects that the path exists on disk and skips the HF download.

## Server example

`server_lfm` is the only example that does not compile a self-contained
Rust binary. It resolves the text and `mmproj` GGUFs through HF Hub
and then spawns the published `llama-crab-server` HTTP binary. Install
the server once with:

```bash [Terminal]
cargo install llama-crab-server --version 0.1.8 --features mtmd --force
```

Then `cargo run --release --bin server_lfm` brings it up against
LFM2.5-VL 1.6B with the resolved paths.

## Tauri example

`tauri-chat-lfm` is a Tauri 2 desktop chat app. It uses `pnpm` and
the `tauri` CLI:

```bash [Terminal]
cd tauri-chat-lfm
pnpm install
pnpm tauri dev
```

The Rust side resolves the LFM 350M GGUF on first launch and streams
download progress to the renderer through an IPC channel. The
`@llama-crab/tauri` client then loads the resolved model into the
plugin and streams chat completions.

## Hugging Face authentication

Set `HF_TOKEN` (or use `hf auth login` before running the example)
to access private or gated repos. The `hf-hub` feature of `llama-crab`
and the `hf-hub` crate used directly in the vision examples both
read `HF_TOKEN` from the environment via `ApiBuilder::from_env()`.

To point at an HF mirror, set `HF_ENDPOINT=https://hf-mirror.com`
(or use the `--hf-endpoint` builder on `RealHfDownloader` when
embedding the loader into your own code).

## Troubleshooting

- **hf-hub feature is disabled** — you are building with
`--no-default-features` or a custom feature set that drops
`hf-hub`. The workspace's `Cargo.toml` enables it by default;
use `cargo build` without feature overrides.
- **ambiguous: N gguf files in repo ...** — the HF repo has more
than one `.gguf` and the example was started without
`with_hf_filename`. Pass the filename as the second positional
argument.
- **failed to allocate context** — the model needs more memory than
is available. Try a smaller quant (`Q4_K_M` → `Q3_K_M` → `Q2_K`)
or reduce `n_ctx` / `n_gpu_layers`.
- **First build is slow** — `llama-crab-sys` compiles all 17
llama.cpp backends (~3 min on a 16-core machine). Subsequent
builds are cached.
- **First vision run is slow** — `mmproj` for LFM2.5-VL is ~340 MB.
Subsequent runs reuse the HF cache.

## Adding a new example

The boilerplate for a new example crate is ~15 lines:

```toml [Cargo.toml]
# my_example/Cargo.toml
[package]
name = "my_example"
version.workspace = true
edition.workspace = true
rust-version.workspace = true
publish = false

[[bin]]
name = "my_example"
path = "src/main.rs"

[dependencies]
llama-crab.workspace = true
anyhow = "1"
```

```rust [my_example/src/main.rs]
use anyhow::Result;
use llama_crab::{Llama, LlamaParams};

const HF_REPO: &str = "Qwen/Qwen2.5-0.5B-Instruct-GGUF";
const HF_FILE: &str = "qwen2.5-0.5b-instruct-q4_k_m.gguf";

fn main() -> Result<()> {
    let mut llama = Llama::load(
        LlamaParams::new(HF_REPO)
            .with_hf_filename(HF_FILE)
            .with_n_ctx(2048),
    )?;
    let resp = llama.create_completion("Hello!", 32)?;
    print!("{}", resp.text);
    Ok(())
}
```

Add `my_example` to the `members = [...]` list in the root
`Cargo.toml` and a row to the table above.
