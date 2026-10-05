---
title: "1 · VS Code、拡張機能、コンパイラを準備する"
description: "開発用 VSIX をインストールし、wb を接続して、正しいツールチェーンが認識されることを確認する"
weight: 1
---

> **バージョンの範囲 — 非公開 v0.1.0 プレリリース。** この手順は、固定済みソース `3901cf17` の公開済み実験的コンパイラ／ランタイム `0.1.0`、同梱の拡張機能 `wbasic-dev.wbasic@0.2.1`、プロトコルパッケージ `0.0.2` を使います。[対応するパッケージのガイド]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) から始めてください。古い非公開コンパイラ `0.0.2` は拡張機能 `0.1.0` を同梱し、これらのプロジェクト編集機能を持ちません。

最初の章の目標は一つです。プロジェクトを作る前に、VS Code に `wb` を紹介します。ここを飛ばすと、補完は礼儀正しく表示されても、コンパイルコマンドは名簿を受け取っていない教授のように、黙ったままかもしれません。

## 必要なもの

- VS Code 1.137 以降
- `editors/vscode/wbasic-0.2.1.vsix` にある同梱の 0.2.1 VSIX
- 同じ v0.1.0 ZIP に含まれる `wb`、ランタイム素材、リンカー
- ツールチェーンをソースからビルドする場合に限り、MSVC ARM64 または Apple Clang

この非公開プレリリースは開発用ツールであり、Marketplace 向けや本番向けのリリースではありません。ポータブル ZIP の同梱ツールチェーンは、ホスト SDK を使わずに実行とビルドができます。SDK のない新規ホストでの受け入れは未完了です。

## VSIX をインストールする

1. VS Code の **Extensions** 画面を開きます。
2. 画面上部の `…` メニューを開きます。
3. **Install from VSIX…** を選びます。
4. 展開したパッケージの `wb-package.json` の `vscodeVsix.path` が示す VSIX を選び、記録された SHA-256 を確認します。
5. VS Code に求められたらウィンドウを再読み込みします。

0.2.1 の内容は通常の Windows VS Code プロファイルにインストール済みです。管理下のコンパイラ、ランタイム素材、リンカーは、公開済み Windows ZIP に揃っています。ウィンドウが開いていた場合は、コマンドを確認する前に **Developer: Reload Window** を使ってください。

インストール後、コマンドパレットを開いて `WBasic:` を検索します。**WBasic: New Project**、**WBasic: Show Toolchain Status**、**WBasic: Open v0.3 Specification** などが見えれば、拡張機能は有効になっています。

## コンパイラを接続する

既定では、拡張機能は次の順に `wb` を探します。

1. 拡張機能が管理する開発ツールチェーンのディレクトリ
2. WBasic リポジトリの debug ビルド
3. システムの `PATH`

見つからない場合は Settings で `WBasic: Compiler Path` を検索し、Windows では `wb.exe`、macOS では `wb` の絶対パスを入力します。この設定は実行ファイル一つのパスを受け取るため、シェルコマンドや引数を付けません。

Extensions で `0.2.1` を確認します。コマンドパレットから **WBasic: Show Toolchain Status** を選び、このガイドではコンパイラ `0.1.0` が報告されることを確認します。準備が整うと、パス、コンパイラのバージョン、開発ラウンド、このマシンのネイティブターゲットが表示されます。

{{< guide-screenshot name="01-toolchain-status.png" alt="WBasic: Show Toolchain Status を実行した VS Code。個人情報を除いたコンパイラのパス、バージョン、開発ラウンド、ネイティブターゲット" caption="撮影する画面：VSIX とコンパイラを接続した後の Toolchain Status" >}}

## Workspace Trust：ワークスペースの信頼

構文の色分け、Outline、同梱仕様書は Restricted Mode でも使えます。確認、実行、ビルド、テストはネイティブコンパイラやプロジェクトのプログラムを起動するため、信頼済みワークスペースでのみ動作します。

出所の分かるフォルダーだけを信頼してください。ツールチェーンが準備済みなのにコンパイルコマンドがない場合は、設定を次々に変更する前に Workspace Trust を確認します。

## 確認項目

- [ ] 拡張機能が `WBasic` として表示されている。
- [ ] コマンドパレットで `WBasic:` のコマンドが見つかる。
- [ ] **Show Toolchain Status** が準備完了と正しいマシンターゲットを示す。
- [ ] 練習用ワークスペースが信頼済みである。

次は [最初のプロジェクトを作る]({{< relref "/books/w-basic-extension/02-create-first-project.md" >}}) へ進みます。
