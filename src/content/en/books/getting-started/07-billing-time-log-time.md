---
title: "7 · Log time and save rates"
description: "Read insert intent and saved rates in runnable source"
weight: 7
---

`Billing.LogTime` saves the project, service, date, minutes, note, and current service rate in `TimeEntry`. Later service price changes therefore do not recalculate that entry. [Domain.wbas](https://github.com/jedt3d/wbasic-language/blob/v0.1.0/examples/billing-time-worm/modules/Billing.wmod/src/Domain.wbas) expresses insert intent explicitly:

```basic
changes = Worm.Set(Of TimeEntry)(changes, "Note", note)
changes = Worm.Set(Of TimeEntry)(changes, "RateCentsPerHour", service.RateCentsPerHour)
Using tx As Worm.Transaction = db.BeginTransaction()
  Let saved As TimeEntry = Worm.InsertReturning(Of TimeEntry)(tx, TimeMap(), changes)
  tx.Commit()
  Return saved
EndUsing
```

This is a **fragment** of the procedure; the full source sets every required field before insertion. `Id` and `Version` are omitted so SQLite supplies them, then `InsertReturning` decodes the saved row. Omission and setting `Null` are distinct intentions.

[Main.wbas](https://github.com/jedt3d/wbasic-language/blob/v0.1.0/examples/billing-time-worm/src/Main.wbas) logs 120 design minutes at 6,000 cents/hour and 90 development minutes at 4,000 cents/hour. `(minutes * rateCentsPerHour) Div 60` yields 12,000 + 6,000 = **18,000 cents**. `ExactAmountCents` rejects negatives, and `Integer` multiplication is checked for overflow. These numbers divide exactly; the example supplies no complete tax, currency, date validation, or business rounding policy.

Next: [Create an invoice]({{< relref "/books/getting-started/08-billing-time-invoice-transaction.md" >}}).
