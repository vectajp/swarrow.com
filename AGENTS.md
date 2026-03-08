# Swarrow Call

AI カスタマーサポートサービス「Swarrow Call」のランディングページ。

## 技術スタック

- React 18 + Vite + Tailwind CSS 4
- lucide-react (アイコン), motion (アニメーション)
- TypeScript

## コマンド

```sh
bun run dev    # 開発サーバー起動
bun run build  # ビルド
```

## デザイントークン

色はすべて `src/styles/theme.css` の CSS 変数で管理。Tailwind クラスで使用可能:

- `sc-navy` (#092045) -- ブランドカラー (濃紺)
- `sc-orange` / `sc-orange-hover` -- アクセント/CTA カラー
- `sc-text-primary` / `sc-text-secondary` / `sc-text-muted` -- テキスト色
- `sc-bg-light` / `sc-bg-card` / `sc-bg-footer` -- 背景色
- `sc-border` / `sc-border-light` -- ボーダー色

## 注意事項

| Rule | Detail |
|------|--------|
| [MUST] | 画像は `figma:asset/ファイル名.png` でインポート (`vite.config.ts` でエイリアス設定済み) |
| [MUST] | 色は `sc-*` デザイントークンを使用。ハードコードしない |
| [Forbidden] | フォントの個別指定 -- body に `Noto Sans JP` を一括設定済み |

## Figma

元デザイン: https://www.figma.com/design/2eT31sLxtnkjkDpM1l1CMI/SwarrowCall
