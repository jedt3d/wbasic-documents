---
title: "10 · サンプルと TUI の作業手順"
description: "検証済みサンプルを開く・コピーし、決定的なテンプレートから TUI や Jobs を始める"
weight: 10
---

> **対象バージョン — 対応する private experimental 0.2.0 一式。** このガイドは Windows/macOS ARM64 の compiler/runtime `0.2.0`、protocol `0.1.0`、VS Code extension `0.3.0` を対象とします。旧 `0.1.0`/extension `0.2.1` とローカル修正版 `0.2.3` は別の履歴です。extension の更新だけで E01–E10 は利用可能になりません。最初に **WBasic: Show Toolchain Status** でバージョンと capability を確認してください。

0.3.0 のエディター／プロトコルテストは Windows と Mac ARM64 で通りました。E01–E10 の操作は実際の Windows VS Code ウィンドウで確認しましたが、Mac／Linux の UI やすべての端末接続先での対話型 TUI 入力を証明するものではありません。

拡張機能には、構造を検証し、ハッシュがリポジトリと一致するサンプルカタログを同梱しています。現在は 10 カテゴリ、32 サンプル、66 教材ファイルで、言語の基本、モジュール、テスト、ストリーム、JSON、Jobs、TUI、完全な SQLite 展示用プロジェクトを扱います。

## Open と Copy の目的は異なる

**WBasic: Open Example** は、読むため、または指定された操作のために例を開きます。**WBasic: Copy Example** は、リポジトリの見本を変更せずに、教材ファイルを自分の新しいフォルダーへコピーします。

リファクタリングやファイル追加には Copy、ソースを読む、機能を手早く確認する場合は Open を選びます。診断、ランタイムエラー、アサーション失敗を期待する例は壊れているのではなく、その境界を意図的に教えています。

{{< guide-screenshot name="10-examples.png" alt="個人的な最近のファイルを除き、カテゴリ、名前、レベル、操作を示す WBasic: Open Example の選択画面" caption="撮影する画面：題材ごとに教材を選ぶサンプル選択画面" >}}

## おすすめの学習順

1. `hello-wbasic` — ソースを実行し、Unicode の出力を見る
2. `language-core` — 宣言、制御フロー、手続き
3. `local-module-project` — マニフェスト、依存、ファイル間の移動
4. `native-test-basics` — Test Explorer
5. `memory-streams` と `json-values` — 型付き API のヘルプ
6. `tui-counter` — 決定的なモデル、更新、表示
7. `sqlite-customer-showcase` — 複数モジュールを組み合わせた大きめのプロジェクト

ソースタグ `v0.2.0` の `editor-daily-workflow` は、データベースなしで別名、Structure フィールド、Enum メンバー、タイ語のローカル変数、アプリ／モジュール／テストをまたぐ名前変更、Quick Fix、整形、直接呼び出し階層を練習できます。`wb check` に通り、`wb test` は 2/2 件成功し、`wb run` は `24` を表示します。別の BillingTime 例は実際の SQLite に対する native debug/release 実行を示します。新しい請求書は二行で合計 18000 cents、再実行すると次の請求書が作られます。

`worm-m2-sqlite` と `worm-m3-billing` は、必要なモジュールや SQLite スキーマを含む完全なプロジェクトとしてコピーできます。自動操作は Check と Build です。データベースの例を実行するには、`--` の後に明示的な SQLite パスをプログラム引数として渡します。汎用の Run Project はそのパスを尋ねません。`worm-m4-ui-reference` はリポジトリ内の参照資料を開くだけです。Billing モジュールをローカル依存パスへ準備する必要があるため、Copy Example の対象外です。

## New TUI/Jobs Example：新しい例の作成

**WBasic: New TUI/Jobs Example** は、未保存のテンプレートを開きます。端末カウンターか、決定的なヘッドレス Jobs 例を選び、Run の前に保存します。

まずヘッドレスのテストで、状態遷移と仮想時計の動作を確認します。その後、統合ターミナルで Tui.Run を使います。端末の色やエスケープシーケンスが議論に加わる前に、多くの不具合を捕まえられます。

## TUI doctor：端末の診断

端末とフォントの能力は、その端末の中で確認します。

```console
wb tui doctor
```

非対話型レポートを保存することもできます。

```console
wb tui doctor --non-interactive --format json --output REPORT.json
```

拡張機能は doctor を自動実行しません。端末プロファイル、フォント、接続先は実際のセッションの性質であり、エディターから推測すべきではありません。

次は [設定、信頼、問題の調べ方]({{< relref "/books/w-basic-extension/11-settings-trust-troubleshooting.md" >}}) へ進みます。
