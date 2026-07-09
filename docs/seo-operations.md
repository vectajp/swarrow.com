# SEO 運用チェックリスト

Issue: https://github.com/vectajp/swarrow.com/issues/6

`swarrow.com` を検索エンジンからクロールできる状態にし、自治体向け
AI 窓口・電話対応の検索意図に合わせて運用するための確認手順。

## 事前条件

- Cloudflare Pages / DNS の設定を確認できる担当者がいる
- Google Search Console の所有権確認を行える担当者がいる
- 認証情報、token、DNS TXT 値、Search Console verification file は repo に保存しない

## deploy 前の repo 確認

```sh
bun run check
bun run build
```

- `build/robots.txt` に `Sitemap: https://swarrow.com/sitemap.xml` が含まれる
- `build/sitemap.xml` に `https://swarrow.com/` が含まれる
- build 後の root HTML に `title` / `description` / canonical / JSON-LD が含まれる

## Cloudflare / DNS 確認

Cloudflare の `error code: 1016` は origin DNS error なので、SEO 施策より先に
公開到達性を復旧する。

- Cloudflare の custom domain が `swarrow.com` に紐付いている
- `swarrow.com` の DNS record が Cloudflare Pages の公開先に向いている
- `www.swarrow.com` を使う場合は、redirect 先と canonical 方針を別途確認する
- 復旧後、次のコマンドが 200 系を返す

```sh
curl -I -L https://swarrow.com/
curl -I -L https://swarrow.com/robots.txt
curl -I -L https://swarrow.com/sitemap.xml
```

`https://swarrow.com/` が `error code: 1016` または HTTP 530 を返す間は、
Googlebot がページを取得できない可能性が高い。

## Search Console 確認

1. Google Search Console で `swarrow.com` の property を確認する
2. 所有権確認は担当者が実施し、認証情報や token を repo に保存しない
3. `https://swarrow.com/sitemap.xml` を sitemap として送信する
4. URL 検査で `https://swarrow.com/` のクロール可否と index 可否を確認する
5. 必要に応じて index 登録をリクエストする
6. 数日後に検索パフォーマンスとカバレッジを確認する

## 成果確認

- `site:swarrow.com` で page が検出される
- Search Console に sitemap が検出される
- Search Console の URL 検査で root URL が取得可能になる
- 検索クエリは `自治体 AI 電話対応`、`AI 受電 自治体`、
  `住民問い合わせ 自動化` を中心に確認する

検索順位や即時 index は保証しない。公開到達性、クロール可能性、metadata、
sitemap、Search Console の検出状況を継続的に確認する。
