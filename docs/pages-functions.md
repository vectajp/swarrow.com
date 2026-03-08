# Pages Functions (メール送信)

`functions/api/contact.ts` で資料ダウンロードフォームのメール送信を処理。
SendGrid API を `fetch()` で直接呼び出し (SDK 不使用)。

## 環境変数

| 変数名 | 説明 | 設定場所 |
|--------|------|----------|
| `SENDGRID_API_KEY` | SendGrid API key | Cloudflare Pages ダッシュボード / `.dev.vars` |
| `MAIL_TO` | 通知先メールアドレス | 同上 |
| `MAIL_FROM` | 送信元メールアドレス (SendGrid で verify 済み) | 同上 |

## ローカル検証手順

```sh
# 1. 環境変数ファイルを作成 (初回のみ)
cp .dev.vars.example .dev.vars
# .dev.vars を編集して SENDGRID_API_KEY を設定

# 2. ビルド + ローカルサーバー起動
bun run build && bunx wrangler pages dev dist

# 3. 別ターミナルから動作確認
# バリデーションエラーのテスト (必須項目なし)
curl -s -X POST http://localhost:8788/api/contact \
  -H 'Content-Type: application/json' \
  -d '{}' | jq .

# 正常送信のテスト
curl -s -X POST http://localhost:8788/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"companyName":"テスト株式会社","name":"テスト太郎","nameKana":"てすとたろう"}' | jq .

# お問い合わせ内容付き
curl -s -X POST http://localhost:8788/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"companyName":"テスト株式会社","name":"テスト太郎","nameKana":"てすとたろう","inquiry":"資料希望です"}' | jq .
```

## 期待されるレスポンス

- 成功: `{"success":true}`
- バリデーションエラー: `{"success":false,"error":"会社名は必須です"}`
- メール送信失敗: `{"success":false,"error":"メール送信に失敗しました"}`

## 本番環境

Cloudflare Pages ダッシュボードの Settings > Environment variables で上記3つの環境変数を設定する。
デプロイすると `functions/` ディレクトリが自動的に Pages Functions として認識される。
