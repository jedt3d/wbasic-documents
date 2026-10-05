---
title: "6 · スキーマと移行"
description: "SQLite を開き、アプリが明示する移行を適用します。"
weight: 6
---

[billing-time.wproj](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/billing-time.wproj) は `toolchain = "0.1.0"`、同梱の `Worm`、ローカルの `Billing` モジュールを指定します。[Main.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/src/Main.wbas) が受け取るデータベースのパスは最大1つです。引数がなければ、現在の作業ディレクトリの `billing-time-demo.sqlite` を使います。空のパス、または2つ以上の引数を渡すと、SQLite を開く前にエラーを返します。

データベースを開いた後、`Main` は移行を明示的に呼びます。

```basic
Using db As Worm.Database = Worm.OpenSqlite(databasePath)
  Billing.ApplyMigration(db)
```

`Worm.OpenSqlite` はスキーマを作りません。[Domain.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Domain.wbas) は `schema_migrations` を作り、7つの DDL 文を一つのトランザクション内で1文ずつ実行します。そして、LF で連結した SQL を `001_billing_time` として記録します。同じ名前で異なる SQL が記録されていれば `Billing.MigrationChanged` を報告します。これはアプリ固有の移行手順であり、汎用の仕組みではありません。

[schema.sql](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/schema.sql) はテーブル構成を読むための付属ファイルです。ファイル全体を `Worm.Execute` に渡してはいけません。`Execute` が受け付けるプリペアドステートメントは1回に1文です。`SchemaStatements()` で文を分け、アプリが実際に使う内容を記録する `Billing.ApplyMigration` を使ってください。

移行後、`Main` は実行するたびに新しい顧客、プロジェクト、サービスを追加します。同じデータベースを再利用するとデータが増えるため、冪等な初期投入ではありません。最初の実行を追うときは新しい SQLite パスを使いましょう。

次へ: [作業時間を記録する]({{< relref "/books/getting-started/07-billing-time-log-time.md" >}})。
