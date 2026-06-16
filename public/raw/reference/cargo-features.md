# Cargo features

> Feature flags for native backends and optional llama-crab capabilities.

Feature flags let you select native backends and optional capabilities
when adding llama-crab to an application.

The `llama-crab` default feature set is `["openmp", "metal"]`, so macOS
users get CPU + Metal without extra configuration. Override with
`default-features = false` on every other target.

## `llama-crab`

Current feature groups (sourced from
`crates/llama-crab/Cargo.toml`):

### Compute backends

<table>
<thead>
  <tr>
    <th>
      Feature
    </th>
    
    <th>
      Purpose
    </th>
    
    <th>
      Underlying <code>
        llama-crab-sys
      </code>
      
       feature
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        openmp
      </code>
    </td>
    
    <td>
      CPU backend through OpenMP. Default-on.
    </td>
    
    <td>
      <code>
        openmp
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        metal
      </code>
    </td>
    
    <td>
      Apple Metal backend. Default-on.
    </td>
    
    <td>
      <code>
        metal
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        cuda
      </code>
    </td>
    
    <td>
      NVIDIA CUDA backend.
    </td>
    
    <td>
      <code>
        cuda
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        cuda-no-vmm
      </code>
    </td>
    
    <td>
      CUDA without virtual memory management.
    </td>
    
    <td>
      <code>
        cuda-no-vmm
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        vulkan
      </code>
    </td>
    
    <td>
      Vulkan backend.
    </td>
    
    <td>
      <code>
        vulkan
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        rocm
      </code>
    </td>
    
    <td>
      AMD ROCm backend.
    </td>
    
    <td>
      <code>
        rocm
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        opencl
      </code>
    </td>
    
    <td>
      OpenCL backend.
    </td>
    
    <td>
      <code>
        opencl
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        kleidiai
      </code>
    </td>
    
    <td>
      Arm KleidiAI matrix kernels.
    </td>
    
    <td>
      <code>
        kleidiai
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        system-ggml
      </code>
    </td>
    
    <td>
      Link against a system-installed GGML.
    </td>
    
    <td>
      <code>
        system-ggml
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        dynamic-link
      </code>
    </td>
    
    <td>
      Dynamic native linking of the C++ runtime.
    </td>
    
    <td>
      <code>
        dynamic-link
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        dynamic-backends
      </code>
    </td>
    
    <td>
      Dynamic GGML backend loading.
    </td>
    
    <td>
      <code>
        dynamic-backends
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        shared-stdcxx
      </code>
    </td>
    
    <td>
      Statically link libstdc++/libc++ as shared.
    </td>
    
    <td>
      <code>
        shared-stdcxx
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        static-stdcxx
      </code>
    </td>
    
    <td>
      Statically link libstdc++/libc++ as static.
    </td>
    
    <td>
      <code>
        static-stdcxx
      </code>
    </td>
  </tr>
</tbody>
</table>

### Optional capabilities

<table>
<thead>
  <tr>
    <th>
      Feature
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
        common
      </code>
    </td>
    
    <td>
      llama.cpp common utilities used by chat and grammar helpers. Required for <code>
        LlamaSampler::grammar
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        mtmd
      </code>
    </td>
    
    <td>
      Multimodal (vision/audio) support through <code>
        mtmd
      </code>
      
      . Pulls in <code>
        image
      </code>
      
       and <code>
        base64
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        llguidance
      </code>
    </td>
    
    <td>
      Alternative grammar backend. Pulls in <code>
        llguidance
      </code>
      
       and <code>
        toktrie
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        hf-tokenizer
      </code>
    </td>
    
    <td>
      Hugging Face tokenizer integration (uses <code>
        tokenizers
      </code>
      
       with <code>
        onig
      </code>
      
      ).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        hf-hub
      </code>
    </td>
    
    <td>
      Hugging Face Hub model resolution. Lets <code>
        LlamaParams::new
      </code>
      
       accept a HF repo id.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        disk-cache
      </code>
    </td>
    
    <td>
      Persistent prompt cache support (uses <code>
        sled
      </code>
      
      ).
    </td>
  </tr>
</tbody>
</table>

## `llama-crab-server`

The server has no default features. Enable them explicitly:

<table>
<thead>
  <tr>
    <th>
      Feature
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
        mtmd
      </code>
    </td>
    
    <td>
      Multimodal (image) chat support. Pulls in <code>
        llama-crab/mtmd
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        hf-hub
      </code>
    </td>
    
    <td>
      Hugging Face model resolution. Pulls in <code>
        llama-crab/hf-hub
      </code>
      
       and enables <code>
        --hf-filename
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

The server's runtime dependency on `llama-crab` always enables
`features = ["common", "hf-hub"]`, so the JSON-Schema grammar sampler
and HF resolution are available even without an explicit feature flag
in the consumer's manifest.

## `tauri-plugin-llama-crab`

<table>
<thead>
  <tr>
    <th>
      Feature
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
        mtmd
      </code>
    </td>
    
    <td>
      Multimodal (image) chat support. Pulls in <code>
        llama-crab/mtmd
      </code>
      
      , <code>
        base64
      </code>
      
      , and <code>
        image
      </code>
      
      .
    </td>
  </tr>
  
  <tr>
    <td>
      (default)
    </td>
    
    <td>
      <code>
        tauri-plugin-llama-crab
      </code>
      
       enables <code>
        llama-crab
      </code>
      
      's <code>
        hf-hub
      </code>
      
       feature by default in 0.1.8, so Tauri apps can load HF repo IDs through <code>
        load_model
      </code>
      
       without extra plugin-side feature wiring.
    </td>
  </tr>
</tbody>
</table>

## Picking the right set

Do not assume platform-specific defaults. Pin the features you need in
your application manifest and confirm them against the generated Rust
API reference or the crate metadata for the release you consume.

A common pattern for cross-platform apps is to expose backend
selection through Cargo `[features]` so the same source tree can build
for Metal, CUDA, Vulkan, or CPU-only targets:

```toml
[features]
default = []
metal = ["llama-crab/metal", "llama-crab/openmp"]
cuda = ["llama-crab/cuda", "llama-crab/openmp"]
vulkan = ["llama-crab/vulkan", "llama-crab/openmp"]
cpu = ["llama-crab/openmp"]
```
