import { useEffect, useState, type ReactNode } from 'react';

type QuizItem = {
  id: string;
  question: string;
  options: string[];
  answer: number;
  explanation?: string;
};

type Props = {
  /** public/data/quiz/<section>.json 의 섹션 슬러그 (예: "01-intro") */
  section: string;
  title?: string;
};

/**
 * 최소한의 마크다운을 React 노드로 변환한다.
 * 코드 블록(```), 인라인 코드(`), 볼드(**), 줄바꿈을 지원한다.
 */
function renderMarkdown(text: string): ReactNode {
  const blocks = text.split(/```/);

  return blocks.map((block, blockIndex) => {
    // 홀수 인덱스는 코드 블록
    if (blockIndex % 2 === 1) {
      const withoutLang = block.replace(/^[a-zA-Z0-9_-]*\n/, '');
      return (
        <pre key={`code-${blockIndex}`}>
          <code>{withoutLang.replace(/\n$/, '')}</code>
        </pre>
      );
    }

    const lines = block.split('\n');
    return lines.map((line, lineIndex) => (
      <span key={`line-${blockIndex}-${lineIndex}`}>
        {renderInline(line)}
        {lineIndex < lines.length - 1 ? <br /> : null}
      </span>
    ));
  });
}

function renderInline(line: string): ReactNode {
  const parts = line.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      return <code key={index}>{part.slice(1, -1)}</code>;
    }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

export default function Quiz({ section, title = '이해도 점검 퀴즈' }: Props) {
  const [items, setItems] = useState<QuizItem[]>([]);
  const [selected, setSelected] = useState<Record<string, number>>({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const base = import.meta.env.BASE_URL.replace(/\/$/, '');
    fetch(`${base}/data/quiz/${section}.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`퀴즈 데이터를 불러오지 못했습니다 (${response.status})`);
        }
        return response.json();
      })
      .then((data: QuizItem[]) => setItems(data))
      .catch((cause: unknown) => {
        console.error('퀴즈 로드 실패:', cause);
        setError('퀴즈 데이터를 불러오지 못했습니다.');
      });
  }, [section]);

  if (error) {
    return <p className="quiz-root">{error}</p>;
  }
  if (items.length === 0) {
    return <p className="quiz-root">퀴즈를 불러오는 중…</p>;
  }

  const answeredCount = Object.keys(selected).length;
  const correctCount = items.filter(
    (item) => selected[item.id] === item.answer
  ).length;

  return (
    <section className="quiz-root" aria-label={title}>
      <h3>{title}</h3>
      <p>
        총 {items.length}문항 · 정답 {correctCount} / 응답 {answeredCount}
        {answeredCount > 0 ? (
          <button
            type="button"
            className="quiz-reset"
            onClick={() => setSelected({})}
          >
            다시 풀기
          </button>
        ) : null}
      </p>

      {items.map((item, index) => {
        const choice = selected[item.id];
        const answered = choice !== undefined;

        return (
          <div className="quiz-question" key={item.id}>
            <p>
              <strong>Q{index + 1}.</strong> {renderMarkdown(item.question)}
            </p>
            {item.options.map((option, optionIndex) => {
              let state: 'correct' | 'wrong' | undefined;
              if (answered) {
                if (optionIndex === item.answer) {
                  state = 'correct';
                } else if (optionIndex === choice) {
                  state = 'wrong';
                }
              }

              return (
                <button
                  type="button"
                  key={optionIndex}
                  className="quiz-option"
                  data-state={state}
                  disabled={answered}
                  onClick={() =>
                    setSelected((previous) => ({
                      ...previous,
                      [item.id]: optionIndex,
                    }))
                  }
                >
                  {String.fromCharCode(65 + optionIndex)}. {renderMarkdown(option)}
                </button>
              );
            })}
            {answered && item.explanation ? (
              <div className="quiz-explanation">
                {renderMarkdown(item.explanation)}
              </div>
            ) : null}
          </div>
        );
      })}

      {answeredCount === items.length ? (
        <p className="quiz-score">
          {correctCount === items.length
            ? `전 문항 정답입니다. 다음 섹션으로 넘어가세요.`
            : `${items.length}문항 중 ${correctCount}문항 정답입니다. 틀린 문항의 해설을 확인하세요.`}
        </p>
      ) : null}
    </section>
  );
}
