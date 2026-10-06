---
title: "1 · ツールとコンパイラ"
description: "wb の役割とバージョンを確認し、Billing Time のビルドを理解します。"
weight: 1
---

Billing Time は、請求書を作る前に記録した作業時間を集計する小さなコマンドラインアプリです。一度に読める規模ですが、コンパイラの仕事を確かめるには十分です。

この章は、対応する **コンパイラ／ランタイム 0.2.0**、VS Code Extension **0.3.0**、protocol **0.1.0** を対象とします。マニフェストとランタイムの版をコンパイラに合わせてください。作業方法を切り替える前に[ツールチェーンのバージョン]({{< relref "/implementation-status.md" >}})を確認しましょう。

| ツール | 役割 |
|---|---|
| `wb` | プロジェクトの解決、ソースの検査、コンパイル、リンク、実行 |
| ターミナル | コマンドの実行と結果の表示 |
| ネイティブツールチェーン | コンパイラの Rust ソースからの構築には Windows の MSVC または macOS の Apple Clang を使用。ポータブル ZIP には WBasic アプリ構築用のリンカを同梱 |

まずコンパイラを確認します。

```console
wb --version
wb --capabilities
```

開発環境でコンパイラの Rust ソースからツールチェーンを構築するには、OS のツールチェーン／SDK と対応する静的ランタイムが必要です。非公開の実験版 0.2.0 ARM64 ポータブル ZIP には、対応するコンパイラ、ランタイム、リンカが同梱され、検証済みの開発ホストでは WBasic アプリのソースをビルドできます。パッケージのスモークテストと、SDK のない新規ホストでの受け入れは別です。基本的な CLI 操作には Node は不要で、Node は任意のプロトコルツールに使います。

本書で使うコマンドは次のとおりです。

```text
wb project-info <manifest.wproj> --json
wb check <file-or-manifest> --json
wb run <file-or-manifest> [--profile debug|release] [-- arguments...]
wb build <manifest.wproj> [--profile debug|release] --output <path>
wb emit-object <file-or-manifest> --output <path> [--target <target>]
```

`wb run` はコンパイル、リンク、実行を行い、`wb build` はプロジェクトマニフェストから別の実行ファイルを作ります。`emit-object` はオブジェクトファイルを作ったところで止まります。プロファイルを省くとデバッグ版です。`wb check` には `--json` または `--format vscode` が必要です。

VS Code では `wbasic.compilerPath` に 0.2.0 の `wb` を指定し、Command Palette（Windows では `Ctrl+Shift+P`）から **WBasic: Check Project**、**Run Project**、**Build Project — Debug/Release (Development)** を選びます。検証済み開発ホストのポータブルパッケージは、同梱のリンカ／ランタイムで WBasic アプリをビルドします。コンパイラ自体を Rust ソースから構築する場合は SDK／ネイティブツールチェーンが必要です。パッケージのスモークテストは新規 no-SDK ホストでの受け入れを証明しません。

次へ: [Billing Time プロジェクトを作る]({{< relref "/books/getting-started/02-create-billing-time-project.md" >}})。
