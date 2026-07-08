# Pages Functions

`functions/api/contact.ts` は旧資料ダウンロードフォーム向けのメール送信 endpoint でした。
現在はメール送信を停止し、`410 Gone` を返します。

資料請求フォームは `swarrow.com-backend` の以下 API に直接送信します。

```text
https://api.swarrow.com/download-requests
```

## 公開環境変数

build 時に以下の公開環境変数を設定します(SvelteKit の `$env/dynamic/public`
経由で `PUBLIC_` プレフィックスの変数を参照。未設定時は
`PUBLIC_DOWNLOAD_REQUEST_API_URL` は本番相当のフォールバック値へ、
`PUBLIC_TURNSTILE_SITE_KEY` は未設定時にエラーメッセージ表示へそれぞれ
倒す設計 — `$env/static/public` は変数未定義時にビルド自体が失敗するため、
このプロジェクトの他 LP と同様に採用していない)。

| 変数名 | 説明 |
| --- | --- |
| `PUBLIC_DOWNLOAD_REQUEST_API_URL` | 資料請求 API URL |
| `PUBLIC_TURNSTILE_SITE_KEY` | Cloudflare Turnstile site key |

ローカルでは `.env` に設定します。

```sh
PUBLIC_DOWNLOAD_REQUEST_API_URL=https://api.swarrow.com/download-requests
PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA
```

本番環境は Cloudflare Pages の build environment variables に設定してください。

## ローカル確認

```sh
bun run build
bunx wrangler pages dev build
```

旧 endpoint はメールを送らず `410` を返します。

```sh
curl -s -X POST http://localhost:8788/api/contact \
  -H 'Content-Type: application/json' \
  -d '{}' | jq .
```
