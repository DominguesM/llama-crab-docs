# Embeddings

> Extract embeddings, configure pooling, and run similarity or reranking flows.

Embedding extraction uses a model loaded with embeddings enabled. Use an
embedding GGUF (BGE, E5, GTE, Nomic, Jina, etc.), not a regular chat
model.

## Single embedding

```rust
use llama_crab::{Llama, LlamaParams};

let mut llama = Llama::load(
    LlamaParams::new("models/bge-small-en-v1.5-q4_k_m.gguf")
        .with_n_ctx(512)
        .with_embeddings(true),
)?;

let embedding = llama.embed("Rust is a systems programming language.", true)?;
println!("dim = {}", embedding.len());
```

The `Llama::embed` helper:

1. Clears sequence 0 of the KV cache.
2. Tokenizes the text with `add_bos = true, special = false`.
3. Builds a `LlamaBatch`, requests embeddings for every token, and
encodes the batch.
4. Reads the sequence-level embedding via `LlamaContext::embeddings_seq(0)`.
5. Optionally L2-normalizes the returned vector in place.

The second argument controls L2 normalization. Pass `false` to receive
the raw vector and call `LlamaContext::normalize(&mut v)` yourself
(equivalently `LlamaContextParams::l2_normalize(&mut v)`, both are
public associated functions on their respective types).

## Lower-level access

For per-token embeddings or non-normalized vectors, drop down to
`LlamaContext`:

```rust
use llama_crab::context::params::PoolingType;
use llama_crab::{Llama, LlamaParams};

let mut llama = Llama::load(
    LlamaParams::new("models/bge-small-en-v1.5-q4_k_m.gguf")
        .with_n_ctx(512)
        .with_embeddings(true)
        .with_pooling_type(PoolingType::Cls),
)?;

// After encoding, the context exposes:
//   - embeddings()        -> last sequence
//   - embeddings_seq(id)  -> a specific sequence
//   - embeddings_ith(i)   -> a specific token in the last batch
let emb: &[f32] = llama.context().embeddings_seq(0)?;
```

`PoolingType` covers `Unspecified` (use the model's default), `None`, `Mean`,
`Cls`, `Last` and `Rank` (the value reranker GGUFs declare).

## Batched embeddings with token accounting

`Llama::embed_texts(texts, normalize)` is a thin convenience around
`Llama::embed` that returns an `EmbeddingBatch` with the per-batch token
count:

```rust
use llama_crab::{Llama, LlamaParams};

let mut llama = Llama::load(
    LlamaParams::new("models/bge-small-en-v1.5-q4_k_m.gguf")
        .with_n_ctx(512)
        .with_embeddings(true),
)?;

let docs = vec![
    "Rust is a systems programming language.".to_string(),
    "Python is dynamically typed.".to_string(),
    "Go has goroutines.".to_string(),
];
let batch = llama.embed_texts(&docs, /* normalize */ true)?;
for (text, vector) in docs.iter().zip(batch.vectors.iter()) {
    println!("{text} -> dim {}", vector.len());
}
println!("prompt_tokens: {}", batch.prompt_tokens);
```

## Similarity search

Compute one query embedding, embed your corpus, and sort by cosine
similarity. For normalized vectors, cosine similarity is the dot
product. If you request raw vectors, divide by both vector norms.

## Reranking

`Llama::rerank(query, documents)` is a cross-encoder driver that scores
each `(query, document)` pair. The model must have been trained with
`pooling_type = Rank` (a reranker GGUF will declare it). Each pair is
encoded in a separate forward pass — simple and correct, even if not the
most efficient. For a batched implementation, use the `seq_*` methods
on `LlamaContext` directly.

```rust
use llama_crab::{Llama, LlamaParams};

let mut llama = Llama::load(
    LlamaParams::new("models/bge-reranker-v2-m3-q4_k_m.gguf")
        .with_n_ctx(512)
        .with_embeddings(true),
)?;

let query = "What is the capital of France?";
let docs = &[
    "Paris is the capital and most populous city of France.",
    "Berlin is the capital of Germany.",
    "Madrid is the capital of Spain.",
];

let scores = llama.rerank(query, docs)?;
// Higher score = more relevant.
let mut ranked: Vec<(usize, f32)> = scores.iter().copied().enumerate().collect();
ranked.sort_by(|a, b| b.1.total_cmp(&a.1));
for (idx, score) in ranked {
    println!("{score:+.4}  {}", docs[idx]);
}
```

The HTTP server has a `/v1/rerank` route when started with `--reranking`
and a reranking model:

```bash
llama-crab-server \
  --model /models/reranker.gguf \
  --reranking \
  --pooling rank
```

## Operational caveat

Embedding and reranking behavior can depend on backend, model metadata,
pooling, and build mode. If vectors have an unexpected dimension, scores
collapse near zero, or a backend crashes, isolate the embedding path
first and compare pooling and backend settings before changing unrelated
chat-generation code.

Repository embedding and reranking examples are covered in
[Development](/contributing/development).
