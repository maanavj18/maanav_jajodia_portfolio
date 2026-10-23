export function Records({ items }: { items: string[] }) {
  if (items.length === 0) return null;

  return (
    <ul className="record">
      {items.map((item) => (
        <li key={item} className="measure">
          {item}
        </li>
      ))}
    </ul>
  );
}
