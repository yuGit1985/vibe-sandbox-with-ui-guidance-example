"use client";

import { useState } from "react";
import { Icon } from "@/ui/components/icon";

type CustomerEmailComposerProps = {
  recipientEmail: string;
  recipientName: string;
  onSend: (subject: string, body: string) => void;
};

export function CustomerEmailComposer({
  recipientEmail,
  recipientName,
  onSend,
}: CustomerEmailComposerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const resetForm = () => {
    setSubject("");
    setBody("");
    setMessage("");
    setIsError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!subject.trim()) {
      setMessage("件名を入力してください。");
      setIsError(true);
      return;
    }

    if (!body.trim()) {
      setMessage("本文を入力してください。");
      setIsError(true);
      return;
    }

    try {
      onSend(subject, body);
      setSubject("");
      setBody("");
      setMessage(`${recipientName}さんにメールを送信しました。`);
      setIsError(false);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "メールを送信できませんでした。",
      );
      setIsError(true);
    }
  };

  if (!isOpen) {
    return (
      <div className="email-action">
        <button
          className="email-action__button"
          type="button"
          onClick={() => setIsOpen(true)}
        >
          <Icon name="mail" size={16} />
          メールを作成
        </button>
        {message ? (
          <p className={isError ? "email-status is-error" : "email-status"}>
            {message}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <section
      className="email-composer"
      aria-label={`${recipientName}へのメール`}
    >
      <div className="email-composer__heading">
        <div>
          <span className="email-composer__icon">
            <Icon name="mail" size={16} />
          </span>
          <div>
            <h3>メールを作成</h3>
            <p>{recipientEmail}</p>
          </div>
        </div>
        <button
          className="icon-button"
          type="button"
          aria-label="メール作成を閉じる"
          onClick={() => {
            setIsOpen(false);
            resetForm();
          }}
        >
          <Icon name="close" size={17} />
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email-subject">件名</label>
        <input
          id="email-subject"
          onChange={(event) => {
            setSubject(event.target.value);
            if (isError) setMessage("");
          }}
          placeholder="件名を入力"
          type="text"
          value={subject}
        />
        <label htmlFor="email-body">本文</label>
        <textarea
          id="email-body"
          onChange={(event) => {
            setBody(event.target.value);
            if (isError) setMessage("");
          }}
          placeholder={`${recipientName}さんへのメッセージを入力...`}
          rows={5}
          value={body}
        />
        <div className="email-composer__footer">
          <span
            aria-live="polite"
            className={isError ? "form-message is-error" : "form-message"}
          >
            {message || "送信内容を確認してから送信してください"}
          </span>
          <button className="primary-button" type="submit">
            <Icon name="send" size={14} />
            送信する
          </button>
        </div>
      </form>
    </section>
  );
}
