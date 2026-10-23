# 공식 출처 검토 기록

확인일은 2026-10-23이다. 9개 섹션의 32개 챕터, 첫 화면, 퀴즈 9개 파일과 이미지 출처 목록을
검토했다. 기존 학습 구조를 유지하고 바뀐 제품 사실과 그 사실을 평가하는 퀴즈를 갱신했다.
과거 발표·스크린샷은 당시 자료로 남기며 현재의 기본값이나 이용 자격으로 단정하지 않는다.

## 반영한 변화와 근거

| 범위 | 반영한 내용 | 현재 공식 근거 |
|---|---|---|
| 입문·모델 | GPT-6.1 Sol·GPT-6 Astra·GPT-6 Luna, Power의 가변 기본값, 은퇴 모델, Standard 요율과 속도별 사용량 | [Models](https://learn.chatgpt.com/docs/models), [Pricing](https://learn.chatgpt.com/docs/pricing), [Speed](https://learn.chatgpt.com/docs/agent-configuration/speed) |
| 실행 위치·장시간 작업 | Work Cloud의 별도 로컬 접근, 새 대화만 동기화, 로컬 자원 연결 조건 | [Get started](https://learn.chatgpt.com/docs/get-started-with-work), [Local computer access](https://learn.chatgpt.com/docs/enterprise/cloud-local-access) |
| 결과물·공유 맥락 | Space의 Pages·Slides, 모바일과 직접 편집의 차이, 페이지 안 시각화 | [Space](https://learn.chatgpt.com/docs/space/getting-started), [Pages](https://learn.chatgpt.com/docs/space/pages), [Visualizations](https://learn.chatgpt.com/docs/visualizations) |
| 이미지·앱 | Windows Appshots와 단축키·전송 대상, Computer Use와 캡처의 차이 | [Appshots](https://learn.chatgpt.com/docs/appshots), [Computer Use](https://learn.chatgpt.com/docs/computer-use) |
| 음성·위임 | 기존 Codex 작업의 음성 롤아웃, 웹 Ultra와 로컬 위임 조건 | [Voice](https://learn.chatgpt.com/docs/features/voice), [Subagents](https://learn.chatgpt.com/docs/agent-configuration/subagents) |
| 개인화 | Computer History의 서버 처리·임시 이벤트·생성 메모리와 일시정지의 경계 | [Computer History](https://learn.chatgpt.com/docs/customization/computer-history), [Memories](https://learn.chatgpt.com/docs/customization/memories) |
| 도구 연결 | Chat·모바일 플러그인, Desktop only, 공유 연결의 실제 신원, 클라우드 브라우저 로그인 | [Plugins](https://learn.chatgpt.com/docs/plugins), [Connections](https://learn.chatgpt.com/docs/enterprise/shared-connections), [Browser](https://learn.chatgpt.com/docs/browser) |
| 자동화 | Gmail·Slack·GitHub 이벤트의 표면·지원 범위, 일정 혼합 불가, Team Tasks의 계정·기록·인계 | [Scheduled tasks](https://learn.chatgpt.com/docs/automations), [Teams](https://learn.chatgpt.com/docs/enterprise/teams) |
| 지속 위임 | dots의 별도 이용 자격·로컬 연결·작업 중단 범위 | [Dots](https://learn.chatgpt.com/docs/dots) |
| 재사용·이전 | Enterprise 커스텀 GPT의 플러그인 이전, 액션·선택 모델·공유·설치 재검토 | [Migration](https://learn.chatgpt.com/docs/migrate-custom-gpts), [Build plugins](https://learn.chatgpt.com/docs/build-plugins) |
| Sites | 방문자별 플러그인 데이터, 워크스페이스 비공개 조건, 외부 초대·공동 편집, 실제 게시 검토, 제3자 결제업체 조건 | [Sites](https://learn.chatgpt.com/docs/sites), [Data](https://learn.chatgpt.com/docs/sites/data-and-connections), [Sharing](https://learn.chatgpt.com/docs/sites/publishing-and-sharing), [Management](https://learn.chatgpt.com/docs/sites/managing-a-site) |
| 보안·관리 | 자동 검토의 허용·거부, Work Cloud·Work Local·Codex Local, Agent Security, 감사 이벤트·로컬 OTel 구분 | [Permissions](https://learn.chatgpt.com/docs/permission-modes), [Auto-review](https://learn.chatgpt.com/docs/sandboxing/auto-review), [Admin FAQ](https://learn.chatgpt.com/docs/enterprise/work-admin-faq), [Agent Security](https://learn.chatgpt.com/docs/enterprise/agent-security), [Audit](https://learn.chatgpt.com/docs/enterprise/compliance-api) |

## 현재 안내와 역사적 발표의 구분

[워크스페이스 에이전트 발표](https://openai.com/index/introducing-workspace-agents-in-chatgpt/)의
갱신된 상단은 Business·Enterprise·Edu의 일반 제공을 명시한다. 본문에는 4월의 프리뷰 안내와
과거 과금 시작일이 남아 있어 현재 플랜·요율로 그대로 쓰지 않는다.

[Excel 발표](https://openai.com/index/chatgpt-for-excel/)의 5월 5일 갱신에는 당시 GPT-5.5가
나온다. 해당 발표의 기반 모델과 현재 Work의 모델 선택을 구분한다. 새 모델을 쓴다는 사실만으로
연결·행동·조직 접근 권한이 추가되지는 않는다.

## 유지한 범위와 확인 한계

프롬프트 설계, 파일 원본 대조, 검색 출처 검토, 직무별 워크플로와 도입 측정 원칙은 구조를
유지했다. 최신 제품 조건은 해당 챕터에서 고쳤다. 신규 이미지·의존성·배포 설정은 추가하지 않았다.
공식 문서는 계정별 롤아웃이나 실제 워크스페이스 설정을 증명하지 않으므로 해당 기능의 실제
노출·기업 계약·규제 적용은 계정과 관리자 안내에서 확인해야 한다.
