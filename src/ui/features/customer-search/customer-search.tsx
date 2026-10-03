import { Icon } from "@/ui/components/icon";

type CustomerSearchProps = {
  value: string;
  resultCount: number;
  onChange: (value: string) => void;
};

export function CustomerSearch({
  value,
  resultCount,
  onChange,
}: CustomerSearchProps) {
  return (
    <div className="customer-search">
      <label className="search-field" htmlFor="customer-search">
        <Icon name="search" size={18} />
        <span className="sr-only">顧客名で検索</span>
        <input
          id="customer-search"
          onChange={(event) => onChange(event.target.value)}
          placeholder="顧客名で検索"
          type="search"
          value={value}
        />
        {value ? <kbd>{resultCount}件</kbd> : <kbd>⌘ K</kbd>}
      </label>
    </div>
  );
}
