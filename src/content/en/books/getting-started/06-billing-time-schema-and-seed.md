---
title: "6 · Schema and migration"
description: "Open SQLite and apply an explicit application migration"
weight: 6
---

[billing-time.wproj](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/billing-time.wproj) declares `toolchain = "0.2.0"`, bundled `Worm`, and the local `Billing` module. [Main.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/src/Main.wbas) accepts at most one database path. With no argument it uses `billing-time-demo.sqlite` in the current working directory. An empty path or more than one argument returns an error before opening SQLite.

After opening the database, `Main` calls migration explicitly:

```basic
Using db As Worm.Database = Worm.OpenSqlite(databasePath)
  Billing.ApplyMigration(db)
```

`Worm.OpenSqlite` does not create the schema. [Domain.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Domain.wbas) creates `schema_migrations`, executes seven DDL statements one at a time in one transaction, and records LF-joined SQL under `001_billing_time`. If that name already holds different SQL, it reports `Billing.MigrationChanged`. This is an application migration, not a general framework.

[schema.sql](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/schema.sql) is a companion file for reading the table layout, not a script to pass wholesale to `Worm.Execute`. `Execute` accepts one prepared statement at a time. Use `Billing.ApplyMigration`, whose `SchemaStatements()` separates the statements and records the text the app actually uses.

After migration, `Main` adds a new customer, project, and services on every run. Reusing a database adds data; this is not an idempotent seed. Start with a new SQLite path to follow the first run easily.

Next: [Log time]({{< relref "/books/getting-started/07-billing-time-log-time.md" >}}).
