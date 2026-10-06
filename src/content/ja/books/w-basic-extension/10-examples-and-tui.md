---
title: "10 · サンプルと TUI の作業手順"
description: "検証済みサンプルを開く・コピーし、決定的なテンプレートから TUI や Jobs を始める"
weight: 10
---

> **バージョンの範囲 — ローカル検証済み拡張機能 0.2.3。** 0.2.3 VSIX は、対応する開発用コンパイラ／ランタイムと組み合わせてローカルで検証しました。公開済みの実験的な非公開コンパイラ／ランタイムは `0.1.0`、プロトコルパッケージは `0.0.2` です。公開済み ARM64 ZIP に同梱された拡張機能 `0.2.1` は変更されておらず、拡張機能 `0.2.3` に公開リリースや Marketplace 掲載はありません。[パッケージのガイド]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) から始めてください。古い非公開コンパイラ `0.0.2` は拡張機能 `0.1.0` を同梱し、これらのプロジェクト編集機能を持ちません。

0.2.3 の修正は Windows ARM64 のプロジェクトコマンドで検証しました。この版では、対話型 TUI 入力と macOS／Linux のエディター操作は再検証していません。

拡張機能には、構造を検証し、ハッシュがリポジトリと一致するサンプルカタログを同梱しています。現在は 10 カテゴリ、31 サンプル、61 教材ファイルで、言語の基本、モジュール、テスト、ストリーム、JSON、Jobs、TUI、完全な SQLite 展示用プロジェクトを扱います。

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
