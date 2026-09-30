---
title: "5 · Plan the data model"
description: "Extend Billing Time toward value records and WORM mapping."
weight: 5
---

> **Planned boundary:** chapters 5–9 are an acceptance design for WORM. The core
> language is implemented, but the `Worm.*` API is not in the current compiler
> or runtime, so these snippets do not compile today.

The database design uses ordinary `Structure` values for customers, projects,
service types, time entries, invoices, and invoice lines. Mapping should not make
a value secretly carry a connection or execute a query when a field is read.

```basic
[Worm.Table("time_entries")]
Structure TimeEntry
  [Worm.PrimaryKey]
  [Worm.Generated]
  Id As Integer
  ProjectId As Integer
  ServiceTypeId As Integer
  WorkDate As String
  Minutes As Integer
  Note As String
  RateCentsPerHour As Integer
  InvoiceId As Integer? = Null
EndStructure
```

The bracketed attributes are proposed WORM syntax. `Structure`, fields, nullable
types, and `Null` are implemented language features. The time entry snapshots
its rate so a future service-price change cannot rewrite billing history.

Next: [Schema and seed data]({{< relref "/books/getting-started/06-billing-time-schema-and-seed.md" >}}).
