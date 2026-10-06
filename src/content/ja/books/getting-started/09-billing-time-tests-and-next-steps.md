---
title: "9 · 実行、確認、次の一歩"
description: "SQLite アプリを試し、ローカルの検証と公開版の範囲を区別します。"
weight: 9
---

[Billing Time のソース一式](https://jedt3d.github.io/wbasic-documents/downloads/billing-time-source.zip)をダウンロードして展開します。その `billing-time` フォルダでは、コンパイラ、ランタイム、リンカが対応する 0.2.0 ポータブルパッケージを使います。コンパイラのツールチェーン自体を Rust ソースから構築する場合は、別途 SDK と対応する静的ランタイムが必要です。現在のマニフェストはツールチェーン 0.2.0 を指定します。

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

0.2.0 を指定するソース一式は、対応するコンパイラ／ランタイムを使った `scripts/verify.py` により、Windows ARM64 と macOS ARM64 のデバッグ版とリリース版で検証済みです。初回の 18,000 cents、再実行時の請求書 `#2`、既定と明示したパス、データベースを開く前の不正な引数の拒否を確認しました。以前の Windows CLI で不正な引数を試した1回はタイムアウトしましたが、プログラムを変更しない完全な再実行は合格しました。これらの結果は本番運用やすべてのホストでの受け入れを意味しません。

ソース `3901cf17` の release 0.1.0 と、コンパイラソース `dfdcbdc` を使ったローカルアプリの検査は、旧ソース一式の履歴です。現在の 0.2.0 マニフェストの検査結果ではありません。

`wb build` は別の実行ファイルを作れます。検証済み開発ホストでは、0.2.0 ポータブルパッケージに同梱のリンカ／ランタイムで WBasic アプリのソースをビルドできます。コンパイラのツールチェーン自体を Rust ソースから構築するには、ネイティブ SDK／ツールチェーンが必要です。SDK のない新規ホストでの受け入れは別の検証条件です。新しいデータベースや変更した料金を試す場合は、日付、税、通貨、丸めの方針を推測せず、ソースとデータベースを確認してください。

ダウンロードにはソースだけが含まれ、ビルド済みの実行ファイルは含まれません。現在の README と QuickStart は、対応する 0.2.0 のコンパイラ／ランタイムでアプリのソースをビルドして実行する方法を説明します。作者のローカル EXE が ZIP にあるとは考えないでください。VS Code ではコンパイラ 0.2.0 を選び、Command Palette から **WBasic: Check Project**、**Run Project**、**Build Project — Debug/Release (Development)** を使います。
