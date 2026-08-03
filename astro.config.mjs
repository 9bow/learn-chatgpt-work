// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';

const GA_ID = 'G-HSGR50JRX1';

export default defineConfig({
  site: 'https://9bow.github.io',
  base: '/learn-chatgpt-work',
  integrations: [
    starlight({
      title: 'ChatGPT Work 학습 사이트',
      description:
        'ChatGPT Work의 최신 기능을 업무와 일상에 적용하는 방법을 32개 챕터로 배우는 한국어 학습 사이트',
      defaultLocale: 'root',
      locales: { root: { label: '한국어', lang: 'ko' } },
      head: [
        {
          tag: 'script',
          attrs: {
            async: true,
            src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
          },
        },
        {
          tag: 'script',
          content:
            'window.dataLayer = window.dataLayer || [];\n' +
            'function gtag(){dataLayer.push(arguments);}\n' +
            "gtag('js', new Date());\n" +
            `gtag('config', '${GA_ID}');`,
        },
      ],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/9bow/learn-chatgpt-work',
        },
      ],
      sidebar: [
        {
          label: '01. ChatGPT Work 입문',
          items: [{ autogenerate: { directory: '01-intro' } }],
        },
        {
          label: '02. 결과물 만들기',
          items: [{ autogenerate: { directory: '02-deliverables' } }],
        },
        {
          label: '03. 에이전트와 함께 일하기',
          items: [{ autogenerate: { directory: '03-working-with-agent' } }],
        },
        {
          label: '04. 프롬프팅과 컨텍스트',
          items: [{ autogenerate: { directory: '04-prompting-context' } }],
        },
        {
          label: '05. 도구·데이터 연결',
          items: [{ autogenerate: { directory: '05-connect-tools' } }],
        },
        {
          label: '06. 반복 업무 자동화',
          items: [{ autogenerate: { directory: '06-automation' } }],
        },
        {
          label: '07. Sites로 공유하기',
          items: [{ autogenerate: { directory: '07-sites' } }],
        },
        {
          label: '08. 신뢰·보안·거버넌스',
          items: [{ autogenerate: { directory: '08-trust-governance' } }],
        },
        {
          label: '09. 실전 시나리오',
          items: [{ autogenerate: { directory: '09-scenarios' } }],
        },
      ],
      customCss: ['./src/styles/custom.css'],
    }),
    react(),
  ],
});
