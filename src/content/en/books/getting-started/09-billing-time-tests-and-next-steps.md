---
title: "9 · Test and continue"
description: "Separate the runnable starter from the database acceptance plan."
weight: 9
---

The command-line starter is complete when `wb check` accepts it and `wb run`
prints the verified 210-minute, 18,000-cent result. The later WORM version needs
additional boundary tests against a real temporary SQLite database.

| Given | When | Then |
|---|---|---|
| a new database | insert a customer | a generated ID is returned and can be read back |
| two time entries | create a draft invoice | two lines total 18,000 cents |
| a failure while creating a line | leave the transaction | invoice, lines, and links all roll back |
| two workers select one entry | both try to bill it | only one succeeds under the concurrency policy |
| the database is reopened | query the invoice | rate and amount snapshots remain unchanged |

Before this planned section becomes runnable, the WORM public API must be decided,
implemented, documented, and tested on Windows ARM64 and macOS ARM64. Until then,
use the implemented `Sqlite` Standard Library API with explicit SQL and parameter
binding. A few more lines are cheaper than pretending an API already exists.
