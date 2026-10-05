---
title: "SQLite：データベース操作"
weight: 60
---

状態: **同梱の SQLite と実際の一時データベースを使い、R5 の検証に合格**

## 開いて実行する

```basic
Sqlite.Open(path As String) As Sqlite.Connection
connection.Execute(sql As String, parameters As Array Of Sqlite.Parameter = []) As Integer
connection.Query(sql As String, parameters As Array Of Sqlite.Parameter = []) As Sqlite.Rows
connection.BeginTransaction() As Sqlite.Transaction
connection.BackupTo(path As String, overwrite As Boolean = False)
connection.Close()
```

パラメーターは `BindString`、`BindInteger`、`BindFloat`、`BindBytes`、`BindNull()` で作ります。ユーザー入力を SQL 文字列に連結しないでください。パラメーター束縛は読みやすく、SQL インジェクションも防ぎます。

```basic
Import Sqlite

Using db As Sqlite.Connection = Sqlite.Open("people.db")
  db.Execute("CREATE TABLE IF NOT EXISTS people(id INTEGER, name TEXT)")
  db.Execute("INSERT INTO people VALUES (?, ?)",
    [Sqlite.BindInteger(1), Sqlite.BindString("สมชาย")])
EndUsing
```

## 行

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

型付きの取得関数は列の型と Null 許容性に一致しなければなりません。暗黙の推測や型変換はありません。

## トランザクションと所有権

`Sqlite.Transaction` は `Commit()`、`Rollback()`、`Close()` を提供します。コミットせず `Using` を抜けるとロールバックします。テストではネイティブ側、外部からの終了、自動のロールバックと古いハンドルを検査します。Connection、Rows、Transaction はリソースであり、転送可能な Jobs のモデル・入力・出力に格納できません。ワーカー内で開閉してください。

SQLite は同期式です。TUI から呼ぶ場合は Jobs を使ってください。キャンセルには有限の時間制限がありますが、データベースにコミット済みの副作用は取り消せません。
