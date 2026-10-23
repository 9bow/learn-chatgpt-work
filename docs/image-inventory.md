# 공식 이미지 인벤토리

`public/images/official/` 아래 자산 목록. 모든 이미지는 OpenAI 공식 문서
(`learn.chatgpt.com`) 또는 공식 발표/교육 페이지(`openai.com`)에서 학습·해설 목적으로
인용했으며, 권리는 OpenAI에 있습니다. 챕터에서는 반드시 `DocImage` 컴포넌트의
`source` 속성으로 원 출처 URL을 남깁니다.

## 사용법

```mdx
import DocImage from '../../../components/learning/DocImage.astro';

<DocImage
  light="/images/official/app/artifact-viewer-light.webp"
  dark="/images/official/app/artifact-viewer-dark.webp"
  alt="ChatGPT 데스크톱 앱에서 생성된 발표자료 미리보기"
  caption="오른쪽 패널에서 output.pptx 7개 슬라이드를 바로 확인할 수 있다"
  source="https://learn.chatgpt.com/docs/artifacts-viewer"
/>
```

- light/dark 쌍이 있는 이미지는 둘 다 넘긴다(테마 자동 전환).
- 단일 이미지는 `light`만 넘긴다.
- 경로는 `/images/...`로 시작한다. base path는 컴포넌트가 자동으로 붙인다.

## A. 제품 화면 스크린샷 (learn.chatgpt.com)

light/dark 쌍 존재. `alt`는 공식 문서의 원문 alt를 번역해 사용할 것.

| 파일(-light/-dark) | 공식 alt (원문) | 추천 챕터 | 출처 URL |
|---|---|---|---|
| `app/artifact-viewer-{light,dark}.webp` | ChatGPT desktop app showing a generated presentation preview. 왼쪽 대화 + 오른쪽 `output.pptx` 7슬라이드 썸네일·확대 미리보기, 하단에 `Work locally` 표시 | 2-1, 2-2 | https://learn.chatgpt.com/docs/artifacts-viewer |
| `app/multitask-{light,dark}.webp` | ChatGPT desktop app showing multiple projects in the sidebar and chats in the main pane | 3-4, 4-3 | https://learn.chatgpt.com/docs/projects |
| `app/codex-app-basic-{light,dark}.webp` | The original Codex app showing parallel project chats on macOS (2026-02 초기 앱) | 1-1(연혁), 1-2 | https://learn.chatgpt.com/docs/whats-new |
| `app/codex-windows-{light,dark}.webp` | Codex app running natively on Windows | 1-2 | https://learn.chatgpt.com/docs/windows/windows-app |
| `app/in-app-browser-{light,dark}.webp` | ChatGPT desktop app showing a browser comment on a local web app preview | 5-3, 7-1 | https://learn.chatgpt.com/docs/browser |
| `app/iab-annotations-{light,dark}.webp` | ChatGPT desktop app showing built-in browser annotation style controls | 5-3 | https://learn.chatgpt.com/docs/browser |
| `app/browser-developer-mode-{light,dark}.webp` | Browser settings showing Developer mode with full CDP access enabled | 5-3 | https://learn.chatgpt.com/docs/browser |
| `app/computer-use-approval-{light,dark}.webp` | ChatGPT desktop app asking for permission to use Calculator with Computer Use | 5-4, 8-1 | https://learn.chatgpt.com/docs/computer-use |
| `app/codex-automations-{light,dark}.webp` | Scheduled task settings in the ChatGPT desktop app | 6-3 | https://learn.chatgpt.com/docs/automations |
| `app/goal-dialog-{light,dark}.webp` | ChatGPT desktop app goal progress controls above the composer | 3-3 | https://learn.chatgpt.com/docs/prompting |
| `app/skill-selector-{light,dark}.webp` | Skills picker showing available skills in the ChatGPT desktop app | 6-1 | https://learn.chatgpt.com/docs/skills-and-plugins |
| `app/voice-dictation-{light,dark}.webp` | Voice dictation indicator in the composer with a transcribed prompt | 3-2, 4-1 | https://learn.chatgpt.com/docs/features/voice |
| `app/plugins-directory.webp` / `app/plugins-directory-dark.webp` | Plugins Directory in the ChatGPT desktop app | 5-1 | https://learn.chatgpt.com/docs/plugins |
| `app/plugins-plugin-github-invoke.png` / `-dark.png` | Installed plugin on the Plugins page | 5-1 | https://learn.chatgpt.com/docs/plugins |

단일 이미지(라이트만 존재, `light`만 사용):

| 파일 | 공식 alt | 추천 챕터 | 출처 URL |
|---|---|---|---|
| `app/work-create-presentation.webp` | A presentation created in ChatGPT Work | 1-3, 2-1 | https://learn.chatgpt.com/docs/get-started-with-work |
| `app/work-comparison-spreadsheet.webp` | A comparison spreadsheet created in ChatGPT Work | 1-3, 2-1 | https://learn.chatgpt.com/docs/get-started-with-work |
| `app/work-recurring-update.webp` | A recurring update scheduled in ChatGPT Work | 1-3, 6-3 | https://learn.chatgpt.com/docs/get-started-with-work |
| `app/work-plugins.webp` | The plugins library in ChatGPT Work | 1-3, 5-1 | https://learn.chatgpt.com/docs/get-started-with-work |

## B. 공식 발표 페이지 이미지 (openai.com)

`openai.com/chatgpt-work/` 제품 페이지의 기능 카드 — 실제 UI가 담긴 고품질 이미지.

| 파일 | 내용 | 추천 챕터 | 출처 URL |
|---|---|---|---|
| `openai/work-interface.webp` | ChatGPT Work 인터페이스 스크린샷 | 1-1 | https://openai.com/business/ |
| `openai/work-card-plan-mode.webp` | Plan 모드가 "이 sales playbook을 무엇으로 만들까?"라고 물으며 New Google Doc(Recommended) / Slide-style deck / Markdown draft / 직접 지시 중 선택을 제시하는 화면 | 3-1 | https://openai.com/chatgpt-work/ |
| `openai/work-card-account-plan.webp` | 데이터룸과 Slack 컨텍스트로 전략 계정 계획(Solara Health) 발표자료를 갱신하는 화면 | 2-1 | https://openai.com/chatgpt-work/ |
| `openai/work-card-plugins-reconcile.webp` | Oracle·Salesforce·Databricks 데이터를 정합하며 Plugins 패널에 연결된 업무 도구가 나열된 화면 | 5-1 | https://openai.com/chatgpt-work/ |
| `openai/work-card-scheduled-tasks.webp` | 이메일·Slack 컨텍스트로 정기 비즈니스 리뷰, 미팅 준비, 캠페인 작업을 예약한 화면 | 6-3 | https://openai.com/chatgpt-work/ |
| `openai/work-card-sheets-side-by-side.webp` | 데스크톱 앱에서 Google Sheets 프로그램 트래커·타임라인과 나란히 작업하는 화면 | 2-4, 5-4 | https://openai.com/chatgpt-work/ |
| `openai/work-card-sites.webp` | Sites가 콘퍼런스 랜딩 페이지를 만들고 라이브 브라우저 프리뷰를 보여주는 화면 | 7-1 | https://openai.com/chatgpt-work/ |
| `openai/workspace-agents-share.webp` | 워크스페이스 에이전트: 한 사람이 만들면 모두가 쓰는 구조 | 6-4 | https://openai.com/index/introducing-workspace-agents-in-chatgpt/ |
| `openai/workspace-agents-library.webp` | 워크스페이스 에이전트 라이브러리 | 6-4 | https://openai.com/index/introducing-workspace-agents-in-chatgpt/ |
| `openai/workspace-agents-slack.webp` | Slack에서 트리거되는 에이전트 | 6-4 | https://openai.com/index/introducing-workspace-agents-in-chatgpt/ |
| `openai/sites-create-deploy.webp` | Sites: 만들고 배포하기 쉬움 | 7-2 | https://openai.com/index/introducing-workspace-agents-in-chatgpt/ |
| `openai/connectors.webp` | 커넥터 개념 일러스트 | 5-1 | https://openai.com/index/introducing-company-knowledge/ |
| `openai/synthesize-insights.webp` | 인사이트 종합 일러스트 | 9-1 | https://openai.com/chatgpt-work/ |

OpenAI Academy 커버 아트(추상 일러스트, 섹션 도입 장식용으로만 절제해서 사용):
`openai/academy-getting-started.webp`, `academy-skills.webp`, `academy-sites.webp`,
`academy-search-deep-research.webp`, `academy-custom-gpts.webp`, `academy-projects.webp`,
`academy-research.webp`, `academy-image-creation.webp`
(출처: `https://openai.com/academy/<해당 주제>/`)

## C. 생성 교육용 도해

`public/images/generated/`의 아래 이미지는 `imagegen`으로 만든 텍스트 없는 교육용 도해다.
OpenAI 제품 화면을 재현하지 않으며, 정확한 기능 설명은 해당 챕터의 공식 출처와 본문으로
제공한다. `DocImage`의 `caption`에는 **AI 생성 교육용 도해**임을 밝힌다.

| 파일 | 표현하는 관계 | 사용 섹션 |
|---|---|---|
| `generated/work-lifecycle.webp` | 목표 설정 → 자료·승인 도구 → 실행 → 사람 검토 | 01 |
| `generated/deliverable-review.webp` | 자료 → 초안 → 부분 검토 → 개선된 결과물 | 02 |
| `generated/agent-steering.webp` | 계획·개입·승인·검토가 있는 사람과 에이전트의 협업 | 03 |
| `generated/context-layers.webp` | 요청·프로젝트·개인화·메모리의 맥락 계층 | 04 |
| `generated/connected-tools.webp` | 권한 경계를 거친 도구·데이터 연결 | 05 |
| `generated/automation-cycle.webp` | 스킬·예약·검토로 이루어진 반복 업무 순환 | 06 |
| `generated/site-release.webp` | 사이트 생성·저장·검토·접근 제어·배포 | 07 |
| `generated/governance-gate.webp` | 정책·접근 권한·샌드박스·사람 승인 계층 | 08 |
| `generated/adoption-loop.webp` | 실제 업무·표준화·자동화·검증의 도입 순환 | 09 |

## 원칙

1. **실제 UI 스크린샷을 우선**한다. 추상 아트는 챕터당 최대 1장.
2 이미지는 본문을 대체하지 않는다. 이미지 위·아래에 무엇을 보아야 하는지 한두 문장으로 설명한다.
3. 이미지 1장으로 시각 자료 요건이 충족되더라도, **생성 교육용 도해나 비교표를 최소 1개 더** 둔다.
4. 스크린샷에는 구버전 UI(예: 모델명 `GPT-5.4`)가 남아 있을 수 있다. 캡션에서 언급이 필요하면
   "문서 캡처 시점의 화면"이라고 밝힌다.

## 2026-10-23 검토 메모

이 업데이트는 기존 인용 이미지를 유지한다. 제품 화면은 원문 캡처 당시의 UI이며 현재의 모델명,
플러그인 진입점, 공유 옵션을 보장하지 않는다. 최신 절차와 이용 조건은 각 챕터의 확인일이
표시된 공식 문서가 기준이다. Computer History·Space·Team Tasks·dots의 새 화면을 임의로
재현하지 않는다. 새 이미지는 추가하지 않았으므로 이미지 최적화 대상도 없다.
