# AGENTS.md

한국어 학습 사이트(Astro 7 + Starlight + React 19). 콘텐츠 수정 전에 반드시 읽을 문서:

- [`docs/authoring-guide.md`](docs/authoring-guide.md) — 챕터 작성 규칙(frontmatter 스키마,
  사실 정확성 규칙, 시각 자료 요건, 참고 URL 화이트리스트, MDX 함정)
- [`docs/image-inventory.md`](docs/image-inventory.md) — 사용 가능한 공식 이미지 목록과 출처

## 작업 순서

```bash
pnpm install
pnpm dev                        # http://localhost:4321/learn-chatgpt-work/
node scripts/check-chapters.mjs # 챕터·퀴즈 정합성 검사 (커밋 전 필수)
pnpm build
```

## 규칙

- 사실은 `learn.chatgpt.com/docs`, `openai.com` 공식 발표, OpenAI Academy에서 확인한 것만 쓴다.
  출처 없는 수치는 넣지 않는다.
- 챕터 `title`에 번호 접두사를 넣지 않고, `sidebar.order`는 섹션 내 1..N을 쓴다.
- 퀴즈는 각 섹션 마지막 챕터에만 두고, `public/data/quiz/<섹션 디렉터리>.json`과 이름을 맞춘다.
- 이미지는 `DocImage` 컴포넌트로 넣고 `source`에 원 출처 URL을 남긴다.
  새 이미지를 추가하면 `docs/image-inventory.md`도 갱신하고 `node scripts/optimize-images.mjs`를 돌린다.
- Tailwind는 쓰지 않는다(Starlight 스타일과 충돌).

## Astro 참고

- 라우팅·콘텐츠 컬렉션: https://docs.astro.build
- Starlight 컴포넌트: https://starlight.astro.build
