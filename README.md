# Portfolio

홍승범의 포트폴리오 사이트. [Astro](https://astro.build) 정적 사이트이며 master 에 push 하면 GitHub Actions 가 GitHub Pages(https://generation21.github.io/)로 배포한다 (`.github/workflows/deploy.yml`).

## 실행

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ 에 정적 파일 생성
npm run preview  # 빌드 결과 미리보기
```

Node 22.23.4 이상이 필요하다 (`.nvmrc`). Astro 7 이 이보다 낮은 버전에서는 빌드를 거부한다.

## 내용 고치기

- 대표 사례: `src/content/work/*.md` (frontmatter 스키마는 `src/content.config.ts`)
- 경력·프로젝트·논문: `src/data/about.json`, `projects.json`, `papers.json`
- 연락처: `src/data/contacts.ts`
- 예전 경로(`/home`, `/about`, `/projects`, `/papers`)는 `astro.config.mjs`의 `redirects`로 홈의 각 섹션으로 보낸다.

### 다이어그램

사례 본문의 구조도·흐름도는 직접 쓴 SVG 파일이다. Mermaid·D2 는 빌드에 브라우저가 필요하거나 한글 폰트를 임베드해야 해서 쓰지 않는다.

- 위치는 `public/image/work/<slug>/<name>.svg`, 본문에서는 `![대체 텍스트](/image/work/<slug>/<name>.svg)` 로 넣는다. 대체 텍스트에는 그림이 말하는 흐름을 한두 문장으로 적는다.
- `viewBox` 너비는 720(본문 폭)으로 잡는다. 글자는 15px(이름)·13px(설명) 이상으로 쓰고, `font-family` 는 `src/styles/global.css` 의 `body` 와 같은 스택을 쓴다. 웹폰트는 임베드하지 않는다.
- 색은 `global.css` 팔레트 값을 그대로 쓰고, SVG 안의 `<style>` 에 `@media (prefers-color-scheme: dark)` 를 넣어 사이트와 함께 바뀌게 한다. 배경은 투명으로 둔다. 기존 SVG 의 `<style>` 을 복사해 시작하면 된다.
- 좁은 화면에서는 줄이지 않고 최소 640px 폭으로 가로 스크롤한다 (`global.css` 의 `.prose img[src$=".svg"]`).
- 실제 흐름 하나만 그린다. 상자에는 실제 구성 요소 이름, 화살표에는 오가는 것을 적는다. 근거는 원고와 같다 — career-wiki 범위 안에서만 그리고, 사내 저장소 이름·PR 번호·사람 이름은 쓰지 않는다.
- 고친 뒤 라이트·다크, 1280px·390px 에서 확인한다.
