---
name: career-sync
description: career-wiki(/Volumes/Archive-HSB/projects/me-career-wiki)에서 경력·프로젝트 근거를 찾아 포트폴리오 사이트 문구를 쓰거나, 위키와 사이트를 대조해 새로 넣을 것·어긋난 것·낡은 것을 찾는다. "경력 찾아줘", "포트폴리오에 업데이트할 거 있어?", "위키 보고 사이트 갱신해줘"처럼 요청할 때나, 사례·경력·프로젝트·논문 항목을 새로 쓰거나 고칠 때 쓴다.
---

# career-wiki 로 경력 찾기·대조

사이트에 실리는 경력 사실의 원본은 career-wiki 다 (CLAUDE.md 「경력 자료」). 이 스킬은 위키에서 근거를 찾아 사이트 파일로 옮기는 절차다. **위키는 읽기만 한다.**

```bash
WIKI=/Volumes/Archive-HSB/projects/me-career-wiki
```

## 어디와 어디를 대조하는가

| 사이트 | 위키 |
|---|---|
| `src/data/about.json` `office`·`school` | `wiki/profile.md` 「경력」 |
| `src/data/projects.json` 항목 | `wiki/projects/*.md` (`wiki/index.md` 「프로젝트」에서 고른다) |
| `src/content/work/*.md` 사례 | 같은 주제의 `wiki/projects/*.md` 여럿 — 사례 하나가 페이지 여러 개에 걸친다 |
| `src/data/papers.json` | `wiki/extracts/wanted-resume-2026-10-20.md`, 순위·기간 충돌은 `wiki/open-questions.md` |
| 출처끼리 갈리는 것 | `wiki/open-questions.md` |

공통 이력서 `$WIKI/output/general/ai-engineer/index.html` 은 이름·표현 수준을 맞출 때만 참고한다. 위키에서 만든 결과물이라 근거가 아니다.

## A. 찾기 — 특정 경험을 사이트에 쓸 때

1. `wiki/index.md` 에서 페이지를 고르고 `rg -n '<검색어>' "$WIKI/wiki"` 로 보완한다.
2. 프로젝트 페이지의 문제·담당·결과와 검증 범위·한계를 읽는다. 사이트에 옮길 수치는 링크된 출처 카드나 원문까지 확인한다.
3. 위키의 근거 등급 안에서 쓴다. 기록상 구현을 「운영 중」으로, 계획·진행 중을 완료로, 팀 성과를 본인 성과로 올리지 않는다. 미출시·미배포·롤백은 그대로 적는다.
4. 위키에서 찾지 못하면 「경험이 없다」가 아니라 「현재 위키에서 확인되지 않음」으로 보고하고 사용자에게 묻는다. 지어서 채우지 않는다.

## B. 점검 — 사이트에 갱신할 것이 있는지

1. 사이트 내용이 마지막으로 바뀐 날을 본다: `git log -1 --format=%cs origin/master -- src/data src/content`.
2. `$WIKI/wiki/log.md` 에서 그날 이후 항목을 읽는다 — 새 출처, 정정, 기간 변경. `wiki/index.md` 맨 위의 갱신일도 본다.
3. 사이트 항목을 위 표의 위키 페이지와 대조해 셋으로 나눈다.
   - **새로 넣을 것** — 위키에는 있고 사이트에는 없는 경력·프로젝트. 회사 일인지 개인 프로젝트인지는 `wiki/profile.md` 「개인 프로젝트 구분」을 따른다.
   - **어긋난 것** — 기간·역할·수치·기술·표현이 위키와 다르다. 위키를 따르고, `log.md` 에 정정 기록이 있으면 그 항목을 근거로 단다.
   - **낡은 것** — 위키에서는 끝난 일인데 사이트에 「현재」·「운영 중」으로 남은 것, `open-questions.md` 에 걸려 있는 주장.
4. 항목마다 위키 경로를 붙여 보고하고, 무엇을 고칠지는 사용자가 정한다. 항목이 여럿이면 hsb `github-conventions` 대로 하나씩 이슈로 등록한다 (영역 `content`).

## 사이트에 옮길 때

- **공개 사이트다.** 회사명·출시 게임명·공개 기술명까지만 쓴다. 위키 프로젝트 페이지에는 사내 코드명·저장소명이 적혀 있으므로 그대로 옮기지 않는다. 사내 코드명·저장소명·커밋 해시·PR 번호·내부 URL·사람 이름·게임 캐릭터 이름은 이력서 표현으로 바꾼다 (예: 「사내 생성형 AI 플랫폼」).
- 고친 줄만 이름 검사를 한다. 아래 명령이 아무것도 찾지 않아야 하고, 나온 것은 하나씩 공개해도 되는지 본다.
  ```bash
  git diff origin/master -- src/data src/content | grep '^+' | grep -v '^+++' \
    | rg -i 'gitlab|notion\.so|\b[0-9a-f]{7,40}\b|PR #|#[0-9]{3,}'
  ```
- 「왜 이 방법인가」는 프로젝트 페이지의 「판단 이유」 절과 그 출처 카드(`wiki/sources/user-note-*-judgment*.md`)의 「쓸 표현」 안에서 쓰고 「쓰지 않을 것」은 옮기지 않는다. 판단 이유는 사용자 회고라 실험·측정 결과처럼 쓰지 않는다.
- 사내 화면 캡처나 회사의 공개 허락이 있어야 하는 것은 `ext:capture` 레이블로 이슈를 남긴다.
- `replaces`·`category`·`teckStack` 연결은 CLAUDE.md 「구조」, 검사는 「로컬 검사」를 따른다.
- 사용자가 위키와 다르게 쓰기로 정한 것은 PR 본문에 적는다. 사이트 문구를 위키 근거로 되돌려 쓰지 않는다. 위키를 갱신해야 하면 사용자에게 알린다 (그쪽 `career-ingest` 스킬이 맡는다).
