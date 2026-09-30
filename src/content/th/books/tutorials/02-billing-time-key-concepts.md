---
title: "Tutorial 01 · แนวคิดสำคัญ"
description: "สิ่งที่ควรรู้ก่อนอ่านโค้ด พร้อมลิงก์ไปยังคู่มือภาษาและ API ที่เกี่ยวข้อง"
weight: 2
---

เราไม่จำเป็นต้องจำทุก keyword ก่อนเริ่ม แต่ควรรู้ว่าแต่ละชิ้นรับผิดชอบอะไร ตารางนี้แยก
สิ่งที่ WBasic ทำได้แล้วออกจาก syntax ของ WORM ที่ยังเป็นข้อเสนอ

| แนวคิด | สิ่งที่พบในตัวอย่าง | อ่านรายละเอียด | สถานะ |
|---|---|---|---|
| Entry point และ arguments | `Procedure Main(args As Array Of String) As Integer` | [Entry point และเครื่องมือ]({{< relref "/books/language-reference/13-entry-tools-diagnostics.md" >}}) | Implemented |
| Value model | `Structure Customer`, `Project`, `TimeEntry` | [Structure และ value semantics]({{< relref "/books/language-reference/07-structures-value-semantics.md" >}}) | Implemented |
| ค่าที่อาจว่าง | `InvoiceId As Integer? = Null` | [Null safety]({{< relref "/books/language-reference/08-null-safety.md" >}}) | Implemented |
| ชุดข้อมูลและ loop | `Array Of TimeEntry`, `For Each` | [Collection และข้อความ Unicode]({{< relref "/books/language-reference/09-collections-unicode-strings.md" >}}) และ [Control flow]({{< relref "/books/language-reference/05-control-flow.md" >}}) | Implemented |
| อายุของ resource | `Using ... EndUsing` | [Error และอายุของ resource]({{< relref "/books/language-reference/10-errors-resource-lifetime.md" >}}) | Implemented |
| ฐานข้อมูลและ transaction | เปิด connection, query และ commit/rollback | [SQLite Standard Library]({{< relref "/books/standard-library/sqlite.md" >}}) | Implemented ที่ระดับ SQL API |
| Object mapping | `[Worm.Table]`, `Worm.New`, `Query`, `Change` | [ข้อเสนอ WORM ใน source repository](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/proposals/R6.5-worm-seaql-change-request-draft.md) | Planned |
| Migration จาก entity | `db.Migrations.Apply(...)` | [ข้อเสนอ WORM ใน source repository](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/proposals/R6.5-worm-seaql-change-request-draft.md) | Planned |

## อ่านคำว่า Implemented ให้พอดี

คำว่า Implemented ในตารางหมายถึงแนวคิดและ API ที่หน้าอ้างอิงซึ่งลิงก์ไปมีหลักฐานรองรับ ไม่ได้
ทำให้ code ทั้งตัวอย่างพร้อมรันโดยอัตโนมัติ เช่น `Using` ใช้ได้ และ SQLite transaction
ใช้ได้ แต่ชนิด `Worm.Database` ที่เอาสองอย่างมาห่อรวมกันยังไม่มี

API Reference ของ WORM จะเขียนเมื่อ public API ผ่านการตัดสินใจและมี implementation
ที่ทดสอบได้แล้ว ระหว่างนี้ proposal เป็นเอกสารออกแบบ ไม่ใช่คู่มือรับประกันพฤติกรรม

## กติกาทางธุรกิจสามข้อ

1. **เก็บเงินเป็นจำนวนเต็ม** — ตัวอย่างใช้ cents จึงไม่ปล่อย binary floating point
   เข้ามาเปลี่ยนเศษสตางค์ตอนเราหันหลัง
2. **บันทึกอัตราค่าบริการ ณ วันที่ทำงาน** — การแก้ราคาใน `ServiceType` ภายหลัง
   ไม่ควรเขียนประวัติของงานเก่าใหม่
3. **สร้าง invoice และผูกรายการเวลาใน transaction เดียวกัน** — หากขั้นใดล้มเหลว
   ฐานข้อมูลต้องไม่เหลือรายการที่ดูเหมือนวางบิลแล้วแต่ไม่มี invoice line

สำหรับงานจริงยังต้องกำหนด currency, rounding, tax, date/time, overflow และกฎการวางบิล
ซ้ำให้ครบ ตัวอย่างนี้หยุดตรงขอบเขตที่สอนได้อย่างซื่อสัตย์

อ่านต่อ: [ออกแบบ model เป็น Structure]({{< relref "/books/tutorials/03-billing-time-models.md" >}})
