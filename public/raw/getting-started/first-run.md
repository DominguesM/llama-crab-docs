# First run

> Create a small Rust application and run llama-crab against a GGUF model.

Create a small application and point it at a GGUF model:

```bash
cargo new hello-crab
cd hello-crab
cargo add llama-crab
```

Replace `src/main.rs`:

```rust
use llama_crab::{Llama, LlamaParams};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut llama = Llama::load(
        LlamaParams::new("models/qwen2.5-0.5b-instruct-q4_k_m.gguf")
            .with_n_ctx(2048)
            .with_n_threads(4),
    )?;

    let completion = llama.create_completion("The capital of France is", 16)?;
    println!("{}", completion.text);
    Ok(())
}
```

Run in release mode (debug builds are much slower for inference):

```bash
cargo run --release
```

If you are working from a source checkout, use the repository example
wrappers documented in [Development](/contributing/development).

## Loading from Hugging Face

The `hf-hub` feature (enabled by default in `tauri-plugin-llama-crab` and
available in the standalone `llama-crab` and `llama-crab-server` crates)
lets `LlamaParams::new` accept a Hugging Face repository id instead of a
local path:

```rust,no_run
use llama_crab::{Llama, LlamaParams};

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let mut llama = Llama::load(
        LlamaParams::new("Qwen/Qwen2.5-0.5B-Instruct-GGUF")
            .with_hf_filename("qwen2.5-0.5b-instruct-q4_k_m.gguf")
            .with_n_ctx(2048),
    )?;
    println!("{}", llama.create_completion("Hello,", 8)?.text);
    Ok(())
}
```

Resolution order is `with_hf_filename` override → file in the cached repo →
`auto-detect` from the repo file list → local file path. The cache lives in
the standard `hf-hub` location and is reusable across runs.

## What success looks like

A healthy run loads the model and emits generated text. The exact text
depends on the model and sampling defaults. Failures usually surface as
`LlamaError::ModelLoad` (bad path or quantization mismatch) or
`LlamaError::ModelDownload` (HF resolver failure) — see
[Troubleshooting](/troubleshooting) for the common patterns.
