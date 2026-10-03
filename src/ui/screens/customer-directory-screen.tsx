"use client";

import { useMemo, useState } from "react";
import type { CustomerDirectoryController } from "@/inputs/customer-directory-controller";
import type { AuthenticatedUser } from "@/ports/authentication-gateway";
import type { Customer } from "@/ports/customer-repository";
import { Avatar } from "@/ui/components/avatar";
import { Icon } from "@/ui/components/icon";
import { LogoutButton } from "@/ui/features/authentication/logout-button";
import { CustomerActions } from "@/ui/features/customer-actions/customer-actions";
import { CustomerEmailComposer } from "@/ui/features/customer-email/customer-email-composer";
import { CustomerList } from "@/ui/features/customer-list/customer-list";
import { CustomerNotes } from "@/ui/features/customer-notes/customer-notes";
import { CustomerSearch } from "@/ui/features/customer-search/customer-search";

type CustomerDirectoryScreenProps = {
  controller: CustomerDirectoryController;
  user: AuthenticatedUser;
};

const formatFullDate = (value: string) =>
  new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  }).format(new Date(`${value}T00:00:00+09:00`));

function Sidebar({
  customerCount,
  user,
}: {
  customerCount: number;
  user: AuthenticatedUser;
}) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand__mark">
          <Icon name="sparkle" size={20} />
        </span>
        <span>
          <strong>Knot</strong>
          <small>CRM</small>
        </span>
      </div>
      <nav aria-label="メインナビゲーション" className="main-nav">
        <p>ワークスペース</p>
        <a href="#overview">
          <Icon name="dashboard" />
          ダッシュボード
        </a>
        <a className="is-active" href="#customers" aria-current="page">
          <Icon name="people" />
          顧客管理<span>{customerCount}</span>
        </a>
        <a href="#companies">
          <Icon name="building" />
          企業管理
        </a>
        <a href="#activities">
          <Icon name="calendar" />
          活動履歴
        </a>
        <p>管理</p>
        <a href="#settings">
          <Icon name="settings" />
          設定
        </a>
      </nav>
      <div className="sidebar-profile">
        <Avatar color="#64748b" name={user.name} size="small" />
        <span>
          <strong>{user.name}</strong>
          <small>{user.role}</small>
        </span>
        <LogoutButton />
      </div>
    </aside>
  );
}

function CustomerDetail({
  customer,
  onAddNote,
  onDelete,
  onSendEmail,
  onUpdate,
}: {
  customer: Customer;
  onAddNote: (body: string) => void;
  onDelete: () => void;
  onSendEmail: (subject: string, body: string) => void;
  onUpdate: (
    details: Parameters<CustomerDirectoryController["update"]>[1],
  ) => void;
}) {
  const statusLabel =
    customer.status === "active"
      ? "取引中"
      : customer.status === "follow-up"
        ? "フォロー中"
        : "休眠";
  return (
    <aside className="detail-panel" aria-label={`${customer.name}の詳細`}>
      <div className="detail-panel__topbar">
        <span>顧客詳細</span>
        <CustomerActions
          customer={customer}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      </div>
      <div className="profile-summary">
        <Avatar
          color={customer.avatarColor}
          name={customer.name}
          size="large"
        />
        <div>
          <h2>{customer.name}</h2>
          <p>{customer.nameKana}</p>
        </div>
        <span className={`status status--${customer.status}`}>
          <i />
          {statusLabel}
        </span>
      </div>
      <div className="contact-details">
        <div>
          <span>
            <Icon name="mail" size={18} />
          </span>
          <div>
            <small>メール</small>
            <strong>{customer.email}</strong>
          </div>
        </div>
        <a href={`tel:${customer.phone}`}>
          <span>
            <Icon name="phone" size={18} />
          </span>
          <div>
            <small>電話番号</small>
            <strong>{customer.phone}</strong>
          </div>
        </a>
        <div>
          <span>
            <Icon name="building" size={18} />
          </span>
          <div>
            <small>会社・所属</small>
            <strong>{customer.company}</strong>
            <em>
              {customer.department} / {customer.title}
            </em>
          </div>
        </div>
      </div>
      <CustomerEmailComposer
        key={customer.id}
        recipientEmail={customer.email}
        recipientName={customer.name}
        onSend={onSendEmail}
      />
      <div className="customer-meta">
        <div>
          <small>顧客ランク</small>
          <strong>
            <span className={`rank-badge rank-badge--${customer.rank}`}>
              {customer.rank}
            </span>
          </strong>
        </div>
        <div>
          <small>登録日</small>
          <strong>{formatFullDate(customer.registeredAt)}</strong>
        </div>
        <div>
          <small>最終接点</small>
          <strong>{formatFullDate(customer.lastContactAt)}</strong>
        </div>
      </div>
      <div className="tags">
        <small>タグ</small>
        <div>
          {customer.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <CustomerNotes
        key={customer.id}
        notes={customer.notes}
        onAdd={onAddNote}
      />
    </aside>
  );
}

export function CustomerDirectoryScreen({
  controller,
  user,
}: CustomerDirectoryScreenProps) {
  const initialCustomers = useMemo(() => controller.search(""), [controller]);
  const [query, setQuery] = useState("");
  const [allCustomers, setAllCustomers] = useState(initialCustomers);
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedId, setSelectedId] = useState(initialCustomers[0]?.id);
  const selectedCustomer = selectedId ? controller.find(selectedId) : undefined;

  const handleSearch = (value: string) => {
    const results = controller.search(value);
    setQuery(value);
    setCustomers(results);
    if (!results.some(({ id }) => id === selectedId))
      setSelectedId(results[0]?.id);
  };

  const handleAddNote = (body: string) => {
    if (!selectedId) return;
    controller.addNote(selectedId, body);
    setCustomers(controller.search(query));
  };

  const refreshCustomers = (preferredId?: string) => {
    const all = controller.search("");
    const results = controller.search(query);
    setAllCustomers(all);
    setCustomers(results);
    setSelectedId(
      preferredId && results.some(({ id }) => id === preferredId)
        ? preferredId
        : results[0]?.id,
    );
  };

  const handleUpdate = (
    details: Parameters<CustomerDirectoryController["update"]>[1],
  ) => {
    if (!selectedId) return;
    controller.update(selectedId, details);
    refreshCustomers(selectedId);
  };

  const handleDelete = () => {
    if (!selectedId) return;
    controller.delete(selectedId);
    refreshCustomers();
  };

  const handleSendEmail = (subject: string, body: string) => {
    if (!selectedId) return;
    controller.sendEmail(selectedId, subject, body);
  };

  const activeCount = allCustomers.filter(
    ({ status }) => status === "active",
  ).length;
  const followUpCount = allCustomers.filter(
    ({ status }) => status === "follow-up",
  ).length;

  return (
    <div className="app-shell">
      <Sidebar customerCount={allCustomers.length} user={user} />
      <div className="workspace">
        <header className="topbar">
          <div className="mobile-brand">
            <Icon name="sparkle" size={18} />
            <strong>Knot CRM</strong>
          </div>
          <div className="breadcrumbs">
            <span>ワークスペース</span>
            <b>/</b>
            <strong>顧客管理</strong>
          </div>
          <div className="topbar__actions">
            <button
              className="icon-button notification-button"
              type="button"
              aria-label="通知"
            >
              <Icon name="bell" size={20} />
              <i />
            </button>
            <Avatar color="#64748b" name={user.name} size="small" />
            <LogoutButton />
          </div>
        </header>
        <main className="page-content" id="customers">
          <div className="page-heading">
            <div>
              <p>顧客とのつながりを、ひとつの場所に</p>
              <h1>顧客管理</h1>
            </div>
            <span className="updated-label">
              <i /> データは最新です
            </span>
          </div>
          <section className="stats-grid" aria-label="顧客サマリー">
            <div className="stat-card">
              <span className="stat-card__icon blue">
                <Icon name="people" />
              </span>
              <div>
                <small>登録顧客</small>
                <strong>
                  {allCustomers.length}
                  <em>社</em>
                </strong>
              </div>
              <b>全顧客</b>
            </div>
            <div className="stat-card">
              <span className="stat-card__icon green">
                <Icon name="sparkle" />
              </span>
              <div>
                <small>取引中</small>
                <strong>
                  {activeCount}
                  <em>社</em>
                </strong>
              </div>
              <b className="positive">良好</b>
            </div>
            <div className="stat-card">
              <span className="stat-card__icon orange">
                <Icon name="calendar" />
              </span>
              <div>
                <small>フォロー予定</small>
                <strong>
                  {followUpCount}
                  <em>社</em>
                </strong>
              </div>
              <b>今月</b>
            </div>
          </section>
          <div className="directory-layout">
            <section className="list-panel">
              <div className="list-panel__header">
                <div>
                  <h2>顧客一覧</h2>
                  <span>{customers.length}件を表示</span>
                </div>
                <CustomerSearch
                  value={query}
                  resultCount={customers.length}
                  onChange={handleSearch}
                />
              </div>
              <CustomerList
                customers={customers}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
              <footer className="list-panel__footer">
                <span>全 {customers.length} 件</span>
                <span>1 / 1 ページ</span>
              </footer>
            </section>
            {selectedCustomer ? (
              <CustomerDetail
                customer={selectedCustomer}
                onAddNote={handleAddNote}
                onDelete={handleDelete}
                onSendEmail={handleSendEmail}
                onUpdate={handleUpdate}
              />
            ) : (
              <aside className="detail-panel detail-panel--empty">
                <Icon name="people" size={28} />
                <strong>顧客を選択してください</strong>
                <p>一覧から顧客を選ぶと、詳細が表示されます。</p>
              </aside>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
