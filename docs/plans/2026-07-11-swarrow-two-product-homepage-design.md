# Swarrow 2製品ホームページ再構成設計

- 作成日: 2026-07-11
- ステータス: Approved（2026-07-11）
- Issue: none
- 選択アプローチ: 1ページ内で2製品を並列化
- 設計確度: 88%

## Context

現行の `swarrow.com` は、自治体向け AI 窓口・電話対応サービスを
`Swarrow Call` という単一製品として説明している。ファーストビューは
「自治体の AI 窓口を、電話とチャットで支える。」まで改善されているが、
次の構造上の問題が残っている。

- 買い手である自治体の DX・情報政策／企画部門が得られる便益より、
  提供機能と技術説明が先行している。
- Chat は `Swarrow Call` の一機能として扱われ、独立製品に見えない。
- Chat と Call の詳細が縦に離れ、同じ知識基盤を共有できる強みが
  製品選択時に伝わりにくい。
- ロゴ、ページタイトル、OGP、構造化データ、フッターが
  `Swarrow Call` 単一製品を前提としている。
- 公開可能な Swarrow 固有の削減率は確認できず、既存の導入事例データも
  架空の差し替え用サンプルとして公開停止中である。

最終的な製品構成を次の2製品へ変更する。

1. 自治体ホームページAI窓口「Swarrow Chat」
2. 自治体AIコールセンター「Swarrow Call」

両製品は個別に導入でき、併用時は FAQ、手順書、業務データなどを
同じ知識基盤から利用できる。この関係を1ページ内で、便益、統合価値、
製品選択、製品詳細の順に説明する。

## Target Users and User Needs

### Primary user

自治体全体の DX、情報政策、業務改革、窓口改善を担当する企画部門。

### Primary user need

> 全庁に分散する問い合わせ対応を整理し、限られた職員数でも住民への案内を
> 継続できる導入方法を、短時間で理解したい。

### Secondary users

- 市民課、税務、子育て、ごみ、福祉など、問い合わせが集中する現場部署
- 導入可否、予算、効果検証方法を判断する管理職・決裁者

ファーストビューは Primary user を主語にし、現場部署の
「同じ電話が繰り返しかかる」「繁忙時や時間外に受けきれない」という痛みを
具体例として補強する。

## Boundaries

### Always

- `Swarrow Chat` と `Swarrow Call` を同格の独立製品として表示する。
- 両製品が個別導入可能であることと、併用時に知識基盤を共有できることを
  明記する。
- ファーストビューでは技術やビジョンより、自治体職員が得る業務上の便益を
  先に伝える。
- 共通知識基盤と2製品の関係を、各製品の詳細説明より前に表示する。
- 現在の画像、WebP、PNG、MP4、WebM と poster fallback を再利用する。
- `prefers-reduced-motion`、動画 fallback、既存の reveal 処理を維持する。
- PC とモバイルの両方で、2製品の優先度を同等に見せる。

### Never

- `Swarrow Chat` を `Swarrow Call` の付属機能として表現しない。
- 競合の公開事例や提案用レンジを Swarrow の実績値として掲載しない。
- 「負担を半減」「問い合わせを70%削減」など、未検証の効果を断定しない。
- 架空の自治体名・架空の導入事例を公開しない。
- 今回の変更で製品別ルート、問い合わせ API、課金、認証、データ保存形式を
  変更しない。
- 新しいイラスト、写真、動画を制作しない。

### Ask First

- Swarrow 固有の数値実績を新たに掲載する場合は、対象業務、測定期間、
  指標、出典、公開許諾を確認する。
- 問い合わせフォームへ製品選択フィールドを追加する場合は、
  `swarrow.com-backend` の API 契約変更を別途設計する。
- 既存マークを変更するブランドリニューアルや、新しいロゴ制作は別途承認を
  受ける。
- 現在確認できない製品機能を訴求へ追加する場合は、実装または提供条件を
  製品担当者に確認する。

## Architecture

### Information architecture principles

1. **Outcome first**: 最初に自治体職員の業務がどう変わるかを示す。
2. **Integrated before divided**: Chat と Call を説明する前に共通知識基盤を示す。
3. **Compare before detail**: 2製品を横並びで比較してから詳細へ進む。
4. **One message per section**: 同じ知識基盤や伴走支援の説明を重複させない。
5. **One conversion path**: ページ内の CTA は既存のお問い合わせモーダルへ
   集約する。

### Page structure

| 順序 | ID | セクション | 役割・主要メッセージ | 再利用素材 |
| ---: | --- | --- | --- | --- |
| 0 | - | Header | 製品中立の `Swarrow` ブランド、製品・共通基盤・導入支援へのアンカー、問い合わせ CTA | `/swarrow/icon.png` |
| 1 | `top` | Hero | 電話とホームページの定型対応を AI に任せ、職員が本来業務へ集中できる便益を提示 | `hero-city.webm`、MP4、poster |
| 2 | `problems` | Pain strip | 問い合わせ集中、知識の分散、繁忙時・時間外の取りこぼしを短い3項目で提示 | 追加素材なし |
| 3 | `knowledge` | Shared Knowledge | FAQ 等を一度整えれば、Chat と Call の双方で利用できる統合価値を図解 | `knowledge-flow-alpha.webm`、PNG |
| 4 | `products` | Product Overview | 2製品を同格のカードで比較し、個別導入と併用の両方を説明 | 追加素材なし |
| 5 | `chat` | Swarrow Chat | Web・LINE 等で自己解決を促し、電話前の定型問い合わせを受ける製品として説明 | `chat-ui.webm`、WebP |
| 6 | `call` | Swarrow Call | AI 受電、案内、取次、タイマー架電、一括発信を電話業務の変化と結び付けて説明 | `operator-call.*`、`call-timer.*`、`call-handoff.*`、`call-bulk.*` |
| 7 | `operations` | Common Operations | 知識と会話フローを職員が更新し、両チャネルの案内を継続改善できることを説明 | `workflow-editor-alpha.webm`、PNG |
| 8 | `support` | Customer Success | 導入準備、初期構築、運用改善の伴走支援を共通サービスとして説明 | `customer-success-*.webm`、poster |
| 9 | `news` | News | お知らせをファーストビューから分離し、製品理解後に配置 | 追加素材なし |
| 10 | `contact` | CTA | Chat、Call、併用の導入相談・デモを既存フォームで受け付ける | 追加素材なし |
| 11 | `footer` | Footer | 製品中立のブランド、会社・ポリシー導線 | `/swarrow/icon.png` |

### Hero message direction

コピーの構造は次で固定する。最終文言は実装時のコンテンツレビューで
読みやすさを調整するが、順序と意味は変えない。

- Eyebrow: `自治体の問い合わせ対応を、ひとつの知識で。`
- H1 候補: `電話とホームページの定型対応をAIに。職員は、本来の仕事へ。`
- Support copy 候補:
  `自治体ホームページAI窓口「Swarrow Chat」と自治体AIコールセンター
  「Swarrow Call」。FAQ・手順書・業務データを1つの知識基盤で管理し、
  住民からの問い合わせにWebと電話で応えます。`
- Primary CTA: `導入相談・デモを依頼する`
- Secondary CTA: `2つの製品を見る` → `#products`

ニュースカードは Hero から外し、便益、製品名、CTA、既存 Hero 動画だけに
焦点を絞る。

### Product overview

`#products` では、次の2カードを同じ面積・見出し階層で配置する。

#### Swarrow Chat

- 製品表記: `自治体ホームページAI窓口 Swarrow Chat`
- 便益: ホームページや LINE で住民の自己解決を促し、電話へ集中する前に
  定型的な質問へ回答する。
- 主な利用場面: 手続き案内、必要書類、施設案内、予約・申請への誘導。
- 詳細導線: `Swarrow Chat を見る` → `#chat`

#### Swarrow Call

- 製品表記: `自治体AIコールセンター Swarrow Call`
- 便益: AI が電話の一次受付、案内、取次、発信を担い、職員の電話対応を
  必要な案件へ絞る。
- 主な利用場面: 代表電話、時間外受付、担当課取次、リマインド、一括周知。
- 詳細導線: `Swarrow Call を見る` → `#call`

カードの直後に `単独でも、組み合わせても導入可能` と表示し、
併用時は同じ知識基盤を共有することを再確認できるようにする。

### Existing media allocation

| 現在の素材 | 新しい役割 | 方針 |
| --- | --- | --- |
| `hero-city.*` | Hero | 現状どおり WebM、MP4、poster を使う |
| `knowledge-flow-alpha.*` | 共通知識基盤 | Chat／Call の統合図解として最優先で再利用する |
| `chat-ui.*` | Swarrow Chat | 製品名と alt を `Swarrow Chat` に変更する |
| `operator-call.*` | Swarrow Call の AI 受電 | 現在の動画・fallback を維持する |
| `call-timer.*` | タイマー架電 | Swarrow Call 固有機能として維持する |
| `call-handoff.*` | 自動取次 | Swarrow Call 固有機能として維持する |
| `call-bulk.*` | 一括発信 | Swarrow Call 固有機能として維持する |
| `workflow-editor-alpha.*` | 両製品共通の運用改善 | Chat セクションから独立させ共通機能として配置する |
| `customer-success-*` | 共通の導入・運用支援 | 現在の順序と fallback を維持する |
| `case-*.jpg` | 使用しない | `showCaseStudies = false` を維持する |

`static/swarrow-call/` 配下の公開 URL は今回は変更しない。ファイル移動は
表示価値を生まず、参照漏れやキャッシュ切れのリスクだけを増やすためである。

### Brand treatment

現在の `logo.svg` と `footer-logo.svg` は `Swarrow Call` の文字を含むため、
統合ブランドの表示には使用しない。既存の `/swarrow/icon.png` と live text の
`Swarrow` を組み合わせ、製品中立のヘッダー／フッターを構成する。

- マーク自体は変更しない。
- 新しいロゴ画像は作らない。
- `Swarrow Chat`、`Swarrow Call` は画像ではなく live text で表示する。
- 既存 SVG は削除せず保持する。

### SEO and structured data

単一 URL 方針のため canonical と sitemap は `https://swarrow.com/` のまま
維持する。ページ全体の metadata を2製品に合わせて変更する。

- title 候補:
  `Swarrow｜自治体ホームページAI窓口・自治体AIコールセンター`
- description:
  Chat、Call、共通知識基盤、自治体の問い合わせ対応負担の軽減を含める。
- `og:site_name`: `Swarrow`
- OGP／Twitter title・description: 通常 metadata と同じメッセージへ統一する。
- JSON-LD: `@graph` で `Organization`、`WebSite`、2つの `Service` を表現する。
- 2つの `Service` は画面上に表示される製品説明と一致させ、
  `#swarrow-chat` と `#swarrow-call` の `@id` で区別する。
- `static/sitemap.xml` は root URL のみのため内容を変更せず、build 後に確認する。

構造化データは検索結果表示を保証するものではない。可視コンテンツと一致する
情報だけを記述し、build HTML と Schema Markup Validator で妥当性を確認する。

検索検証は、再現可能なローカル／CI 契約と、公開後にしか観測できない結果を
分離する。

- `bun:test` で content と build 後 HTML を検査し、title、description、
  canonical、robots、sitemap、可視見出し、2製品の JSON-LD を固定する。
- 公開前に Search Console で root URL の直近28日を記録し、公開7日後に
  crawl／index、公開28日後に impressions、clicks、CTR を同じ条件で比較する。
- `Swarrow`／製品名、Chat、Call、統合問い合わせ対応の4クエリ群を観測する。
- average position は補助指標とし、検索順位、即時 index、rich result 表示を
  CI やリリースの合否条件にはしない。
- Search Console の OAuth credential と export はリポジトリへ保存しない。

### Interaction and accessibility

- H1 は Hero の1個だけとし、主要セクションは H2、機能項目は H3/H4 を使う。
- Header の製品リンクは `#chat` と `#call` へ移動する。
- モバイルでは Product Overview を Chat → Call の順に縦積みするが、
  面積、見出しレベル、CTA の強さは同等にする。
- 既存のキーボード操作、focus-visible、ContactModal の Escape 閉じを維持する。
- `prefers-reduced-motion: reduce` では動画を自動再生せず poster を表示する。
- すべての情報を動画だけに依存させず、同じ意味を見出し・本文・alt で提供する。

### Concrete file-change list

| ファイル | 変更内容 |
| --- | --- |
| `src/routes/+page.svelte` | セクション順、Hero、Pain strip、2製品比較、Chat／Call 詳細、アンカー、Header／Footer、動画 alt、CTA を再構成する |
| `src/lib/swarrow-call/content.ts` → `src/lib/swarrow/content.ts` | サイト共通 metadata、2製品情報、Call 固有機能、Customer Success、News を製品中立の名前空間へ移す |
| `src/lib/swarrow-call/ContactModal.svelte` → `src/lib/swarrow/ContactModal.svelte` | import path を製品中立化し、表示上の `会社名` を `自治体・団体名` へ変更する。API payload は変更しない |
| `package.json` | `bun:test` を使う SEO 契約テスト command を追加する |
| `tests/seo/content.test.ts` | 2製品の表示情報、未検証表現、JSON-LD source of truth を検証する |
| `tests/seo/build-output.test.ts` | build HTML、canonical、robots、sitemap、可視構造、静的素材参照を検証する |
| `README.md` | 単一の Swarrow Call LP という説明を、Swarrow Chat／Call の統合サイトへ更新する |
| `AGENTS.md` | root route の役割、製品名、既存素材再利用、検証対象を新構成に合わせる |
| `docs/seo-operations.md` | title、description、2つの Service、Chat／Call の検索クエリ確認を運用項目へ追加する |
| `app-words.txt` | cspell が製品名を未知語として検出した場合のみ、必要な語を追加する |

変更しない対象:

- `static/swarrow-call/*` のファイル名と内容
- `static/sitemap.xml` の URL 構成
- `swarrow.com-backend`
- 資料請求 API の request／response schema
- `showCaseStudies = false`

## Staged Change Plan

実装は次の順に分割する。各段階で対象コピーと表示順を確認してから次へ進む。

1. **ブランドと情報モデルの中立化**
   - `$lib/swarrow` へ content と ContactModal を移す。
   - metadata、製品定義、Header／Footer のブランド表記を更新する。
2. **ファーストビューと統合価値の改善**
   - Hero を便益中心に変更する。
   - Pain strip、Shared Knowledge、Product Overview を連続配置する。
3. **Swarrow Chat の独立製品化**
   - 現在の Chat UI 説明を `Swarrow Chat` として書き換える。
   - Web／LINE、自己解決、業務導線の価値を整理する。
4. **Swarrow Call の再整理**
   - AI 受電の便益を先に示し、取次・架電・一括発信を固有機能として続ける。
5. **共通運用・導入支援の統合**
   - No-Code Flow Editor と Customer Success を2製品共通へ移す。
   - News、CTA、ContactModal の文言を整える。
6. **SEO・ドキュメント・全体検証**
   - metadata、JSON-LD、README、AGENTS、SEO 運用手順を同期する。
   - PC／モバイル、motion／reduced-motion、build HTML を確認する。

## Acceptance Criteria

### AC1: ファーストビューで便益が分かる

- **Given** 自治体の DX・情報政策担当者が root ページを開く
- **When** 最初の画面を確認する
- **Then** 電話とホームページの定型対応を AI が支援し、職員が本来業務へ
  集中できるサービスだと理解できる
- **And** `Swarrow Chat` と `Swarrow Call` の両方の名前を確認できる

### AC2: 共通知識基盤が製品詳細より先に伝わる

- **Given** 訪問者が Hero から下へ読み進める
- **When** 個別製品の詳細へ到達する前
- **Then** FAQ、手順書、業務データを1つの知識基盤で管理できることが表示される
- **And** 同じ知識を Chat と Call の両方が利用する図と説明が表示される

### AC3: 2製品が同格に見える

- **Given** Product Overview を表示する
- **When** PC またはモバイルで2カードを比較する
- **Then** 両製品の見出し階層、説明量、CTA の強さが同等である
- **And** 個別導入と併用の両方が可能だと分かる

### AC4: Swarrow Chat の独自便益が分かる

- **Given** `#chat` セクションを表示する
- **When** 見出し、本文、既存 Chat UI 動画を確認する
- **Then** ホームページや LINE で住民の自己解決を促す製品だと理解できる
- **And** `Swarrow Call` の一機能として表現されていない

### AC5: Swarrow Call の独自便益が分かる

- **Given** `#call` セクションを表示する
- **When** 見出し、本文、既存の電話関連動画を確認する
- **Then** AI 受電、案内、取次、架電、一括発信の利用場面が理解できる
- **And** 機能名だけでなく職員の電話業務がどう変わるか説明されている

### AC6: 未検証の実績を掲載しない

- **Given** 公開ページの全文を確認する
- **When** 削減率、導入事例、効果表現を検索する
- **Then** Swarrow 固有の根拠がない数値効果が存在しない
- **And** 架空のケーススタディが表示されない

### AC7: 既存素材を再利用する

- **Given** ページ内の画像と動画を確認する
- **When** 各 `src`、`poster`、fallback を比較する
- **Then** 既存の `static/swarrow-call/*` 素材が再利用されている
- **And** 新しいイラスト、写真、動画が追加されていない

### AC8: アクセシビリティと motion 設定を維持する

- **Given** キーボード操作または reduced-motion 環境でページを利用する
- **When** アンカー、CTA、ContactModal、動画を操作する
- **Then** focus が確認でき、Escape でモーダルを閉じられる
- **And** reduced-motion では動画が自動再生されず poster が表示される

### AC9: SEO 表現が2製品と一致する

- **Given** build 後の root HTML を確認する
- **When** title、description、OGP、canonical、JSON-LD を検査する
- **Then** サイト名が `Swarrow` で、両製品が可視コンテンツと一致して記述される
- **And** canonical と sitemap は `https://swarrow.com/` を維持する

### AC10: 問い合わせ API を壊さない

- **Given** ContactModal からフォームを送信する
- **When** 既存 API へ request を送る
- **Then** request field と endpoint は変更前と同じである
- **And** 完了、通信エラー、Turnstile の表示動作が維持される

### AC11: リポジトリの検証を通過する

- **Given** 実装が完了している
- **When** `bun --bun run check` と `bun --bun run build` を実行する
- **Then** 両方が成功する
- **And** build 後の root HTML と静的素材参照に欠落がない

### AC12: 公開後の検索結果を同じ条件で観測できる

- **Given** 変更前の Search Console baseline を root URL とクエリ群別に記録している
- **When** 公開直後、7日後、28日後に同じ手順で確認する
- **Then** crawl／index 状態と impressions、clicks、CTR の変化を比較できる
- **And** 順位や即時 index をリリース失敗とは判定しない

## Requirement Traceability

| 要求 | 設計要素 | 受入条件 |
| --- | --- | --- |
| 買い手の便益をファーストビューで伝える | Hero message、Pain strip | AC1 |
| Chat と Call を独立した同格製品として扱う | Product Overview、各製品セクション | AC3、AC4、AC5 |
| 併用時の共通知識基盤を差別化要因として示す | Shared Knowledge、Product Overview 後の併用説明 | AC2、AC3 |
| 未検証の数値や架空実績を掲載しない | Never 境界、ケーススタディ非表示 | AC6 |
| 既存の画像・動画を再利用する | Existing media allocation | AC7 |
| motion、fallback、キーボード操作を維持する | Interaction and accessibility | AC8 |
| 1ページ内で2製品を正しく表現する | Page structure、SEO and structured data | AC1、AC3、AC9 |
| 問い合わせ API を変更しない | One conversion path、既存 ContactModal | AC10 |
| コード・文書・公開 HTML の整合性を確認する | Concrete file-change list、Verification Plan | AC11 |

## Decisions Made

| 決定 | 確度 | 理由 |
| --- | ---: | --- |
| 1ページ構成を維持する | 100% | ユーザーがアプローチ2を選択した |
| 2製品を個別導入可能な同格製品として扱う | 100% | ユーザーが製品関係 A を選択した |
| DX・情報政策／企画部門を主対象にする | 100% | ユーザーが対象者 A を選択した |
| 未検証の数値効果を掲載しない | 100% | ユーザーが数値表現 A を選択した |
| 統合価値を個別製品より前に置く | 92% | 指摘された根本原因を1ページ構成で解消するために必須 |
| Hero を便益中心へ変更する | 95% | 現在の機能中心メッセージから買い手の成果へ主語を移すため |
| 既存 icon と live text で製品中立ブランドを作る | 90% | 新規ロゴ制作なしで Call 偏重を解消できる |
| 既存メディア URL を維持する | 95% | 素材再利用を満たし、移動による参照漏れを避けられる |
| root に複数 Service の JSON-LD を置く | 85% | 単一ページの可視コンテンツと2製品を一致させられる |
| 問い合わせ API を変更しない | 95% | ホームページ再構成の範囲に限定し、cross-repo 変更を避ける |

## Risks and Mitigations

| リスク | 重要度 | 対策 |
| --- | --- | --- |
| Chat と Call が詳細セクションで再び分断される | P1 | Shared Knowledge と Product Overview を詳細より前に固定する |
| Call 単一ブランドの残存箇所が誤認を生む | P1 | Header、Footer、metadata、alt、本文、README、AGENTS を横断検索する |
| 1ページが長く、途中離脱される | P2 | アンカーナビ、短い Pain strip、重複説明の集約、製品比較を先に配置する |
| Chat と Call の説明量に差が出る | P2 | Product Overview の構造を揃え、PC／モバイルで比較確認する |
| 動画の再配置で読み込みや motion 動作が壊れる | P2 | 現在の selector、IntersectionObserver、poster fallback を維持して検証する |
| 2製品を1ページで扱うため製品別 SEO が弱い | P2 | metadata と可視見出しを明確化し、将来必要になった時だけ製品別 route を再検討する |

未解決の P0／P1 リスクはない。

## Open Questions

次の項目は実装を妨げないため、コンテンツレビューまたは公開前確認で扱う。

- Hero 候補文の読点、改行、`AI` 前後の表記を画面幅に合わせて最終調整する。
- News の日付と内容が公開時点で最新か、公開前に担当者が確認する。
- 将来 Swarrow 固有の導入実績が公開可能になった場合、ケーススタディ再開を
  別タスクで検討する。
- 将来、製品別検索流入や営業導線の必要性が高まった場合、`/chat` と `/call`
  の分割を別設計として再検討する。

## Non-Goals

- 製品機能そのものの追加・変更
- Swarrow Chat／Call の管理画面変更
- バックエンド API、D1、メール配信、Turnstile の仕様変更
- 製品別 URL や新しいサイトの追加
- 価格表、契約プラン、PoC 条件の策定
- 新規の導入事例、数値実績、第三者評価の作成
- 新しい画像、動画、ロゴ、ブランドガイドラインの制作
- 現在未実装の情報セキュリティ方針、個人情報保護方針、利用規約ページの作成

## Verification Plan

1. `git diff --check`
2. `bun --bun run check`
3. `bun --bun run test:seo`
4. `bun --bun run build`
5. build 後の root HTML で次を確認する。
   - H1 が1個
   - `Swarrow Chat` と `Swarrow Call` の表示
   - canonical、title、description、OGP
   - JSON-LD の `WebSite` と2つの `Service`
   - `showCaseStudies = false` により架空事例が非表示
6. desktop と mobile viewport で次を確認する。
   - Hero の便益と2製品名が最初の画面で理解できる
   - Product Overview の同格性
   - Header anchor と CTA
   - ContactModal の開閉・エラー・送信完了
7. reduced-motion を有効にして poster fallback を確認する。
8. 既存の画像・動画 URL がすべて成功応答することを確認する。
9. Schema Markup Validator または Rich Results Test で JSON-LD を確認する。
10. 公開前に Search Console の直近28日 baseline を保存する。
11. 公開直後に live URL、robots、sitemap、canonical を確認する。
12. 公開7日後に crawl／index、28日後に検索パフォーマンスを比較する。
