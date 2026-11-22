import { defineConfig } from "astro/config";

// Cloudflare Pages가 기존 CRA 출력 폴더(build)를 바라보므로 그대로 맞춘다.
export default defineConfig({
    site: "https://portfolio-d5b.pages.dev",
    outDir: "./build",
});
