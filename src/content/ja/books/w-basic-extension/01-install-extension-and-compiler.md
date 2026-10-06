---
title: "1 · VS Code、拡張機能、コンパイラを準備する"
description: "VSIX 0.3.0 と wb 0.2.0 を接続し、選択されたツールチェーンを確認する"
weight: 1
---

> **対象バージョン — 対応する private experimental 0.2.0 一式。** このガイドは Windows/macOS ARM64 の compiler/runtime `0.2.0`、protocol `0.1.0`、VS Code extension `0.3.0` を対象とします。旧 `0.1.0`/extension `0.2.1` とローカル修正版 `0.2.3` は別の履歴です。extension の更新だけで E01–E10 は利用可能になりません。最初に **WBasic: Show Toolchain Status** でバージョンと capability を確認してください。

最初の章の目標は一つです。プロジェクトを作る前に、VS Code に `wb` を紹介します。ここを飛ばすと、補完は礼儀正しく表示されても、コンパイルコマンドは名簿を受け取っていない教授のように、黙ったままかもしれません。

## 必要なもの

- VS Code 1.137 以降
- 0.2.0 パッケージの `wb-package.json` に記録された 0.3.0 VSIX
- 同じ 0.2.0 ZIP に含まれる `wb`、ランタイム素材、リンカー、プローブ
- ツールチェーンをソースからビルドする場合に限り、MSVC ARM64 または Apple Clang

この実験的な非公開リリースは開発用ツールであり、Marketplace 向けや本番向けではありません。ネイティブ Run/Build は開発用ホストで通りました。SDK のない新規ホストでの受け入れは未完了です。

## VSIX をインストールする

1. VS Code の **Extensions** 画面を開きます。
2. 画面上部の `…` メニューを開きます。
3. **Install from VSIX…** を選びます。
4. `wb-package.json` の `vscodeVsix.path` にある 0.3.0 VSIX を選び、リリース記録と SHA-256 を照合します。
5. VS Code に求められたらウィンドウを再読み込みします。

インストール後に **Developer: Reload Window** を実行します。拡張機能 0.3.0 の操作は Windows ARM64 の実際の VS Code 1.140.0 と独立ホストテストで通りました。Mac ARM64 のエディター／プロトコルテストは別の証拠であり、Mac の実ウィンドウですべての UI 操作を繰り返した証拠ではありません。

インストール後、コマンドパレットを開いて `WBasic:` を検索します。**WBasic: New Project**、**WBasic: Show Toolchain Status**、**WBasic: Open v0.3 Specification** などが見えれば、拡張機能は有効になっています。

## コンパイラを接続する

既定では、拡張機能は次の順に `wb` を探します。

1. 拡張機能が管理する開発ツールチェーンのディレクトリ
2. WBasic リポジトリの debug ビルド
3. システムの `PATH`

見つからない場合は Settings で `WBasic: Compiler Path` を検索し、Windows では `wb.exe`、macOS では `wb` の絶対パスを入力します。この設定は実行ファイル一つのパスを受け取るため、シェルコマンドや引数を付けません。

Extensions で `0.3.0` を確認します。コマンドパレットから **WBasic: Show Toolchain Status** を選び、このガイドではコンパイラ `0.2.0` が報告されることを確認します。準備が整うと、パス、コンパイラのバージョン、開発ラウンド、このマシンのネイティブターゲットが表示されます。

**WBasic: About and Credits** はコンパイラを起動せずにインストール済み拡張機能の版を示し、Restricted Mode でも拡張機能のローカル通知を開けます。コンパイラ／ランタイムの通知は、対応する別のコンパイラパッケージにあります。

{{< guide-screenshot name="01-toolchain-status.png" alt="WBasic: Show Toolchain Status を実行した VS Code。個人情報を除いたコンパイラのパス、バージョン、開発ラウンド、ネイティブターゲット" caption="撮影する画面：VSIX とコンパイラを接続した後の Toolchain Status" >}}

## Workspace Trust：ワークスペースの信頼

構文の色分け、Outline、同梱仕様書は Restricted Mode でも使えます。確認、実行、ビルド、テストはネイティブコンパイラやプロジェクトのプログラムを起動するため、信頼済みワークスペースでのみ動作します。

出所の分かるフォルダーだけを信頼してください。0.3.0 では Check Project、Run Project、三つの Development Build コマンドがコマンドパレットに表示されます。実行できない場合は、設定を変える前に Workspace Trust とコンパイラの capability を確認します。

## 確認項目

- [ ] 拡張機能が `WBasic` として表示されている。
- [ ] コマンドパレットで `WBasic:` のコマンドが見つかる。
- [ ] **Show Toolchain Status** が準備完了と正しいマシンターゲットを示す。
- [ ] 練習用ワークスペースが信頼済みである。

次は [最初のプロジェクトを作る]({{< relref "/books/w-basic-extension/02-create-first-project.md" >}}) へ進みます。

## 開発候補 0.4.0

Extension 0.4.0 は開発候補であり、現行リリースの VSIX ではありません。上のインストール手順は、compiler/runtime 0.2.0 に対応する公開済み Extension 0.3.0 のままです。ソースからビルドする前に[候補版の範囲と未完了の確認]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}})を読んでください。
