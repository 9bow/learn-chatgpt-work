# 챕터 작성 가이드 (필독)

이 문서는 `learn-chatgpt-work` 학습 사이트의 모든 챕터가 따라야 하는 규칙이다.
챕터를 작성하기 전에 전체를 읽고, 작성 후 마지막 체크리스트로 자기 검수한다.

---

## 0. 프로젝트 좌표

- 프로젝트 루트: `/Users/reserve/Workspace/learn-series/learn-chatgpt-work`
- 챕터 파일: `src/content/docs/<섹션 디렉터리>/<챕터 슬러그>.mdx`
- 1차 자료(로컬 사본):
  - `SRC_DOCS = /private/tmp/claude-501/-Users-reserve-Workspace-learn-series-learn-chatgpt-work/c8dc9b01-5bdb-43ec-bfb9-0b8e9f4b2328/scratchpad/docs/`
    → OpenAI 공식 제품 문서(`learn.chatgpt.com/docs/*`)의 마크다운 사본
  - `SRC_WEB = /private/tmp/claude-501/-Users-reserve-Workspace-learn-series-learn-chatgpt-work/c8dc9b01-5bdb-43ec-bfb9-0b8e9f4b2328/scratchpad/src/`
    → OpenAI Academy·발표 페이지 사본
  - `.../scratchpad/chatgpt-work-raw.md` → `openai.com/chatgpt-work/` 제품 페이지 전문
- 이미지 인벤토리: `docs/image-inventory.md`

**중요: 사실은 반드시 위 1차 자료에서 확인한 것만 쓴다.** 자료에 없는 기능·수치·화면을
추측해서 쓰지 않는다. 자료가 부족하면 그 주제는 짧게 쓰고, 대신 자료에 있는 내용을 깊게 쓴다.
필요하면 `curl -sL "https://learn.chatgpt.com/docs/<path>.md"`로 원문을 추가로 가져올 수 있다.

---

## 1. 대상 독자와 톤

- 독자: **비개발자 직장인** — 기획·운영·마케팅·영업·재무·HR·관리자, 그리고 일상 사용자.
- 코드를 못 읽어도 이해되게 쓴다. 개발자용 기능(CLI, IDE, 리포지토리, 샌드박스 옵션)은
  "이런 게 있고 언제 쓸모가 있다" 수준으로만 언급하고 깊이 들어가지 않는다.
- 존댓말 서술체("~합니다")가 아니라 **간결한 설명체("~한다")**를 기본으로 쓴다.
  단, 독자에게 직접 권하는 문장은 "~하세요"를 써도 된다.
- 과장 금지. "혁신적", "게임 체인저", "N배 향상" 같은 표현을 쓰지 않는다.

## 2. 사실 정확성 규칙 (가장 중요)

1. **검증 불가능한 통계 금지.** 출처 없는 수치("생산성 40% 향상")는 절대 쓰지 않는다.
   1차 자료에 있는 수치(예: "플러그인 1,400개 이상", "Terra 20% 인하, Luna 80% 인하")만 쓰고
   출처를 남긴다.
2. **날짜는 자료에 명시된 것만.** 이 사이트의 기준 시점은 **2026년 8월 초**다.
   기능 출시 시점을 쓸 때는 `whats-new.md`의 주차 표기를 근거로 쓴다.
3. **가용성 문구를 반드시 붙인다.** 기능은 플랜·플랫폼·지역·워크스페이스 설정·롤아웃에 따라
   다르다. 챕터마다 최소 1회 이 취지를 밝힌다(공식 문서의 상투 문구:
   "Features depend on your plan, platform, region, rollout, and workspace settings").
4. **명칭 주의:**
   - `ChatGPT Work`는 ChatGPT 안의 모드다. "ChatGPT Work 앱"이라는 별도 앱은 없다.
     정확히는 **ChatGPT 데스크톱 앱(macOS/Windows)·웹·모바일에서 Work로 전환**해 쓴다.
   - 2026-07-09에 **Codex 앱이 ChatGPT 데스크톱 앱으로 통합**됐다. 그래서 공식 문서 URL과
     일부 화면에는 아직 `codex`라는 경로·표기가 남아 있다. 이 점을 필요할 때 각주로 설명한다.
   - `Codex`는 지금도 **개발자용 뷰**로 별도 존재한다. Work와 기능이 겹치지만 화면이 다르다.
   - 예약 작업의 공식 한국어 표기는 **예약 작업(scheduled tasks)** 으로 통일한다.
     문서 URL이 `automations`인 것은 과거 명칭 때문이다.
5. **영문 용어는 괄호 병기.** 예: 계획 모드가 아니라 **Plan 모드**, 스킬(skills),
   플러그인(plugins), 커넥터(connectors), 서브에이전트(subagents), 예약 작업(scheduled tasks).
   자동 번역식 오역을 피한다(예: `Work locally`를 "지역적으로 일하기"로 쓰지 말 것 →
   "로컬에서 실행(Work locally)").

## 3. frontmatter 스키마

```yaml
---
title: "번호 없는 챕터 제목"
description: 한 줄 설명 (검색 결과와 카드에 노출)
sidebar:
  order: 1            # 섹션 내부 1..N 정수. 40, 51 같은 전역 번호 금지
learning_objectives:
  - "이 챕터를 마치면 ~할 수 있다"
  - "…"
prerequisites:
  - "1-1-what-is-chatgpt-work"   # 앞선 챕터의 슬러그. 디렉터리명이나 자유 문장 금지
estimated_minutes: 30            # 25~40
references:
  - title: "Get started with ChatGPT Work"
    url: "https://learn.chatgpt.com/docs/get-started-with-work"
    accessed: "2026-08-04"
---
```

- `title`에 **번호 접두사를 넣지 않는다** (`"1-1. ChatGPT Work란"` ❌ → `"ChatGPT Work란 무엇인가"` ✅).
- `learning_objectives` 3~4개, `references` 2~5개. references는 **실제로 참고한 URL만**.
- 첫 챕터(1-1)는 `prerequisites`를 비운다(키 자체를 생략).

### 참고 URL 화이트리스트

아래 도메인/경로만 쓴다. 없는 페이지를 상상해서 URL을 만들지 않는다.

- `https://learn.chatgpt.com/docs/<path>` — 확인된 path: `quickstart`, `use-chatgpt`,
  `get-started-with-work`, `prompting`, `personalize`, `skills-and-plugins`, `permission-modes`,
  `models`, `pricing`, `glossary`, `whats-new`, `app`, `web`, `projects`, `sites`,
  `visualizations`, `automations`, `long-running-work`, `notifications`, `browser`,
  `computer-use`, `features/voice`, `plugins`, `web-search`, `image-generation`, `image-inputs`,
  `appshots`, `chrome-extension`, `artifacts-viewer`, `reference/slash-commands`,
  `customization/memories`, `customization/computer-history`, `agent-configuration/subagents`,
  `build-skills`, `extend/mcp`, `enterprise/work-admin-faq`, `enterprise/governance`,
  `enterprise/apps-and-connectors`, `features/codex-micro`, `extend/record-and-replay`,
  `remote-connections`, `webmcp`, `import`, `changelog`
- `https://openai.com/chatgpt-work/`
- `https://openai.com/business/`, `https://openai.com/business/pricing`,
  `https://openai.com/business/apps/`, `https://openai.com/business/workspace-agents/`
- `https://openai.com/academy/<topic>/` — 확인된 topic: `getting-started`,
  `how-to-use-chatgpt-work-for-everyday-tasks`, `workspace-agents`, `skills`, `chatgpt-sites`,
  `projects`, `search-and-deep-research`, `working-with-files`, `data-analysis`,
  `personalization`, `custom-gpts`, `image-generation`, `responsible-and-safe-use`,
  `managers`, `operations`, `writing`, `brainstorming`, `research`, `marketing`, `sales`,
  `finance`, `customer-success`
- `https://openai.com/index/introducing-workspace-agents-in-chatgpt/`,
  `https://openai.com/index/introducing-company-knowledge/`,
  `https://openai.com/index/gpt-5-6/`, `https://openai.com/index/introducing-gpt-live/`,
  `https://openai.com/index/chatgpt-for-excel/`, `https://openai.com/index/introducing-chatgpt-atlas/`,
  `https://openai.com/index/introducing-chatgpt-pulse/`,
  `https://openai.com/index/introducing-openai-presence/`
- `https://openai.com/enterprise-privacy/`
- 스킬 표준: `https://agentskills.io/home`

## 4. 본문 구조와 분량

- **본문 2,000자 이상**(한글 기준, frontmatter 제외). 1,500자 미만은 재작업 대상.
- `##` 소제목 4~7개. `#`(h1)은 쓰지 않는다(title이 h1).
- 권장 흐름:
  1. **왜 필요한가** — 독자가 겪는 구체적 상황 2~3문장
  2. **개념 설명** — 정의와 동작 방식, 생성 교육용 도해 또는 비교표 1개
  3. **화면으로 보기** — `DocImage`로 공식 스크린샷 + 무엇을 볼지 설명
  4. **해보기** — 복사해 쓸 수 있는 프롬프트 예시 2~4개 (```text 블록)
  5. **주의점 / 흔한 실수** — 비교표 또는 목록
  6. **정리** — 3~5개 불릿
- 다음 챕터로 이어지는 한 문장을 마지막에 둔다.

### 프롬프트 예시 규칙

- 실제로 붙여 쓸 수 있게 **한국어로** 쓴다. 자리표시자는 **대괄호**를 쓴다: `[프로젝트명]`.
  MDX에서 중괄호 `{}`는 JavaScript로 해석되므로 **본문·코드블록 밖에서 절대 쓰지 않는다**.
- 좋은 프롬프트에는 결과물·자료·제약·완료 기준·중단 지점이 들어간다(4-1 챕터 참고).
- 나쁜 예 → 좋은 예 대비를 최소 1회 보여준다.

## 5. 시각 자료 (모든 챕터 필수)

각 챕터에 **① 공식 스크린샷 1장 이상**(가능한 경우)과 **② 생성 교육용 도해 또는 비교표 1개 이상**을
반드시 넣는다. 스크린샷이 없는 주제라면 생성 교육용 도해 1개 + 표 1개로 대체한다.

### 5-1. 공식 스크린샷

`docs/image-inventory.md`에서 챕터에 매핑된 이미지를 골라 `DocImage`로 넣는다.

```mdx
import DocImage from '../../../components/learning/DocImage.astro';

<DocImage
  light="/images/official/app/codex-automations-light.webp"
  dark="/images/official/app/codex-automations-dark.webp"
  alt="ChatGPT 데스크톱 앱의 예약 작업 설정 화면"
  caption="실행 주기, 사용할 모델, 실행 환경을 지정할 수 있다"
  source="https://learn.chatgpt.com/docs/automations"
/>
```

- import 경로는 챕터 파일 기준 `../../../components/learning/DocImage.astro`다.
- light/dark 쌍이 인벤토리에 있으면 둘 다 넘긴다. 단일 이미지는 `light`만.
- **인벤토리에 없는 경로를 쓰면 깨진 이미지가 된다.** 반드시 인벤토리에서 확인하고 쓴다.
- 같은 이미지를 여러 챕터에서 재사용해도 되지만, 캡션은 그 챕터 맥락에 맞게 새로 쓴다.

### 5-2. 생성 교육용 도해

텍스트 상자와 화살표로만 만든 ASCII 도식은 사용하지 않는다. 흐름·계층·권한 경계처럼
관계를 보여 줄 필요가 있으면 실제 이미지로 만든 교육용 도해를 `DocImage`로 삽입한다.
이미지 안에는 정확한 한글 문구를 넣지 말고, 본문·캡션·alt에 의미와 예외 조건을 적는다.
생성 이미지는 공식 제품 UI처럼 보이게 만들지 않으며, 기능 조건은 반드시 공식 참고 자료로
검증한다.

```mdx
<DocImage
  light="/images/generated/work-lifecycle.webp"
  alt="목표 설정, 자료와 승인된 도구의 수집, 실행, 사람 검토로 이어지는 작업 흐름"
  caption="AI 생성 교육용 도해. 세부 기능 조건은 본문과 공식 참고 자료를 확인한다"
/>
```

### 5-3. 비교표

마크다운 표를 쓴다. 볼드 뒤에 `—`, `→` 같은 문자를 붙이지 말고 공백으로 띄운다
(`**Work** — 설명` ❌ → `**Work**: 설명` 또는 `**Work** 는 설명` ✅).

### 5-4. ConceptCard (선택)

곁가지 설명은 접힘 카드로 뺀다.

```mdx
import ConceptCard from '../../../components/learning/ConceptCard.astro';

<ConceptCard title="왜 문서 URL에 codex가 남아 있나?">
2026-07-09에 Codex 앱이 ChatGPT 데스크톱 앱으로 통합됐다. …
</ConceptCard>
```

## 6. 퀴즈 배치

각 섹션의 **마지막 챕터 맨 아래**에만 다음을 넣는다(그 외 챕터에는 넣지 않는다).

```mdx
import Quiz from '../../../components/learning/Quiz.tsx';

## 이해도 점검

<Quiz section="06-automation" client:load />
```

`section` 값은 **섹션 디렉터리명**이다(예: `01-intro`, `06-automation`).
퀴즈 JSON은 별도 담당자가 만든다. 챕터 작성자는 JSON을 만들지 않는다.

## 7. MDX 함정 (빌드 실패 원인)

- 본문에 `{`, `}`를 그대로 쓰면 빌드가 깨진다. 자리표시자는 `[대괄호]`를 쓴다.
- `<`로 시작하는 텍스트는 태그로 해석된다. 부등호는 `&lt;` 또는 코드로 감싼다.
- import 문은 frontmatter **직후**, 첫 `##` 앞에 모아 둔다.
- 컴포넌트 태그는 반드시 닫는다(`<DocImage ... />`).
- 표 안에서 파이프 `|`를 쓰려면 `\|`로 이스케이프한다.
- 리스트 들여쓰기가 4칸을 넘으면 코드블록으로 렌더된다. 2칸을 쓴다.
- **`pnpm build`를 실행하지 마세요.** 여러 작업자가 동시에 빌드하면 충돌합니다.
  빌드는 총괄이 마지막에 한 번 돌립니다.

## 8. 자기 검수 체크리스트

작성한 각 파일에 대해 확인한다.

- [ ] `title`에 번호 접두사가 없다
- [ ] `sidebar.order`가 섹션 내 1..N이다
- [ ] `learning_objectives` 3개 이상, `references` 2개 이상(화이트리스트 URL만)
- [ ] `prerequisites`가 챕터 슬러그 형식이다
- [ ] 본문 2,000자 이상
- [ ] `DocImage` 1개 이상(인벤토리에 존재하는 경로) + 생성 교육용 도해/표 1개 이상
- [ ] 복사 가능한 프롬프트 예시 2개 이상
- [ ] 중괄호 `{}`가 본문에 없다
- [ ] 출처 없는 수치가 없다
- [ ] 가용성(플랜·지역·롤아웃) 주의 문구가 있다
- [ ] 섹션 마지막 챕터에만 `<Quiz>`가 있다
