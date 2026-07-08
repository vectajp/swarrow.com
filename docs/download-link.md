# 資料ダウンロードリンク

## 概要

資料ダウンロードフォーム送信時に、問い合わせ者のメールアドレス宛に
ダウンロードリンク付きメールを自動送信する。

PDF は `static/downloads/` に配置し、Cloudflare Pages で静的配信する。

ダウンロードリンクの生成とメール送信は `swarrow.com-backend` が担当する。
frontend 側は PDF ファイルを静的配信するだけにする。

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

デプロイ後、`https://swarrow.com/downloads/swarrow_call.pdf` でアクセス可能になる。

## ファイル名を変更する場合

1. `static/downloads/` 内のファイル名を変更
2. `swarrow.com-backend` の資料リンク生成を更新

3. コミット & デプロイ
