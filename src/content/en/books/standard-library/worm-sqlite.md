---
title: "WORM SQLite Experimental"
weight: 80
---

**Status:** Bounded API in WBasic `0.0.2`, with native Windows/macOS ARM64 gates through M5 in the [recorded evidence](https://github.com/jedt3d/wbasic-language/blob/143be58/docs/evidence/worm-m5-m7-2026-10-02.json). SQLite is the only verified provider. This is neither a general ORM API nor production acceptance.

## Mapping and write intent

`Worm.OpenSqlite(path As String) As Worm.Database` opens a database but does not create or migrate application schema. `Worm.Mapping(Of T)(modelId As String, version As Integer, table As String, key As String, versionField As String)` maps a public flat `Structure` to a table with literal qualified model ID, version, table, key, and version field. Supported fields are `Integer`, `Byte`, `Boolean`, `Float`, `String`, and nullable forms of those scalars. Metadata limits are 256 fields, 100,000 rows, and 999 parameters.

Across all source modules compiled into one program, a given `(modelId, version)` must identify the same Structure, field layout, table, and key/version policy. Identical declarations may repeat; a contradiction produces `WB301` at the model ID literal **before database I/O**. A new mapping version neither validates existing schema nor migrates data. Mapping version is distinct from a row's optimistic `Version` value.

`Worm.NewChanges(Of T)()` creates a request with every field omitted. `Worm.Set(Of T)(changes, "Field", value)` returns a new request, so retain the returned value. The compiler checks literal field names and types. An omitted insert field uses the database default; explicit `Null` writes SQL NULL only for a nullable field. A Structure default or `String?` alone does not convey write intent.

## Queries and transactions

`Worm.Select(Of T)()` creates a query description without I/O. `Equal`, `GreaterThan`, `IsNull`, `IsNotNull`, `OrderBy`, and `Limit` add checked literal fields and bound values. `Worm.All` executes a query and returns complete models; `Worm.Project` returns a separate projection Structure. `Worm.RawAll` executes bound SQL on the same transaction and checks result column names, order, and scalar types.

`db.BeginTransaction()` starts a SQLite DEFERRED transaction; the first write acquires the writer lock. Edit ordinary drafts and check business rules before opening it, then pass one `Worm.Transaction` through every save step. `Worm.Insert`, `InsertReturning`, and `Update` execute within that transaction. `InsertReturning` returns actual generated values but does not prove durability until `Commit()` succeeds. Leaving `Using` without commit attempts rollback; there is no implicit commit.

`Worm.Update(tx, mapping, changes, key, expectedVersion)` atomically checks and increments the version. A missing matching row reports `Worm.Conflict` and makes the transaction `Failed`, so it cannot commit. `Busy` is distinct; open a new transaction and reread before deciding to retry. A confirmed rejected commit is `Failed`; a dispatched commit with uncertain outcome is `Unknown`. Do not claim rollback or blindly retry the write. Before close, `tx.State()` returns `Active`, `Failed`, `Committed`, `RolledBack`, or `Unknown`; after close, every alias reports `Worm.ResourceClosed`.

WORM database and transaction handles are resources and cannot cross Jobs. A worker opens and closes them; the UI may pass ordinary draft/request/result values. The R5 `Sqlite.Connection` is a separate resource even for the same database file. This version has no relations, savepoints, migration API, PostgreSQL/MariaDB, or persistent schema identity check. See the [compiler metadata](https://github.com/jedt3d/wbasic-language/blob/143be58/crates/wb-compiler/src/worm_metadata.rs) and [runnable example](https://github.com/jedt3d/wbasic-language/tree/143be58/examples/worm).
