import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://generation21.github.io",
    // GitHub Pages 는 서버 리다이렉트가 없어 즉시 이동하는 HTML 페이지로 만들어진다.
    redirects: {
        "/home": "/",
        "/about": "/#experience",
        "/projects": "/#projects",
        "/papers": "/#papers",
    },
});
