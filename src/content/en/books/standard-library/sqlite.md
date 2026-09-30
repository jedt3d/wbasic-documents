---
title: "SQLite"
weight: 60
---

Status: **Passed R5 with bundled SQLite and real temporary databases**

## Open and execute

```basic
Sqlite.Open(path As String) As Sqlite.Connection
connection.Execute(sql As String, parameters As Array Of Sqlite.Parameter = []) As Integer
connection.Query(sql As String, parameters As Array Of Sqlite.Parameter = []) As Sqlite.Rows
connection.BeginTransaction() As Sqlite.Transaction
connection.BackupTo(path As String, overwrite As Boolean = False)
connection.Close()
```

Construct parameters with `BindString`, `BindInteger`, `BindFloat`, `BindBytes`, and `BindNull()`. Do not concatenate user values into SQL strings. Parameter binding is easier to read and keeps SQL injection away from the dinner table.

```basic
Import Sqlite

Using db As Sqlite.Connection = Sqlite.Open("people.db")
  db.Execute("CREATE TABLE IF NOT EXISTS people(id INTEGER, name TEXT)")
  db.Execute("INSERT INTO people VALUES (?, ?)",
    [Sqlite.BindInteger(1), Sqlite.BindString("สมชาย")])
EndUsing
```

## Rows

```basic
rows.Read() As Boolean
rows.GetString(name) As String
rows.GetInteger(name) As Integer
rows.GetFloat(name) As Float
rows.GetBytes(name) As Array Of Byte
rows.GetStringOrNull(name) As String?
rows.GetIntegerOrNull(name) As Integer?
rows.GetFloatOrNull(name) As Float?
rows.GetBytesOrNull(name) As Array Of Byte?
rows.Close()
```

A typed getter must match the type and nullability; there is no silent guessing or coercion.

## Transactions and ownership

`Sqlite.Transaction` provides `Commit()`, `Rollback()`, and `Close()`. Leaving `Using` without committing rolls back. Tests cover native, external, and automatic rollback, and stale handles. Connection, Rows, and Transaction are resources and cannot be stored in transferable Jobs models, inputs, or outputs; open and close them inside the worker.

SQLite is synchronous. Use Jobs for TUI calls. Cancellation has a finite bound but does not promise to reverse side effects already committed to the database.
