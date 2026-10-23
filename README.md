# learn-chatgpt-work

ChatGPT Work의 최신 기능을 업무와 일상에 적용하는 방법을 다루는 **한국어 학습 사이트**입니다.
9개 섹션의 한국어 챕터로 구성되어 있고, Astro 7(Starlight) + React 19로 만들었습니다.

**사이트: https://9bow.github.io/learn-chatgpt-work/**

## 개요

ChatGPT Work는 2026년 7월 ChatGPT에 정식 도입된 작업 모드입니다. 질문에 답하는 대화형
사용을 넘어, 파일과 연결된 도구에서 컨텍스트를 모아 **검토 가능한 결과물**(문서·발표자료·
스프레드시트·사이트)을 만들고, 예약 작업과 에이전트로 반복 업무를 대신 돌립니다.

이 사이트는 그 기능들을 **비개발자 직장인 관점**에서 정리합니다. 각 챕터는 개념 설명,
공식 문서 화면, 복사해 쓸 수 있는 한국어 프롬프트 예시, 주의점으로 구성됩니다.

최신 사실 확인일은 **2026년 10월 23일**입니다. 과거 발표와 화면은 당시 자료로 구분합니다. 기능은 플랜·플랫폼·지역·워크스페이스 설정·롤아웃에
따라 다르게 보일 수 있으므로, 각 챕터 하단의 공식 문서 링크에서 최신 상태를 확인하세요.

## 커리큘럼

| 섹션 | 내용 |
|---|---|
| 01. ChatGPT Work 입문 | Chat·Work·Codex의 차이, 플랜과 플랫폼, 로컬/클라우드, 첫 세 가지 작업, GPT-6.1 Sol·GPT-6 Astra·GPT-6 Luna와 크레딧 |
| 02. 결과물 만들기 | 문서·발표자료·스프레드시트와 Space, 파일 다루기, 이미지와 Appshot, 시각화와 데이터 분석 |
| 03. 에이전트와 함께 일하기 | Plan 모드, 개입·대기열·승인, 장시간 작업과 Goal 모드, 서브에이전트 |
| 04. 프롬프팅과 컨텍스트 | Work 프롬프팅, 커스텀 지침·메모리·Computer History, 프로젝트 |
| 05. 도구·데이터 연결 | 플러그인과 커넥터, 웹 검색과 리서치, 내장 브라우저·Chrome 확장, Computer Use |
| 06. 반복 업무 자동화 | 스킬(SKILL.md), 스킬 만들기·Record & Replay, 이벤트 예약 작업, Team Tasks, 워크스페이스 에이전트 |
| 07. Sites로 공유하기 | 내부 도구·대시보드 만들기, 배포·공동 편집·외부 초대·방문자별 데이터 연결 |
| 08. 신뢰·보안·거버넌스 | 권한·승인·샌드박스, 데이터 보호와 관리자 제어, 검증 루틴 |
| 09. 실전 시나리오 | 직무별 워크플로, 관리자·기획자 워크플로, 일상 활용, 30일 도입 로드맵 |

섹션마다 마지막 챕터에 이해도 점검 퀴즈가 있습니다.

## 로컬 실행

```bash
pnpm install
pnpm dev      # http://localhost:4321/learn-chatgpt-work/
pnpm build    # dist/ 로 정적 빌드
pnpm preview  # 빌드 결과 미리보기
```

Node 22 이상, pnpm 10 이상을 권장합니다.

## 프로젝트 구조

```
.
├── docs/                      # 작성 가이드·이미지 인벤토리 (사이트에 게시되지 않음)
├── public/
│   ├── data/quiz/             # 섹션별 퀴즈 JSON
│   └── images/                # 공식 문서·발표 인용 이미지와 생성 교육용 도해
├── scripts/optimize-images.mjs
├── src/
│   ├── components/learning/   # Quiz, ConceptCard, References, Mermaid, DocImage
│   ├── content/docs/          # 9개 섹션 학습 챕터 (MDX)
│   └── styles/custom.css
└── astro.config.mjs           # 사이드바·GA4·base path 설정
```

## 콘텐츠 원칙

- **1차 자료만 인용합니다.** 모든 사실은 `learn.chatgpt.com/docs`, `openai.com` 공식 발표,
  OpenAI Academy에서 확인한 내용이며 챕터마다 참고 링크를 남깁니다.
- **검증 불가능한 수치를 쓰지 않습니다.** "생산성 N배" 같은 표현 대신 기능의 동작 방식을 씁니다.
- **영문 용어는 원어를 병기합니다.** 예: 예약 작업(scheduled tasks), 플러그인(plugins).
- 모든 챕터에 시각 자료(공식 스크린샷, 생성 교육용 도해 또는 비교표)를 넣습니다.
- 작성 규칙 전문은 [`docs/authoring-guide.md`](docs/authoring-guide.md)에 있습니다.

## 라이선스와 출처

- 이 저장소의 **문서·코드**: MIT
- **제품 화면 이미지**: OpenAI 공식 문서(`learn.chatgpt.com`)와 공식 발표/교육 페이지
  (`openai.com`)에서 학습·해설 목적으로 출처를 표기해 인용했습니다. 모든 이미지의 권리는
  OpenAI에 있으며, 이 저장소는 OpenAI와 무관한 비공식 학습 자료입니다.
- 인용한 고객 사례와 발언은 `openai.com/chatgpt-work/`에 공개된 원문을 출처와 함께 옮긴 것입니다.
