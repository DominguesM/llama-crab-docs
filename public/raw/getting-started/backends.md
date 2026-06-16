# Backends

> Select llama-crab compute backends with Cargo features.

Backends are selected at compile time with Cargo features. The safe Rust API
then exposes runtime parameters such as context size, thread count, and GPU
offload layers.

The crate's default feature set is `["openmp", "metal"]` so macOS users get
CPU + Metal without extra configuration. Override with
`default-features = false` when you target a different accelerator (or
build for CI/Linux without Metal).

Common combinations:

<table>
<thead>
  <tr>
    <th>
      Target
    </th>
    
    <th>
      Features
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      CPU-only
    </td>
    
    <td>
      <code>
        openmp
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Apple Silicon
    </td>
    
    <td>
      <code>
        metal
      </code>
      
      , <code>
        openmp
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      NVIDIA Linux
    </td>
    
    <td>
      <code>
        cuda
      </code>
      
      , <code>
        openmp
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      AMD Linux
    </td>
    
    <td>
      <code>
        rocm
      </code>
      
      , <code>
        openmp
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Cross-vendor GPU
    </td>
    
    <td>
      <code>
        vulkan
      </code>
      
      , <code>
        openmp
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      OpenCL accelerator
    </td>
    
    <td>
      <code>
        opencl
      </code>
      
      , <code>
        openmp
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Arm KleidiAI matrix kernels
    </td>
    
    <td>
      <code>
        kleidiai
      </code>
    </td>
  </tr>
  
  <tr>
    <td>
      Vision workloads
    </td>
    
    <td>
      backend features plus <code>
        mtmd
      </code>
    </td>
  </tr>
</tbody>
</table>

Example:

```toml
[dependencies]
llama-crab = { version = "0.1.8", default-features = false, features = ["metal", "openmp"] }
```

When debugging docs.rs or Linux CI builds, verify transitive default
features on `llama-crab-sys`. A local manifest fix is not proof that a
published crate tarball has the same dependency shape. The
[Cargo features](/reference/cargo-features) page lists every public feature
on `llama-crab` and the underlying `llama-crab-sys` feature for each
backend.
