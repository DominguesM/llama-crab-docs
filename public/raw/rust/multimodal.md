# Multimodal

> Use mtmd vision and audio support with text models, projector files, and image or audio prompts.

Multimodal support is behind the `mtmd` cargo feature and is implemented
on top of `llama.cpp`'s `tools/mtmd/` C API. It supports both **vision**
(images) and **audio** waveforms, and pairs a text GGUF with a matching
`mmproj` projector file.

```toml
[dependencies]
llama-crab = { version = "0.1", features = ["mtmd"] }
```

For source checkout examples and model download helpers, see
[Development](/contributing/development).

## Top-level types

The `llama_crab::multimodal` module exposes:

- `MtmdContext` — the projector context bound to a text model.
- `MtmdBitmap` — a single image or audio waveform to feed in.
- `MtmdInputText` — the textual prompt accompanying the bitmaps.
- `MtmdInputChunks` and `MtmdInputChunk` — the list of tokenized chunks
produced by `MtmdContext::tokenize`.
- `MtmdContextParams` — projector init parameters (use GPU, print
timings, thread count).
- `default_media_marker()` — the placeholder string that must appear
in the prompt, one occurrence per bitmap.

## Core flow

The high-level vision examples follow the same sequence:

1. Load the text model with `Llama::load`.
2. Initialize `MtmdContext` from the projector file.
3. Load an image as `MtmdBitmap`.
4. Insert `default_media_marker()` into the prompt, one occurrence
per bitmap supplied.
5. Tokenize text plus media with `MtmdContext::tokenize`.
6. Evaluate the chunks into the llama context via
`MtmdInputChunks::eval` (the multimodal eval loop, not `decode`).
7. Sample tokens and feed each sampled token back through the context
with a normal `LlamaBatch` + `LlamaContext::decode`.

```rust
use llama_crab::multimodal::{
    default_media_marker, MtmdBitmap, MtmdContext, MtmdContextParams, MtmdInputText,
};
use llama_crab::{Llama, LlamaParams};

let mut llama = Llama::load(
    LlamaParams::new("models/gemma-4-E4B-it-Q4_K_M.gguf").with_n_ctx(4096),
)?;
let mtmd = MtmdContext::init_from_file(
    "models/gemma-4-E4B-it-mmproj.gguf",
    llama.model(),
)?;

// Sanity check: some projectors do not support images or audio.
if !mtmd.support_vision() {
    anyhow::bail!("this projector does not support vision");
}

let bitmap = MtmdBitmap::from_file("images/sample.png")?;
let marker = default_media_marker();
let prompt = format!("{marker}\nDescribe this image.");
let chunks = mtmd.tokenize(MtmdInputText::new(&prompt), &[&bitmap])?;

// Evaluate the multimodal chunks, then sample + decode token-by-token.
// `chunks.eval` is `pub unsafe fn` because it takes a raw `*mut llama_context`.
let llama_ctx = llama.context().raw_handle();
let n_past = unsafe {
    chunks.eval(
        &mtmd,
        llama_ctx,
        /* n_past */ 0,
        /* seq_id */ 0,
        /* n_batch */ 512,
        /* logits_last */ true,
    )
}?;

// ... sample from current logits, decode a single token, repeat.
```

`MtmdContext` and `MtmdInputChunks` are `Send` (not `Sync`). The
`raw_handle()` accessor on `LlamaContext` is public specifically so
that `MtmdInputChunks::eval` can be called with a live `llama_context`
pointer (see `src/context/mod.rs`).

## Bitmaps: image and audio

`MtmdBitmap` has three constructors:

<table>
<thead>
  <tr>
    <th>
      Constructor
    </th>
    
    <th>
      Use
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        from_image_data(nx, ny, data)
      </code>
    </td>
    
    <td>
      RGB8 pixel buffer, <code>
        nx * ny * 3
      </code>
      
       bytes.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        from_audio_data(data)
      </code>
    </td>
    
    <td>
      Float audio buffer; the projector is responsible for resampling.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        from_file(path)
      </code>
    </td>
    
    <td>
      Decode an image from disk (requires the <code>
        mtmd
      </code>
      
       feature, which pulls in the <code>
        image
      </code>
      
       crate).
    </td>
  </tr>
</tbody>
</table>

`support_audio()` and `audio_sample_rate()` describe whether the
projector handles audio and at which rate. The
`Llama::load(…).with_n_ctx(4096)` context is normally large enough to
host the image token expansion; a small `n_ctx` will truncate the image.

## Projector parameters

`MtmdContext::init_from_file(path, model)` uses default
`MtmdContextParams` (`use_gpu = true`, `print_timings = false`,
`n_threads = 1`). Pass `MtmdContext::init_from_file_with(path, model, params)` to override:

```rust
use llama_crab::multimodal::{MtmdContext, MtmdContextParams};

let params = MtmdContextParams {
    use_gpu: true,
    print_timings: true,
    n_threads: 4,
};
let mtmd = MtmdContext::init_from_file_with(
    "models/gemma-4-E4B-it-mmproj.gguf",
    llama.model(),
    params,
)?;
```

## Prompt templates

Some vision-language models need model-specific chat framing. The LFM
examples wrap the media marker in ChatML-style turns:

```text
<|im_start|>user
<media marker>
Describe this image.<|im_end|>
<|im_start|>assistant
```

The literal media marker is whatever `default_media_marker()` returns
(currently `"<__media__>"`). Place exactly one marker per bitmap.

If a model returns empty or irrelevant image answers, verify that the
projector matches the text GGUF and that the prompt format matches the
model family.

## HTTP server

The server can also run multimodal chat when installed with `mtmd` and
started with `--mmproj`:

```bash
llama-crab-server \
  --model /models/vision.gguf \
  --mmproj /models/mmproj.gguf
```

Send image content parts to `/v1/chat/completions`.

## Tauri plugin

`tauri-plugin-llama-crab` also ships a multimodal path. When the plugin
is built with the `mtmd` cargo feature, `load_model` accepts an
`mmproj_path` and the chat pipeline runs multimodal inference; image
inputs are accepted as `data:image/...;base64,...` URLs and as local
file paths. See the Tauri plugin guide for the IPC contract.
