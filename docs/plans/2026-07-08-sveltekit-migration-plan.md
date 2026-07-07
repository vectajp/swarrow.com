# SvelteKit 版 Swarrow Call LP への移行 実装計画

**Goal:** vectajp/swarrow.com の Astro+React+Tailwind 製 LP を、
nichicom-sakurai/svelte-lp-workshop で作成済みの SvelteKit 版 LP に完全置換する。
問い合わせ・資料ダウンロードを処理する Cloudflare Pages Function 一式は温存し、
新規に Svelte 製フォームモーダルで実際に呼び出せるようにする。

**Architecture:** SvelteKit 5(runes)+ `@sveltejs/adapter-static` + Bun による
静的プリレンダリング構成に完全移行する。`functions/api/contact.ts`(Cloudflare
Pages Function)はフロントエンドのビルドツールに依存しないため無変更で流用する。
静的アセット配置は Astro の `public/` 規約から SvelteKit の `static/` 規約へ
統合する。

**Tech Stack:** SvelteKit 2 / Svelte 5(runes)/ Vite 8 / `@sveltejs/adapter-static`
/ Bun / Biome / cspell / lefthook / mise。テストフレームワークは未導入(両
リポジトリとも)。検証は `bun run check`(Biome + svelte-check)、
`bun run build`、および `bunx wrangler pages dev build` によるローカル
Cloudflare Pages Functions 動作確認で行う。

**Design Document:** `docs/plans/2026-07-08-sveltekit-migration-design.md`

**Related Issue:** https://github.com/vectajp/swarrow.com/issues/3

**Recommended Execution:** Loop (HITL) — 13 タスク、中程度の複雑さ。Task 5-6
(フロントエンド全置換)と Task 8-10(新規フォーム実装+E2E確認)は特に
人の目での確認が有効なため、区切りごとに立ち止まることを推奨する。

**作業前提:**
- 実装は `/Users/sakurai.yuki/code/github/vectajp/swarrow.com` で
  `feature/GH-3-sveltekit-migration` ブランチを切って行う。
- 移植元 `/Users/sakurai.yuki/code/github/nichicom-sakurai/svelte-lp-workshop`
  は読み取り専用の参照元とし、書き込みは行わない。
- 各タスクの `cp`/`git mv` コマンドは、上記2つの絶対パスが同一マシン上に
  存在することを前提とする。

---

### Task 1: パッケージ管理・TypeScript・Biome 設定の置換

**Files:**
- Modify: `package.json`, `bun.lock`, `bunfig.toml`, `biome.json`, `tsconfig.json`

**Step 1: 移植元の内容を確認**

移植元の該当ファイルはそのまま使う。`package.json` の `name` フィールドのみ
`"swarrow.com"` のまま維持する(移植元は `"svelte-lp-workshop"`)。`version`/
`private` は移植元の値(`"0.1.0"`/`true`)をそのまま採用する(移植先の旧値
`"0.0.1"`・`private` 未設定は破棄する)。

**Step 2: ファイルを置換(biome.json は除外パターンを追加)**

```bash
SRC=/Users/sakurai.yuki/code/github/nichicom-sakurai/svelte-lp-workshop
DST=/Users/sakurai.yuki/code/github/vectajp/swarrow.com

cp "$SRC/bunfig.toml" "$DST/bunfig.toml"
cp "$SRC/biome.json" "$DST/biome.json"
cp "$SRC/tsconfig.json" "$DST/tsconfig.json"
cp "$SRC/package.json" "$DST/package.json"
```

`$DST/package.json` の `"name"` を `"swarrow.com"` に戻す(1行編集)。

**重要: `biome.json` の `files.includes` に温存/対象外ディレクトリの除外を追加する。**
移植元の `biome.json` は `"files": { "includes": ["**"] }` で全ファイルを
スキャン対象にしているが、温存対象の `functions/api/contact.ts`(シングル
クォート・セミコロンなしの既存スタイル)と対象外の `docs/sales/miyagawa/`
配下は移植元のフォーマット規則(ダブルクォート・セミコロン必須・行幅80)に
準拠していない。このまま置換すると `bun run check` がこれらのファイルに対して
失敗し、かつ「温存ファイルを直さないと check が通らない」という Always/Never
境界との板挟みが生まれる(design-reviewer による実測で確認済み)。
`$DST/biome.json` の `files.includes` を以下のように変更する:

```json
{
  "files": {
    "ignoreUnknown": false,
    "includes": ["**", "!functions/**", "!docs/sales/**"]
  }
}
```

(移植先の旧 `biome.json` が `"!dist"`, `"!generated"` 等の否定パターンを
既に使っていた記法を踏襲する)

**Step 3: 依存関係を再インストール**

```bash
cd "$DST"
rm -f bun.lock
bun install
```

(`bun.lock` は移植元のものをコピーせず、`package.json` の `"name"` 修正後に
`bun install` で再生成する — ロックファイルの整合性を保つため)

**Step 4: 検証**

```bash
bun install
bunx biome check .
```

Expected: `bun install` が依存解決エラーなく完了する。`bunx biome check .` は
`functions/`・`docs/sales/` を除外した状態でエラーなく完了する(温存ファイル・
対象外ファイルに対してフォーマット/lint エラーを出さないことをこの時点で
早期確認する — Task 13 まで持ち越さない)。

**Step 5: Commit**

```bash
git add package.json bun.lock bunfig.toml biome.json tsconfig.json
git commit -m "chore(tooling): パッケージ管理・TS・Biome 設定を SvelteKit 向けに置換"
```

---

### Task 2: git hooks(lefthook/tools/\*)の置換

**Files:**
- Modify: `lefthook.yml`, `mise.toml`, `tools/check-branch.ts`, `tools/check-commit-msg.ts`, `tools/commit-rules.ts`, `tools/tsconfig.json`, `tools/clean.sh`
- Modify: `tools/bootstrap.sh`(移植元ベース + `.dev.vars` 生成ステップを保持)

**Step 1: lefthook・mise・tools を置換**

(移植元の `tools/bootstrap.sh` は `lefthook.yml` の存在チェックを行わず直接
`bunx lefthook install` を呼ぶ。移植先の旧版にあった `[ -f lefthook.yml ]`
チェックは失われるが、本タスクで `lefthook.yml` 自体も同時にコピーするため
実害はない)

```bash
SRC=/Users/sakurai.yuki/code/github/nichicom-sakurai/svelte-lp-workshop
DST=/Users/sakurai.yuki/code/github/vectajp/swarrow.com

cp "$SRC/lefthook.yml" "$DST/lefthook.yml"
cp "$SRC/mise.toml" "$DST/mise.toml"
cp "$SRC/tools/check-branch.ts" "$DST/tools/check-branch.ts"
cp "$SRC/tools/check-commit-msg.ts" "$DST/tools/check-commit-msg.ts"
cp "$SRC/tools/commit-rules.ts" "$DST/tools/commit-rules.ts"
cp "$SRC/tools/tsconfig.json" "$DST/tools/tsconfig.json"
cp "$SRC/tools/clean.sh" "$DST/tools/clean.sh"
```

**Step 2: `tools/bootstrap.sh` は移植元をベースに `.dev.vars` 生成ステップを追加**

移植元の `tools/bootstrap.sh` をコピーした上で、`git hooks` セクションと
`Finish` セクションの間に、移植先の既存ロジック(`.dev.vars.example` →
`.dev.vars` の初回コピー)を差し込む:

```bash
cp "$SRC/tools/bootstrap.sh" "$DST/tools/bootstrap.sh"
```

`$DST/tools/bootstrap.sh` に以下のブロックを `git hooks` セクションの直後、
`Finish` セクションの直前に追加する:

```bash

##############################################################################
##
##  .dev.vars
##
##############################################################################
echo ""
echo "🚀 .dev.vars: Start"
if [ -f .dev.vars ]; then
  echo "⚠️ .dev.vars: Skip because .dev.vars already exists."
else
  if [ -f .dev.vars.example ]; then
    cp .dev.vars.example .dev.vars
    echo "✅ .dev.vars: Copied from .dev.vars.example"
    echo "⚠️ .dev.vars: Edit .dev.vars to set SENDGRID_API_KEY"
  else
    echo "🚫 .dev.vars: .dev.vars.example not found"
  fi
fi
```

**Step 3: 検証**

```bash
cd "$DST"
bunx lefthook install
./tools/bootstrap.sh  # .dev.vars が既に存在する場合は "Skip" と出ることを確認
```

Expected: エラーなく完了し、`.dev.vars` 生成ロジックのログが表示される。

**Step 4: Commit**

```bash
git add lefthook.yml mise.toml tools/
git commit -m "chore(tooling): git hooks・tools を SvelteKit 向けに置換(.dev.vars 生成は維持)"
```

---

### Task 3: cspell・.gitignore・エディタ設定のマージ

**Files:**
- Modify: `cspell.json`, `app-words.txt`, `.gitignore`, `.vscode/settings.json`, `.vscode/launch.json`
- Delete: `.cspell/`

**Step 1: cspell.json を置換、app-words.txt をマージ**

```bash
SRC=/Users/sakurai.yuki/code/github/nichicom-sakurai/svelte-lp-workshop
DST=/Users/sakurai.yuki/code/github/vectajp/swarrow.com

cp "$SRC/cspell.json" "$DST/cspell.json"
```

`$DST/app-words.txt` の既存18語(`ajpuzfybt`, `axisw`, `bunx`, `edcb`,
`fontsource`, `Graffer`, `Hiragino`, `Meiryo`, `miyagawa`, `naoya`, `Noto`,
`noto`, `SENDGRID`, `swarrow`, `Vecta`, `Vite`, `wght`, `zuledu`)と移植元の
`app-words.txt` の内容を和集合でマージし、アルファベット順に整理して
`$DST/app-words.txt` に保存する(`functions/api/contact.ts` 等の温存ファイルが
`SENDGRID` 等の既存語彙を必要とするため、単純上書きしない)。

**Step 2: `.cspell/` を削除**

```bash
git rm -r "$DST/.cspell"
```

**Step 3: `.gitignore` をマージ**

`$DST/.gitignore` を以下の内容に更新する(移植先の Cloudflare 関連除外を
必ず残し、移植元の SvelteKit 生成物除外を追加、Astro 由来のエントリを削除):

```gitignore
node_modules/
.DS_Store

# SvelteKit generated files / build output (bun run build)
.svelte-kit/
build/
vite.config.js.timestamp-*
vite.config.ts.timestamp-*

# mise machine-local overrides
mise.local.toml
.mise.local.toml

# Secrets / machine-specific values (keep *.template, commit those)
*.local
.env
.env.*
!*.template

# Cloudflare Pages
.dev.vars
.wrangler/

# Scratch / temporary working files
tmp/

# Agent worktrees (internal tooling artifacts, not for commit)
.claude/settings.local.json
.claude/worktrees/

# Browser-automation session cache
.playwright-mcp/
.playwright-cli/
```

(移植元の `.gitignore` の全エントリを網羅しつつ、移植先固有の `.dev.vars`/
`.wrangler/` を維持する。現時点でこれらのツール類の実体は無いが、将来の
導入に備えて除外設定自体は先取りしておく)

**Step 4: `.vscode/settings.json` をマージ**

移植元の Biome フォーマッタ設定・`explorer.fileNesting.patterns` をベースに、
移植先固有の以下のエントリを明示的に引き継ぐ(「欠けていれば」ではなく、
必ず含める):

- `"css.validate": false`
- `explorer.fileNesting.patterns` の `"cspell.json": "app-words.txt"`
- `explorer.fileNesting.patterns` の `".dev.vars.example": ".dev.vars"`

`cSpell.customDictionaries` の参照は `.cspell/` 削除に伴い存在しないことを
確認する(現状の `.vscode/settings.json` には元々このキーは無いことを設計
フェーズで確認済み)。

**Step 5: `.vscode/launch.json` のラベルのみ更新**

`"Swarrow Site: Astro Dev"` → `"Swarrow Site: Dev"` に変更する(コマンド
`bun run dev` はそのまま)。`"Sales Deck"` 設定は無変更。

**Step 6: 検証**

```bash
cd "$DST"
git check-ignore -v .dev.vars   # 除外が効いていることを確認(Exit 0 必須)
git check-ignore -v .wrangler   # 同上
bunx cspell --no-progress "functions/**/*.ts" "docs/**/*.md"  # 温存ファイルで誤検知が無いことを確認
```

Expected: `.dev.vars`/`.wrangler` がともに ignore 対象と表示され、cspell が
温存ファイルに対してエラーを出さない。

**Step 7: Commit**

```bash
git add cspell.json app-words.txt .gitignore .vscode/settings.json .vscode/launch.json
git commit -m "chore(tooling): cspell・gitignore・エディタ設定をマージ"
```

---

### Task 4: `.claude/rules/*.md` の追加

**Files:**
- Create: `.claude/rules/bun.md`, `.claude/rules/biome.md`, `.claude/rules/git-hooks.md`, `.claude/rules/mise.md`, `.claude/rules/spelling.md`, `.claude/rules/typescript.md`

**Step 1: コピー(新規追加のみ、既存の `.claude/skills`・`.claude/agent-memory` には触れない)**

```bash
SRC=/Users/sakurai.yuki/code/github/nichicom-sakurai/svelte-lp-workshop
DST=/Users/sakurai.yuki/code/github/vectajp/swarrow.com

mkdir -p "$DST/.claude/rules"
cp "$SRC/.claude/rules/"*.md "$DST/.claude/rules/"
```

**Step 2: 検証**

```bash
ls "$DST/.claude/rules"
git -C "$DST" status --porcelain .claude/  # skills/agent-memory が変更対象に含まれていないことを確認
```

**Step 3: Commit**

```bash
git add .claude/rules
git commit -m "docs: SvelteKit ツールチェーン向けの規約ドキュメントを追加"
```

---

### Task 5: Astro/React フロントエンドの削除 + 静的アセットを static/ へ統合

設計レビューにより、フロントエンド削除とアセット移行は同一タスクで行う
(削除だけ先行させると、後続タスクの検証がアセット欠如で意味を成さないため)。

**Files:**
- Delete: `astro.config.mjs`, `src/app/`, `src/layouts/`, `src/pages/`, `src/styles/`, `src/imports/`, `src/assets/`, `src/vite-env.d.ts`
- Move: `public/downloads/swarrow_call.pdf` → `static/downloads/swarrow_call.pdf`
- Replace: `public/robots.txt` → `static/robots.txt`(移植元のシンプル版、`Sitemap:` 行なし)
- Create: `static/swarrow/`, `static/swarrow-call/`(移植元からコピー)
- Delete: `public/`(空になった後)

**Step 1: Astro/React フロントエンドを削除**

```bash
DST=/Users/sakurai.yuki/code/github/vectajp/swarrow.com
cd "$DST"
git rm -r astro.config.mjs src/app src/layouts src/pages src/styles src/imports src/assets src/vite-env.d.ts
```

**Step 2: 静的アセットを static/ へ統合**

```bash
SRC=/Users/sakurai.yuki/code/github/nichicom-sakurai/svelte-lp-workshop

mkdir -p "$DST/static/downloads"
git mv "$DST/public/downloads/swarrow_call.pdf" "$DST/static/downloads/swarrow_call.pdf"

cp -r "$SRC/static/swarrow" "$DST/static/swarrow"
cp -r "$SRC/static/swarrow-call" "$DST/static/swarrow-call"
cp "$SRC/static/robots.txt" "$DST/static/robots.txt"

git rm public/robots.txt
rm -f "$DST/public/.DS_Store"
rmdir "$DST/public/downloads" "$DST/public" 2>/dev/null || true
git add static/
```

**Step 3: 検証**

```bash
find "$DST/static" -maxdepth 2 | sort
test ! -d "$DST/public" && echo "public/ 削除済み"
```

Expected: `static/downloads/swarrow_call.pdf`, `static/robots.txt`,
`static/swarrow/`, `static/swarrow-call/` が揃っており、`public/` が存在しない。

**Step 4: Commit**

```bash
git commit -m "refactor: Astro/React フロントエンドを削除し静的アセットを static/ へ統合"
```

---

### Task 6: SvelteKit スケルトン + ルートの追加

**Files:**
- Create: `vite.config.ts`, `src/app.html`, `src/app.d.ts`, `src/routes/+layout.svelte`, `src/routes/+layout.ts`, `src/routes/+page.svelte`, `src/lib/swarrow-call/content.ts`

**Step 1: コピー**

```bash
SRC=/Users/sakurai.yuki/code/github/nichicom-sakurai/svelte-lp-workshop
DST=/Users/sakurai.yuki/code/github/vectajp/swarrow.com

mkdir -p "$DST/src/routes" "$DST/src/lib/swarrow-call"
cp "$SRC/vite.config.ts" "$DST/vite.config.ts"
cp "$SRC/src/app.html" "$DST/src/app.html"
cp "$SRC/src/app.d.ts" "$DST/src/app.d.ts"
cp "$SRC/src/routes/+layout.svelte" "$DST/src/routes/+layout.svelte"
cp "$SRC/src/routes/+layout.ts" "$DST/src/routes/+layout.ts"
cp "$SRC/src/routes/+page.svelte" "$DST/src/routes/+page.svelte"
cp "$SRC/src/lib/swarrow-call/content.ts" "$DST/src/lib/swarrow-call/content.ts"
```

**Step 2: `bun install` で SvelteKit 型生成を実行**

```bash
cd "$DST"
bun install
bunx svelte-kit sync
```

**Step 3: 検証(この時点でアセットは Task 5 で既に揃っている)**

```bash
bun run dev
```

ブラウザで `http://localhost:5179/` を開き、ヒーロー動画・ロゴ・全セクション
画像が正しく表示されることを目視確認する(壊れた画像アイコンが無いこと)。

**Step 4: Commit**

```bash
git add vite.config.ts src/app.html src/app.d.ts src/routes src/lib
git commit -m "feat(swarrow-call): SvelteKit 版 LP のスケルトンとコンテンツを追加"
```

---

### Task 7: 本番ドメインへの更新

**Files:**
- Modify: `src/lib/swarrow-call/content.ts`

**Step 1: プレースホルダードメインを実ドメインへ**

```typescript
// 変更前
export const site = "https://swarrow-call.example.com";
// 変更後
export const site = "https://swarrow.com";
```

**Step 2: 検証**

```bash
grep -rn "swarrow-call.example.com" src/ && echo "NG: プレースホルダーが残存" || echo "OK"
```

**Step 3: Commit**

```bash
git add src/lib/swarrow-call/content.ts
git commit -m "fix(swarrow-call): site 定数を本番ドメインへ更新"
```

---

### Task 8: お問い合わせフォームモーダルの新規実装

**Files:**
- Create: `src/lib/swarrow-call/ContactModal.svelte`

**Step 1: コンポーネントを作成**

`functions/api/contact.ts` の `validateBody` と完全一致するフィールド契約
(`companyName`/`name`/`nameKana`/`email`/`inquiry`、文字数上限、email 正規表現)
を持つ Svelte 5(runes)コンポーネント。文言は新 LP のトーン(「お問い合わせ」)
に統一し、完了画面で資料ダウンロードリンクが自動返信される旨を明記する
(バックエンドが `functions/api/contact.ts` のまま、必ず資料ダウンロード
リンク付きメールを返信するため。ヘッダー/フッターの「お問い合わせ」、CTA の
「導入相談・デモを依頼する」いずれの導線から開いても同一のフォーム・同一の
自動返信内容になる — 意図的な単一フォーム設計であり、CTA 文言ごとに異なる
バックエンド処理を作ることは対象外(Non-Goals 参照))。

```svelte
<script lang="ts">
  interface Props {
    open: boolean;
    onClose: () => void;
  }

  let { open, onClose }: Props = $props();

  type FormState = "idle" | "submitting" | "done" | "error";

  let companyName = $state("");
  let name = $state("");
  let nameKana = $state("");
  let email = $state("");
  let inquiry = $state("");
  let state = $state<FormState>("idle");
  let errorMessage = $state("");

  const resetForm = () => {
    companyName = "";
    name = "";
    nameKana = "";
    email = "";
    inquiry = "";
    state = "idle";
    errorMessage = "";
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  let closeButton: HTMLButtonElement | undefined;

  $effect(() => {
    if (open) {
      closeButton?.focus();
    }
  });

  const handleSubmit = async (event: SubmitEvent) => {
    event.preventDefault();
    state = "submitting";
    errorMessage = "";

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, name, nameKana, email, inquiry }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "送信に失敗しました");
      }

      state = "done";
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : "送信中にエラーが発生しました";
      state = "error";
    }
  };
</script>

{#if open}
  <svelte:window onkeydown={(event) => event.key === "Escape" && handleClose()} />
  <div
    class="modal-backdrop"
    role="dialog"
    aria-modal="true"
    aria-labelledby="contact-modal-title"
    onclick={handleClose}
  >
    <div class="modal" role="document" onclick={(event) => event.stopPropagation()}>
      <button
        type="button"
        class="modal-close"
        bind:this={closeButton}
        onclick={handleClose}
        aria-label="閉じる"
      >
        ×
      </button>

      <div class="modal-body">
        {#if state === "done"}
          <div class="modal-done">
            <h3 id="contact-modal-title">送信が完了しました</h3>
            <p>
              ご入力いただいたメールアドレス宛に、資料ダウンロードリンクを含む
              ご案内をお送りします。担当者よりあらためてご連絡いたします。
            </p>
            <button type="button" class="modal-done-btn" onclick={handleClose}>閉じる</button>
          </div>
        {:else}
          <h3 id="contact-modal-title">お問い合わせ</h3>
          <p class="modal-lead">
            導入のご相談・デモのご依頼など、以下のフォームからお気軽にお問い合わせください。
          </p>

          <form onsubmit={handleSubmit}>
            <label>
              会社名<span class="required">*</span>
              <input
                type="text"
                bind:value={companyName}
                maxlength="200"
                placeholder="株式会社〇〇"
                required
              >
            </label>
            <label>
              氏名<span class="required">*</span>
              <input type="text" bind:value={name} maxlength="100" placeholder="山田 太郎" required>
            </label>
            <label>
              ふりがな<span class="required">*</span>
              <input
                type="text"
                bind:value={nameKana}
                maxlength="100"
                placeholder="やまだ たろう"
                required
              >
            </label>
            <label>
              メールアドレス<span class="required">*</span>
              <input
                type="email"
                bind:value={email}
                maxlength="254"
                placeholder="example@company.co.jp"
                required
              >
            </label>
            <label>
              お問い合わせ内容
              <textarea bind:value={inquiry} maxlength="5000" rows="4" placeholder="ご質問・ご要望をご記入ください"
              ></textarea>
            </label>

            <button type="submit" class="modal-submit" disabled={state === "submitting"}>
              {state === "submitting" ? "送信中…" : "送信する"}
            </button>

            {#if state === "error"}
              <p role="alert" class="modal-error">{errorMessage}</p>
            {/if}

            <p class="modal-note">
              入力いただいた情報はお問い合わせ対応の目的でのみ使用します。
            </p>
          </form>
        {/if}
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background: rgba(9, 32, 69, 0.45);
    backdrop-filter: blur(2px);
  }
  .modal {
    position: relative;
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 24px;
    background: var(--paper, #fff);
    box-shadow: 0 30px 70px rgba(9, 32, 69, 0.25);
  }
  .modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    border: none;
    background: transparent;
    font-size: 1.5rem;
    line-height: 1;
    color: var(--ink-soft, #5a5f63);
    cursor: pointer;
  }
  .modal-body {
    padding: clamp(1.75rem, 4vw, 2.5rem);
  }
  .modal-body h3 {
    margin: 0 0 0.5rem;
    color: var(--navy, #092045);
    font-size: 1.4rem;
    font-weight: 700;
  }
  .modal-lead {
    margin: 0 0 1.5rem;
    color: var(--ink-soft, #5a5f63);
    font-size: 0.9rem;
    line-height: 1.8;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--navy, #092045);
  }
  .required {
    margin-left: 0.2rem;
    color: var(--coral, #e07a66);
  }
  input,
  textarea {
    padding: 0.75rem 1rem;
    border: 1px solid var(--line, rgba(51, 51, 51, 0.14));
    border-radius: 12px;
    font: inherit;
    color: var(--ink, #333);
    background: var(--bg, #f4f4f6);
  }
  textarea {
    resize: none;
  }
  .modal-submit {
    margin-top: 0.4rem;
    padding: 1rem;
    border: none;
    border-radius: 999px;
    background: var(--navy, #092045);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.2s ease;
  }
  .modal-submit:hover:not(:disabled) {
    background: var(--navy-deep, #061936);
  }
  .modal-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  .modal-error {
    margin: 0;
    color: #c0392b;
    font-size: 0.85rem;
    text-align: center;
  }
  .modal-note {
    margin: 0;
    color: var(--ink-soft, #5a5f63);
    font-size: 0.75rem;
    text-align: center;
  }
  .modal-done {
    text-align: center;
    padding: 1.5rem 0;
  }
  .modal-done p {
    color: var(--ink-soft, #5a5f63);
    line-height: 1.8;
  }
  .modal-done-btn {
    margin-top: 1.5rem;
    padding: 0.85rem 2rem;
    border: none;
    border-radius: 999px;
    background: var(--navy, #092045);
    color: #fff;
    font-weight: 700;
    cursor: pointer;
  }
</style>
```

**Step 2: 検証(単体)**

```bash
cd /Users/sakurai.yuki/code/github/vectajp/swarrow.com
bunx svelte-check --tsconfig ./tsconfig.json
```

Expected: `ContactModal.svelte` に型エラーが無い(まだ `+page.svelte` から
import されていないため未使用コンポーネントの警告のみ許容)。

**Step 3: Commit**

```bash
git add src/lib/swarrow-call/ContactModal.svelte
git commit -m "feat(swarrow-call): お問い合わせフォームモーダルを追加"
```

---

### Task 9: 導線の配線(Header / Footer / CTA)

**Files:**
- Modify: `src/routes/+page.svelte`

**Step 1: モーダルの状態と import を追加**

`<script lang="ts">` ブロック内、既存の `import` 群の直後に追加:

```typescript
import ContactModal from "$lib/swarrow-call/ContactModal.svelte";
```

既存の `let motion = $state(false);` 等と並べて追加:

```typescript
let contactModalOpen = $state(false);
const openContactModal = () => {
  contactModalOpen = true;
};
const closeContactModal = () => {
  contactModalOpen = false;
};
```

**Step 2: Header の `.sc-cta` をボタンに変更**

変更前:
```svelte
<a class="sc-cta" href="#contact">お問い合わせ</a>
```
変更後:
```svelte
<button type="button" class="sc-cta" onclick={openContactModal}>お問い合わせ</button>
```

**Step 3: CTA セクションの `.cta-btn` をボタンに変更**

変更前:
```svelte
<a class="cta-btn" href="#contact"
  >導入相談・デモを依頼する<span class="ext">↗</span></a
>
```
変更後:
```svelte
<button type="button" class="cta-btn" onclick={openContactModal}
  >導入相談・デモを依頼する<span class="ext">↗</span></button
>
```

**Step 4: フッターの「お問い合わせ」リンクもボタンに変更**

変更前:
```svelte
<a href="#contact">お問い合わせ</a>
```
変更後:
```svelte
<button type="button" class="foot-link-btn" onclick={openContactModal}>お問い合わせ</button>
```

`<style>` ブロックに `.foot-link-btn` を `.foot-links a` と同じ見た目になる
よう追加する。`<button>` は `<a>` と異なりスタイルを継承しないため、
`font-size`/`color`/`:hover` を明示的に指定する(既存 `.foot-links a` /
`.foot-links a:hover` の実値 `0.88rem` / `#d6deea` / `#fff` と一致させる):

```css
.foot-link-btn {
  border: none;
  background: none;
  font: inherit;
  font-size: 0.88rem;
  color: #d6deea;
  cursor: pointer;
}
.foot-link-btn:hover {
  color: #fff;
}
```

**Step 5: `.sc-cta` / `.cta-btn` の CSS にボタン要素向けリセットを追加**

既存の `.sc-cta { ... }` ルールに以下を追加(border/font の既定値を打ち消す):

```css
.sc-cta {
  border: none;
  font: inherit;
  cursor: pointer;
}
```

`.cta-btn` についても同様に、既存ルールを確認し `border: none; font: inherit;
cursor: pointer;` が無ければ追加する。

**Step 6: モーダルをマークアップ末尾に追加**

`</footer>` の直後、`.lp` の閉じタグの直前に追加:

```svelte
<ContactModal open={contactModalOpen} onClose={closeContactModal} />
```

**Step 7: 検証**

```bash
bun run dev
```

ブラウザで以下を手動確認する:
1. Header の「お問い合わせ」クリック → モーダルが開く
2. CTA セクションの「導入相談・デモを依頼する」クリック → モーダルが開く
3. フッターの「お問い合わせ」クリック → モーダルが開く
4. モーダル外側クリック、Escape キーでモーダルが閉じる
5. 未入力のまま送信 → ブラウザネイティブのバリデーションメッセージが出る
   (`required` 属性による HTML5 標準バリデーション)
6. `test@localhost` のように `type="email"` の HTML5 バリデーションは通るが
   `functions/api/contact.ts` の正規表現(`^[^\s@]+@[^\s@]+\.[^\s@]+$`、
   TLD のドットを要求)には合致しないメールアドレスで送信し、`.modal-error`
   にサーバー側のエラーメッセージ(「メールアドレスの形式が正しくありません」)
   が表示されることを確認する(Acceptance Criteria 4 の実 UI 経由での検証)

**Step 8: Commit**

```bash
git add src/routes/+page.svelte
git commit -m "feat(swarrow-call): Header/Footer/CTA の導線をフォームモーダル起動に配線"
```

---

### Task 10: ローカル E2E 動作確認(Cloudflare Pages Functions 込み)

**Files:** なし(検証のみ、コミットなし)

**Step 1: ビルド**

```bash
cd /Users/sakurai.yuki/code/github/vectajp/swarrow.com
bun run build
```

Expected: `build/` ディレクトリが生成され、エラーが無い。

**Step 2: `.dev.vars` を用意**

```bash
test -f .dev.vars || cp .dev.vars.example .dev.vars
# .dev.vars に有効な SENDGRID_API_KEY を設定(テスト用キー推奨)
```

**Step 3: Wrangler でローカル Pages Functions を起動**

```bash
bunx wrangler pages dev build
```

(注: `docs/pages-functions.md` は温存対象だが、adapter-static の出力先が
`build/` であるため `dist` ではなく `build` を指定する — Task 11 でドキュメント
自体もこの表記に修正する)

**Step 4: バリデーションエラーの確認**

```bash
curl -s -X POST http://localhost:8788/api/contact \
  -H 'Content-Type: application/json' \
  -d '{}' | jq .
```

Expected: `{"success":false,"error":"会社名は必須です"}`

**Step 5: 正常送信の確認(ブラウザ操作)**

ブラウザで `http://localhost:8788/` を開き、いずれかの導線からモーダルを開き、
テスト用のメールアドレスで送信する。以下を確認する:
- 送信後、完了画面(「送信が完了しました」)が表示される
- `.dev.vars` に有効な SendGrid キーを設定している場合、社内通知メールと
  資料ダウンロードリンク付き自動返信メールが実際に届く(テスト用の受信箱で
  確認、本番の `MAIL_TO`/`MAIL_FROM` は使わない)

**Step 6: 完了**

このタスクはコミットを伴わない。問題が見つかった場合は Task 8/9 に戻って修正する。

---

### Task 11: `docs/pages-functions.md` の 1 行修正

**Files:**
- Modify: `docs/pages-functions.md`

**Step 1: ローカル検証手順のビルド出力先を修正**

変更前:
```
bun run build && bunx wrangler pages dev dist
```
変更後:
```
bun run build && bunx wrangler pages dev build
```

同様に、後続の `curl` コマンド例のポート番号等はそのまま(変更不要)。
それ以外の内容(環境変数表、期待レスポンス、本番設定手順)は一切変更しない。

**Step 2: 検証**

```bash
grep -n "wrangler pages dev" docs/pages-functions.md
```

Expected: `dist` という文字列が同ファイルに残っていない。

**Step 3: Commit**

```bash
git add docs/pages-functions.md
git commit -m "docs(pages-functions): ローカル検証手順のビルド出力先を build に修正"
```

---

### Task 12: `AGENTS.md` / `README.md` の更新

**Files:**
- Modify: `AGENTS.md`(`CLAUDE.md` は symlink のため自動的に追従)
- Modify: `README.md`

**Step 1: `AGENTS.md` を全面改稿**

移植元の `AGENTS.md` の構成(プロジェクト概要・SvelteKit/Bun 前提・
`.claude/rules/` への誘導)をベースに、以下の Swarrow Call 固有情報を追加する:

- Figma 元デザインへのリンク(現行 `AGENTS.md` より): `https://www.figma.com/design/2eT31sLxtnkjkDpM1l1CMI/SwarrowCall`
- Cloudflare Pages Functions によるメール送信について:
  `docs/pages-functions.md` へのリンクと概要1文
- 資料ダウンロードリンクの運用について: `docs/download-link.md` へのリンク
- 「Swarrow Call の LP は `src/routes/+page.svelte` に置く」という
  ディレクトリ規約(移植元 `AGENTS.md` の記述を踏襲)

**Step 2: `README.md` を改稿**

移植元の `README.md`(セットアップ/実行方法/注意事項)をベースに、
「## ドキュメント」節で `docs/pages-functions.md` と `docs/download-link.md`
へのリンクを維持する。

**Step 3: 検証**

```bash
grep -n "Astro\|React\|Tailwind" AGENTS.md README.md
```

Expected: 出力なし(旧スタックの記述が残っていない)。

**Step 4: Commit**

```bash
git add AGENTS.md README.md
git commit -m "docs: AGENTS.md/README.md を SvelteKit 構成に更新"
```

---

### Task 13: 最終検証・スコープ外コンテンツの無変更確認

**Files:** なし(検証のみ)

**Step 1: 型チェック・Lint・スペルチェック**

```bash
cd /Users/sakurai.yuki/code/github/vectajp/swarrow.com
bun run check
```

Expected: Biome・cspell・svelte-check がすべてエラーなく完了する。

**Step 2: ビルド**

```bash
bun run build
```

Expected: `build/` に静的サイトが生成される。

**Step 3: スコープ外コンテンツの無変更確認**

```bash
git status --porcelain docs/sales tmp .venv-pptx .claude/skills .claude/agent-memory 2>/dev/null
```

Expected: 出力なし(すべて無変更)。

**Step 4: 旧スタックの残骸が無いことを確認**

```bash
find . -iname "*.astro" -o -iname "*.tsx" -o -iname "*.jsx" | grep -v node_modules
grep -rn "astro\|react\|tailwind" package.json
```

Expected: 該当なし。

**Step 5: Cloudflare Pages ダッシュボード設定チェックリスト(手動、リポジトリ外)**

このタスクはコード変更を伴わないが、PR マージ前に必ずユーザーへ確認する:

- [ ] Cloudflare Pages プロジェクトのビルド出力ディレクトリを `dist` から
      `build` へ変更する
- [ ] ビルドコマンドが `bun run build` になっていることを確認する
- [ ] プレビューデプロイで実際に `functions/api/contact.ts` が動作することを
      確認してから本番へ昇格する

**Step 6: PR を作成**

```bash
git push -u origin feature/GH-3-sveltekit-migration
gh pr create --repo vectajp/swarrow.com \
  --title "feat: SvelteKit 版 Swarrow Call LP への移行" \
  --body "Closes #3"
```

PR の説明に、上記 Cloudflare Pages ダッシュボード設定チェックリストを
そのまま転記し、レビュアーとマージ担当者が見落とさないようにする。
