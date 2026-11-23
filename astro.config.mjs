import { defineConfig } from "astro/config";

export default defineConfig({
    site: "https://generation21.github.io",
    // Astro 7 기본값('jsx')은 줄바꿈 낀 공백을 지워 「회사명 직무」 사이 간격이 붙는다. 6 의 무손실 압축을 유지한다.
    compressHTML: true,
    // GitHub Pages 는 서버 리다이렉트가 없어 즉시 이동하는 HTML 페이지로 만들어진다.
    redirects: {
        "/home": "/",
        "/about": "/#experience",
        "/projects": "/#projects",
        "/papers": "/#papers",
    },
});
