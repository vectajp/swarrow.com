# Swarrow Call

AI カスタマーサポートサービス「Swarrow Call」のランディングページ。SvelteKit + Bun で管理する。

元デザイン: https://www.figma.com/design/2eT31sLxtnkjkDpM1l1CMI/SwarrowCall

## セットアップ

```sh
mise run bootstrap
```

mise 管理ツールのインストール、`bun install`、git hooks のインストール、`.dev.vars`(Pages Functions 用環境変数)の初期作成を一括実行する。

## ディレクトリ

- `src/routes/+page.svelte`: Swarrow Call の LP を配置する root route
- `src/lib/`: LP で使う共有コンポーネント・ユーティリティを置く
- `static/`: そのまま配信する静的ファイル(画像、資料ダウンロード用 PDF、
  `robots.txt` など)
- `functions/`: 資料ダウンロードフォームのメール送信を処理する Cloudflare
  Pages Function

## 実行方法

```sh
bun run dev      # 開発サーバーを http://localhost:5179/ で起動
bun run build    # adapter-static で build/ へ静的プリレンダリング
bun run preview  # build/ の内容を http://localhost:4174/ でプレビュー
```

`dev` / `preview` は固定ポートで起動し、指定ポートが使用中の場合は別ポートへ自動変更せず起動に失敗する。

## LP 変更時の注意

- Swarrow Call の LP は `src/routes/+page.svelte` を編集する
- credentials、tokens、private keys、本番相当の API endpoint、機微なサンプル payload は保存しない
- 変更後は `bun run check` と `bun run build` を実行する

## その他のコマンド

```sh
bun run check      # Biome のフォーマット/リントチェック + svelte-check による型チェック
bun run check:fix  # Biome によるフォーマット/リントの自動修正
bun run clean      # node_modules / build / .svelte-kit を削除
```

## ドキュメント

- [Pages Functions (メール送信)](docs/pages-functions.md) -- 環境変数・ローカル検証手順・本番設定
- [資料ダウンロードリンク](docs/download-link.md) -- PDF の差し替え手順・ファイル名変更時の対応
