---
title: "5 · Models saved in SQLite"
description: "Read the structures, Null values, and mapping of the database Billing Time app"
weight: 5
---

The first four chapters use the small program you create yourself. We now turn to a separate [downloadable SQLite Billing Time app](https://jedt3d.github.io/wbasic-documents/downloads/billing-time-source.zip), with its own `Billing` module and schema. This snapshot is not an example in the compiler's Git tag.

[Models.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Models.wbas) defines six `Structure` models: `Customer`, `Project`, `ServiceType`, `TimeEntry`, `Invoice`, and `InvoiceLine`. `DraftInvoice` gathers the billing result. One model is:

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

`InvoiceId` is `Integer?`: an unbilled entry can hold `Null`. `RateCentsPerHour` captures the rate when work is logged, so a later service price change does not alter the old entry. A row's `Version` detects conflicting updates. Mapping is defined in [Domain.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Domain.wbas):

```basic
Procedure TimeMap() As Worm.Mapping Of TimeEntry
  Return Worm.Mapping(Of TimeEntry)("billing.time_entry", 1, "time_entries", "Id", "Version")
EndProcedure
```

Here `1` is the mapping definition version, separate from a row's `Version`. Compiler 0.2.0 reports WB301 when one program defines the same `modelId` and mapping version inconsistently. It does not automatically compare an existing database schema with the mapping. The app must manage migration.

Next: [Schema and migration]({{< relref "/books/getting-started/06-billing-time-schema-and-seed.md" >}}).
