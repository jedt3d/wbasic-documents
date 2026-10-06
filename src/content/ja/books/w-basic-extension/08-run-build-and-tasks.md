---
title: "8 · 実行、ビルド、タスク"
description: "ソースとプロジェクトを実行し、Debug・Release の開発成果物と問題マッチャーを使う"
weight: 8
---

> **バージョンの範囲 — ローカル検証済み拡張機能 0.2.3。** 0.2.3 VSIX は、対応する開発用コンパイラ／ランタイムと組み合わせてローカルで検証しました。公開済みの実験的な非公開コンパイラ／ランタイムは `0.1.0`、プロトコルパッケージは `0.0.2` です。公開済み ARM64 ZIP に同梱された拡張機能 `0.2.1` は変更されておらず、拡張機能 `0.2.3` に公開リリースや Marketplace 掲載はありません。[パッケージのガイド]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) から始めてください。古い非公開コンパイラ `0.0.2` は拡張機能 `0.1.0` を同梱し、これらのプロジェクト編集機能を持ちません。

拡張機能は目的ごとにコマンドを分けます。Run が黙って配布用ビルドに変わったり、Check がプログラムのネットワークやデータベース接続を開いたりしてはいけません。

## Run Active Source：開いているソースの実行

保存済み `.wbas` を開いて **WBasic: Run Active Source in Terminal** を実行します。ソースのディレクトリを作業ディレクトリとして、一つのファイルを実行します。プロジェクトのインポートが不要な小さな例に向いています。

TUI には本物の端末入力が必要なため、この独立したコマンドは統合ターミナルを使います。0.2.3 のプロジェクトタスク変更後、対話型 TUI 入力は再検証していません。

## Run Project：プロジェクトの実行

モジュールと依存のある `App.wproj` では **WBasic: Run Project** を使います。`wbasic.defaultProfile` のプロファイルを使い、マニフェストのパスをリテラル引数として渡します。パス中の空白、タイ文字、絵文字をシェル文字列へ組み立てることはありません。ローカル検証済みの 0.2.3 では、選択したプロジェクトを対象とする専用の VS Code `ProcessExecution` タスクで Run を起動します。終了後も出力が残り、次回の実行ではタスクターミナルを消去して再利用します。Run はプロジェクトのデータを変更する場合があり、BillingTime の例はレコードを追加します。

## Development Build：開発用ビルド

次の三つのコマンドがあります。

- **Build Project (Development)** は、コンパイラが公開するプロファイルから選択します。
- **Build Project — Debug (Development)** は Debug を直接選びます。
- **Build Project — Release (Development)** は Release を直接選びます。

コンパイラはネイティブ実行ファイルと `.wb-build.json` 記録を作ります。0.2.3 の Build コマンドも Run と同様に、専用のプロセスタスク出力、リテラル引数、選択したプロファイル、プロジェクトのスコープ、`$wbasic` 問題マッチャーを使います。プロセス終了後もタスクターミナルは表示されたままです。実行前には Workspace Trust と現在のコンパイラ機能を確認します。公開済み ZIP のコンパイラ、ランタイム素材、リンカーでは、ホスト SDK を使わずに debug/release の Run/Build が通っています。コンパイラをソースからビルドするにはネイティブ開発ツールが必要です。これは引き続き Development Build であり、本番利用の権限や、SDK のない新規ホストでの受け入れを含みません。

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
