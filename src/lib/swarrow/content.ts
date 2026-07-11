export const site = "https://swarrow.com";
export const siteName = "Swarrow";

export type ProductId = "chat" | "call";

export type Product = {
  id: ProductId;
  name: string;
  category: string;
  benefit: string;
  useCases: readonly string[];
  href: `#${ProductId}`;
};

export const products: readonly Product[] = [
  {
    id: "chat",
    name: "Swarrow Chat",
    category: "自治体ホームページAI窓口",
    benefit:
      "ホームページやLINEで住民の自己解決を促し、電話へ集中する前に定型的な質問へ回答します。",
    useCases: ["手続き案内", "必要書類", "施設案内", "予約・申請への誘導"],
    href: "#chat",
  },
  {
    id: "call",
    name: "Swarrow Call",
    category: "自治体AIコールセンター",
    benefit:
      "AIが電話の一次受付、案内、取次、発信を担い、職員の電話対応を必要な案件へ絞ります。",
    useCases: ["代表電話", "時間外受付", "担当課取次", "リマインド・一括周知"],
    href: "#call",
  },
];

export const heroCopy = {
  eyebrow: "自治体の問い合わせ対応を、ひとつの知識で。",
  title: "電話とホームページの定型対応をAIに。",
  emphasis: "職員は、本来の仕事へ。",
  description:
    "自治体ホームページAI窓口「Swarrow Chat」と自治体AIコールセンター「Swarrow Call」。FAQ・手順書・業務データを1つの知識基盤で管理し、住民からの問い合わせにWebと電話で応えます。",
} as const;

export const painPoints = [
  {
    title: "同じ問い合わせが繰り返される",
    body: "手続き、必要書類、担当課などの定型質問が電話や窓口へ集中します。",
  },
  {
    title: "案内の知識が分散している",
    body: "ホームページと電話でFAQを別々に管理すると、更新と案内内容に差が生まれます。",
  },
  {
    title: "繁忙時や時間外に受けきれない",
    body: "問い合わせが重なると、職員の本来業務と住民への案内の両方が滞ります。",
  },
] as const;

export const sharedKnowledge = {
  title: "一度整えた知識を、ホームページにも電話にも。",
  description:
    "FAQ、手順書、業務データを1つの知識基盤で管理し、Swarrow ChatとSwarrow Callの両方から利用できます。",
  adoption: "単独でも、組み合わせても導入可能",
} as const;

export const pageTitle = "Swarrow Call｜自治体向け AI 窓口・電話対応";
export const pageDescription =
  "自治体の住民問い合わせ、AI 受電、AI チャット、AI 架電をひとつの知識基盤で支援。電話とチャットの窓口対応を継続的に改善します。";

export type CustomerSuccessStep = {
  phase: string;
  title: string;
  body: string;
  video: string;
  poster: string;
  alt: string;
};

export const customerSuccessSteps: CustomerSuccessStep[] = [
  {
    phase: "1",
    title: "導入準備",
    body: "対象部署と問い合わせ業務を整理し、Chat、Call、併用のどこから始めるかを専任チームが一緒に設計します。",
    video: "/swarrow-call/customer-success-step-1.webm",
    poster: "/swarrow-call/customer-success-step-1-poster.webp",
    alt: "カスタマーサクセスチームが導入準備の説明会と進行を支援するイメージ",
  },
  {
    phase: "2",
    title: "初期構築",
    body: "自治体の要件をヒアリングし、FAQ、手順書、会話フローなど両製品が利用する知識基盤を整えます。",
    video: "/swarrow-call/customer-success-step-2.webm",
    poster: "/swarrow-call/customer-success-step-2-poster.webp",
    alt: "カスタマーサクセスチームが初期構築の計画を整理するイメージ",
  },
  {
    phase: "3",
    title: "運用改善",
    body: "稼働して終わりではありません。定期的な利用率モニタリング、回答分析、改善提案まで継続します。",
    video: "/swarrow-call/customer-success-step-3.webm",
    poster: "/swarrow-call/customer-success-step-3-poster.webp",
    alt: "カスタマーサクセスチームが運用データを分析して改善するイメージ",
  },
];

export type CallCapability = {
  title: string;
  body: string;
  video: string;
  poster: string;
  alt: string;
};

export const callCapabilities: CallCapability[] = [
  {
    title: "タイマー架電機能",
    body: "指定した日時に自動で電話を発信。リマインド、督促、予約確認など、漏れやすい連絡を職員の手作業なしで届けます。",
    video: "/swarrow-call/call-timer.webm",
    poster: "/swarrow-call/call-timer.webp",
    alt: "指定した時間に Swarrow Call からスマートフォンへ電話を発信するイメージ",
  },
  {
    title: "自動取次機能",
    body: "AI が要件を聞き取り、内容や担当部署に応じて適切な職員へ接続。取り次ぎ前に用件を整理し、対応の初動を速くします。",
    video: "/swarrow-call/call-handoff.webm",
    poster: "/swarrow-call/call-handoff.webp",
    alt: "住民からの電話を Swarrow Call が判定して担当者へ取り次ぐイメージ",
  },
  {
    title: "一括発信機能",
    body: "対象者リストへまとめて電話を発信し、案内・確認・周知を一斉に実施。接続状況や応答結果も後から確認できます。",
    video: "/swarrow-call/call-bulk.webm",
    poster: "/swarrow-call/call-bulk.webp",
    alt: "Swarrow Call から多数の電話先へ一括発信するイメージ",
  },
];

export type CaseStudy = {
  town: string;
  title: string;
  img: string;
};

// 導入事例は差し替え用のサンプル(架空の自治体名・実写真に置き換え可能)。
export const cases: CaseStudy[] = [
  {
    town: "みどり野市",
    title:
      "施設予約の電話・窓口対応を廃止。運用を見直し、予約を100%オンライン化",
    img: "/swarrow-call/case-01.jpg",
  },
  {
    town: "うみかぜ町",
    title:
      "メッセージで育む関係人口。移住検討者の登録から相談・イベント案内までを一元化",
    img: "/swarrow-call/case-02.jpg",
  },
  {
    town: "あさひ野市",
    title:
      "ごみ関連の機能を集約し、専用アプリと申請フォームを廃止。受付後の作業を大幅に削減",
    img: "/swarrow-call/case-03.jpg",
  },
  {
    town: "こもれび市",
    title: "メッセージ利用率100%を実現。担当課が協働で構築した一時預かりの予約",
    img: "/swarrow-call/case-04.jpg",
  },
];

// 導入事例は公開準備中。実績追加時に true へ戻す。
export const showCaseStudies = false;

export type News = { date: string; text: string };

// お知らせも差し替え用のサンプル。
export const news: News[] = [
  {
    date: "2026.07.07",
    text: "Swarrow Call オンラインセミナー「役所の箱ファイルの電子化作戦」を開催。",
  },
  {
    date: "2026.06.08",
    text: "Swarrow Call 説明会(オンライン)の申込受付を開始しました。",
  },
];

export type NavItem = {
  label: string;
  href: string;
};

export const companyOverviewLink: NavItem = {
  label: "会社概要",
  href: "https://www.vecta.co.jp/#company",
};

export const navItems: NavItem[] = [
  ...(showCaseStudies ? [{ label: "導入事例", href: "#case" }] : []),
  companyOverviewLink,
  { label: "お知らせ", href: "#news" },
];

// 構造化データ: 提供事業者(Organization)とサービス(Service)。
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Swarrow Call",
  serviceType: "自治体向け AI 窓口・電話対応",
  category: "自治体向け AI 窓口・電話対応",
  description: pageDescription,
  url: `${site}/`,
  provider: {
    "@type": "Organization",
    name: "株式会社Vecta",
    url: "https://www.vecta.co.jp/",
  },
  audience: {
    "@type": "Audience",
    audienceType: "自治体",
  },
  areaServed: "日本",
};
