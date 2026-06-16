# Models

> Choose, store, and match GGUF model files for llama-crab workloads.

`llama-crab` consumes GGUF files. Text-only examples need one model file.
Multimodal examples also need an `mmproj` projector file that matches the
text model.

## Choosing files

Download GGUF files from a source you trust and keep the matching projector
file next to multimodal models. Pass absolute paths in production services
so the working directory does not affect model loading.

In 0.1.8 the `hf-hub` cargo feature also lets `LlamaParams::new` accept a
Hugging Face repository id — the loader resolves the file through `hf-hub`,
caches it, and only then opens the cached copy. See
[First run](/getting-started/first-run) for the API shape.

## Storage

Large model downloads can exhaust local disk quickly. Check free space
before running the vision examples or broad validation scripts.

```bash
df -h .
```

The Hugging Face cache follows the standard `hf-hub` location
(`$HF_HOME`/`~/.cache/huggingface` by default). Override it with
`LlamaParams::with_hf_cache_dir` or the `HF_HOME` environment variable.

## Matching models to examples

<table>
<thead>
  <tr>
    <th>
      Workload
    </th>
    
    <th>
      Model type
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      Completion and chat
    </td>
    
    <td>
      Instruct or base text GGUF
    </td>
  </tr>
  
  <tr>
    <td>
      Embeddings
    </td>
    
    <td>
      Embedding GGUF loaded with embeddings enabled (<code>
        PoolingType::Cls
      </code>
      
       for BGE-small)
    </td>
  </tr>
  
  <tr>
    <td>
      Reranking
    </td>
    
    <td>
      Rank/cross-encoder model and <code>
        PoolingType::Rank
      </code>
      
       pooling
    </td>
  </tr>
  
  <tr>
    <td>
      Vision
    </td>
    
    <td>
      Text GGUF plus matching <code>
        mmproj
      </code>
      
       (server needs the <code>
        mtmd
      </code>
      
       cargo feature and <code>
        --mmproj
      </code>
      
      )
    </td>
  </tr>
</tbody>
</table>
