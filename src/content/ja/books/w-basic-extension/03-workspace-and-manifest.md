---
title: "3 · ワークスペースとマニフェストを見て回る"
description: "プログラムを書く前に、App.wproj、Outline、Projects の画面を理解する"
weight: 3
---

> **バージョンの範囲 — ローカル検証済み拡張機能 0.2.3。** 0.2.3 VSIX は、対応する開発用コンパイラ／ランタイムと組み合わせてローカルで検証しました。公開済みの実験的な非公開コンパイラ／ランタイムは `0.1.0`、プロトコルパッケージは `0.0.2` です。公開済み ARM64 ZIP に同梱された拡張機能 `0.2.1` は変更されておらず、拡張機能 `0.2.3` に公開リリースや Marketplace 掲載はありません。[パッケージのガイド]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) から始めてください。古い非公開コンパイラ `0.0.2` は拡張機能 `0.1.0` を同梱し、これらのプロジェクト編集機能を持ちません。

`App.wproj` を開きます。基本的な形は次のとおりです。

```toml
[project]
name = "MyFirstWBasic"
module = "MyFirstWBasic"
entry = "src/Main.wbas"
toolchain = "0.1.0"

[dependencies]
```

`name` は利用者に表示するプロジェクト名、`module` は主となる名前空間、`entry` はマニフェストからの相対パスです。`toolchain` は、プロジェクトを対応するツールの契約に結び付けます。

## マニフェストを読むための機能

- **構文の色分け**は、セクション、キー、文字列、コメントを区別します。
- **Outline** はセクションとキーを一覧にして、直接移動できるようにします。
- **補完**は `.wproj` と `module.toml` の文脈に合うキーを提案します。
- **Hover** はキーと依存パスを説明します。
- **WBasic Projects** はコンパイラが実際に読む内容を要約します。

エディターの色は字句上の手掛かりです。パスの綴りが間違っていても、見た目は立派なまま、コンパイラには拒否されることがあります。見栄えは型システムではありません。

補完では、有効なマニフェストのキーとローカル依存のパスも提案します。編集を助ける機能であり、保存済みプロジェクトとコンパイラの契約は **Check Project** で検証します。

## 初めてプロジェクトを確認する

コマンドパレットから **WBasic: Check Project** を選びます。保存したマニフェスト、ソース、モジュール、依存を確認します。問題マッチャーは各問題をファイル、行、列、診断コードに結び付けます。

未保存のソースにはライブ診断や **WBasic: Check Active Source** を使います。後者はエディターの内容をコンパイラへ直接送りますが、単独ソースとして確認します。インポートや複数モジュールを使う場合の **Check Project** の代わりにはなりません。

## 既定のプロファイルを変える

`wbasic.defaultProfile` は `debug` と `release` を受け付けます。既定の `debug` は編集と実行を繰り返すのに向いています。コンパイラの release プロファイルでの動作が必要なら `release` を選びます。これによって Development Build が本番配布になるわけではありません。

## 確認項目

- [ ] マニフェストの Outline に `[project]` と `[dependencies]` が見える。
- [ ] `entry` にマウスを置くとパスの説明が見える。
- [ ] Check Project がエラーなしで終わる。
- [ ] Check Active Source と Check Project の違いが分かる。

次は [言語を理解する編集機能で書く]({{< relref "/books/w-basic-extension/04-write-with-language-intelligence.md" >}}) へ進みます。
