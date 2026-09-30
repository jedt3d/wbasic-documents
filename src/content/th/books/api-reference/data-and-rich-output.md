---
title: "Data controls และ rich output"
weight: 30
---

สถานะ: **R7 groups 4–6 ผ่าน native/source gates; showcase ผ่าน R7 groups 7–8**

ผลนี้เป็นหลักฐานของ API และ workload ที่ระบุ ไม่ได้ประกาศให้ composite clauses
T13–T17, T21–T22 หรือ visual/font matrix ทั้งหมดผ่านตามไปด้วย

## List, Table และ Tree

Data controls รับ immutable bounded pages และ state ที่ application เป็นเจ้าของ
ตัวอย่าง Table ที่ใช้จริง:

```basic
Import Tui

Procedure PeopleTable() As Tui.Node
  Let columns As Array Of Tui.TableColumn = [
    Tui.TableColumn.Create("id", "ID", Tui.Size.Cells(5)),
    Tui.TableColumn.Create("name", "ชื่อ", Tui.Size.Cells(18))
  ]
  Let rows As Array Of Tui.TableRow = [
    Tui.TableRow.Create("person-1", ["1", "สมชาย"])
  ]
  Let page As Tui.TablePage = Tui.TablePage.Create(0, 1, rows)
  Let state As Tui.TableState = Tui.TableState.Create(0, Null, 1)
  Return Tui.Table.View("people", columns, page, state)
EndProcedure
```

`TableRow.Create(id, cells)` ใช้ stable row ID การ sort/filter/page loading เป็น
ข้อเสนอ event ให้ application ทำเอง งานหนักต้องไป Jobs frame painting เดินเฉพาะ
visible rows + overscan การทดสอบ 100,000 logical rows เก็บ page ไม่เกิน 40 rows
และ paint body ไม่เกิน 24 rows ใน workload ที่บันทึกไว้

Tree ใช้ `TreeIndex` ตรวจ duplicate IDs, missing parents และ cycles ตอนสร้าง;
expansion คำนวณ visible IDs นอก `View` และ snapshots รายงาน counts แทน serialize
index ทั้งต้น

## Rich output

implementation ปัจจุบันมี structured hyperlink, bounded log, chart,
notification, progress, spinner, Markdown subset และ Canvas

- hyperlinks ตรวจ URL/control sequences ก่อน render
- Markdown รองรับ headings, unordered bullets และ fenced code; inline emphasis
  และ links ยังเป็น literal
- animation tick เฉพาะเมื่อมี animated content และหยุดภายใต้ ReducedMotion
- Canvas เป็น local mutable resource; bounded writes เป็น transaction และ
  immutable snapshot ยังอยู่หลัง close แต่ Canvas/Node ไม่ใช่ Jobs payload
- cancellation composition ใช้ Button แล้วเรียก `Context.CancelJob`

```basic
Tui.Progress("export", completed, total)
Tui.StatusBar(["กำลังส่งออก"])
```

## TextMetrics

```basic
Tui.TextMetrics.GraphemeCount(text)
Tui.TextMetrics.CellWidth(text, profile)
Tui.TextMetrics.Measure(text, width, profile)
Tui.TextMetrics.Truncate(text, cells, profile)
Tui.TextMetrics.ScalarOffset(text, graphemeIndex)
```

profiles คือ Unicode17Narrow/Wide; input จำกัด 1 MiB และ Measure จำกัด 16,384
บรรทัดหรือ output 4 MiB ส่วน controls และ multiline input ที่ไม่เหมาะกับ API จะ
รายงาน error ไม่แกล้งนับเป็นหนึ่งช่อง รุ่นนี้ยังไม่มี Thai dictionary line breaking
ส่วน orphan combining mark แสดงด้วย dotted-circle presentation โดยไม่แก้
source/model string
