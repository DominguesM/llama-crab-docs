# 

> 

<u-page-hero>
<template v-slot:title="">
<span className="inline-flex,flex-col,items-center,gap-4">

![llama-crab logo](/logo.webp)
  <span className="text-primary">

llama-crab

</span>


  <span>

Run local GGUF models from your applications

</span>
</span>
</template>

<template v-slot:description="">

`llama-crab` is a Rust SDK, installable HTTP server, Tauri plugin, and TypeScript client for running local llama.cpp models. Current version: **0.1.8** (Rust crates and TypeScript packages released in lockstep). MSRV: **1.88**.

Start with the surface you plan to use:

</template>

<template v-slot:links="">
<u-button color="primary" size="xl" to="/getting-started/introduction" trailing-icon="i-lucide-arrow-right">

Get started

</u-button>

<u-button color="neutral" size="xl" to="https://github.com/DominguesM/llama-crab" icon="simple-icons-github" variant="outline">

GitHub

</u-button>
</template>
</u-page-hero>

<u-page-section>
<template v-slot:title="">

Pick the integration that matches your stack

</template>

<template v-slot:features="">
<u-page-feature icon="i-lucide-code" to="/rust/lifecycle">
<template v-slot:title="">

Rust SDK

</template>

<template v-slot:description="">

Embed local inference directly in Rust applications. Load GGUF models, run text completion, chat, embeddings, structured output, multimodal vision, and (in 0.1.8) resolve Hugging Face repository IDs through the `hf-hub` feature.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-server" to="/server/running">
<template v-slot:title="">

HTTP server

</template>

<template v-slot:description="">

Run `llama-crab-server` to expose local models behind OpenAI-compatible routes: completions, chat, embeddings, reranking, tokenization, and SSE streaming. The `mtmd` and `hf-hub` features are opt-in.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-app-window" to="/tauri/plugin">
<template v-slot:title="">

Tauri plugin

</template>

<template v-slot:description="">

Ship local inference inside Tauri v2 desktop applications with `tauri-plugin-llama-crab` and the `@llama-crab/tauri` TypeScript client. The plugin enables `hf-hub` by default and exposes multimodal (vision) chat behind the `mtmd` cargo feature.

</template>
</u-page-feature>

<u-page-feature icon="i-simple-icons-typescript" to="/typescript/packages">
<template v-slot:title="">

TypeScript packages

</template>

<template v-slot:description="">

Use `@llama-crab/core` for shared OpenAI-like contracts, request mappers, and error classes, and `@llama-crab/tauri` for the Tauri IPC client. Both ship ESM, CJS, and type declarations at version 0.1.8.

</template>
</u-page-feature>
</template>
</u-page-section>

<u-page-section>
<template v-slot:title="">

Built for production workloads

</template>

<template v-slot:features="">
<u-page-feature icon="i-lucide-layers">
<template v-slot:title="">

Five products, one runtime

</template>

<template v-slot:description="">

`llama-crab` (Rust SDK), `llama-crab-server` (HTTP server), `tauri-plugin-llama-crab` (Tauri v2 plugin), `@llama-crab/core` (TS contracts), and `@llama-crab/tauri` (TS client). All are at version 0.1.8.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-cpu">
<template v-slot:title="">

CPU and GPU backends

</template>

<template v-slot:description="">

Pick a Cargo feature for your target: `openmp` for CPU, `metal` for Apple Silicon, `cuda` for NVIDIA, `vulkan`, `rocm`, or `opencl` for AMD/cross-vendor, and `kleidiai` for Arm. `mtmd` enables multimodal vision.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-zap">
<template v-slot:title="">

OpenAI-compatible API

</template>

<template v-slot:description="">

Local models speak the same shape as OpenAI: 12 routes including `/v1/chat/completions`, `/v1/completions`, `/v1/embeddings`, `/v1/rerank` (with three aliases), and extras for tokenization and model listing. SSE streaming follows the OpenAI event format.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-smartphone">
<template v-slot:title="">

Mobile presets

</template>

<template v-slot:description="">

`LowRam`, `Balanced`, and `GpuMax` presets match device class so you can ship the same API across phones, laptops, and workstations. The server mirrors the presets through `--mobile-preset low-ram | balanced | gpu-max`.

</template>
</u-page-feature>
</template>
</u-page-section>

<u-page-section>
<template v-slot:title="">

Get started in minutes

</template>

<template v-slot:features="">
<u-page-feature icon="i-lucide-download" to="/getting-started/installation">
<template v-slot:title="">

Install the crate

</template>

<template v-slot:description="">

Add `llama-crab` to your Rust manifest, install the C++ toolchain and CMake, then load a GGUF model in a few lines of Rust. MSRV 1.88.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-terminal" to="/getting-started/first-run">
<template v-slot:title="">

Run your first completion

</template>

<template v-slot:description="">

Create a small Rust binary, point it at a quantized GGUF model, and run a `cargo run --release` to see generated text.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-book-open" to="/guides/performance">
<template v-slot:title="">

Tune for performance

</template>

<template v-slot:description="">

Set context size, batch size, GPU offload, and threads. Start with the smallest model that exercises your workload and tune one variable at a time.

</template>
</u-page-feature>

<u-page-feature icon="i-lucide-life-buoy" to="/troubleshooting">
<template v-slot:title="">

Troubleshooting

</template>

<template v-slot:description="">

Common failure modes for the server, Tauri plugin, and TypeScript client, with the exact flags and configurations that resolve them.

</template>
</u-page-feature>
</template>
</u-page-section>

<u-page-cta>
<template v-slot:title="">

Ready to build with local inference?

</template>

<template v-slot:description="">

The guides explain recommended usage. The generated API references ([docs.rs/llama-crab](https://docs.rs/llama-crab), [docs.rs/llama-crab-sys](https://docs.rs/llama-crab-sys)) are the source of truth for exact signatures.

</template>

<template v-slot:links="">
<u-button color="primary" size="xl" to="/getting-started/installation" trailing-icon="i-lucide-arrow-right">

Install llama-crab

</u-button>

<u-button color="neutral" size="xl" to="https://github.com/DominguesM/llama-crab" icon="simple-icons-github" variant="outline">

View on GitHub

</u-button>
</template>
</u-page-cta>
