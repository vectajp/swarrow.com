# SvelteKit 版 Swarrow Call LP への移行 設計書

Issue: https://github.com/vectajp/swarrow.com/issues/3

## Context

- `vectajp/swarrow.com`(本リポジトリ)は現在 Astro 5 + React 19 + Tailwind CSS 4 で
  Swarrow Call LP を配信している。フォーム送信は `functions/api/contact.ts`
  (Cloudflare Pages Function)が SendGrid API を `fetch()` で直接呼び出し、
  (1) 社内通知メール、(2) 申込者への資料ダウンロードリンク付き自動返信、の
  2通を送信する。フロントエンド (`DownloadFormModal.tsx`) はこのエンドポイントに
  `companyName` / `name` / `nameKana` / `email` / `inquiry` を JSON で POST する。
- 別リポジトリ `nichicom-sakurai/svelte-lp-workshop` で、SvelteKit 5(runes)+
  `adapter-static` + Bun による新版 LP(スマホ市役所/GovTech 訴求)を作成済み。
  単一ルート `src/routes/+page.svelte` に全コンテンツ、データは
  `src/lib/swarrow-call/content.ts` に集約。React/Tailwind は一切使わず、
  OS システムフォントと素の CSS(scoped `<style>`)で組んでいる。
- 新版 LP には現状、資料ダウンロード/問い合わせのフォームを開く導線が無い
  (Header/CTA は `#contact` への自己参照アンカーのみで、配線されていない)。
- 両リポジトリの `cspell.json` + `app-words.txt` によるスペルチェック方式は
  既に一致している(移植先の推測に一部誤りがあったため 2026-07-08 に再検証済み。
  「事前検証メモ」は Issue 側を参照)。

## Boundaries (Never / Always / Ask First)

- **Always**: `functions/api/contact.ts`、`public/downloads/swarrow_call.pdf`
  は変更しない(温存・再利用)。`docs/pages-functions.md`・`docs/download-link.md`・
  `.dev.vars.example` は内容・構成を維持しつつ、static/ 移行(Task 5)や
  adapter-static のデフォルト出力先変更に伴い実態と食い違う経路情報
  (`dist`→`build`、`public/downloads/`→`static/downloads/`、ローカル
  `SITE_URL` のポート番号)のみ機械的に訂正する(ドキュメント/テンプレートの
  正確性を保つための最小限の訂正であり、温存方針への違反ではない。実装内容
  ・環境変数の説明文・手順そのものは変更しない)。
- **Always**: 新規フォーム UI はフィールド名(`companyName` / `name` /
  `nameKana` / `email` / `inquiry`)を維持する。送信先・ペイロード形式は
  現在の参照実装(`main` の `swarrow.com-backend` + Turnstile 方式)に
  追随する。文字数制限・email 正規表現は当初 `functions/api/contact.ts`
  (現在は 410 で廃止)の契約に基づくものだったため撤回し、代わりに
  React 参照実装(`main` の `DownloadFormModal.tsx`)が課す制約
  (`type="email"`/`required` のみ、`maxlength`/`pattern` なし)に合わせる。
- **Always**: `feature/` ブランチで作業し、PR を作成してレビューを経てから
  `main` にマージする。`main` への直接コミットはしない。
- **Never**: `docs/sales/miyagawa`(営業資料一式)、`.venv-pptx`、`tmp/`、
  `.claude/skills`・`.claude/agent-memory` 配下の無関係コンテンツを
  削除・変更しない(未追跡のローカル成果物を含む)。
- **Ask First**: Cloudflare Pages ダッシュボードのビルド設定変更
  (出力ディレクトリ `dist` → `build` 等)はこの設計・実装のスコープ外。
  マージ前に別途ユーザーへ確認する。

## Architecture

### 温存(無変更でそのまま残す)

| ファイル | 役割 |
| --- | --- |
| `functions/api/contact.ts` | Cloudflare Pages Function。SendGrid 経由のメール送信処理 |
| `public/downloads/swarrow_call.pdf` | 資料ダウンロード対象の PDF |
| `docs/pages-functions.md` | メール送信の環境変数・検証手順ドキュメント |
| `docs/download-link.md` | 資料ダウンロードリンクの運用ドキュメント |
| `.dev.vars.example` | ローカル開発用の環境変数テンプレート |

### 置換(移植元 `svelte-lp-workshop` の内容で置き換え)

| 対象 | 内容 |
| --- | --- |
| `astro.config.mjs` → `vite.config.ts` | Astro 設定を破棄し、SvelteKit + adapter-static の Vite 設定に置換 |
| `src/app/`, `src/layouts/`, `src/pages/`, `src/styles/`, `src/imports/`, `src/assets/`, `src/vite-env.d.ts` | 削除。React コンポーネント・Astro レイアウト・Tailwind・Figma import 一式を撤去 |
| `src/routes/+layout.svelte`, `src/routes/+layout.ts`, `src/routes/+page.svelte`, `src/lib/swarrow-call/content.ts`, `src/app.html`, `src/app.d.ts` | 新規追加(移植元から) |
| `static/swarrow/`, `static/swarrow-call/` | 新規追加(移植元の画像/動画アセット一式) |
| `public/robots.txt` → `static/robots.txt` | 移植元のシンプル版に置換。現行の `Sitemap: https://swarrow.com/sitemap-index.xml` 行は Astro の `@astrojs/sitemap` 由来で、SvelteKit 側に同等機能が無いため削除する(ユーザー確認済み: 単一ページ LP のため sitemap.xml 喪失は許容する) |
| `package.json`, `bun.lock`, `bunfig.toml`, `biome.json`, `cspell.json`, `lefthook.yml`, `tsconfig.json`, `mise.toml`, `tools/*`(`tools/tsconfig.json` 含む) | 移植元の内容で置換(依存関係を Astro/React/Tailwind から SvelteKit/Svelte/adapter-static/svelte-check に入れ替え)。ただし `biome.json` の `files.includes` には `!functions/**`、`!docs/sales/**` を追加し、温存ファイル・対象外ファイルを Biome のスキャン対象から除外する(移植元のフォーマット規則が `functions/api/contact.ts` の既存スタイルと非互換であるため、含めたままだと Always/Never 境界と `bun run check` 通過の両立ができない) |
| `AGENTS.md` / `CLAUDE.md`(symlink) | 移植元 `AGENTS.md` をベースに全面改稿。Figma リンクなど Swarrow Call 固有情報は引き継ぐ。Cloudflare Pages Functions に関する記述(`docs/pages-functions.md` へのリンク)は残す |
| `README.md` | SvelteKit 構成に合わせて改稿。Pages Functions ドキュメントへのリンクは維持 |

### マージ(上書きしない)

- `app-words.txt`: 移植先の既存 18 語(`SENDGRID`、`Vecta`、`miyagawa` 等、
  温存ファイル側で必要な語を含む)と移植元の LP コピー由来語彙を和集合でマージする。
- `.vscode/settings.json`: 移植元の `biomejs.biome` フォーマッタ設定・
  `explorer.fileNesting.patterns` を基本としつつ、移植先固有の項目
  (`"cspell.json": "app-words.txt"` のネスト表示等)で欠けているものがあれば
  引き継ぐ。
- `.gitignore`: 移植元由来の SvelteKit 生成物除外(`.svelte-kit/`, `build/`,
  `vite.config.ts.timestamp-*`)と Biome/mise 関連除外を追加しつつ、移植先の
  Cloudflare 関連除外(`.wrangler/`, `.dev.vars`)は**必ず残す**(`.dev.vars` は
  `SENDGRID_API_KEY` を含むため、除外設定の欠落は機密情報の誤コミットに直結する。
  マージ後に `git check-ignore -v .dev.vars` で除外が効いていることを確認する)。
  Astro 由来の `dist/`, `.astro/` は不要になるため削除する。両者に共通する
  `node_modules/`, `.DS_Store`, `*.local`, `tmp/` はそのまま。
- `tools/bootstrap.sh`: 移植元の内容(mise install/bun install/lefthook install)
  をベースにしつつ、移植先固有の「`.dev.vars.example` → `.dev.vars` の初回コピー」
  ステップ(`docs/pages-functions.md` が前提とする挙動)を必ず残す。単純な
  上書きではなくこのステップの移植を明示する。

  **[2026-07-08 追記]** `main` の不正送信対策取り込みに伴い、この
  `.dev.vars` 初回コピーステップは不要になった。`functions/api/contact.ts`
  が `410 Gone` を返すだけのスタブになり環境変数を一切参照しなくなったため、
  `main` の `tools/bootstrap.sh`(`.dev.vars` ステップを `.env.template` →
  `.env` の初回コピーに置き換え済み)をそのまま採用する。
- `.cspell/`(移植先の旧カスタム辞書ディレクトリ、`swarrow` の1語のみ)と
  `.vscode/settings.json` の `cSpell.customDictionaries` 参照は、`cspell.json` +
  `app-words.txt` 方式への一本化に伴い不要になるため削除する。
- `.claude/rules/*.md`(`bun.md`, `biome.md`, `git-hooks.md`, `mise.md`,
  `spelling.md`, `typescript.md`): 移植元の内容を新規追加する。新しく導入する
  Bun/Biome/lefthook/mise/cspell/TypeScript のツールチェーンに対応する規約
  ドキュメントであり、既存の `.claude/skills`・`.claude/agent-memory`(Never
  境界の対象)とは独立した追加のみのファイル群のため抵触しない。
- `.vscode/launch.json`: `docs/sales/miyagawa` 用の "Sales Deck" 設定は
  Never 境界の対象(無関係コンテンツ)につき変更しない。"Swarrow Site: Astro Dev"
  設定はコマンド自体(`bun run dev`)は変わらないため、ラベルのみ実態に
  合わせて更新する(例: "Swarrow Site: Dev")。
- ローカルの `.dev.vars`(実ファイル、gitignore 対象・未追跡)はそのまま
  維持する。ファイル削除やディレクトリ丸ごとの `git clean` 等で誤って
  消さないこと。

### 新規作成: フォームモーダル

- React 版 `DownloadFormModal.tsx` の入力項目・バリデーション表示・送信状態
  (idle/送信中/完了/エラー)を踏襲した Svelte 5(runes)コンポーネントを
  `src/lib/swarrow-call/` 配下に新規作成する。
- 見出し・ボタン文言は新 LP のトーン(「お問い合わせ」「導入相談・デモを
  依頼する」)に統一する。「資料ダウンロード」という語句は前面に出さないが、
  送信完了画面に「ご入力いただいたメールアドレス宛に資料ダウンロードリンクを
  お送りします」という一文は残す(バックエンドの実際の挙動と一致させるため)。
- Header の `.sc-cta`(「お問い合わせ」)、CTA セクションの `.cta-btn`
  (「導入相談・デモを依頼する」)のクリックでモーダルを開く。両ボタンとも
  `href="#contact"` への自己参照アンカーをやめ、`onclick` でモーダル開閉状態を
  トグルする。
- 送信先は `POST /api/contact`(相対パス)。フィールド名・文字数制限・
  email 正規表現は `functions/api/contact.ts` の `validateBody` と完全一致させる。

  **[2026-07-08 追記]** 実装途中で `main` に不正送信対策コミット
  (`functions/api/contact.ts` を `410 Gone` へ無効化、資料請求フォームの
  送信先を外部バックエンド `swarrow.com-backend`
  (`PUBLIC_DOWNLOAD_REQUEST_API_URL`)+ Cloudflare Turnstile 認証へ移行)
  が追加されていることが判明したため、`main` を取り込み、本コンポーネントを
  この新方式(Turnstile ウィジェット + 外部 API 送信)に合わせて作り直した。
  文言(「お問い合わせ」トーン)は変更していない。文字数制限・email 正規表現は
  `functions/api/contact.ts` 由来の制約だったため撤回し、React 参照実装
  (`main` の `DownloadFormModal.tsx`)と同じ制約(`type="email"`/`required`
  のみ)に揃えた。詳細は Issue #3 のコメント参照。

### site / SEO 情報の更新

- `src/lib/swarrow-call/content.ts` の `export const site` を
  `https://swarrow-call.example.com`(プレースホルダー)から
  `https://swarrow.com` に更新する。

## Acceptance Criteria (Given-When-Then)

1. Given ビルド後のサイトにアクセスしたとき、When ページを表示すると、
   Then SvelteKit 版 LP のコンテンツ(ヒーロー/ナレッジ/ワークフロー/
   チャット・電話機能/カスタマーサクセス/事例/ニュース/CTA/フッター)が
   表示される。
2. Given Header の「お問い合わせ」または CTA セクションの
   「導入相談・デモを依頼する」ボタンをクリックしたとき、When フォーム
   モーダルが開くと、Then 会社名・氏名・ふりがな・メールアドレス・お問い合わせ
   内容を入力して送信できる。
3. **[2026-07-08 改訂]** Given フォームを正しく送信し Turnstile 認証を
   完了したとき、When 外部バックエンド(`PUBLIC_DOWNLOAD_REQUEST_API_URL`、
   既定値 `https://api.swarrow.com/download-requests`)へリクエストが
   送られると、Then 送信が成功し完了画面が表示される。(旧: `/api/contact`
   へ送信し `functions/api/contact.ts` が処理する、という記述は `main` の
   不正送信対策により無効化されたため撤回)
4. **[2026-07-08 改訂]** Given Turnstile 未認証のまま送信を試みたとき、
   Then「認証確認が完了していません」がモーダル上に表示される。Given
   外部バックエンドがエラーを返したとき、Then そのエラーメッセージが
   モーダル上に表示される。(旧: `functions/api/contact.ts` のバリデーション
   エラー表示、という記述は撤回)
5. Given `bun run check` と `bun run build` を実行したとき、Then Biome/
   cspell/svelte-check がエラーなく通り、`build/` に静的サイトが生成される。
6. Given `docs/sales/miyagawa` 等の無関係コンテンツを確認したとき、Then
   一切変更されていない。
7. Given `src/lib/swarrow-call/content.ts` の `site` を確認したとき、Then
   `https://swarrow.com` になっている。
8. Given `public/robots.txt` を確認したとき、Then 移植元のシンプル版に
   置き換わっており `Sitemap:` 行が存在しない。
9. Given `AGENTS.md` / `CLAUDE.md` を確認したとき、Then 技術スタック説明が
   SvelteKit 構成に更新されている。

## Decisions Made

| 決定 | 根拠 | 確信度 |
| --- | --- | --- |
| Astro+React+Tailwind を SvelteKit+adapter-static+Bun に完全置換する | ユーザーが「Svelte の内容をすべて移植する」と明言。CLAUDE.md も adapter-static 前提を明記 | 90% |
| `functions/api/contact.ts` は無変更でそのまま流用する(adapter-cloudflare への統合はしない) | ユーザーが処理の再利用を明言。Cloudflare Pages Functions はフロントエンドのビルドツールに依存しないため移行後も動作する。adapter-cloudflare への統合は要求されておらず、環境変数バインディング再設計等の不要なリスクを伴う | 85% |
| 資料ダウンロード用フォームモーダルを Svelte で新規作成し、Header/CTA の導線を配線する | 移植元 LP には現状フォームが存在せず、温存した処理を実際に呼び出す導線が無いと機能が死んでしまうため | 90%(ユーザー確認済み) |
| フォーム文言は新 LP のトーン(お問い合わせ/導入相談・デモ)に合わせる | 移植元 LP のコピーには「資料ダウンロード」という語句が一切登場しないため、既存 React 版の文言をそのまま踏襲すると LP 全体のトーンと不整合になる | 85%(ユーザー確認済み) |
| git 履歴を引き継がず、最終状態のファイルをクリーンにコピーする | `svelte-lp-workshop` はワークショップリポジトリであり、過去の実験用 LP(hanada/hiyori/emit/overprint 等)の履歴が混在している。本番リポジトリの履歴に無関係なノイズを持ち込むべきではない | 80% |
| `docs/sales/miyagawa`、`.venv-pptx`、`tmp/`、`.claude` 配下は一切手を付けない | ユーザーが「現状維持」を明示的に選択。LP とは無関係な別成果物であるため | 95%(ユーザー確認済み) |
| `feature/` ブランチ + PR で作業する | ユーザーが明示的に選択。本番相当のリポジトリのため直接 `main` へのコミットは避ける | 95%(ユーザー確認済み) |
| `app-words.txt` は上書きせずマージする | 移植先の既存語彙(`SENDGRID` 等、温存ファイルで使用)を失うと cspell が温存ファイルに対して誤検知する | 90% |

## Open Questions

- Cloudflare Pages ダッシュボードのビルド設定(ビルドコマンド/出力
  ディレクトリ `dist` → `build`)の更新はいつ・誰が行うか。マージ前に
  ユーザーへ確認が必要(Boundaries の Ask First 参照)。
- `docs/pages-functions.md` のローカル検証手順が案内する
  `bunx wrangler pages dev dist` は、adapter-static のデフォルト出力
  `build/` と食い違っている。同ファイルは温存(無変更)対象のため本設計では
  放置するが、Cloudflare 側の出力ディレクトリ切り替えのタイミングで追随
  更新するフォローアップが別途必要(担当・タイミング未定)。
- 本番ドメイン切り替え後、検証期間を設けるかどうか未定。

## Non-Goals

- `functions/api/contact.ts` のロジック変更・SendGrid 以外のメールサービスへの
  移行。
- `@sveltejs/adapter-cloudflare` への移行、SvelteKit 側 `+server.ts` への
  バックエンド統合(アプローチ B として検討し却下)。
- `docs/sales/miyagawa` 等、LP と無関係な既存コンテンツの整理・削除。
- Cloudflare Pages のダッシュボード設定変更そのもの(リポジトリ外の作業)。
- 新しい LP コピー・デザインの追加変更(移植元の内容をそのまま使う)。
