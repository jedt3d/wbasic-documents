---
title: "Tutorial 01 · ออกแบบ model"
description: "หก Structure ความสัมพันธ์ และเหตุผลที่ database record ยังเป็น value ธรรมดา"
weight: 3
---

ตัวอย่างมีหก model แต่ละตัวเป็น `Structure` ธรรมดา การ map ลงฐานข้อมูลไม่ควรทำให้
ค่าหนึ่งก้อนแอบพก connection หรือยิง query เมื่อเราอ่าน field

```basic
[Worm.Table("customers")]
Structure Customer
  [Worm.PrimaryKey]
  [Worm.Generated]
  Id As Integer
  Name As String
  Email As String
EndStructure

[Worm.Table("time_entries")]
Structure TimeEntry
  [Worm.PrimaryKey]
  [Worm.Generated]
  Id As Integer
  ProjectId As Integer
  ServiceTypeId As Integer
  WorkDate As String
  Minutes As Integer
  Note As String
  RateCentsPerHour As Integer
  InvoiceId As Integer? = Null
EndStructure
```

Attributes ในวงเล็บเหลี่ยมเป็น **syntax ที่เสนอสำหรับ WORM** ส่วน `Structure`, field,
ชนิด nullable และค่า `Null` เป็นส่วนของภาษาที่มีแล้ว

## ความสัมพันธ์โดยใช้ ID

- `Project.CustomerId` ชี้ไปยังเจ้าของโครงการ
- `TimeEntry.ProjectId` และ `ServiceTypeId` บอกว่างานเกิดที่ไหนและคิดราคาแบบใด
- `TimeEntry.InvoiceId` เป็น `Null` จนกว่าจะนำไปวางบิล
- `InvoiceLine` เก็บทั้ง `TimeEntryId`, นาที, rate และยอดเงินจริง

การเก็บ snapshot ใน `InvoiceLine` ทำให้เอกสารทางการเงินอ่านได้จากข้อมูลของตัวเอง
ไม่ต้องหวังว่า record ต้นทางจะไม่มีใครแก้ตลอดกาล

## Generated ID กับ insert intent

`Customer.Id` เป็น `Integer` เพราะ customer ที่โหลดหรือ insert สำเร็จต้องมี ID แล้ว
แต่ตอน insert เรายังไม่มีค่า ดังนั้น WORM proposal ใช้ builder แยกชนิด:

```basic
Let customer As Customer = Worm.Insert(Of Customer)(db,
  Worm.New(Of Customer)()
    .SetName("Acme Studio")
    .SetEmail("accounts@acme.example"))
```

`Worm.New` เก็บ *เจตนาการ insert* และปล่อย field generated ว่างได้ `Worm.Insert`
จึงคืน `Customer` ที่สมบูรณ์ แนวคิดนี้ช่วยไม่ให้ model ทุกตัวต้องประกาศ ID เป็น nullable
เพียงเพราะมีช่วงสั้น ๆ ก่อนฐานข้อมูลสร้างค่าให้

อ่านต่อ: [เตรียม schema และข้อมูลเริ่มต้น]({{< relref "/books/tutorials/04-billing-time-schema-and-seed.md" >}})
