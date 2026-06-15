# llama-crab documentation

> Rust, server, Tauri, and TypeScript tooling for local llama.cpp applications.

The official documentation site for the `llama-crab` ecosystem. Built with
[Nuxt 4](https://nuxt.com) and the [Docus](https://docus.dev) layer on top of
[Nuxt Content](https://content.nuxt.com).

## Local development

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev
```

Your documentation site will be running at <http://localhost:3000>.

## Production build

```bash
npm run build
node .output/server/index.mjs
```

The build is prerendered for static hosting and emits a Node-compatible
server bundle. The output lives in `.output/`.

## Project structure

```
.
├── content/         Markdown content organised by section
│   ├── index.md     Homepage
│   ├── 1.getting-started/
│   ├── 2.rust/
│   ├── 3.server/
│   ├── 4.tauri/
│   ├── 5.typescript/
│   ├── 6.guides/
│   ├── 7.reference/
│   ├── 8.examples/
│   ├── 9.contributing/
│   └── troubleshooting.md
├── public/          Static assets (logo, favicon, social card)
├── app.config.ts    Branding, header, social links, GitHub
├── nuxt.config.ts   Site URL and name
└── package.json
```

Navigation is generated automatically from the folder structure and the
`.navigation.yml` files inside each section. To reorder pages, rename the
file prefix (`1.introduction.md`, `2.installation.md`, ...).

## Sections

| Section | Covers |
| --- | --- |
| Getting Started | Installation, first run, models, backends |
| Rust SDK | Package map, lifecycle, completion, chat, embeddings, multimodal, structured output |
| Server | Running, OpenAI-compatible API, streaming, operations |
| Tauri | Plugin, permissions, TypeScript client |
| TypeScript | Packages, client contracts |
| Guides | Performance, mobile, troubleshooting models |
| Reference | Crates, cargo features, versioning |
| Examples | Runnable example groups |
| Contributing | Development, examples workflow, releases |
| Troubleshooting | Common server, Tauri, and TypeScript client issues |

## License

[MIT License](https://opensource.org/licenses/MIT)
