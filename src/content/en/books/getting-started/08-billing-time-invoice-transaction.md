---
title: "8 · Create an invoice in a transaction"
description: "Read writer admission, row selection, and duplicate billing guards"
weight: 8
---

`Billing.CreateDraftInvoice` in [Domain.wbas](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/modules/Billing.wmod/src/Domain.wbas) begins a transaction, reads the stored project owner within that transaction, and then inserts the invoice header as its first write **before** selecting unbilled entries. That write obtains SQLite writer admission. A competing writer or stale snapshot produces an error without automatic retry.

```basic
Let query As Worm.Query Of TimeEntry = Worm.Select(Of TimeEntry)()
query = Worm.Equal(Of TimeEntry)(query, "ProjectId", project.Id)
query = Worm.IsNull(Of TimeEntry)(query, "InvoiceId")
query = Worm.OrderBy(Of TimeEntry)(query, "Id", False)
Let unbilled As Array Of TimeEntry = Worm.All(Of TimeEntry)(tx, TimeMap(), query)
```

This is a **fragment after the header insert**, not the whole procedure. Each entry produces a line containing minutes, saved rate, and amount. `Worm.Update` links its `InvoiceId` using `entry.Version`. Omitted fields in `Changes` stay unchanged; a stale row version is rejected. A unique constraint on `InvoiceLine.TimeEntryId` prevents duplicate lines.

`Commit` follows all line inserts and links. If an error occurs before commit,
leaving `Using` attempts to roll the group back. If commit was dispatched but
its result is unknown, the transaction becomes `Unknown`; investigate the
database outcome before repeating the operation. Do not assume rollback
succeeded. The example intentionally saves an empty draft if no new entries
exist. Billing fixtures cover persistence, ordinary rollback and empty drafts;
the `Unknown` transaction contract is tested separately by WORM M5 outcome hooks.
See [WORM SQLite]({{< relref "/books/standard-library/worm-sqlite.md" >}}).
Use a new database when following the first run step by step.

Next: [Test and continue]({{< relref "/books/getting-started/09-billing-time-tests-and-next-steps.md" >}}).
