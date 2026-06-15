export default defineNuxtConfig({
    extends: ["docus"],
    site: {
        url: "https://dominguesm.github.io",
        name: "llama-crab",
        description:
            "Local GGUF inference for Rust, HTTP server, Tauri, and TypeScript applications.",
    },
    llms: {
        domain: "https://dominguesm.github.io",
    },
    vite: {
        build: {
            target: "esnext",
        },
    },
});
