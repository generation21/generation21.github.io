# Portfolio

홍승범의 포트폴리오 사이트. [Astro](https://astro.build) 정적 사이트이며 Cloudflare Pages로 배포한다.

## 실행

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # build/ 에 정적 파일 생성
npm run preview  # 빌드 결과 미리보기
```

Node 22.12 이상이 필요하다 (`.nvmrc`).

## 내용 고치기

- 대표 사례: `src/content/work/*.md` (frontmatter 스키마는 `src/content.config.ts`)
- 경력·프로젝트·논문: `src/data/about.json`, `projects.json`, `papers.json`
- 연락처: `src/data/contacts.ts`
- 예전 경로(`/home`, `/about`, `/projects`, `/papers`)는 `public/_redirects`로 홈의 각 섹션으로 보낸다.
