---
title: "7 · Plan time logging and prices"
description: "Snapshot rates and keep integer-money arithmetic visible."
weight: 7
---

When work is recorded, Billing Time copies the current service rate into the time
entry. Raising the service price next month must not change this month's work.

| Service | Minutes | Rate (cents/hour) | Amount (cents) |
|---|---:|---:|---:|
| Design | 120 | 6,000 | 12,000 |
| Development | 90 | 4,000 | 6,000 |
| **Total** | **210** | | **18,000** |

```basic
Procedure ExactAmountCents(minutes As Integer, rateCentsPerHour As Integer) As Integer
  Return (minutes * rateCentsPerHour) Div 60
EndProcedure
```

This procedure is already runnable in the starter. The selected numbers divide
exactly by 60; a production system still needs explicit rounding, overflow,
currency, date/time, and tax policies.

Next: [Plan the invoice transaction]({{< relref "/books/getting-started/08-billing-time-invoice-transaction.md" >}}).
