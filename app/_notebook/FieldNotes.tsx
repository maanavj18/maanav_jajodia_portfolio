import { MarginNote, marked, noteFor, type Annotation, type Mark } from "./Pencil";

type Props = {
  items: string[];
  marks?: Mark[];
  annotations?: Annotation[];
};

/** Bullets in the main column, with any annotation hung in the right margin beside its line. */
export function FieldNotes({ items, marks, annotations }: Props) {
  return (
    <ul className="field-notes">
      {items.map((item) => {
        const note = noteFor(item, annotations);
        return (
          <li key={item} className="field-notes__item">
            <p className="field-notes__text">{marked(item, marks)}</p>
            {note && <MarginNote>{note}</MarginNote>}
          </li>
        );
      })}
    </ul>
  );
}
