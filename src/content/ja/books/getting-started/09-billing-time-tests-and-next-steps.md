---
title: "9 · 実行、確認、次の一歩"
description: "SQLite アプリを試し、ローカルの検証と公開版の範囲を区別します。"
weight: 9
---

[Billing Time のソース一式](https://jedt3d.github.io/wbasic-documents/downloads/billing-time-source.zip)をダウンロードして展開します。その `billing-time` フォルダで、対応する静的ランタイムと組み合わせた `wb` を使います。マニフェストはツールチェーン 0.1.0 を指定します。

```console
wb check billing-time.wproj --json
wb run billing-time.wproj -- billing-time-demo.sqlite
```

引数を省くと、現在の作業ディレクトリの `billing-time-demo.sqlite` を使います。空でないパスを1つ指定できます。引数が2つ以上、またはパスが空の場合は、データベースを開く前にエラーになります。新しいファイルを使った初回実行では6行を出力します。

```text
schema: ready
project: Website refresh for Acme Studio
time logged: 210 minutes
invoice: #1 (2 lines)
invoice total: 18000 cents
billed entries: 2
```

同じファイルに対してもう一度実行すると、顧客、プロジェクト、2件の作業記録、請求書がもう一組追加されます。請求書 ID は既存のデータによって変わり、次は `#2` と表示されることがあります。前の請求書を編集する動作ではありません。[QuickStart](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/docs/QuickStart.md) と [README](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/README.md) に詳しいコマンドと制約があります。ソース一式の `scripts/verify.py` は SQLite の内容と再実行を検査します。

このソース一式は、ソース `3901cf17` で確定した公開版 0.1.0 CLI を使い、Windows ARM64 と macOS ARM64 の検査に合格しました。デバッグ版とリリース版、18,000 cents、再実行時の請求書 `#2`、既定と明示したパス、データベースを開く前の不正な引数の拒否を確認しています。ローカルのアプリソースには、コンパイラのソース `dfdcbdc` による検査結果も別途記されています。これらの結果は本番運用やすべてのホストでの受け入れを意味しません。

`wb build` は別の実行ファイルを作れます。開発環境でソースからビルドするには、引き続きネイティブツールチェーンと SDK が必要です。SDK を入れていない新しい環境での受け入れは別の検証条件です。新しいデータベースや変更した料金を試す場合は、日付、税、通貨、丸めの方針を推測せず、ソースとデータベースを確認してください。

ダウンロードにはソースだけが含まれ、ビルド済みの実行ファイルは含まれません。元の README と QuickStart には作者のローカル環境での納品にも言及があります。そこに書かれた EXE が ZIP に入っていると考えず、本書のコマンドで自分の環境向けにビルドしてください。
