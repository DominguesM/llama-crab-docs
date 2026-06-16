# Model Lifecycle

> Load, inspect, and reuse llama-crab models safely in Rust applications.

The high-level `Llama` type owns the llama.cpp backend, loaded model, and active
context. In most applications you load one `Llama` per model and keep it alive
for the lifetime of the worker that serves requests.

## Load

```rust
use llama_crab::{Llama, LlamaParams};

let mut llama = Llama::load(
    LlamaParams::new("models/qwen2.5-0.5b-instruct-q4_k_m.gguf")
        .with_n_ctx(2048)
        .with_n_batch(512)
        .with_n_threads(4)
        .with_n_gpu_layers(0),
)?;
```

`Llama::load` also accepts a Hugging Face repo id. When the path looks like
`org/repo` and the local file does not exist, the resolver (gated on the
`hf-hub` cargo feature) downloads the GGUF to the HF cache and then loads it:

```rust
use llama_crab::{Llama, LlamaParams};

let mut llama = Llama::load(
    LlamaParams::new("TheBloke/Llama-2-7B-Chat-GGUF")
        .with_hf_filename("llama-2-7b-chat.Q4_K_M.gguf")
        .with_n_ctx(2048),
)?;
```

The cache lives at `~/.cache/huggingface/hub` (or `$HF_HOME/hub` if set), and
`HF_TOKEN` works for gated repos. The resolver precedence is documented in
the crate-level rustdoc of `llama-crab`.

## `LlamaParams` setters

Useful parameters (each is a chainable `with_*` method on `LlamaParams`):

<table>
<thead>
  <tr>
    <th>
      Setter
    </th>
    
    <th>
      Effect
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        with_model_path(path)
      </code>
    </td>
    
    <td>
      Replace the GGUF path.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_n_ctx(n)
      </code>
    </td>
    
    <td>
      Maximum context window for prompt plus generated tokens.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_n_batch(n)
      </code>
    </td>
    
    <td>
      Logical maximum batch size.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_n_ubatch(n)
      </code>
    </td>
    
    <td>
      Physical batch size used by forward passes.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_n_threads(n)
      </code>
    </td>
    
    <td>
      CPU threads for generation.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_n_threads_batch(n)
      </code>
    </td>
    
    <td>
      CPU threads for batch work.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_n_gpu_layers(n)
      </code>
    </td>
    
    <td>
      Number of model layers to offload to the active GPU backend. <code>
        -1
      </code>
      
       offloads every layer.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_use_mmap(yes)
      </code>
    </td>
    
    <td>
      Memory-map the GGUF file.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_offload_kqv(yes)
      </code>
    </td>
    
    <td>
      Offload the KQV cache to the active GPU backend.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_flash_attn(yes)
      </code>
    </td>
    
    <td>
      Enable flash attention when supported.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_embeddings(yes)
      </code>
    </td>
    
    <td>
      Enable embedding extraction on the context.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_pooling_type(t)
      </code>
    </td>
    
    <td>
      Select embedding pooling (<code>
        PoolingType::Cls
      </code>
      
      , <code>
        Mean
      </code>
      
      , <code>
        Last
      </code>
      
      , <code>
        Rank
      </code>
      
      , <code>
        None
      </code>
      
      , or <code>
        Unspecified
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_hf_filename(name)
      </code>
    </td>
    
    <td>
      Set the filename within a Hugging Face repo.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_hf_revision(rev)
      </code>
    </td>
    
    <td>
      Pin the HF revision (branch/tag/commit).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_hf_token(token)
      </code>
    </td>
    
    <td>
      Hugging Face access token.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_hf_cache_dir(dir)
      </code>
    </td>
    
    <td>
      Override the HF cache directory.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_hf_endpoint(url)
      </code>
    </td>
    
    <td>
      Point at an HF mirror.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        with_mobile_preset(preset)
      </code>
    </td>
    
    <td>
      Apply a <code>
        MobilePreset
      </code>
      
       (see below).
    </td>
  </tr>
</tbody>
</table>

The model-side and context-side parameters that `LlamaParams` wraps
(`LlamaModelParams` and `LlamaContextParams`) are also exposed via
`llama.model()` and `llama.context()`, so lower-level modules can be used
without going through `LlamaParams`.

## Mobile presets

`MobilePreset` provides coarse defaults for device classes. The preset is
applied first, then any explicit setter you call after overrides individual
fields:

```rust
use llama_crab::{LlamaParams, MobilePreset};

let params = LlamaParams::new("models/model.gguf")
    .with_mobile_preset(MobilePreset::Balanced)
    .with_n_ctx(1024); // overrides the preset's n_ctx
```

Available presets are `LowRam`, `Balanced`, and `GpuMax`. The same names are
accepted by the server CLI as `--mobile-preset low-ram`, `balanced`, or
`gpu-max` (parsing is case-insensitive and hyphen/underscore tolerant).

## Inspect the model

After loading, `llama.model()` exposes metadata and tokenization helpers:

```rust
let tokens = llama.model().tokenize("Hello from Rust", true, true)?;
println!("layers:   {}", llama.model().n_layer());
println!("vocab:    {}", llama.model().n_vocab());
println!("embd:     {}", llama.model().n_embd());
println!("params:   {}", llama.model().n_params());
println!("size:     {}", llama.model().size());
println!("tokens:   {tokens:?}");
```

`LlamaModel` also exposes `token_bos` / `token_eos` / `token_eot` and a
FIM token accessor through `LlamaModel::fim_tokens()`. `detokenize` uses
**lossy** UTF-8 conversion: bytes that do not form a valid UTF-8 sequence
on their own (common for BPE tokens) are replaced with `U+FFFD`.

## Hugging Face paths

`Llama::load` distinguishes the four cases by inspecting the path string and
the file system:

1. `with_hf_filename` on a path that already parses as a repo id — the
resolver forces the HF branch (override wins).
2. `model_path` looks like `org/repo` and the file does not exist on disk —
auto-dispatch to the HF downloader.
3. The path exists on disk — load it directly with no network access.
4. The path does not exist and is not a repo id — `Llama::load` returns an
IO error from llama.cpp.

Under `--no-default-features` (or without the `hf-hub` feature) the HF
dispatcher returns a runtime error pointing at the `--features hf-hub` build
flag instead of attempting a download.

## Reuse, swap, and concurrency

Generation updates the context KV cache. The high-level helpers
(`create_completion`, `embed`, `rerank`, `complete_infill`) clear
sequence 0 before each call so each invocation is independent.

If you want a long-running multi-turn state, hold a `Vec<ChatMessage>` in
your own state and rebuild the prompt for every call — see
[Chat](/rust/chat) for the pattern. For long-lived single-shot services
with multiple concurrent requests, use a worker model: Axum (or any runtime)
serializes requests per loaded `Llama`, or you load multiple `Llama`
instances.

`Llama` is `!Send` / `!Sync` (it carries a `PhantomData<*mut ()>` marker
to mirror llama.cpp's thread model — see `src/high_level/mod.rs`). The
inner `LlamaContext` and `LlamaModel` types are explicitly `Send + Sync`,
so they can be moved across threads if you drive them by hand.

## Closing the model

There is no explicit `unload` — `Llama`'s `Drop` impl frees the
`llama_context` and then the `llama_model`, and `LlamaBackend`'s `Drop`
calls `llama_backend_free`. Drop the `Llama` value (or its containing
worker) and the resources are released. To swap models, drop the current
`Llama` and create a new one with `Llama::load(...)`.
