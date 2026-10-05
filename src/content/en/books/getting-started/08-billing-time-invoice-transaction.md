---
title: "8 · Create an invoice in a transaction"
description: "Read write order, row selection, and duplicate billing guards"
weight: 8
---

`Billing.CreateDraftInvoice` in [Domain.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Domain.wbas) opens a transaction and checks the project's stored customer. It then inserts the invoice header as its first write **before** selecting unbilled time entries. That write obtains SQLite writer admission. A competing writer or stale snapshot returns an error without automatic retry.

```basic
Let query As Worm.Query Of TimeEntry = Worm.Select(Of TimeEntry)()
query = Worm.Equal(Of TimeEntry)(query, "ProjectId", project.Id)
query = Worm.IsNull(Of TimeEntry)(query, "InvoiceId")
query = Worm.OrderBy(Of TimeEntry)(query, "Id", False)
Let unbilled As Array Of TimeEntry = Worm.All(Of TimeEntry)(tx, TimeMap(), query)
```

This is a **fragment after the header insert**, not the whole procedure. Each entry produces a line with its minutes, saved rate, and amount. `Worm.Update` then links `InvoiceId` using `entry.Version`. Fields omitted from `Changes` stay unchanged; a stale row version is rejected. A unique constraint on `invoice_lines.TimeEntryId` prevents duplicate lines.

`Commit` follows all line inserts and links. If an error occurs before commit, leaving `Using` attempts to roll back this transaction. The preceding customer, project, service, and time-entry writes have their own transactions, so a later invoice failure does not undo the entire run. If commit was dispatched but its result is unknown, the transaction is `Unknown`: inspect the database outcome before retrying. Do not assume rollback succeeded. The example permits an empty draft when no new entries exist. Billing fixtures cover persistence, ordinary rollback, and empty drafts; WORM M5 outcome hooks separately test the `Unknown` contract. See [WORM SQLite]({{< relref "/books/standard-library/worm-sqlite.md" >}}).

Next: [Test and continue]({{< relref "/books/getting-started/09-billing-time-tests-and-next-steps.md" >}}).
