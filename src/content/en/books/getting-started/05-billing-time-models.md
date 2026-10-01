---
title: "5 · Models that run"
description: "Read the Billing Time structures and SQLite mapping"
weight: 5
---

The small project now gives way to the [complete Billing Time WORM example](https://github.com/jedt3d/wbasic-language/tree/v0.1.0/examples/billing-time-worm), checked and run with compiler 0.1.0. It has six models: `Customer`, `Project`, `ServiceType`, `TimeEntry`, `Invoice`, and `InvoiceLine`. `DraftInvoice` holds the billing result.

In [Models.wbas](https://github.com/jedt3d/wbasic-language/blob/v0.1.0/examples/billing-time-worm/modules/Billing.wmod/src/Models.wbas), each model is an ordinary `Structure`:

```basic
Public Structure TimeEntry
  Id As Integer
  Version As Integer
  ProjectId As Integer
  ServiceTypeId As Integer
  WorkDate As String
  Minutes As Integer
  Note As String
  RateCentsPerHour As Integer
  InvoiceId As Integer?
EndStructure
```

`InvoiceId` is nullable until billing. `RateCentsPerHour` saves the rate when work is logged. Database rows have `Version` for update conflicts. Mapping lives in a separate procedure:

```basic
Procedure TimeMap() As Worm.Mapping Of TimeEntry
  Return Worm.Mapping(Of TimeEntry)("billing.time_entry", 1, "time_entries", "Id", "Version")
EndProcedure
```

Here `1` is the mapping definition version, distinct from a row's `Version`. Compiler 0.1.0 reports WB301 if one program defines the same `modelId` and version inconsistently. It does not automatically validate an existing database schema against the mapping. The application still owns migrations.

Next: [Schema and migration]({{< relref "/books/getting-started/06-billing-time-schema-and-seed.md" >}}).
