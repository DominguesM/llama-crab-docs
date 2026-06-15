---
title: Troubleshooting
description: Common fixes for server, Tauri IPC, streaming, embeddings, and multimodal issues.
navigation:
  icon: i-lucide-life-buoy
seo:
  title: Troubleshooting
  description: Common fixes for server, Tauri IPC, streaming, embeddings, and multimodal issues.
---

This page covers common issues for the server, Tauri plugin, and
TypeScript packages. Model-loading, backend, and allocation issues are
covered separately in
[Troubleshooting Models](/guides/troubleshooting-models).

The current release is **0.1.6**. Behaviour notes below are verified
against the `main` branch and the `0.1.6` source tree.

## Server does not start

Check that the model path exists and that the selected backend can
load it:

```bash [Terminal]
llama-crab-server --model /absolute/path/to/model.gguf
```

If startup exits after logging a model-load failure, reduce memory
pressure with a smaller model, lower `--n-ctx`, lower
`--n-gpu-layers`, or try a mobile preset such as
`--mobile-preset low-ram`.

For Hugging Face repository IDs, enable the `hf-hub` cargo feature and
use `--hf-filename` to disambiguate the GGUF file inside the repo:

```bash [Terminal]
llama-crab-server \
  --model Qwen/Qwen2.5-0.5B-Instruct-GGUF \
  --hf-filename qwen2.5-0.5b-instruct-q4_k_m.gguf
```

If `--hf-filename` is missing for a repo that contains multiple GGUFs,
the worker fails with `model resolution failed: hf-hub repo has more
than one gguf file; pass --hf-filename`. The env-var form is
`LLAMA_CRAB_HF_FILENAME`.

## `/v1/rerank` returns an error

The reranking endpoint is disabled unless the process starts with
`--reranking`:

```bash [Terminal]
llama-crab-server \
  --model /models/reranker.gguf \
  --reranking \
  --pooling rank
```

`/v1/rerank` shares the same handler as `/v1/reranking`, `/rerank`, and
`/reranking` — switching path will not bypass the flag.

## `/v1/embeddings` fails or returns unexpected vectors

Start the server with `--embeddings` for embedding workloads:

```bash [Terminal]
llama-crab-server \
  --model /models/embed.gguf \
  --embeddings \
  --pooling mean
```

Two important defaults to be aware of:

- `normalize` defaults to **false** (the previous version of this page
  said `true`; the actual default is `false`, verified against
  `crates/llama-crab-server/src/main.rs`). Pass `true` in the request
  body when the consumer code expects a unit-length vector.
- `encoding_format` accepts `float` or `base64`. When the request uses
  `base64`, the response item also gets an `encoding_format: "base64"`
  field alongside the encoded string.

The embedding `usage` object contains `prompt_tokens` and `total_tokens`
only — there is no `completion_tokens` field on this endpoint.

## Streaming returns `[DONE]` after an error event

This is expected for the current SSE implementation. Streaming route
errors are emitted as:

```text
event: error
data: <message>
```

The stream then emits the final:

```text
data: [DONE]
```

Treat the error event as request failure even though `[DONE]` follows
it. The terminal `[DONE]` is always emitted, even after an error
frame, by the implementation in `crates/llama-crab-server/src/main.rs`
(`chain(stream::once(async { StreamEvent::Done }))`).

## Streaming completions reject multiple prompts

`/v1/completions` supports multiple prompts only in non-streaming mode.
Streaming completions require exactly one prompt. The same constraint
applies to the Rust `create_completion_stream` high-level helper.

## Chat role is rejected

The server accepts `system`, `user`, `assistant`, `tool`, and
`function` roles. The TypeScript Tauri client also accepts `developer`
and maps it to `system`, but the Rust server path does not accept
`developer` directly. The internal request field is `role: string` —
the server's role check uses the literal list above.

## Multimodal chat content is rejected

Multimodal server requests require both:

- A server binary built with the `mtmd` feature
  (`cargo install llama-crab-server --features mtmd --force`).
- Startup with `--mmproj /path/to/mmproj.gguf`.

For `image_url` content parts the server accepts local file paths and
`data:image/...;base64,...` URLs. `audio_url` and `video_url` parts
are parsed by the deserializer but rejected at bitmap load time with
`unsupported multimodal chat content part type: audio/video`.

The Tauri plugin accepts the same image inputs. Audio input is
explicitly rejected by the plugin with
`PluginError { kind: "mediaDecode", message: "audio input is not
supported by the plugin yet" }`. To enable multimodal in a Tauri
app, the Rust plugin must be built with the `mtmd` cargo feature;
the TypeScript client does not enforce this.

## Tauri IPC says a model is not loaded

Load the model before generation, and pass the same model id to chat
or generation calls:

```ts
await client.models.load({
  model: "local",
  path: "/models/model.gguf",
})

await client.chat.completions.create({
  model: "local",
  messages: [{ role: "user", content: "Hello" }],
})
```

The Rust plugin reports missing models with
`kind: "modelNotFound"`. Other failure modes the plugin reports:

- `kind: "invalidRequest"` — the request payload failed validation
  (missing required field, wrong type, etc.).
- `kind: "workerSpawnFailed"` — the worker thread could not be
  spawned.
- `kind: "workerDisconnected"` — the worker died mid-request
  (mismatched `mpsc::RecvError`).
- `kind: "workerPanicked"` — the worker panicked.
- `kind: "multimodalNotEnabled"` — a multimodal request was issued but
  the plugin was built without the `mtmd` cargo feature.
- `kind: "multimodalSetup"` — `MtmdContext` initialization failed.
- `kind: "mediaDecode"` — image decode failed or audio was sent.
- `kind: "inference"` — the worker reported an inference-time error.

The previous version of this page listed only `invalidRequest`,
`modelNotFound`, `worker`, and `inference`. The coarse `worker` kind
has been split into `workerSpawnFailed` / `workerDisconnected` /
`workerPanicked`; strict equality on `kind === "worker"` no longer
matches.

## Tauri TypeScript client validation errors

The current `@llama-crab/tauri` client throws `InvalidRequestError`
(typed by `@llama-crab/core` as `LlamaCrabError` with
`type: "invalid_request"`) when a request is structurally invalid.
The checks it actually performs are:

- `messages` is non-empty.
- `prompt` is a non-empty array (for completions).
- `input` is a non-empty array (for embeddings).
- `documents` is a non-empty array (for rerank).
- `model` is present (any string).

The current client does **not** throw `UnsupportedFeatureError` for
`n>1`, tools, `tool_choice`, `response_format`, `logprobs`, image
content, or audio content. Those features are forwarded to the Rust
plugin (which handles them when the relevant feature is enabled) and
the TypeScript layer no longer rejects them. The
`UnsupportedFeatureError` class is still exported from
`@llama-crab/core` for adapter authors, but the Tauri client does not
throw it.

## Streaming cancellation

The Tauri streaming chunks carry a `requestId`. To cancel a streaming
request, call `plugin:llama-crab|cancel` with the same `requestId`. The
`AsyncIterable<ChatCompletionChunk>` / `AsyncIterable<CompletionChunk>`
returned by the client respects the `AbortSignal` passed through
`CallOptions = { signal?: AbortSignal }` and triggers the cancellation
automatically.
