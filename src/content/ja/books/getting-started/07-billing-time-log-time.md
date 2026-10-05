---
title: "7 · 作業時間と記録時点の料金を保存する"
description: "明示的な挿入と整数による金額計算を読みます。"
weight: 7
---

[Domain.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Domain.wbas) の `Billing.LogTime` は、プロジェクト、サービス、日付、作業時間（分）、備考、その時点のサービス料金を `TimeEntry` に保存します。後でその作業を請求するときには、保存した料金を使います。

```basic
changes = Worm.Set(Of TimeEntry)(changes, "Note", note)
changes = Worm.Set(Of TimeEntry)(changes, "RateCentsPerHour", service.RateCentsPerHour)
Using tx As Worm.Transaction = db.BeginTransaction()
  Let saved As TimeEntry = Worm.InsertReturning(Of TimeEntry)(tx, TimeMap(), changes)
  tx.Commit()
  Return saved
EndUsing
```

これは **手続きの一部** です。完全なソースは挿入前に必要なフィールドをすべて設定します。`Id` と `Version` は省略して SQLite に生成させ、`InsertReturning` が保存済みの行を読み取ります。フィールドを省略することと `Null` を設定することは異なります。各作業時間の記録は、それぞれ独立したトランザクションで保存されます。

[Main.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/src/Main.wbas) は Design の120分を毎時6,000 cents、Development の90分を毎時4,000 cents で記録します。`(minutes * rateCentsPerHour) Div 60` の結果は 12,000 + 6,000 = **18,000 cents** です。`ExactAmountCents` は負の分数や料金を拒否し、`Integer` の乗算はオーバーフローを検査します。`Div` は割り切れない商を切り捨てます。この例の数値は割り切れます。このアプリには、通貨、税、日付の検証、業務上の丸めについて完全な方針はありません。

次へ: [請求書を作る]({{< relref "/books/getting-started/08-billing-time-invoice-transaction.md" >}})。
