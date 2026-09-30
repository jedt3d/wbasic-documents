---
title: "8 · Plan the invoice transaction"
description: "Create invoice lines and mark time entries billed atomically."
weight: 8
---

> **Planned WORM API:** the transaction behavior is an acceptance target.

The invoice workflow selects unbilled time entries, creates an invoice and one
line per entry, then attaches each entry to that invoice in one transaction.

```basic
Using transaction As Worm.Transaction = db.BeginTransaction()
  Let unbilled As Array Of TimeEntry = Worm.Query(Of TimeEntry)(transaction)
    .Where(TimeEntry.Columns.ProjectId.Eq(project.Id))
    .Where(TimeEntry.Columns.InvoiceId.IsNull()).All()
  ' create the invoice and its lines
  transaction.Commit()
EndUsing
```

Leaving `Using` before `Commit()` must roll back the invoice, lines, and time-entry
links together. A real design also needs a constraint, isolation rule, or version
check so concurrent runs cannot bill the same entry twice.

Next: [Testing and the next milestone]({{< relref "/books/getting-started/09-billing-time-tests-and-next-steps.md" >}}).
