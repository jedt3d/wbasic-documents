---
title: "6 · Schema and migration"
description: "Open the database explicitly and record an application migration"
weight: 6
---

[App.wproj](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/App.wproj) pins `toolchain = "0.0.2"`, declares bundled `Worm`, and uses the local `Billing` module. [Main.wbas](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/src/Main.wbas) accepts one database path, opens SQLite, and calls migration itself:

```basic
Using db As Worm.Database = Worm.OpenSqlite(args[0])
  Billing.ApplyMigration(db)
```

`Worm.OpenSqlite` does not create the schema. [Domain.wbas](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/modules/Billing.wmod/src/Domain.wbas) records exact LF-terminated SQL under `001_billing_time` in `schema_migrations` and runs seven DDL statements in one transaction. Changed SQL under that name reports `Billing.MigrationChanged`. [schema.sql](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/schema.sql) mirrors that text. This is an application procedure, not a general migration framework.

After migration, `Main` calls `Billing.CreateCustomer`, `CreateProject`, and `CreateService`. Each run intentionally adds records. Running against the same file creates another project and invoice; it is not an idempotent seed. Use a new SQLite path for your first run.

Next: [Log time]({{< relref "/books/getting-started/07-billing-time-log-time.md" >}}).
