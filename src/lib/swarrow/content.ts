export const site = "https://swarrow.com";
export const siteName = "Swarrow";

export type ProductId = "chat" | "call";

export type Product = {
  id: ProductId;
  name: string;
  category: string;
  benefit: string;
  useCases: readonly string[];
  href: `/${ProductId}`;
  backgroundIcon: `/swarrow-call/${string}.png`;
  icon: `/swarrow-call/${string}.png`;
};

export const products: readonly Product[] = [
  {
    id: "chat",
    name: "Swarrow Chat",
    category: "自治体ホームページAI窓口",
    benefit:
      "ホームページやLINEで住民の自己解決を促し、電話へ集中する前に定型的な質問へ回答します。",
    useCases: ["手続き案内", "必要書類", "施設案内", "予約・申請への誘導"],
    href: "/chat",
    backgroundIcon: "/swarrow-call/swarrow-chat-icon-flat.png",
    icon: "/swarrow-call/swarrow-chat-icon-flat.png",
  },
  {
    id: "call",
    name: "Swarrow Call",
    category: "自治体AIコールセンター",
    benefit:
      "AIが電話の一次受付、案内、取次、発信を担い、職員の電話対応を必要な案件へ絞ります。",
    useCases: ["代表電話", "時間外受付", "担当課取次", "リマインド・一括周知"],
    href: "/call",
    backgroundIcon: "/swarrow-call/swarrow-call-icon-flat.png",
    icon: "/swarrow-call/swarrow-call-icon-flat.png",
  },
];

export const heroCopy = {
  eyebrow: "知識・回答ルール・参照元まで、フルチューニング。",
  title: ["回答精度に妥協しない。"],
  emphasis: ["自治体フルチューニングAI。"],
  description:
    "チャットやコールセンターのAI機能を安心してご利用いただくには、回答精度を支える設計が欠かせません。自治体の公式情報・回答ルール・職員への引き継ぎなどを、実際のオペレーションに合わせて個別に設計します。公開後も利用状況をもとに回答品質を継続的に高め、運用を重ねるほど改善につなげられる仕組みを整えます。",
} as const;

export type HeroProductCta = {
  productId: ProductId;
  label: string;
};

export const heroProductCtas: HeroProductCta[] = products.map((product) => ({
  productId: product.id,
  label: product.name,
}));

export const downloadCtaLabel = "資料ダウンロードを依頼する";

export type DownloadCtaCopy = {
  heading: string[];
  sub: string;
};

export const topDownloadCta: DownloadCtaCopy = {
  heading: [
    "Swarrow Chat・Swarrow Callの資料ダウンロード",
    "単独導入から併用まで、まずは資料でご確認ください。",
  ],
  sub: "現在の問い合わせ件数、対象部署、ホームページと電話の運用状況に合わせた資料をご案内します。",
};

export const chatDownloadCta: DownloadCtaCopy = {
  heading: ["Swarrow Chatの資料ダウンロード"],
  sub: "自治体ホームページAI窓口の詳細資料をお送りします。",
};

export const callDownloadCta: DownloadCtaCopy = {
  heading: ["Swarrow Callの資料ダウンロード"],
  sub: "自治体AIコールセンターの詳細資料をお送りします。",
};

export const sharedKnowledge = {
  title: "一度整えた知識を、ホームページにも電話にも。",
  description:
    "FAQ、手順書、業務データを1つの知識基盤で管理し、Swarrow ChatとSwarrow Callの両方から利用できます。",
  adoption: "単独でも、組み合わせても導入可能",
} as const;

export type ProductFeatureCopy = {
  en: string;
  titleLabel: string;
  lead: string;
  list: { title: string; body: string }[];
};

export const chatFeatureCopy: ProductFeatureCopy = {
  en: "Municipal Web AI Desk",
  titleLabel: "自治体ホームページAI窓口",
  lead: "ホームページやLINEなど、住民が使い慣れた場所で定型的な質問へ回答します。必要な情報へ迷わずたどり着ける入口をつくり、電話をかける前の自己解決を支えます。",
  list: [
    {
      title: "ホームページやLINEに設置",
      body: "住民が普段利用するデジタル窓口から質問できます。",
    },
    {
      title: "自治体の資料をもとに回答",
      body: "FAQ、制度資料、手順書、業務データを案内に活かします。",
    },
    {
      title: "回答から次の手続きへつなぐ",
      body: "申請案内、予約、職員への連携など次の行動へ誘導します。",
    },
  ],
} as const;

export const callFeatureCopy: ProductFeatureCopy = {
  en: "Municipal AI Call Center",
  titleLabel: "自治体AIコールセンター",
  lead: "AI受電で定型的な質問へ案内し、必要な案件だけを職員へ取り次ぎます。受ける電話だけでなく、リマインドや一括周知など自治体からの発信も支援します。",
  list: [
    {
      title: "AI受電で一次対応",
      body: "FAQや手順書をもとに、住民からの電話へ案内します。",
    },
    {
      title: "用件を整理して職員へ取次",
      body: "内容や担当部署に応じ、必要な電話を職員へつなぎます。",
    },
    {
      title: "架電業務も自動化",
      body: "予約確認、督促、案内、周知などの発信を支援します。",
    },
  ],
} as const;

export const pageTitle =
  "Swarrow｜自治体ホームページAI窓口・自治体AIコールセンター";
export const pageDescription =
  "自治体ホームページAI窓口「Swarrow Chat」と自治体AIコールセンター「Swarrow Call」。自治体の公式情報と業務に合わせて知識・回答ルール・参照元を調整し、公開前検証と公開後の継続改善でホームページと電話の回答精度を磨き続けます。";

export type CustomerSuccessStep = {
  phase: string;
  title: string;
  body: string;
  video: string;
  poster: string;
  alt: string;
};

export const chatCustomerSuccessSteps: CustomerSuccessStep[] = [
  {
    phase: "1",
    title: "導入準備",
    body: "対象部署とホームページ・LINEでの問い合わせ状況を整理し、Swarrow Chatの導入範囲を専任チームが一緒に設計します。",
    video: "/swarrow-call/customer-success-step-1.webm",
    poster: "/swarrow-call/customer-success-step-1-poster.webp",
    alt: "カスタマーサクセスチームが導入準備の説明会と進行を支援するイメージ",
  },
  {
    phase: "2",
    title: "初期構築",
    body: "自治体の要件をヒアリングし、FAQ、手順書、会話フローなどSwarrow Chatが利用する知識基盤を整えます。",
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

export const callCustomerSuccessSteps: CustomerSuccessStep[] = [
  {
    phase: "1",
    title: "導入準備",
    body: "対象部署と電話問い合わせ業務を整理し、Swarrow Callの導入範囲を専任チームが一緒に設計します。",
    video: "/swarrow-call/customer-success-step-1.webm",
    poster: "/swarrow-call/customer-success-step-1-poster.webp",
    alt: "カスタマーサクセスチームが導入準備の説明会と進行を支援するイメージ",
  },
  {
    phase: "2",
    title: "初期構築",
    body: "自治体の要件をヒアリングし、FAQ、手順書、会話フローなどSwarrow Callが利用する知識基盤を整えます。",
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

export const chatCustomerSuccessIntro = {
  lead: "成果を出すことにコミットする、専門チームの徹底した伴走サポート。",
  body: "Swarrow Chatは、導入して終わりのサービスではありません。専任チームが知識基盤の初期構築から利用状況の確認、継続的な改善まで伴走します。",
} as const;

export const callCustomerSuccessIntro = {
  lead: "成果を出すことにコミットする、専門チームの徹底した伴走サポート。",
  body: "Swarrow Callは、導入して終わりのサービスではありません。専任チームが知識基盤の初期構築から利用状況の確認、継続的な改善まで伴走します。",
} as const;

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
  { label: "製品", href: "/#products" },
  { label: "Swarrow Chat", href: "/chat" },
  { label: "Swarrow Call", href: "/call" },
];

const organizationId = `${site}/#organization`;

// 構造化データ: 提供事業者、Web サイト、公開中の2製品。
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "株式会社Vecta",
      url: "https://www.vecta.co.jp/",
    },
    {
      "@type": "WebSite",
      "@id": `${site}/#website`,
      url: `${site}/`,
      name: siteName,
      description: pageDescription,
      publisher: { "@id": organizationId },
    },
    ...products.map((product) => ({
      "@type": "Service",
      "@id": `${site}/#swarrow-${product.id}`,
      name: product.name,
      serviceType: product.category,
      category: product.category,
      description: product.benefit,
      url: `${site}${product.href}`,
      provider: { "@id": organizationId },
      audience: {
        "@type": "Audience",
        audienceType: "自治体",
      },
      areaServed: "日本",
    })),
  ],
} as const;
