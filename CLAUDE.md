# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

홍승범의 포트폴리오 사이트(https://generation21.github.io/). Astro 7 정적 사이트이고 의존성은 `astro` 하나다. 문서·커밋 본문·PR 은 한국어로 쓴다.

GitHub 작업 절차(이슈 먼저, 브랜치·커밋, PR 본문, 레이블)는 `hsb` 플러그인 `github-conventions` 스킬이 갖는다. 아래 「브랜치 운영」「로컬 검사」「레이블」은 그 스킬과 `/hsb:*` 커맨드가 읽는 이 저장소의 값이다.

## 명령

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # dist/ 에 정적 파일 생성
npm run preview  # 빌드 결과 미리보기
```

Node 22.23.4 이상 (`.nvmrc`, Astro 7 요구). CI 는 `withastro/action` 기본값인 Node 24 로 빌드한다. 테스트·린트는 없다. 포맷은 Prettier `tabWidth: 4` (`.prettierrc.json`).

## 브랜치 운영

- **base 브랜치: `master`.** 작업 브랜치는 `origin/master` 에서 판다. `origin/develop` 은 있지만 master 보다 뒤처져 있고 PR 대상으로 쓰지 않는다.
- **직접 push 금지: `main`·`master`·`develop`.** 이 브랜치들에는 PR 로만 들어간다. 그 밖의 작업 브랜치에서는 확인 없이 commit·push 해도 된다.
- 접두사는 `feature/` (지금까지의 이력). 이름은 영어 소문자 하이픈 — `feature/<summary>`.
- 커밋은 Conventional Commits, scope 는 변경이 사는 디렉터리 (`feat(src)`, `docs(content)`, `fix(data)`, `chore(.github)`).
- master 에 머지되면 곧바로 배포된다 (아래 「배포」). 머지가 곧 공개다.

## 로컬 검사

PR 전에 `npm run build` 를 통과시킨다. 모든 변경에 해당하는 유일한 검사다.

- `src/content/work/*.md` 의 frontmatter 는 빌드 때 `src/content.config.ts` 의 zod 스키마로 검증된다. `highlights` 는 **정확히 3개**여야 하고 필드가 하나라도 빠지면 빌드가 실패한다.
- JSON 데이터(`src/data/*.json`)에는 스키마가 없다. 필드명이 틀려도 빌드는 통과하고 화면에서만 빠지므로, 데이터를 고쳤으면 `npm run dev` 로 해당 섹션을 눈으로 확인한다.

## 레이블

이슈·PR 에 종류 하나 + 영역 하나. 규칙은 `hsb` 플러그인 `github-conventions` 스킬,
영역·`ext:` 목록은 `.github/labels.json` 이 소유한다. 적용은 `/hsb:setup-labels`.

## 구조

페이지는 둘뿐이다 — 한 페이지에 모든 섹션을 그리는 `src/pages/index.astro` 와 대표 사례 상세 `src/pages/work/[slug].astro`. 공통 껍데기와 상단 내비(`/#work`·`/#experience`·`/#projects`·`/#papers`)는 `src/layouts/Base.astro`.

내용은 두 갈래로 들어온다.

- **대표 사례** — `src/content/work/*.md` (content collection `work`). 파일명이 `/work/<slug>/` 가 되고 `order` 로 정렬된다.
- **경력·프로젝트·논문** — `src/data/about.json`(`office` + `school` 을 이어 경력으로 표시), `projects.json`, `papers.json`, 연락처 `contacts.ts`.

여러 파일을 함께 봐야 하는 연결:

- 사례의 `replaces` 는 `projects.json` 항목의 `title` 과 **글자 그대로** 같아야 한다. 같은 항목은 아래 프로젝트 아카이브에서 빠진다 (사례로 승격된 프로젝트가 두 번 나오지 않게). 프로젝트 제목을 바꾸면 이 값도 같이 바꾼다.
- `projects.json` 의 `category` 는 `index.astro` 의 `categories` 키(`LLM-Service`·`AI-Serving`·`Game`·`AI-Research`·`Web-Application`) 중 하나여야 하고, `papers.json` 은 `Paper`·`AI-Challenge` 중 하나다. 목록에 없는 키는 조용히 화면에서 사라진다. 새 분류는 `index.astro` 에 먼저 추가한다.
- 기술 목록 필드명은 `teckStack` (오타지만 `index.astro` 가 이 이름으로 읽는다). 고치려면 데이터와 페이지를 함께 바꾼다.
- 데이터의 `image` 필드와 `public/image/` 의 그림은 지금 `index.astro` 가 그리지 않는다.
- 예전 CRA 시절 경로(`/home`·`/about`·`/projects`·`/papers`)는 `astro.config.mjs` 의 `redirects` 가 홈의 각 섹션으로 보낸다. GitHub Pages 에는 서버 리다이렉트가 없어 즉시 이동하는 HTML 로 만들어진다.

## 배포

`.github/workflows/deploy.yml` — master 에 push(=PR 머지)되거나 수동 실행하면 `withastro/action` 으로 빌드해 GitHub Pages 에 올린다. `site` 는 `astro.config.mjs` 에 있다.

## 경력 자료 (career-wiki)

사이트에 쓰는 경력 사실의 원본은 이 저장소가 아니라 `/Users/hsb/Desktop/projects/career-wiki` 다. 경력·프로젝트·사례 문구를 새로 쓰거나 고칠 때는 거기서 근거를 찾고, 위키에 없는 경험·수치를 지어내지 않는다.

- 시작점은 `wiki/index.md`. 회사·기간·역할·학력은 `wiki/profile.md`, 프로젝트별 구현·검증 범위와 한계는 `wiki/projects/*.md`, 출처끼리 어긋나는 연차·순위·기간은 `wiki/open-questions.md`.
- 위키의 근거 등급(본인 기재 / 기록상 구현·검증 / 배포·운영 실측)을 사이트 문구에서 올려 쓰지 않는다. 수치는 표본·조건과 함께 옮기고, 출처가 갈리는 숫자는 유리한 쪽을 고르지 말고 사용자에게 묻는다.
- 이 저장소 작업 중에 career-wiki 를 고치지 않는다. 위키 쪽 갱신이 필요하면 사용자에게 알린다 (그 저장소의 절차는 그쪽 `AGENTS.md`).
- 사내 화면 캡처나 회사 공개 허락처럼 저장소 안에서 끝낼 수 없는 몫은 `ext:capture` 레이블로 이슈를 남긴다.
