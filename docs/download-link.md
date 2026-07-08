# 資料ダウンロードリンク

## 概要

資料ダウンロードフォーム送信時に、問い合わせ者のメールアドレス宛に
ダウンロードリンク付きメールを自動送信する。

PDF は `static/downloads/` に配置し、Cloudflare Pages で静的配信する。

## 環境変数

| 変数名 | 説明 | 例 |
|--------|------|------|
| `SITE_URL` | サイトの URL | `https://swarrow.com` |

ローカル開発時は `.dev.vars` に設定(`bunx wrangler pages dev build` のポート。
`bun run dev` の Vite サーバーは Pages Functions を配信しないため使わない):

```sh
SITE_URL=http://localhost:8788
```

本番環境は Cloudflare Pages ダッシュボードの Settings > Environment variables で設定。

## PDF の差し替え手順

1. 新しい PDF ファイルを用意する
2. `static/downloads/swarrow_call.pdf` を新しいファイルで置き換える
3. コミット & デプロイ

```sh
cp /path/to/new-file.pdf static/downloads/swarrow_call.pdf
git add static/downloads/swarrow_call.pdf
git commit -m "chore: サービス資料を更新"
git push
```

デプロイ後、`{SITE_URL}/downloads/swarrow_call.pdf` でアクセス可能になる。

## ファイル名を変更する場合

1. `static/downloads/` 内のファイル名を変更
2. `functions/api/contact.ts` の `downloadUrl` を更新

```typescript
const downloadUrl = `${SITE_URL}/downloads/新しいファイル名.pdf`
```

3. コミット & デプロイ
