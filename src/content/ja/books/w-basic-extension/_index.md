---
title: "WBasic 拡張機能ガイド"
description: "やりたいことから始める How can I…? と Extension 0.4.0 candidate の新しい開発体験"
weight: -4
---

この本では、**VS Code で WBasic のアイデアを形にし、結果を確かめるまで**を一緒に進めます。プロジェクトを作り、直すべきコードを見つけ、テンプレートで書き、エラーを調べ、実行してテストする。**Extension 0.4.0** の新機能は、こうした作業をつなぎやすくします。プログラムが正しいかどうかの判断は、引き続き compiler が担います。

**まずは、やりたいことを選んでください。** [How can I…? — 機能ごとの実践手順]({{< relref "/books/w-basic-extension/13-how-can-i.md" >}}) で目的に合う項目を選び、手順と確認点をたどれます。toolchain がまだない場合は、先に[パッケージのガイド]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}})を読んでください。

## 0.4.0 の見どころ：書く、直す、実行する、確かめる

| やりたいこと | 試せる機能 |
|---|---|
| ショートカットを覚えずにコマンドを探す | Shortcut Guide。`standard` profile と `intellij` の選択肢（DX01） |
| 編集中の場所に合う操作を選ぶ | context/capability に応じた Actions at Caret と Refactor This（DX02） |
| 決まった書式を毎回入力せずに書き始める | linked placeholders を持つ Insert Template と、空の editor で使う Insert File Template（DX03） |
| statements を囲み、確認して元に戻す | If または Try/Finally の Surround With。Check と Undo も使う（DX04） |
| argument の組を選んで再実行する | Select Run Configuration と、現在の設定を読み直す Run Again（DX05） |
| source と test の間を行き来する | Go to Test or Source と、最初は意図的に失敗する assertion を置く New Test Scaffold（DX06） |
| 失敗した test を直し、その対象だけ再確認する | native runner の結果と identity を使う Testing: Rerun Failed Tests from Last Run（DX07） |
| 開いていない declaration を探す | 指定した検索範囲内で compiler reports を使う Workspace Symbols（DX08） |
| 名前が何を指すか読み取りやすくする | compiler が resolve した identity に基づく Semantic colors（DX09） |
| toolchain の問題を手掛かりとともに調べる | capabilities と config の復旧方法を示す Toolchain Doctor（DX10） |

Surround With は、生成後に読んで確認するためのテキストテンプレートです。元の意味を保つと証明された refactor ではありません。また、Run Again はプログラムを実際にもう一度実行します。たとえばデータベースへの書き込みなど、副作用も繰り返されます。この本では、自分で選んだ練習用の project とデータで試します。

## 章に合うツールの組を選ぶ

| 状態 | Extension | Protocol | Compiler/runtime |
|---|---|---|---|
| ダウンロード可能な private experimental release | 0.3.0 | 0.1.0 | 0.2.0 |
| DX01–DX10 を検証した development candidate | 0.4.0 | 0.2.0 | 従来と同じ 0.2.0 |

この時点で、**0.4.0 は release としても Marketplace でも公開されていません**。参照しているソースは `5907381` です。したがって release パッケージをインストールしても Extension は 0.3.0 で、DX の新コマンドは自動では追加されません。How can I…? の各手順には必要なバージョンを記しています。始める前に Extensions 画面と **WBasic: Show Toolchain Status** で確認してください。project の toolchain pin を 0.4.0 に変更しないでください。0.4.0 は Extension のバージョンです。

1〜12 章では公開済みの一式を使って基本を学び、追加された candidate の部分にはその旨を示します。小さな `MyFirstWBasic` project を通して、手順ごとに結果を確かめます。慣れてきたら、How can I…? から個々の作業をすぐに見直せます。

## 手順を支える検証結果

candidate の protocol テストは Windows/macOS ARM64 host で 98/98 件通りました。editor テストは Windows で 154 件通過、Mac-alias の 1 件を skip、macOS では 155/155 件通過しました。修復した独立 Windows host では 16/16 件通過しました。実際にインストールした Windows のウィンドウでも、Vim、Check/Undo、失敗した test の再実行、project 外の Template を開いた状態での移動を含む記録済みの DX 手順が通っています。[各作業の報告と検証範囲](https://github.com/jedt3d/wbasic-language/blob/5907381/docs/rounds/VSCode-current-compiler-DX-2026-10-06.md)を参照してください。

この UI の結果は、macOS や Linux の実ウィンドウでの確認を意味せず、SDK のない新規 host や本番配布も保証しません。release 0.3.0 には独立した E01–E10 の検証結果があります。candidate の章を追加しても、過去の結果が変わるわけではありません。
