---
title: "8 · トランザクションで請求書を作る"
description: "書き込み順序、行の選択、二重請求の防止を読みます。"
weight: 8
---

[Domain.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Domain.wbas) の `Billing.CreateDraftInvoice` はトランザクションを開始し、保存されているプロジェクトの顧客を確認します。続いて未請求の作業記録を選ぶ **前に**、最初の書き込みとして請求書のヘッダーを挿入します。この書き込みで SQLite の書き込み権限を取得します。ほかの書き込み処理との競合や古いスナップショットは、自動再試行せずエラーになります。

```basic
Let query As Worm.Query Of TimeEntry = Worm.Select(Of TimeEntry)()
query = Worm.Equal(Of TimeEntry)(query, "ProjectId", project.Id)
query = Worm.IsNull(Of TimeEntry)(query, "InvoiceId")
query = Worm.OrderBy(Of TimeEntry)(query, "Id", False)
Let unbilled As Array Of TimeEntry = Worm.All(Of TimeEntry)(tx, TimeMap(), query)
```

これは **ヘッダーを挿入した後の一部分** であり、手続き全体ではありません。各作業記録から、分数、記録時の料金、金額を持つ請求明細を作ります。次に `Worm.Update` が `entry.Version` を使って `InvoiceId` を結び付けます。`Changes` で省略したフィールドは変わらず、古い行バージョンは拒否されます。`invoice_lines.TimeEntryId` の一意制約が重複した明細を防ぎます。

すべての明細を挿入し、作業記録との関連付けを終えてから `Commit` します。コミット前にエラーが起きると、`Using` から抜ける際にこのトランザクションのロールバックを試みます。それ以前の顧客、プロジェクト、サービス、作業時間は別々のトランザクションで保存されており、請求書の作成失敗で実行全体が元に戻るわけではありません。コミットを送った後で結果が不明になった場合、トランザクションは `Unknown` です。再試行する前にデータベースの結果を調べてください。ロールバックが成功したと決めつけてはいけません。未請求の新しい記録がないとき、この例は空の下書き請求書を許します。Billing の検証例は永続化、通常のロールバック、空の下書きを検査し、`Unknown` の契約は WORM M5 の結果確認用フックで別途検査します。[WORM SQLite]({{< relref "/books/standard-library/worm-sqlite.md" >}})も参照してください。

次へ: [テストして次へ進む]({{< relref "/books/getting-started/09-billing-time-tests-and-next-steps.md" >}})。
