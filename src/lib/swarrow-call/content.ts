export const site = "https://swarrow.com";
export const pageTitle = "Swarrow Call｜スマホひとつで、まちの窓口へ";
export const pageDescription =
  "役所・病院・学校。まちのあらゆる窓口をスマホの中へ。1問1答の対話型で、住民がいつでも手続きできる「スマホ市役所」を実現します。";

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
    body: "機能の説明会、各種テンプレートの提供、稼働までのプロジェクト進行を専任チームが丁寧に支えます。",
    video: "/swarrow-call/customer-success-step-1.webm",
    poster: "/swarrow-call/customer-success-step-1-poster.webp",
    alt: "カスタマーサクセスチームが導入準備の説明会と進行を支援するイメージ",
  },
  {
    phase: "2",
    title: "初期構築",
    body: "貴社の要件をヒアリングし、当社がチャットボットの土台を構築。回答品質を左右する知識基盤づくりから整えます。",
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

export const navItems: NavItem[] = [
  { label: "導入事例", href: "#case" },
  { label: "会社概要", href: "https://www.vecta.co.jp/#company" },
  { label: "お知らせ", href: "#news" },
];

// 構造化データ: 提供事業者(Organization)とサービス(SoftwareApplication)。
export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Swarrow Call",
  applicationCategory: "GovTech",
  operatingSystem: "Web",
  description: pageDescription,
  url: `${site}/`,
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "JPY",
    description: "導入のご相談はお問い合わせから",
  },
};
