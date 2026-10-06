---
title: "8 · 実行、ビルド、タスク"
description: "ソースとプロジェクトを実行し、Debug・Release の開発成果物と問題マッチャーを使う"
weight: 8
---

> **対象バージョン — 対応する private experimental 0.2.0 一式。** このガイドは Windows/macOS ARM64 の compiler/runtime `0.2.0`、protocol `0.1.0`、VS Code extension `0.3.0` を対象とします。旧 `0.1.0`/extension `0.2.1` とローカル修正版 `0.2.3` は別の履歴です。extension の更新だけで E01–E10 は利用可能になりません。最初に **WBasic: Show Toolchain Status** でバージョンと capability を確認してください。

拡張機能は目的ごとにコマンドを分けます。Run が黙って配布用ビルドに変わったり、Check がプログラムのネットワークやデータベース接続を開いたりしてはいけません。

## Run Active Source：開いているソースの実行

保存済み `.wbas` を開いて **WBasic: Run Active Source in Terminal** を実行します。ソースのディレクトリを作業ディレクトリとして、一つのファイルを実行します。プロジェクトのインポートが不要な小さな例に向いています。

TUI には本物の端末入力が必要なため、この独立したコマンドは統合ターミナルを使います。この Check/Build/Run の結果は、すべての端末接続先で対話型 TUI 入力が通る証拠ではありません。

## Run Project：プロジェクトの実行

モジュールと依存のある `App.wproj` では **WBasic: Run Project** を使います。`wbasic.defaultProfile` のプロファイルを使い、マニフェストのパスをリテラル引数として渡します。パス中の空白、タイ文字、絵文字をシェル文字列へ組み立てることはありません。検証済みの 0.3.0 では、選択したプロジェクトを対象とする専用の VS Code `ProcessExecution` タスクで Run を起動します。終了後も出力が残り、次回の実行ではタスクターミナルを消去して再利用します。Run はプロジェクトのデータを変更する場合があり、BillingTime の例はレコードを追加します。

## Development Build：開発用ビルド

次の三つのコマンドがあります。

- **Build Project (Development)** は、コンパイラが公開するプロファイルから選択します。
- **Build Project — Debug (Development)** は Debug を直接選びます。
- **Build Project — Release (Development)** は Release を直接選びます。

コンパイラはネイティブ実行ファイルと `.wb-build.json` 記録を作ります。0.3.0 の Build コマンドも Run と同様に、専用のプロセスタスク出力、リテラル引数、選択したプロファイル、プロジェクトのスコープ、`$wbasic` 問題マッチャーを使います。プロセス終了後もタスクターミナルは表示されたままです。実行前には Workspace Trust と現在のコンパイラ機能を確認します。公開済み ZIP のコンパイラ、ランタイム素材、リンカーでは、ホスト SDK を使わずに debug/release の Run/Build が通っています。コンパイラをソースからビルドするにはネイティブ開発ツールが必要です。これは引き続き Development Build であり、本番利用の権限や、SDK のない新規ホストでの受け入れを含みません。

VS Code を使わない場合、同じプロジェクトを次のコマンドで確認できます。

```console
wb check App.wproj --json
wb test App.wproj --json
wb run App.wproj --profile debug
wb build App.wproj --profile debug
wb build App.wproj --profile release
```

プロジェクトのディレクトリから実行するか、マニフェストの完全なパスを指定してください。データベースのパスなど、プログラム引数は `--` の後に渡します。拡張機能の `wbasic.defaultProfile` はマニフェストを変更せず、release プロファイルの Development Build を本番成果物に変えるものでもありません。

## VS Code Tasks：タスクの利用

**Terminal: Run Task** を開くと、マニフェストごとの `wbasic` タスクが見えます。

- Check
- Run
- Test
- Build Development Debug
- Build Development Release

Debug が既定のビルドタスク、Test が既定のテストタスクです。`$wbasic` 問題マッチャーは、コンパイラのエラーをソースに結び付けます。

{{< guide-screenshot name="08-run-build-tasks.png" alt="WBasic の Check、Run、Test、Development Debug、Development Release を示す Run Task と、個人的な履歴を除いた統合ターミナル" caption="撮影する画面：WBasic のタスクと統合ターミナルの Run 出力" >}}

## Emit Object：オブジェクトの出力

現在のホスト向けのネイティブオブジェクトが必要な場合は **WBasic: Emit Project Object** を使います。拡張機能は出力の絶対パスを求めます。開発や貢献者向けの操作なので、多くの初心者には Build Project が適しています。

## 練習

1. Check Project を実行します。
2. Run Project を実行し、タイ語の出力を確認します。
3. Debug をビルドし、ビルド記録を開きます。
4. Release をビルドし、記録のプロファイルを比較します。
5. 型エラーを一つ加え、タスクのリンクが正しいソースを開くことを確認します。

次は [Test Explorer でテストする]({{< relref "/books/w-basic-extension/09-test-explorer.md" >}}) へ進みます。

## 0.4.0 候補版の Named Run

Workspace settings の `wbasic.runConfigurations` に、固有の `name`、workspace 相対の `manifest`、`debug` または `release` の `profile`、文字列配列の `arguments` を設定します。**WBasic: Select Run Configuration** は選んだ Run task を開始します。**WBasic: Run Again** は名前だけを記憶し、現在の設定を再度解決します。この設定では environment や working directory を展開しません。`arguments` に secret を保存しないでください。実行前に invocation を確認してください。再実行するとファイルやデータベースへの書き込みも繰り返され、BillingTime では次の請求書が作成されます。Select Run Configuration と Shift+F10 Run Again は、インストールした Windows ウィンドウで通りました。候補版は未公開です。上の 0.3.0 Run Project 手順が公開済みのワークフローです。[候補版の範囲]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}})を参照してください。
