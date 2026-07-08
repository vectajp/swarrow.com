# Swarrow Call

AI カスタマーサポートサービス「Swarrow Call」のランディングページ。SvelteKit + Bun で管理する。ランタイム、フォーマット、TypeScript、スペルチェック、git hooks の規約は `.claude/rules/` 配下に分割している。該当するファイルを編集する前に、対応するルールファイルを読むこと。

## プロジェクト規約

- Swarrow Call の LP は root route の `src/routes/+page.svelte` に置く。
- 共有するコンポーネントやユーティリティは `$lib` エイリアス経由で読めるよう
  `src/lib/` 配下に置く。
- credentials、tokens、private keys、本番相当の API endpoint、機微な sample
  payload はコミットしない。環境ごとに変わる値は保存前に placeholder へ
  置き換える。
- パッケージマネージャーと script runner は Bun に統一する。npm、pnpm、
  Yarn、ESLint、Prettier の設定を追加しない。
- ビルド/デプロイ先は adapter-static による静的プリレンダリングを前提と
  する(`vite.config.ts` 参照)。SSR やサーバー専用 API が必要になった場合
  はこの前提を見直し、adapter を含め改めて設計する。
- 完了を報告する前に `bun run check` と `bun run build` を実行する。

## Cloudflare Pages Functions

資料ダウンロードフォームのメール送信は Cloudflare Pages Function (`functions/api/contact.ts`) で処理する。環境変数・ローカル検証手順は [docs/pages-functions.md](docs/pages-functions.md) を、資料ダウンロードリンクの運用手順は [docs/download-link.md](docs/download-link.md) を参照。

## Figma

元デザイン: https://www.figma.com/design/2eT31sLxtnkjkDpM1l1CMI/SwarrowCall

## Codex 互換性

`CLAUDE.md` はこのファイルへの symbolic link である。編集は `AGENTS.md` に対して行い、`CLAUDE.md` を通常ファイルに置き換えないこと。
