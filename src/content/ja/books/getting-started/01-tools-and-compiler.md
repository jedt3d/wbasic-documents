---
title: "1 · ツールとコンパイラ"
description: "wb の役割とバージョンを確認し、Billing Time のビルドを理解します。"
weight: 1
---

Billing Time は、請求書を作る前に記録した作業時間を集計する小さなコマンドラインアプリです。一度に読める規模ですが、コンパイラの仕事を確かめるには十分です。

この章は **コンパイラとランタイム 0.1.0** を対象とします。ローカル検証済みの Extension 0.2.3 もこの版のコンパイラを選びます。公開済み ZIP には引き続き 0.2.1 が同梱されています。マニフェストとランタイムの組み合わせを一致させてください。作業方法を切り替える前に[ツールチェーンのバージョン]({{< relref "/implementation-status.md" >}})を確認しましょう。

| ツール | 役割 |
|---|---|
| `wb` | プロジェクトの解決、ソースの検査、コンパイル、リンク、実行 |
| ターミナル | コマンドの実行と結果の表示 |
| ネイティブツールチェーン | 開発環境でのソースビルドには Windows の MSVC または macOS の Apple Clang を使用。ポータブル ZIP には準備済みのリンカを同梱 |

まずコンパイラを確認します。

```console
wb --version
wb --capabilities
```

開発環境でソースからビルドする場合は、`wb`、対応する 静的ランタイム、OS のツールチェーンと SDK が必要です。非公開の実験版 0.1.0 ARM64 ポータブル ZIP には、対応するコンパイラ、ランタイム、リンカが同梱されています。パッケージのスモークテストと、SDK を入れていない新しい環境での受け入れテストは別です。基本的な CLI 操作には Node は不要で、Node は任意のプロトコルツールに使います。

本書で使うコマンドは次のとおりです。

```text
wb project-info <manifest.wproj> --json
wb check <file-or-manifest> --json
wb run <file-or-manifest> [--profile debug|release] [-- arguments...]
wb build <manifest.wproj> [--profile debug|release] --output <path>
wb emit-object <file-or-manifest> --output <path> [--target <target>]
```

`wb run` はコンパイル、リンク、実行を行い、`wb build` はプロジェクトマニフェストから別の実行ファイルを作ります。`emit-object` はオブジェクトファイルを作ったところで止まります。プロファイルを省くとデバッグ版です。`wb check` には `--json` または `--format vscode` が必要です。

次へ: [Billing Time プロジェクトを作る]({{< relref "/books/getting-started/02-create-billing-time-project.md" >}})。
