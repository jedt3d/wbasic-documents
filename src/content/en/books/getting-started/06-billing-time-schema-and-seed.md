---
title: "6 · Plan the schema and seed data"
description: "Make migration explicit and create typed starting records."
weight: 6
---

> **Planned WORM API:** this chapter describes intended behavior, not a runnable
> addition to the command-line starter.

The proposed application opens SQLite inside `Using`, then applies a named
migration explicitly. Opening a connection by itself must never alter the schema.

```basic
Using db As Worm.Database = Worm.OpenSqlite(args[0])
  db.Migrations.Apply("001_billing_time", [
    Worm.Entity(Of Customer)(), Worm.Entity(Of Project)(),
    Worm.Entity(Of TimeEntry)(), Worm.Entity(Of Invoice)()
  ])
EndUsing
```

For today's implemented path, use the Standard Library `Sqlite` module, parameter
binding, and explicit SQL migrations. The proposed typed mapper should be adopted
only after its public API and tests exist.

Next: [Log time and calculate amounts]({{< relref "/books/getting-started/07-billing-time-log-time.md" >}}).
