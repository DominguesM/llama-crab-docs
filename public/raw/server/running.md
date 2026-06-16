# Running the Server

> Install, configure and start the llama-crab-server HTTP process.

`llama-crab-server` is the OpenAI-compatible HTTP entry point for running one local GGUF model. The binary loads the model at startup, runs all inference on a dedicated synchronous worker thread, and exposes routes for text completion, chat completion, embeddings, reranking, tokenization, detokenization, model listing and health checks.

The server was introduced in `llama-crab` **0.1.4** ([CHANGELOG](https://github.com/DominguesM/llama-crab/blob/main/CHANGELOG.md)) and lives in the [`llama-crab-server`](https://github.com/DominguesM/llama-crab/tree/main/crates/llama-crab-server) crate. Its entire surface area is a single `main.rs` (≈ 3.8 K lines) built on `axum 0.7`, `tokio`, `clap 4` and `tower-http`.

## Installation

The binary is published to crates.io:

```bash [Install the server (text only)]
cargo install llama-crab-server --force
```

Add the `mtmd` Cargo feature if you intend to serve multimodal (vision) chat:

```bash [Install with multimodal support]
cargo install llama-crab-server --features mtmd --force
```

The `mtmd` feature is gated by `llama-crab/mtmd` and pulls in the vision projector backend. If you only serve text, embedding or reranking models, omit it.

To load GGUF files directly from a Hugging Face repository, install with the `hf-hub` feature:

```bash [Install with HF Hub support]
cargo install llama-crab-server --features hf-hub --force
```

The two features compose; `--features mtmd,hf-hub` works.

For development against a workspace checkout:

```bash [Run from a workspace checkout]
cargo run -p llama-crab-server -- \
  --model models/qwen2.5-0.5b-instruct-q4_k_m.gguf \
  --host 127.0.0.1 \
  --port 8080
```

## First start

```bash [Run the server]
llama-crab-server --model /path/to/model.gguf
```

By default the server binds `127.0.0.1:8080` and advertises the model as `llama-crab`. Once the model has finished loading the binary prints a banner to stderr and `info`-level structured log lines to stdout (when `RUST_LOG` is set):

```text
llama-crab-server listening on http://127.0.0.1:8080
  model : llama-crab
  routes: /health, /v1/models, /v1/completions, /v1/chat/completions, /v1/embeddings, /v1/rerank, /extras/tokenize, /extras/tokenize/count, /extras/detokenize
  ctrl+c to stop
```

Smoke-test the deployment:

```bash [Health and model discovery]
curl http://127.0.0.1:8080/health
# {"status":"ok"}

curl http://127.0.0.1:8080/v1/models
# {"object":"list","data":[{"id":"llama-crab","object":"model","created":...,"owned_by":"me","permissions":[]}]}
```

## CLI flags

Every flag has a matching `LLAMA_CRAB_*` environment variable, so the server can be fully configured without command-line arguments. The parser is `clap` with the `env` and `derive` features (`crates/llama-crab-server/src/main.rs:49`).

<table>
<thead>
  <tr>
    <th>
      CLI flag
    </th>
    
    <th>
      Env var
    </th>
    
    <th>
      Type
    </th>
    
    <th>
      Default
    </th>
    
    <th>
      Required
    </th>
    
    <th>
      Notes
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        --model
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_MODEL
      </code>
    </td>
    
    <td>
      path or HF repo id
    </td>
    
    <td>
      —
    </td>
    
    <td>
      <strong>
        Yes
      </strong>
    </td>
    
    <td>
      Local GGUF path, or <code>
        <org>/<repo>
      </code>
      
       when the <code>
        hf-hub
      </code>
      
       feature is enabled.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --hf-filename
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_HF_FILENAME
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      —
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Pick a specific <code>
        .gguf
      </code>
      
       from a multi-file HF repo. Required when <code>
        --model
      </code>
      
       is a repo id with more than one GGUF.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --host
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_HOST
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      <code>
        127.0.0.1
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Bind host.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --port
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_PORT
      </code>
    </td>
    
    <td>
      <code>
        u16
      </code>
    </td>
    
    <td>
      <code>
        8080
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Bind port.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --model-name
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_MODEL_NAME
      </code>
    </td>
    
    <td>
      string
    </td>
    
    <td>
      <code>
        llama-crab
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Value returned in every response's <code>
        model
      </code>
      
       field.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --n-ctx
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_N_CTX
      </code>
    </td>
    
    <td>
      <code>
        u32
      </code>
    </td>
    
    <td>
      <code>
        2048
      </code>
      
       (legacy)
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Context size. Ignored when <code>
        --mobile-preset
      </code>
      
       is set.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --n-batch
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_N_BATCH
      </code>
    </td>
    
    <td>
      <code>
        u32
      </code>
    </td>
    
    <td>
      <code>
        512
      </code>
      
       (legacy)
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Prompt-processing batch size. Ignored when <code>
        --mobile-preset
      </code>
      
       is set.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --n-threads
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_N_THREADS
      </code>
    </td>
    
    <td>
      <code>
        i32
      </code>
    </td>
    
    <td>
      <code>
        0
      </code>
      
       (legacy)
    </td>
    
    <td>
      No
    </td>
    
    <td>
      CPU thread count. With mobile presets, also drives batch threads.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --n-gpu-layers
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_N_GPU_LAYERS
      </code>
    </td>
    
    <td>
      <code>
        i32
      </code>
    </td>
    
    <td>
      <code>
        0
      </code>
      
       (legacy)
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Number of transformer layers to offload.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --mobile-preset
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_MOBILE_PRESET
      </code>
    </td>
    
    <td>
      enum
    </td>
    
    <td>
      —
    </td>
    
    <td>
      No
    </td>
    
    <td>
      One of <code>
        low-ram
      </code>
      
      , <code>
        balanced
      </code>
      
      , <code>
        gpu-max
      </code>
      
      . Replaces the legacy <code>
        n_*
      </code>
      
       defaults with a coordinated mobile-tuned profile.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --mmproj
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_MMPROJ
      </code>
    </td>
    
    <td>
      path
    </td>
    
    <td>
      —
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Multimodal projector GGUF. Required to accept image parts.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --embeddings
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_EMBEDDINGS
      </code>
    </td>
    
    <td>
      <code>
        bool
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Loads the model with embedding mode enabled.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --reranking
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_RERANKING
      </code>
    </td>
    
    <td>
      <code>
        bool
      </code>
    </td>
    
    <td>
      <code>
        false
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      Enables the rerank endpoints and the embedding pool.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        --pooling
      </code>
    </td>
    
    <td>
      <code>
        LLAMA_CRAB_POOLING
      </code>
    </td>
    
    <td>
      enum
    </td>
    
    <td>
      <code>
        unspecified
      </code>
    </td>
    
    <td>
      No
    </td>
    
    <td>
      One of <code>
        none
      </code>
      
      , <code>
        mean
      </code>
      
      , <code>
        cls
      </code>
      
      , <code>
        last
      </code>
      
      , <code>
        rank
      </code>
      
      , <code>
        unspecified
      </code>
      
      .
    </td>
  </tr>
</tbody>
</table>

`--mobile-preset` is the only enum with a clap `value_parser` (`low-ram|balanced|gpu-max`); passing any other value fails at startup. `--pooling` is a free-form string the worker maps to `PoolingType`; an unknown string silently falls back to `unspecified`.

<callout color="info" icon="i-lucide-info">

The `model` and `user` fields on every request body are read and discarded by the server — it always serves with the locally loaded model and reports `args.model_name` in responses. The handler is intentionally multi-tenant-friendly in shape but does not enforce model selection.

</callout>

## Startup examples

Chat model with more context and partial GPU offload:

```bash
llama-crab-server \
  --model /models/chat.gguf \
  --model-name local-chat \
  --n-ctx 4096 \
  --n-gpu-layers 32
```

Embedding model with mean pooling:

```bash
llama-crab-server \
  --model /models/embed.gguf \
  --model-name local-embed \
  --embeddings \
  --pooling mean
```

Cross-encoder reranker:

```bash
llama-crab-server \
  --model /models/reranker.gguf \
  --model-name local-reranker \
  --reranking \
  --pooling rank
```

Multimodal chat (vision):

```bash
llama-crab-server \
  --model /models/vision.gguf \
  --mmproj /models/mmproj.gguf
```

The multimodal path requires the binary to be built with `--features mtmd`. Image parts in chat messages are accepted as `data:image/...;base64,...` URLs or as local file paths.

Hugging Face model (with `hf-hub` feature enabled):

```bash
llama-crab-server \
  --model TheBloke/Llama-2-7B-Chat-GGUF \
  --hf-filename llama-2-7b-chat.Q4_K_M.gguf
```

Mobile preset example (overrides the legacy `n_*` defaults):

```bash
llama-crab-server \
  --model /models/chat.gguf \
  --mobile-preset low-ram
```

## Process and worker model

- Model loading (`Llama::load`) happens inside the dedicated `llama-crab-worker` thread (`main.rs:881`). If the load fails the worker exits and the binary returns an error before binding the port — there is no degraded mode.
- HTTP request handlers run on tokio's async runtime and forward work to the worker through a `std::sync::mpsc::channel<Job>`. The worker processes one `Job` at a time; HTTP requests queue in the channel while a generation is in flight.
- CORS is `CorsLayer::permissive()` and request tracing is `TraceLayer::new_for_http()` (`main.rs:672-673`).
- The server installs no graceful-shutdown handler; `Ctrl+C` aborts the process via tokio's default behaviour.

See [Operations](/server/operations) for health checks, logging tuning and capacity planning.

## Versioning and changes

The server first shipped in **0.1.4 (2026-06-14)**, the documentation site moved in **0.1.5 (2026-06-15)**, and opt-in Hugging Face support — the `hf-hub` Cargo feature and the `--hf-filename` / `LLAMA_CRAB_HF_FILENAME` flag — was added in **0.1.6 (2026-06-15)**. Refer to the [CHANGELOG](https://github.com/DominguesM/llama-crab/blob/main/CHANGELOG.md) for the full list of changes that affect every crate in the workspace.
