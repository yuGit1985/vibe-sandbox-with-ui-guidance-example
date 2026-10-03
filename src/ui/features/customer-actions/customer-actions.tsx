"use client";

import { useState } from "react";
import type { Customer, CustomerUpdate } from "@/ports/customer-repository";
import { Icon } from "@/ui/components/icon";

type CustomerActionsProps = {
  customer: Customer;
  onUpdate: (details: CustomerUpdate) => void;
  onDelete: () => void;
};

const toDraft = (customer: Customer): CustomerUpdate => ({
  name: customer.name,
  nameKana: customer.nameKana,
  company: customer.company,
  department: customer.department,
  title: customer.title,
  email: customer.email,
  phone: customer.phone,
  rank: customer.rank,
  status: customer.status,
  lastContactAt: customer.lastContactAt,
  tags: [...customer.tags],
});

export function CustomerActions({
  customer,
  onUpdate,
  onDelete,
}: CustomerActionsProps) {
  const [mode, setMode] = useState<"edit" | "delete" | undefined>();
  const [draft, setDraft] = useState(() => toDraft(customer));
  const [tags, setTags] = useState(customer.tags.join(", "));
  const [error, setError] = useState("");

  const openEditor = () => {
    setDraft(toDraft(customer));
    setTags(customer.tags.join(", "));
    setError("");
    setMode("edit");
  };

  const close = () => {
    setError("");
    setMode(undefined);
  };

  const updateField = <Field extends keyof CustomerUpdate>(
    field: Field,
    value: CustomerUpdate[Field],
  ) => setDraft((current) => ({ ...current, [field]: value }));

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      onUpdate({
        ...draft,
        tags: tags.split(/[、,]/),
      });
      close();
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : "更新に失敗しました。",
      );
    }
  };

  return (
    <>
      <div className="customer-actions">
        <button className="secondary-button" type="button" onClick={openEditor}>
          <Icon name="edit" size={15} />
          編集
        </button>
        <button
          className="danger-icon-button"
          type="button"
          aria-label={`${customer.name}を削除`}
          onClick={() => setMode("delete")}
        >
          <Icon name="trash" size={16} />
        </button>
      </div>

      {mode === "edit" ? (
        <div className="modal-backdrop">
          <section
            aria-labelledby="customer-edit-title"
            aria-modal="true"
            className="customer-modal customer-modal--wide"
            role="dialog"
          >
            <div className="customer-modal__header">
              <div>
                <small>顧客情報</small>
                <h2 id="customer-edit-title">{customer.name}を編集</h2>
              </div>
              <button
                aria-label="編集画面を閉じる"
                className="icon-button"
                onClick={close}
                type="button"
              >
                <Icon name="close" size={18} />
              </button>
            </div>
            <form className="customer-edit-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label>
                  氏名 <b>必須</b>
                  <input
                    required
                    value={draft.name}
                    onChange={(event) =>
                      updateField("name", event.target.value)
                    }
                  />
                </label>
                <label>
                  氏名（カナ） <b>必須</b>
                  <input
                    required
                    value={draft.nameKana}
                    onChange={(event) =>
                      updateField("nameKana", event.target.value)
                    }
                  />
                </label>
                <label className="form-grid__wide">
                  会社名 <b>必須</b>
                  <input
                    required
                    value={draft.company}
                    onChange={(event) =>
                      updateField("company", event.target.value)
                    }
                  />
                </label>
                <label>
                  部署
                  <input
                    value={draft.department}
                    onChange={(event) =>
                      updateField("department", event.target.value)
                    }
                  />
                </label>
                <label>
                  役職
                  <input
                    value={draft.title}
                    onChange={(event) =>
                      updateField("title", event.target.value)
                    }
                  />
                </label>
                <label>
                  メールアドレス <b>必須</b>
                  <input
                    required
                    type="email"
                    value={draft.email}
                    onChange={(event) =>
                      updateField("email", event.target.value)
                    }
                  />
                </label>
                <label>
                  電話番号 <b>必須</b>
                  <input
                    required
                    type="tel"
                    value={draft.phone}
                    onChange={(event) =>
                      updateField("phone", event.target.value)
                    }
                  />
                </label>
                <label>
                  顧客ランク
                  <select
                    value={draft.rank}
                    onChange={(event) =>
                      updateField(
                        "rank",
                        event.target.value as CustomerUpdate["rank"],
                      )
                    }
                  >
                    <option value="S">S</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </label>
                <label>
                  ステータス
                  <select
                    value={draft.status}
                    onChange={(event) =>
                      updateField(
                        "status",
                        event.target.value as CustomerUpdate["status"],
                      )
                    }
                  >
                    <option value="active">取引中</option>
                    <option value="follow-up">フォロー中</option>
                    <option value="inactive">休眠</option>
                  </select>
                </label>
                <label>
                  最終接点 <b>必須</b>
                  <input
                    required
                    type="date"
                    value={draft.lastContactAt}
                    onChange={(event) =>
                      updateField("lastContactAt", event.target.value)
                    }
                  />
                </label>
                <label className="form-grid__wide">
                  タグ
                  <input
                    value={tags}
                    placeholder="カンマ区切りで入力"
                    onChange={(event) => setTags(event.target.value)}
                  />
                </label>
              </div>
              <div className="customer-modal__footer">
                <p className={error ? "form-message is-error" : "form-message"}>
                  {error || "変更内容はこのデモの利用中のみ保持されます。"}
                </p>
                <div>
                  <button className="text-button" type="button" onClick={close}>
                    キャンセル
                  </button>
                  <button className="primary-button" type="submit">
                    変更を保存
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      ) : null}

      {mode === "delete" ? (
        <div className="modal-backdrop">
          <section
            aria-labelledby="customer-delete-title"
            aria-modal="true"
            className="customer-modal customer-modal--confirm"
            role="alertdialog"
          >
            <span className="delete-confirmation__icon">
              <Icon name="trash" size={21} />
            </span>
            <h2 id="customer-delete-title">顧客を削除しますか？</h2>
            <p>
              <strong>{customer.name}</strong> の顧客情報とメモが削除されます。
              この操作は取り消せません。
            </p>
            <div className="delete-confirmation__actions">
              <button className="text-button" type="button" onClick={close}>
                キャンセル
              </button>
              <button
                className="danger-button"
                type="button"
                onClick={onDelete}
              >
                削除する
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
