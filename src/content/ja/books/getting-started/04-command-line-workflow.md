---
title: "4 · 検査、コンパイル、実行"
description: "project-info、check、run、emit-object をプロジェクトで使います。"
weight: 4
---

解決されたプロジェクト情報を確認します。

```console
wb project-info billing-time/BillingTime.wproj --json
```

実行せずにソースを検査します。

```console
wb check billing-time/BillingTime.wproj --json
```

コンパイル、リンク、実行を行います。`--` の後ろにアプリへの引数を1つ渡します。

```console
wb run billing-time/BillingTime.wproj -- "Website refresh"
```

出力は次のとおりです。

```text
Billing Time
project: Website refresh
time logged: 210 minutes
draft total: 18000 cents
```

`wb run` はオブジェクトを作り、ネイティブツールチェーンで対応する WBasic ランタイムをリンクし、一時的な実行ファイルを動かします。ソースから作った開発用 CLI では、対応するランタイムが通常の場所にない場合、`--runtime <path>` を指定できます。

オブジェクト生成で止めるには:

```console
wb emit-object billing-time/BillingTime.wproj --output BillingTime.obj
```

macOS では慣例に合わせて `.o` という名前にしてもかまいません。そのオブジェクトのリンクは利用者が行います。別の実行ファイルが必要なら、このプロジェクトマニフェストに `wb build billing-time/BillingTime.wproj --output BillingTime` を使えます。Windows では出力名に `.exe` を付けます。次章からは別途実行できる WORM/SQLite プロジェクトを読みます。

次へ: [データベースのモデルを読む]({{< relref "/books/getting-started/05-billing-time-models.md" >}})。
