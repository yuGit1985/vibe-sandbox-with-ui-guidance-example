import type { Customer, CustomerStatus } from "@/ports/customer-repository";
import { Avatar } from "@/ui/components/avatar";
import { Icon } from "@/ui/components/icon";

const statusLabels: Record<CustomerStatus, string> = {
  active: "取引中",
  "follow-up": "フォロー中",
  inactive: "休眠",
};

const formatDate = (value: string) => {
  const [, month, day] = value.split("-");
  return `${Number(month)}月${Number(day)}日`;
};

type CustomerListProps = {
  customers: Customer[];
  selectedId: string | undefined;
  onSelect: (customerId: string) => void;
};

export function CustomerList({
  customers,
  selectedId,
  onSelect,
}: CustomerListProps) {
  if (customers.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-state__icon">
          <Icon name="search" size={24} />
        </span>
        <strong>該当する顧客が見つかりません</strong>
        <p>検索する名前を変えてお試しください。</p>
      </div>
    );
  }

  return (
    <div className="table-scroll">
      <table className="customer-table">
        <thead>
          <tr>
            <th>顧客</th>
            <th>ランク</th>
            <th>ステータス</th>
            <th>最終接点</th>
            <th aria-label="操作" />
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr
              className={customer.id === selectedId ? "is-selected" : undefined}
              key={customer.id}
              onClick={() => onSelect(customer.id)}
            >
              <td>
                <button
                  className="customer-cell"
                  onClick={() => onSelect(customer.id)}
                  type="button"
                >
                  <Avatar color={customer.avatarColor} name={customer.name} />
                  <span>
                    <strong>{customer.name}</strong>
                    <small>{customer.company}</small>
                  </span>
                </button>
              </td>
              <td>
                <span className={`rank-badge rank-badge--${customer.rank}`}>
                  {customer.rank}
                </span>
              </td>
              <td>
                <span className={`status status--${customer.status}`}>
                  <i />
                  {statusLabels[customer.status]}
                </span>
              </td>
              <td className="date-cell">
                {formatDate(customer.lastContactAt)}
              </td>
              <td>
                <button
                  className="icon-button"
                  type="button"
                  aria-label="詳細を表示"
                >
                  <Icon name="chevron" size={17} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
