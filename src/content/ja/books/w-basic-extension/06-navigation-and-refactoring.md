---
title: "6 · ナビゲーションとリファクタリング"
description: "定義、参照、ワークスペースのシンボル、コンパイラが検証する複数ファイルの名前変更を使う"
weight: 6
---

> **バージョンの範囲 — 非公開 v0.1.0 プレリリース。** この手順は、固定済みソース `3901cf17` の公開済み実験的コンパイラ／ランタイム `0.1.0`、同梱の拡張機能 `wbasic-dev.wbasic@0.2.1`、プロトコルパッケージ `0.0.2` を使います。[対応するパッケージのガイド]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) から始めてください。古い非公開コンパイラ `0.0.2` は拡張機能 `0.1.0` を同梱し、これらのプロジェクト編集機能を持ちません。

プロジェクトが大きくなると、目で宣言を探す方法は、ツールに静かに道を譲ります。拡張機能は、コンパイラの識別情報とソース範囲を使ってファイル間を移動します。

## 基本のコマンド

- **Go to Definition** は手続きやシンボルの宣言を開きます。
- **Find All References** はプロジェクト内の使用箇所を一覧にします。
- **Go to Symbol in Workspace** は公開シンボルとプロジェクトのシンボルを検索します。
- **Rename Symbol** は複数ファイルの編集を準備し、全体のスナップショットをコンパイラで検証します。

`Main` の `Greeting` を右クリックし、Go to Definition、続いて Find All References を選びます。コメントや文字列に同じテキストがあっても、結果に含まれないはずです。

## 推測せずに名前を変える

Rename Symbol を選び、`Greeting` を `WelcomeMessage` に変えます。拡張機能はコンパイラの識別情報で宣言と参照を結び付け、WorkspaceEdit を返す前に、編集後のソース全体を検証します。検証に失敗した場合、半分だけ名前を変えたプロジェクトを残すことはありません。

{{< guide-screenshot name="06-navigation-rename.png" alt="二つのソースファイル内の WelcomeMessage の宣言と参照を示す VS Code の Rename プレビュー。コメントと文字列は対象外" caption="撮影する画面：適用前にコンパイラが検証したファイル間の名前変更" >}}

名前変更にはコンパイラの `rename` 機能と、対応範囲内のオーバーレイが必要です。現在のプロジェクトオーバーレイの上限は、開いた文書 32 個、1 ファイル 1 MiB、合計 4 MiB です。超えた場合は推測せず、安全側に失敗します。

## まだ期待できないこと

- すべてのスコープで完全なローカル変数の索引を作ること。
- 依存関係のない別プロジェクトまで名前変更すること。
- 文字列を使ったリフレクションを参照と見なすこと。
- テキストを取り込む Include や、グローバルな include path を使うこと。

モジュールと可視性は [モジュール、パッケージ、可視性]({{< relref "/books/language-reference/12-modules-packages-visibility.md" >}}) を参照してください。

## 練習

1. `src/Messages.wbas` を作ります。
2. `Module MyFirstWBasic` を保ったまま、`Greeting` をそのファイルへ移します。
3. `Main.wbas` から Go to Definition を使います。
4. 拡張機能で名前を変えます。
5. 保存して Check Project を実行します。

次は [モジュールと依存パスを管理する]({{< relref "/books/w-basic-extension/07-modules-and-dependency-paths.md" >}}) へ進みます。
