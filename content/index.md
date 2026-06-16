---
seo:
  title: llama-crab - Local GGUF inference for Rust, server, Tauri, and TypeScript
  description: Run local GGUF models from your applications. Rust SDK, OpenAI-compatible HTTP server, Tauri plugin, and TypeScript client contracts.
---

::u-page-hero
#title
<span class="inline-flex flex-col items-center gap-4">
  <img src="/logo.webp" alt="llama-crab logo" class="size-24 rounded-2xl shadow-xl ring-1 ring-default/10" />
  <span class="text-primary">llama-crab</span>
  <span>Run local GGUF models from your applications</span>
</span>

#description
`llama-crab` is a Rust SDK, installable HTTP server, Tauri plugin, and TypeScript client for running local llama.cpp models. Current version: **0.1.8** (Rust crates and TypeScript packages released in lockstep). MSRV: **1.88**.

Start with the surface you plan to use:

#links
  :::u-button
  ---
  color: primary
  size: xl
  to: /getting-started/introduction
  trailing-icon: i-lucide-arrow-right
  ---
  Get started
  :::

  :::u-button
  ---
  color: neutral
  icon: simple-icons-github
  size: xl
  to: https://github.com/DominguesM/llama-crab
  variant: outline
  ---
  GitHub
  :::
::

::u-page-section
#title
Pick the integration that matches your stack

#features
  :::u-page-feature
  ---
  icon: i-lucide-code
  to: /rust/lifecycle
  ---
  #title
  Rust SDK

  #description
  Embed local inference directly in Rust applications. Load GGUF models, run text completion, chat, embeddings, structured output, multimodal vision, and (in 0.1.8) resolve Hugging Face repository IDs through the `hf-hub` feature.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-server
  to: /server/running
  ---
  #title
  HTTP server

  #description
  Run `llama-crab-server` to expose local models behind OpenAI-compatible routes: completions, chat, embeddings, reranking, tokenization, and SSE streaming. The `mtmd` and `hf-hub` features are opt-in.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-app-window
  to: /tauri/plugin
  ---
  #title
  Tauri plugin

  #description
  Ship local inference inside Tauri v2 desktop applications with `tauri-plugin-llama-crab` and the `@llama-crab/tauri` TypeScript client. The plugin enables `hf-hub` by default and exposes multimodal (vision) chat behind the `mtmd` cargo feature.
  :::

  :::u-page-feature
  ---
  icon: i-simple-icons-typescript
  to: /typescript/packages
  ---
  #title
  TypeScript packages

  #description
  Use `@llama-crab/core` for shared OpenAI-like contracts, request mappers, and error classes, and `@llama-crab/tauri` for the Tauri IPC client. Both ship ESM, CJS, and type declarations at version 0.1.8.
  :::
::

::u-page-section
#title
Built for production workloads

#features
  :::u-page-feature
  ---
  icon: i-lucide-layers
  ---
  #title
  Five products, one runtime

  #description
  `llama-crab` (Rust SDK), `llama-crab-server` (HTTP server), `tauri-plugin-llama-crab` (Tauri v2 plugin), `@llama-crab/core` (TS contracts), and `@llama-crab/tauri` (TS client). All are at version 0.1.8.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-cpu
  ---
  #title
  CPU and GPU backends

  #description
  Pick a Cargo feature for your target: `openmp` for CPU, `metal` for Apple Silicon, `cuda` for NVIDIA, `vulkan`, `rocm`, or `opencl` for AMD/cross-vendor, and `kleidiai` for Arm. `mtmd` enables multimodal vision.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-zap
  ---
  #title
  OpenAI-compatible API

  #description
  Local models speak the same shape as OpenAI: 12 routes including `/v1/chat/completions`, `/v1/completions`, `/v1/embeddings`, `/v1/rerank` (with three aliases), and extras for tokenization and model listing. SSE streaming follows the OpenAI event format.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-smartphone
  ---
  #title
  Mobile presets

  #description
  `LowRam`, `Balanced`, and `GpuMax` presets match device class so you can ship the same API across phones, laptops, and workstations. The server mirrors the presets through `--mobile-preset low-ram | balanced | gpu-max`.
  :::
::

::u-page-section
#title
Get started in minutes

#features
  :::u-page-feature
  ---
  icon: i-lucide-download
  to: /getting-started/installation
  ---
  #title
  Install the crate

  #description
  Add `llama-crab` to your Rust manifest, install the C++ toolchain and CMake, then load a GGUF model in a few lines of Rust. MSRV 1.88.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-terminal
  to: /getting-started/first-run
  ---
  #title
  Run your first completion

  #description
  Create a small Rust binary, point it at a quantized GGUF model, and run a `cargo run --release` to see generated text.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-book-open
  to: /guides/performance
  ---
  #title
  Tune for performance

  #description
  Set context size, batch size, GPU offload, and threads. Start with the smallest model that exercises your workload and tune one variable at a time.
  :::

  :::u-page-feature
  ---
  icon: i-lucide-life-buoy
  to: /troubleshooting
  ---
  #title
  Troubleshooting

  #description
  Common failure modes for the server, Tauri plugin, and TypeScript client, with the exact flags and configurations that resolve them.
  :::
::

::u-page-cta
#title
Ready to build with local inference?

#description
The guides explain recommended usage. The generated API references ([docs.rs/llama-crab](https://docs.rs/llama-crab), [docs.rs/llama-crab-sys](https://docs.rs/llama-crab-sys)) are the source of truth for exact signatures.

#links
  :::u-button
  ---
  color: primary
  size: xl
  to: /getting-started/installation
  trailing-icon: i-lucide-arrow-right
  ---
  Install llama-crab
  :::

  :::u-button
  ---
  color: neutral
  icon: simple-icons-github
  size: xl
  to: https://github.com/DominguesM/llama-crab
  variant: outline
  ---
  View on GitHub
  :::
::
