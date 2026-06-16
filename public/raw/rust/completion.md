# Text Completion

> Generate text completions with prompts, options, streaming, and custom samplers.

Use text completion when you already have the exact prompt string you want to
send to the model. The high-level driver lives in
`llama_crab::high_level::completion` and is re-exported from the crate root.

## Minimal completion

```rust
use llama_crab::{Llama, LlamaParams};

let mut llama = Llama::load(LlamaParams::new("models/model.gguf").with_n_ctx(512))?;
let response = llama.create_completion("Once upon a time", 64)?;
println!("{}", response.text);
```

`create_completion` clears sequence 0 of the KV cache before each call, so
two consecutive calls do not share prompt state. This mirrors the `simple`
example in the `llama-crab-examples` repository.

`Completion` carries the concatenated text, the number of generated
non-EOS tokens, the <span>

`StopReason`

</span>

 (`Length`, `Eos`, `Stop`, `ToolCalls`)
and optional per-token <span>

`CompletionLogprobs`

</span>

.

## Completion options

For stop sequences, logprobs, suffixes, prompt echoing, logit biases,
sampler settings and the minimum-tokens guard, use `CompletionOptions`:

```rust
use llama_crab::high_level::completion::{CompletionOptions, SamplingOptions};
use llama_crab::{Llama, LlamaParams};

let mut llama = Llama::load(LlamaParams::new("models/model.gguf"))?;
let options = CompletionOptions::new(96)
    .with_stop_sequence("\n\n")
    .with_stop_sequences(["</answer>", "### END"])
    .with_logprobs(3)
    .with_min_tokens(8)
    .with_echo_prompt(false)
    .with_sampling(SamplingOptions::chat().with_temperature(0.2));

let response = llama.create_completion_with_options("Explain Rust ownership:", options)?;
println!("{}", response.text);
```

The constructor is `CompletionOptions::new(max_tokens)` which sets
`temperature = 0.0` (greedy). `CompletionOptions::sampled(max_tokens)` is
the alternative starting point and uses the probabilistic defaults in
`SamplingOptions::default()` (temperature `0.8`, top-k `40`, top-p `0.95`,
min-p `0.05`, repeat-penalty `1.0`, mirostat disabled, no fixed seed).

`SamplingOptions::chat()` is a thin convenience that lowers the default
temperature to `0.2`. The full set of sampling fields (`top_k`, `top_p`,
`min_p`, `typical_p`, `tfs_z`, `min_keep`, `penalty_last_n`, `repeat_penalty`,
`frequency_penalty`, `presence_penalty`, `mirostat_mode`, `mirostat_tau`,
`mirostat_eta`, `seed`) is on `SamplingOptions`; use the `with_*` setters
or replace the struct with `with_sampling(...)`.

## Streaming

Streaming calls your callback once per generated chunk. Return
`StreamControl::Stop` to abort generation early.

```rust
use std::io::{self, Write};
use llama_crab::{CompletionOptions, Llama, LlamaParams, StreamControl};

let mut llama = Llama::load(LlamaParams::new("models/model.gguf"))?;
let mut out = io::stdout().lock();

let final_completion = llama.create_completion_stream(
    "Write one short sentence about Rust.",
    CompletionOptions::new(64),
    |chunk| {
        let _ = write!(out, "{}", chunk.text);
        let _ = out.flush();
        StreamControl::Continue
    },
)?;
```

`CompletionChunk` carries the freshly emitted `text`, the `LlamaToken` that
produced it, a cumulative `n_tokens` counter, an optional `StopReason` on
the terminal chunk, and optional `logprobs` for that token. See the
`streaming` example in `llama-crab-examples` for the full error-handling
version.

## Custom sampler

If the built-in `SamplingOptions` is not enough, build a sampler chain and
pass it to `create_completion_with_sampler`:

```rust
use llama_crab::high_level::completion::{CompletionOptions, SamplingOptions};
use llama_crab::sampling::LlamaSampler;
use llama_crab::{Llama, LlamaParams};

let mut llama = Llama::load(LlamaParams::new("models/model.gguf"))?;

// Build a custom sampler chain.
let penalties = LlamaSampler::penalties(64, 1.1, 0.0, 0.0)
    .expect("penalties sampler");
let top_p = LlamaSampler::top_p(0.9, 1).expect("top_p sampler");
let temp = LlamaSampler::temp(0.7).expect("temp sampler");
let dist = LlamaSampler::dist(42).expect("dist sampler");
let mut sampler = LlamaSampler::chain(
    vec![penalties, top_p, temp, dist],
    /* no_perf */ false,
)
.expect("sampler chain");

// Or, build one from the SamplingOptions struct:
let _ = SamplingOptions::default().build_sampler(&llama);

let response = llama.create_completion_with_sampler(
    "Return one JSON object:",
    CompletionOptions::new(64),
    &mut sampler,
)?;
println!("{}", response.text);
```

`LlamaSampler` exposes 17 strategies as associated constructors:
`greedy`, `dist`, `top_k`, `top_p`, `tail_free`, `min_p`, `typical`, `temp`,
`temp_ext`, `xtc`, `top_n_sigma`, `mirostat`, `mirostat_v2`, `penalties`,
`dry`, `adaptive_p`, `logit_bias`, plus the special-purpose `grammar` and
`infill` samplers. Compose them with `LlamaSampler::chain(samplers, no_perf)`.
The chain takes ownership of the inner samplers; once added they are
invalidated and only the chain should be used.

## Convenience wrappers with token accounting

`Llama::generate_text(prompt, max_tokens)` returns a `TextGeneration` with
`text`, `prompt_tokens`, `completion_tokens` and `total_tokens` (see
`high_level::openai_compat`). It is a thin layer on top of
`create_completion_with_options` and is useful when the application needs
to report usage.

The generated API reference for these types starts at
[`docs.rs/llama_crab`](https://docs.rs/llama_crab).
