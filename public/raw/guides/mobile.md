# Mobile

> Configure llama-crab for mobile deployments with presets, conservative defaults, and multimodal constraints.

Mobile deployments are constrained by memory, thermals, storage, and
startup time. Prefer small GGUFs, explicit context sizes, and the built-in
mobile presets before hand-tuning every parameter.

## Presets

```rust
use llama_crab::{LlamaParams, MobilePreset};

let params = LlamaParams::new("models/model.gguf")
    .with_mobile_preset(MobilePreset::LowRam);
```

The actual values used by each preset (verified against
`crates/llama-crab/src/high_level/mod.rs`, the `with_mobile_preset`
method at lines 443-472):

<table>
<thead>
  <tr>
    <th>
      Preset
    </th>
    
    <th>
      <code>
        n_ctx
      </code>
    </th>
    
    <th>
      <code>
        n_batch
      </code>
    </th>
    
    <th>
      <code>
        n_ubatch
      </code>
    </th>
    
    <th>
      <code>
        n_threads
      </code>
    </th>
    
    <th>
      <code>
        n_threads_batch
      </code>
    </th>
    
    <th>
      <code>
        n_gpu_layers
      </code>
    </th>
    
    <th>
      <code>
        flash_attn
      </code>
    </th>
    
    <th>
      <code>
        offload_kqv
      </code>
    </th>
    
    <th>
      <code>
        use_mmap
      </code>
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        MobilePreset::LowRam
      </code>
    </td>
    
    <td>
      2048
    </td>
    
    <td>
      128
    </td>
    
    <td>
      128
    </td>
    
    <td>
      4
    </td>
    
    <td>
      4
    </td>
    
    <td>
      0
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      (default)
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        MobilePreset::Balanced
      </code>
    </td>
    
    <td>
      4096
    </td>
    
    <td>
      512
    </td>
    
    <td>
      256
    </td>
    
    <td>
      4
    </td>
    
    <td>
      4
    </td>
    
    <td>
      32
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      (default)
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        MobilePreset::GpuMax
      </code>
    </td>
    
    <td>
      4096
    </td>
    
    <td>
      1024
    </td>
    
    <td>
      512
    </td>
    
    <td>
      (default)
    </td>
    
    <td>
      (default)
    </td>
    
    <td>
      99
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
    
    <td>
      <code>
        true
      </code>
    </td>
  </tr>
</tbody>
</table>

Notes:

- `n_batch` and `n_ubatch` are the **logical** and **physical** batch
sizes — `n_batch >= n_ubatch`. The presets do not set
`offload_kqv` for `LowRam` / `Balanced` (the field is left at its
`LlamaParams` default), and they do not set `n_threads` /
`n_threads_batch` for `GpuMax`.
- All other `LlamaParams` fields (`n_gpu_layers`, `flash_attn`,
`offload_kqv`, `use_mmap`, `n_threads`, `n_threads_batch`, …)
remain at their `LlamaParams` defaults when a preset does not
call the matching `with_*` setter.

Call explicit setters **after** the preset to override individual values:

```rust
let params = LlamaParams::new("models/model.gguf")
    .with_mobile_preset(MobilePreset::Balanced)
    .with_n_ctx(1024); // overrides the preset's n_ctx
```

## Server CLI

The HTTP server accepts equivalent names:

```bash [Terminal]
llama-crab-server \
  --model models/model.gguf \
  --mobile-preset low-ram
```

Accepted values are `low-ram`, `balanced`, and `gpu-max` (the clap
`value_parser` rejects unknown strings at startup).

## Practical defaults

For a first mobile test:

- Start with a small `Q4_K_M` or smaller quantized GGUF.
- Use `n_ctx = 2048` until prompts require more.
- Keep batch sizes conservative.
- Prefer memory mapping when the platform supports it
(`LlamaParams::with_use_mmap(true)` is the default in the presets).
- Add GPU offload only after CPU-only load and generation work.

## Multimodal on mobile

Vision models need both the text GGUF and projector file, and image
tokens add context pressure. Start the server with the matching projector:

```bash [Terminal]
llama-crab-server \
  --model models/LFM2.5-VL-1.6B-Q4_K_M.gguf \
  --mmproj models/mmproj.gguf \
  --mobile-preset low-ram
```

The server's `mtmd` cargo feature must be enabled at build time
(`cargo install llama-crab-server --features mtmd --force`). The
`tauri-plugin-llama-crab` plugin enables its own `mtmd` feature
independently, so mobile/desktop apps can ship multimodal chat without
the HTTP server.

For app integration, validate one image size and one prompt shape first,
then increase context or image complexity only when needed. The
TypeScript client and the Tauri plugin both accept `data:image/...;base64,...`
URLs and local file paths for image content parts.
