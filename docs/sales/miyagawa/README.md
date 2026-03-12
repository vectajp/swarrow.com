# 宮川作成営業資料

ローカル専用の営業資料一式。

## ファイル

- `deck-draft.md`
- `public-benchmarks.md`
- `accuracy-and-rag-notes.md`
- `index.html`
- `styles.css`
- `slides.js`
- `assets/azure-document-intelligence.svg`

## 開き方

1. Finder から `index.html` をブラウザで開く
2. もしくは簡易サーバーを使う

例:

```sh
cd /Users/naoya/dev/swarrow.com/docs/sales/miyagawa
python3 -m http.server 8765
```

その後 `http://localhost:8765` を開く。

## 追加機能

- `表示設定`
  - ページごとの表示 / 非表示を切り替え可能
- `スライドショー`
  - 1枚ずつ表示して投影用に使える

## PDF化

ブラウザで `index.html` を開いて印刷する。

1. `Print` を開く
2. 出力先を `Save as PDF` にする
3. 背景グラフィックを有効化する
4. 余白は `None` か最小にする
5. `Landscape` を選ぶ
6. 用紙は `A4`、拡大縮小は `100%` か `Default` を推奨

このHTMLは `@media print` を入れているので、1スライドごとに改ページされる。

## 注意

- 画像は `src/assets/` を相対参照している
- Azure のサービスアイコンは Microsoft 公式配布アセットをローカル同梱している
- デプロイ用途ではなく、営業資料の叩き台をローカル確認するための構成
