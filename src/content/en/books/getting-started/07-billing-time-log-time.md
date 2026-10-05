---
title: "7 · Log time and retain the rate"
description: "Read explicit insert intent and integer amount calculation"
weight: 7
---

`Billing.LogTime` in [Domain.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Domain.wbas) saves the project, service, date, minutes, note, and current service rate in `TimeEntry`. The saved rate is the record used when that work is billed later:

```basic
changes = Worm.Set(Of TimeEntry)(changes, "Note", note)
changes = Worm.Set(Of TimeEntry)(changes, "RateCentsPerHour", service.RateCentsPerHour)
Using tx As Worm.Transaction = db.BeginTransaction()
  Let saved As TimeEntry = Worm.InsertReturning(Of TimeEntry)(tx, TimeMap(), changes)
  tx.Commit()
  Return saved
EndUsing
```

This is a **fragment of the procedure**; the full source sets every required field before insertion. It omits `Id` and `Version` so SQLite supplies them, then `InsertReturning` decodes the saved row. Omitting a field and setting it to `Null` are distinct intentions. Each time entry is saved in its own transaction.

[Main.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/src/Main.wbas) logs 120 design minutes at 6,000 cents/hour and 90 development minutes at 4,000 cents/hour. `(minutes * rateCentsPerHour) Div 60` yields 12,000 + 6,000 = **18,000 cents**. `ExactAmountCents` rejects negative minutes or rates, `Integer` multiplication is checked for overflow, and `Div` truncates a non-integral quotient. These sample values divide evenly. The app has no currency, tax, date-validation, or complete business rounding policy.

Next: [Create an invoice]({{< relref "/books/getting-started/08-billing-time-invoice-transaction.md" >}}).
