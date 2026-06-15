export default defineAppConfig({
  header: {
    title: 'llama-crab',
    logo: false,
  },
  seo: {
    title: 'llama-crab',
    titleTemplate: '%s - llama-crab',
    description: 'Local GGUF inference for Rust, HTTP server, Tauri, and TypeScript applications.',
  },
  github: {
    url: 'https://github.com/DominguesM/llama-crab',
    branch: 'main',
  },
  ui: {
    colors: {
      primary: 'orange',
      neutral: 'zinc',
    },
  },
  socials: {
    github: 'https://github.com/DominguesM/llama-crab',
  },
})
