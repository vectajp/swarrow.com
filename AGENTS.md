# SwarrowCall

AIカスタマーサポートサービス「SwarrowCall」のランディングページ。
Figma Make からエクスポートしたコードをベースに構築中。

## 技術スタック
- React 18 + Vite + Tailwind CSS 4
- lucide-react（アイコン）, motion（アニメーション）
- TypeScript

## プロジェクト構成
```
src/
├── app/
│   ├── App.tsx              # メインレイアウト（セクション構成）
│   └── components/          # 各セクションコンポーネント
│       ├── Header.tsx       # ヘッダー（スクロール時色変化）
│       ├── HeroSection.tsx
│       ├── ProblemSection.tsx
│       ├── SolutionSection.tsx
│       ├── FeaturesSection.tsx
│       ├── HowItWorksSection.tsx
│       ├── FAQSection.tsx
│       ├── CTASection.tsx
│       ├── Footer.tsx
│       ├── ScrollFadeIn.tsx  # スクロールフェードインアニメーション
│       ├── BackgroundArc.tsx # 装飾用背景アーク
│       └── SwarrowLogo.tsx   # ロゴ（SVG）
├── assets/                  # 画像ファイル
├── imports/                 # SVGパスデータ（2ファイルのみ）
└── styles/
    ├── index.css            # エントリポイント
    ├── tailwind.css         # Tailwind設定
    ├── theme.css            # デザイントークン定義
    └── fonts.css            # Google Fonts読み込み
```

## デザイントークン
色はすべて `src/styles/theme.css` のCSS変数で管理。Tailwindクラスで使用可能：
- `sc-navy` (#092045) - ブランドカラー（濃紺）
- `sc-orange` / `sc-orange-hover` - アクセント/CTAカラー
- `sc-text-primary` / `sc-text-secondary` / `sc-text-muted` - テキスト色
- `sc-bg-light` / `sc-bg-card` / `sc-bg-footer` - 背景色
- `sc-border` / `sc-border-light` - ボーダー色

## コマンド
```sh
npm run dev    # 開発サーバー起動
npm run build  # ビルド
```

## Figma
元デザイン: https://www.figma.com/design/2eT31sLxtnkjkDpM1l1CMI/SwarrowCall

## 注意事項
- 画像は `figma:asset/ファイル名.png` でインポート（vite.config.tsでエイリアス設定済み）
- フォントはbodyに `Noto Sans JP` を一括設定済み（個別指定不要）
- WKPプロジェクトとは無関係の独立プロジェクト
