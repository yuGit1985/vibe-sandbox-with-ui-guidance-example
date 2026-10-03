"use client";

import { useState } from "react";
import type { CustomerNote } from "@/ports/customer-repository";
import { Icon } from "@/ui/components/icon";

const formatDateTime = (value: string) =>
  new Intl.DateTimeFormat("ja-JP", {
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo",
  }).format(new Date(value));

type CustomerNotesProps = {
  notes: CustomerNote[];
  onAdd: (body: string) => void;
};

export function CustomerNotes({ notes, onAdd }: CustomerNotesProps) {
  const [body, setBody] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!body.trim()) {
      setError("メモを入力してください。");
      return;
    }

    onAdd(body);
    setBody("");
    setError("");
  };

  return (
    <section className="notes-section">
      <div className="section-heading">
        <div>
          <h3>メモ</h3>
          <span>{notes.length}件</span>
        </div>
      </div>

      <form className="note-form" onSubmit={handleSubmit}>
        <label htmlFor="new-note">新しいメモ</label>
        <textarea
          id="new-note"
          onChange={(event) => {
            setBody(event.target.value);
            if (error) setError("");
          }}
          placeholder="商談内容や次のアクションを記録..."
          rows={3}
          value={body}
        />
        <div className="note-form__footer">
          <span
            className={error ? "form-message is-error" : "form-message"}
            aria-live="polite"
          >
            {error || "顧客に関する情報をチームで共有できます"}
          </span>
          <button className="primary-button" type="submit">
            <Icon name="memo" size={16} />
            メモを追加
          </button>
        </div>
      </form>

      <div className="notes-timeline">
        {notes.length === 0 ? (
          <p className="notes-empty">
            まだメモはありません。最初のメモを追加しましょう。
          </p>
        ) : (
          notes.map((note) => (
            <article className="note-item" key={note.id}>
              <span className="note-item__dot" />
              <div className="note-item__header">
                <strong>{note.author}</strong>
                <time dateTime={note.createdAt}>
                  {formatDateTime(note.createdAt)}
                </time>
              </div>
              <p>{note.body}</p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
