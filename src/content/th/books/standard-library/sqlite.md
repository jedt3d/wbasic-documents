---
title: "SQLite"
weight: 60
---

สถานะ: **ผ่าน R5 ด้วย bundled SQLite และ real temporary databases**

## เปิดและสั่งงาน

```basic
Sqlite.Open(path As String) As Sqlite.Connection
connection.Execute(sql As String, parameters As Array Of Sqlite.Parameter = []) As Integer
connection.Query(sql As String, parameters As Array Of Sqlite.Parameter = []) As Sqlite.Rows
connection.BeginTransaction() As Sqlite.Transaction
connection.BackupTo(path As String, overwrite As Boolean = False)
connection.Close()
```

parameters สร้างด้วย `BindString`, `BindInteger`, `BindFloat`, `BindBytes` และ
`BindNull()` อย่าต่อค่าจากผู้ใช้เข้า SQL string; parameter binding ทั้งอ่านง่าย
และไม่เชิญ SQL injection มาร่วมโต๊ะอาหาร

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

typed getter ต้องตรงกับชนิดและ nullability; ไม่มีการเดาหรือ coercion เงียบ ๆ

## Transactions และ ownership

`Commit()`, `Rollback()` และ `Close()` อยู่บน `Sqlite.Transaction` หากออกจาก
`Using` โดยไม่ commit จะ rollback การทดสอบครอบคลุม native/external/automatic
rollback และ stale handles แล้ว Connection, Rows และ Transaction เป็น resources
ห้ามเก็บใน transferable Jobs model/input/output; เปิดและปิดภายใน worker แทน

SQLite ทำงานแบบ synchronous การใช้ใน TUI ต้องผ่าน Jobs และ cancellation มี
finite bound แต่ไม่ได้สัญญาว่าจะ rollback side effect ที่ฐานข้อมูลยืนยันไปแล้ว
