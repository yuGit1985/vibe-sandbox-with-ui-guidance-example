import type {
  Customer,
  CustomerNote,
  CustomerRepository,
} from "@/ports/customer-repository";

const initialCustomers: Customer[] = [
  {
    id: "customer-1",
    name: "山田 太郎",
    nameKana: "ヤマダ タロウ",
    company: "株式会社ブルーム",
    department: "事業開発部",
    title: "部長",
    email: "taro.yamada@bloom.example.jp",
    phone: "03-1234-5678",
    status: "active",
    lastContactAt: "2026-09-28",
    registeredAt: "2025-04-12",
    tags: ["重点顧客", "SaaS", "東京"],
    avatarColor: "#4f6ef7",
    notes: [
      {
        id: "note-1",
        body: "次期プロジェクトの企画書を共有。10月中旬に社内検討の結果をご連絡いただく予定。",
        author: "佐藤 美咲",
        createdAt: "2026-09-28T14:30:00.000Z",
      },
      {
        id: "note-2",
        body: "オンラインで初回ヒアリングを実施。業務効率化と顧客データの一元管理に関心あり。",
        author: "佐藤 美咲",
        createdAt: "2026-09-12T05:00:00.000Z",
      },
    ],
  },
  {
    id: "customer-2",
    name: "佐々木 彩",
    nameKana: "ササキ アヤ",
    company: "ネクストウェーブ株式会社",
    department: "マーケティング本部",
    title: "マネージャー",
    email: "aya.sasaki@nextwave.example.jp",
    phone: "03-2345-6789",
    status: "follow-up",
    lastContactAt: "2026-09-25",
    registeredAt: "2025-06-21",
    tags: ["マーケティング", "フォロー中"],
    avatarColor: "#f39c59",
    notes: [
      {
        id: "note-3",
        body: "導入事例の資料を送付。来週フォローアップする。",
        author: "佐藤 美咲",
        createdAt: "2026-09-25T03:15:00.000Z",
      },
    ],
  },
  {
    id: "customer-3",
    name: "鈴木 健一",
    nameKana: "スズキ ケンイチ",
    company: "株式会社クラフトリンク",
    department: "情報システム部",
    title: "課長",
    email: "kenichi.suzuki@craftlink.example.jp",
    phone: "045-345-6789",
    status: "active",
    lastContactAt: "2026-09-22",
    registeredAt: "2025-08-03",
    tags: ["IT", "神奈川"],
    avatarColor: "#24a67a",
    notes: [],
  },
  {
    id: "customer-4",
    name: "高橋 美咲",
    nameKana: "タカハシ ミサキ",
    company: "アーバンデザイン合同会社",
    department: "経営企画室",
    title: "室長",
    email: "misaki.takahashi@urban.example.jp",
    phone: "06-4567-8901",
    status: "active",
    lastContactAt: "2026-09-18",
    registeredAt: "2025-11-14",
    tags: ["デザイン", "大阪"],
    avatarColor: "#b76bd2",
    notes: [],
  },
  {
    id: "customer-5",
    name: "伊藤 翔太",
    nameKana: "イトウ ショウタ",
    company: "株式会社フードテック",
    department: "営業推進部",
    title: "主任",
    email: "shota.ito@foodtech.example.jp",
    phone: "052-567-8901",
    status: "inactive",
    lastContactAt: "2026-08-30",
    registeredAt: "2026-01-09",
    tags: ["食品", "名古屋"],
    avatarColor: "#db6a78",
    notes: [],
  },
  {
    id: "customer-6",
    name: "中村 直子",
    nameKana: "ナカムラ ナオコ",
    company: "グリーンフィールド株式会社",
    department: "サステナビリティ推進室",
    title: "リーダー",
    email: "naoko.nakamura@greenfield.example.jp",
    phone: "092-678-9012",
    status: "follow-up",
    lastContactAt: "2026-08-24",
    registeredAt: "2026-03-18",
    tags: ["環境", "福岡"],
    avatarColor: "#3b93be",
    notes: [],
  },
];

const cloneCustomer = (customer: Customer): Customer => ({
  ...customer,
  tags: [...customer.tags],
  notes: customer.notes.map((note) => ({ ...note })),
});

export class InMemoryCustomerRepository implements CustomerRepository {
  private customers = initialCustomers.map(cloneCustomer);

  findAll(): Customer[] {
    return this.customers.map(cloneCustomer);
  }

  findById(customerId: string): Customer | undefined {
    const customer = this.customers.find(({ id }) => id === customerId);
    return customer ? cloneCustomer(customer) : undefined;
  }

  addNote(customerId: string, note: CustomerNote): Customer {
    const customer = this.customers.find(({ id }) => id === customerId);

    if (!customer) {
      throw new Error("顧客が見つかりませんでした。");
    }

    customer.notes = [note, ...customer.notes];
    return cloneCustomer(customer);
  }
}
