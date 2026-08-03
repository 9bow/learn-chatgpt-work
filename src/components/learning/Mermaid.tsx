import { useEffect, useId, useRef, useState } from 'react';

type Props = {
  chart: string;
};

export default function Mermaid({ chart }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const rawId = useId();
  const graphId = `mermaid-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;

  useEffect(() => {
    let cancelled = false;

    async function render() {
      try {
        const mermaid = (await import('mermaid')).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: 'dark',
          securityLevel: 'strict',
          fontFamily: 'inherit',
        });
        const { svg } = await mermaid.render(graphId, chart);
        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (cause: unknown) {
        console.error('Mermaid 렌더링 실패:', cause);
        if (!cancelled) {
          setError('다이어그램을 렌더링하지 못했습니다.');
        }
      }
    }

    void render();

    return () => {
      cancelled = true;
    };
  }, [chart, graphId]);

  if (error) {
    return <pre>{chart}</pre>;
  }

  return <div ref={containerRef} style={{ overflowX: 'auto', margin: '1.5rem 0' }} />;
}
