/**
 * 챕터 품질 검사. 사용법: node scripts/check-chapters.mjs
 *
 * 검사 항목
 *  - frontmatter: title 번호 접두사, sidebar.order(섹션 내 1..N 유일), learning_objectives,
 *    references(화이트리스트 도메인), prerequisites 슬러그 형식, estimated_minutes 범위
 *  - 본문 길이(한글 기준), 시각 자료(DocImage/ASCII/표), 프롬프트 예시 개수
 *  - DocImage 경로가 public/ 아래에 실제로 존재하는지
 *  - MDX 함정: 코드블록 밖 중괄호
 *  - Quiz: 섹션 마지막 챕터에만, section 값이 디렉터리명과 일치
 *  - 퀴즈 JSON: 문항 수, answer 범위, 필드 존재
 */
import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';

const DOCS_DIR = 'src/content/docs';
const QUIZ_DIR = 'public/data/quiz';
const PUBLIC_DIR = 'public';

const ALLOWED_HOSTS = [
  'learn.chatgpt.com',
  'openai.com',
  'agentskills.io',
  'help.openai.com',
];

const problems = [];
const warnings = [];
const stats = [];

function addProblem(file, message) {
  problems.push(`${file}: ${message}`);
}
function addWarning(file, message) {
  warnings.push(`${file}: ${message}`);
}

function splitFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  return { fm: match[1], body: match[2] };
}

/** YAML 하위 집합 파서: 이 프로젝트의 frontmatter 형태만 다룬다. */
function parseFrontmatter(fm) {
  const result = {};
  const lines = fm.split('\n');
  let currentKey = null;
  let nestedKey = null;

  for (const line of lines) {
    if (/^[a-z_]+:/.test(line)) {
      const [, key, rest] = line.match(/^([a-z_]+):\s*(.*)$/);
      currentKey = key;
      nestedKey = null;
      result[key] = rest === '' ? [] : rest.replace(/^["']|["']$/g, '');
      continue;
    }
    if (/^  [a-z_]+:/.test(line) && currentKey) {
      const [, key, rest] = line.match(/^  ([a-z_]+):\s*(.*)$/);
      if (!result[currentKey] || Array.isArray(result[currentKey])) {
        if (!result[currentKey] || Array.isArray(result[currentKey])) result[currentKey] = {};
      }
      if (typeof result[currentKey] === 'object' && !Array.isArray(result[currentKey])) {
        result[currentKey][key] = rest.replace(/^["']|["']$/g, '');
      }
      nestedKey = key;
      continue;
    }
    if (/^\s+-\s/.test(line) && currentKey) {
      const value = line.replace(/^\s+-\s/, '').trim();
      if (!Array.isArray(result[currentKey])) result[currentKey] = [];
      result[currentKey].push(value.replace(/^["']|["']$/g, ''));
      continue;
    }
    if (/^\s{4}[a-z_]+:/.test(line) && currentKey) {
      // references 항목의 title/url/accessed
      const [, key, rest] = line.match(/^\s{4}([a-z_]+):\s*(.*)$/);
      if (Array.isArray(result[currentKey]) && result[currentKey].length > 0) {
        const last = result[currentKey][result[currentKey].length - 1];
        if (typeof last === 'object') {
          last[key] = rest.replace(/^["']|["']$/g, '');
        } else {
          result[currentKey][result[currentKey].length - 1] = {
            [key]: rest.replace(/^["']|["']$/g, ''),
          };
        }
      }
      continue;
    }
    if (/^\s+-\s*[a-z_]+:/.test(line) && currentKey) {
      const [, key, rest] = line.match(/^\s+-\s*([a-z_]+):\s*(.*)$/);
      if (!Array.isArray(result[currentKey])) result[currentKey] = [];
      result[currentKey].push({ [key]: rest.replace(/^["']|["']$/g, '') });
      nestedKey = key;
      continue;
    }
  }
  return result;
}

function stripCodeFences(body) {
  return body.replace(/```[\s\S]*?```/g, '');
}

function countKoreanBody(body) {
  const withoutImports = body.replace(/^import .*$/gm, '');
  const withoutComponents = withoutImports.replace(/<[^>]+>/g, '');
  return withoutComponents.replace(/\s/g, '').length;
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

const sectionDirs = (await readdir(DOCS_DIR, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

for (const section of sectionDirs) {
  const dir = path.join(DOCS_DIR, section);
  const files = (await readdir(dir)).filter((f) => f.endsWith('.mdx')).sort();

  if (files.length === 0) {
    addProblem(section, '챕터 파일이 없습니다');
    continue;
  }

  const orders = [];

  for (const [index, file] of files.entries()) {
    const filePath = path.join(dir, file);
    const rel = `${section}/${file}`;
    const raw = await readFile(filePath, 'utf8');
    const split = splitFrontmatter(raw);

    if (!split) {
      addProblem(rel, 'frontmatter를 찾을 수 없습니다');
      continue;
    }

    const fm = parseFrontmatter(split.fm);
    const body = split.body;
    const prose = stripCodeFences(body);

    // title
    const title = typeof fm.title === 'string' ? fm.title : '';
    if (!title) addProblem(rel, 'title이 없습니다');
    if (/^\d+[-.]\d+[.\s]/.test(title)) addProblem(rel, `title에 번호 접두사: "${title}"`);

    // sidebar.order
    const order = Number(fm.sidebar?.order);
    if (!Number.isInteger(order)) {
      addProblem(rel, 'sidebar.order가 없거나 정수가 아닙니다');
    } else {
      if (order > files.length) addProblem(rel, `sidebar.order=${order}가 섹션 챕터 수(${files.length})를 초과`);
      if (orders.includes(order)) addProblem(rel, `sidebar.order=${order} 중복`);
      orders.push(order);
    }

    // learning_objectives
    const objectives = Array.isArray(fm.learning_objectives) ? fm.learning_objectives : [];
    if (objectives.length < 3) addWarning(rel, `learning_objectives ${objectives.length}개 (3개 이상 권장)`);

    // references
    const refs = Array.isArray(fm.references) ? fm.references : [];
    if (refs.length < 2) addProblem(rel, `references ${refs.length}개 (2개 이상 필요)`);
    for (const ref of refs) {
      const url = typeof ref === 'string' ? ref : ref.url;
      if (!url) {
        addProblem(rel, 'references 항목에 url이 없습니다');
        continue;
      }
      let host;
      try {
        host = new URL(url).host;
      } catch {
        addProblem(rel, `잘못된 URL: ${url}`);
        continue;
      }
      if (!ALLOWED_HOSTS.includes(host)) addProblem(rel, `화이트리스트 밖 도메인: ${host}`);
    }

    // prerequisites
    const prereqs = Array.isArray(fm.prerequisites) ? fm.prerequisites : [];
    for (const p of prereqs) {
      if (!/^\d+-\d+-[a-z0-9-]+$/.test(p)) addProblem(rel, `prerequisites 형식 오류: "${p}"`);
    }

    // estimated_minutes
    const minutes = Number(fm.estimated_minutes);
    if (Number.isInteger(minutes) && (minutes < 20 || minutes > 45)) {
      addWarning(rel, `estimated_minutes=${minutes} (20~45 권장)`);
    }

    // 본문 길이
    const length = countKoreanBody(prose);
    if (length < 1500) addProblem(rel, `본문 ${length}자 (1500자 미만)`);
    else if (length < 2000) addWarning(rel, `본문 ${length}자 (2000자 목표)`);

    // 시각 자료
    const docImages = [...body.matchAll(/<DocImage\b[\s\S]*?\/>/g)].map((m) => m[0]);
    const hasAscii = /[┌└├│▶▼]/.test(body);
    const hasTable = /\n\|[^\n]*\|\s*\n\s*\|[\s:|-]+\|/.test(body);
    if (docImages.length === 0 && !hasAscii && !hasTable) {
      addProblem(rel, '시각 자료(DocImage/ASCII/표)가 없습니다');
    }
    if (docImages.length === 0) addWarning(rel, 'DocImage가 없습니다');
    if (!hasAscii && !hasTable) addWarning(rel, 'ASCII 다이어그램/표가 없습니다');

    // DocImage 경로 검증
    for (const tag of docImages) {
      for (const attr of ['light', 'dark']) {
        const match = tag.match(new RegExp(`${attr}="([^"]+)"`));
        if (!match) continue;
        const imgPath = path.join(PUBLIC_DIR, match[1]);
        if (!(await exists(imgPath))) addProblem(rel, `이미지 없음: ${match[1]}`);
      }
      if (!/alt="/.test(tag)) addProblem(rel, 'DocImage에 alt가 없습니다');
      if (!/source="/.test(tag)) addWarning(rel, 'DocImage에 source(출처)가 없습니다');
    }

    // 프롬프트 예시
    const codeBlocks = [...body.matchAll(/```/g)].length / 2;
    if (codeBlocks < 2) addWarning(rel, `코드블록 ${Math.floor(codeBlocks)}개 (프롬프트 예시 2개 이상 권장)`);

    // MDX 함정: 코드블록 밖 중괄호 (컴포넌트 표현식은 제외)
    const proseNoComponents = prose.replace(/<[^>]*>/g, '').replace(/^import .*$/gm, '');
    if (/[{}]/.test(proseNoComponents)) {
      addProblem(rel, '코드블록 밖에 중괄호가 있습니다 (MDX 빌드 실패 위험)');
    }

    // Quiz 배치
    const quizMatch = body.match(/<Quiz\s+section="([^"]+)"/);
    const isLast = index === files.length - 1;
    if (quizMatch && !isLast) addProblem(rel, 'Quiz가 섹션 마지막 챕터가 아닌 곳에 있습니다');
    if (!quizMatch && isLast) addProblem(rel, '섹션 마지막 챕터인데 Quiz가 없습니다');
    if (quizMatch && quizMatch[1] !== section) {
      addProblem(rel, `Quiz section="${quizMatch[1]}" 이 디렉터리명(${section})과 다릅니다`);
    }

    stats.push({ rel, order, length, images: docImages.length, title });
  }

  // 퀴즈 JSON
  const quizPath = path.join(QUIZ_DIR, `${section}.json`);
  if (!(await exists(quizPath))) {
    addProblem(section, `퀴즈 JSON 없음: ${quizPath}`);
  } else {
    const items = JSON.parse(await readFile(quizPath, 'utf8'));
    if (!Array.isArray(items)) addProblem(section, '퀴즈 JSON이 배열이 아닙니다');
    else {
      if (items.length < 10) addWarning(section, `퀴즈 ${items.length}문항 (12문항 권장)`);
      const ids = new Set();
      for (const item of items) {
        if (!item.id) addProblem(section, '퀴즈 항목에 id가 없습니다');
        if (ids.has(item.id)) addProblem(section, `퀴즈 id 중복: ${item.id}`);
        ids.add(item.id);
        if (!item.question) addProblem(section, `${item.id}: question 없음`);
        if (!Array.isArray(item.options) || item.options.length !== 4) {
          addProblem(section, `${item.id}: options가 4개가 아닙니다`);
        }
        if (!Number.isInteger(item.answer) || item.answer < 0 || item.answer > 3) {
          addProblem(section, `${item.id}: answer가 0~3 정수가 아닙니다 (${item.answer})`);
        }
        if (!item.explanation) addWarning(section, `${item.id}: explanation 없음`);
      }
    }
  }
}

console.log('=== 챕터 통계 ===');
for (const s of stats) {
  console.log(`${s.rel.padEnd(58)} order=${s.order} ${String(s.length).padStart(5)}자 img=${s.images}`);
}
console.log(`\n총 ${stats.length}개 챕터, 평균 ${Math.round(stats.reduce((a, s) => a + s.length, 0) / (stats.length || 1))}자`);

if (warnings.length) {
  console.log(`\n=== 경고 ${warnings.length}건 ===`);
  for (const w of warnings) console.log(`  ! ${w}`);
}
if (problems.length) {
  console.log(`\n=== 문제 ${problems.length}건 ===`);
  for (const p of problems) console.log(`  x ${p}`);
  process.exit(1);
}
console.log('\n문제 없음.');
