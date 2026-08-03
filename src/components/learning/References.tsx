type ReferenceObject = {
  title: string;
  url: string;
  accessed?: string;
};

type Reference = string | ReferenceObject;

type Props = {
  items: Reference[];
  title?: string;
};

export default function References({ items, title = '참고 자료' }: Props) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section aria-label={title}>
      <h2>{title}</h2>
      <ul className="references-list">
        {items.map((item, index) => {
          if (typeof item === 'string') {
            return (
              <li key={index}>
                <a href={item} target="_blank" rel="noopener noreferrer">
                  {item}
                </a>
              </li>
            );
          }

          return (
            <li key={index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">
                {item.title}
              </a>
              {item.accessed ? (
                <span className="references-accessed"> (확인: {item.accessed})</span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
