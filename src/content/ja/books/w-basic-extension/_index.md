---
title: "WBasic 拡張機能ガイド"
description: "WBasic 0.2.0 と VS Code extension 0.3.0 で、編集、実行、ビルド、テストを学ぶ"
weight: -4
---

**対応するバージョンを選びます。** 1〜12 章は、一つの private experimental ARM64 一式の compiler/runtime `0.2.0`、protocol `0.1.0`、extension `wbasic-dev.wbasic@0.3.0` を使います。旧 `0.1.0` と extension `0.2.1` は別のリリース履歴であり、このガイドの E01–E10 用ツールチェーンではありません。[パッケージのガイド]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) から始めてください。

この開発用ガイドは **VS Code 向け WBasic 拡張機能**を、空のワークスペースから最初のプロジェクトを作り、補完と診断を使ってソースを書き、モジュールを管理し、ビルドして Test Explorer でテストする、一続きの作業で教えます。

本全体で `MyFirstWBasic` という小さなプロジェクトを使います。各章の **練習**と **確認項目**で、画像をクリックしながらコンパイラの機嫌に期待する代わりに、その手順が動いたか判断できます。

Extension 0.3.0 の E01–E10 の通常操作は Windows 11 ARM64 の実際の VS Code 1.140.0 で通りました。Testing／コマンドパレットからの別のネイティブテスト実行を中止しても、完了済みケースの結果を残し、中断された仕事を区別できました。一件のインライン Run Test の正常系は別に通っています。Windows/macOS ARM64 のエディター／プロトコルテストは同じソースリビジョンで通りましたが、Mac や Linux の実ウィンドウですべての UI 操作を試した証拠ではありません。対応するコンパイラ、ランタイム素材、リンカーでの Run と Development Build は開発用ホストで通りました。SDK のない新規ホストでの受け入れと本番配布は未完了です。

対応するプレリリースでは [VS Code、拡張機能、コンパイラを準備する]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}}) から始めてください。
