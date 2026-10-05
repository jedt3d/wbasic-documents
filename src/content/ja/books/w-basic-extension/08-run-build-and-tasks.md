---
title: "8 · 実行、ビルド、タスク"
description: "ソースとプロジェクトを実行し、Debug・Release の開発成果物と問題マッチャーを使う"
weight: 8
---

> **バージョンの範囲 — 非公開 v0.1.0 プレリリース。** この手順は、固定済みソース `3901cf17` の公開済み実験的コンパイラ／ランタイム `0.1.0`、同梱の拡張機能 `wbasic-dev.wbasic@0.2.1`、プロトコルパッケージ `0.0.2` を使います。[対応するパッケージのガイド]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) から始めてください。古い非公開コンパイラ `0.0.2` は拡張機能 `0.1.0` を同梱し、これらのプロジェクト編集機能を持ちません。

拡張機能は目的ごとにコマンドを分けます。Run が黙って配布用ビルドに変わったり、Check がプログラムのネットワークやデータベース接続を開いたりしてはいけません。

## Run Active Source：開いているソースの実行

保存済み `.wbas` を開いて **WBasic: Run Active Source in Terminal** を実行します。ソースのディレクトリを作業ディレクトリとして、一つのファイルを実行します。プロジェクトのインポートが不要な小さな例に向いています。

TUI には本物の端末入力が必要なので、Output パネルを通す代わりに統合ターミナルを使います。

## Run Project：プロジェクトの実行

モジュールと依存のある `App.wproj` では **WBasic: Run Project** を使います。`wbasic.defaultProfile` のプロファイルを使い、マニフェストのパスをリテラル引数として渡します。パス中の空白、タイ文字、絵文字をシェル文字列へ組み立てることはありません。

## Development Build：開発用ビルド

次の三つのコマンドがあります。

- **Build Project (Development)** は、コンパイラが公開するプロファイルから選択します。
- **Build Project — Debug (Development)** は Debug を直接選びます。
- **Build Project — Release (Development)** は Release を直接選びます。

コンパイラはネイティブ実行ファイルと `.wb-build.json` 記録を作ります。公開済み ZIP のコンパイラ、ランタイム素材、リンカーでは、ホスト SDK を使わずに debug/release の Run/Build が通っています。コンパイラをソースからビルドするにはネイティブ開発ツールが必要です。これは引き続き Development Build であり、本番利用の権限や、SDK のない新規ホストでの受け入れを含みません。

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
