---
title: "2 · สร้างโครงการ Billing Time"
description: "วาง manifest, source tree และโปรแกรมแรกที่ compiler ปัจจุบันตรวจและรันได้"
weight: 2
---

สร้างโฟลเดอร์นี้ในพื้นที่ทำงานที่คุณเลือก:

```text
billing-time/
|-- BillingTime.wproj
`-- src/
    `-- Main.wbas
```

โครงการเริ่มต้นมีเพียงสองไฟล์ `BillingTime.wproj` บอก compiler ว่าชื่อโครงการคืออะไร
และ entry source อยู่ที่ไหน ส่วน `Main.wbas` เก็บโปรแกรม เราจะแยก module เพิ่มเมื่อมี
เหตุผลจากขนาดและความรับผิดชอบ ไม่ใช่เพราะโฟลเดอร์ว่างดูเหงา

## เขียน manifest

สร้าง `BillingTime.wproj`:

```toml
[project]
name = "BillingTime"
module = "BillingTime"
entry = "src/Main.wbas"
toolchain = "0.0.1"

[dependencies]
```

`entry` เป็น path ที่นับจากตำแหน่ง manifest ส่วน `[dependencies]` ยังว่างเพราะโปรแกรม
แรกใช้เฉพาะความสามารถแกนหลัก

## เขียนโปรแกรม

สร้าง `src/Main.wbas`:

```basic
Module BillingTime

Procedure ExactAmountCents(minutes As Integer, rateCentsPerHour As Integer) As Integer
  Return (minutes * rateCentsPerHour) Div 60
EndProcedure

Procedure Main(args As Array Of String) As Integer
  Let projectName As String = "Website refresh"
  If args.Length > 0 Then
    projectName = args[0]
  EndIf

  Let designMinutes As Integer = 120
  Let designRate As Integer = 6000
  Let developmentMinutes As Integer = 90
  Let developmentRate As Integer = 4000
  Let totalMinutes As Integer = designMinutes + developmentMinutes
  Let totalCents As Integer = ExactAmountCents(designMinutes, designRate) + ExactAmountCents(developmentMinutes, developmentRate)

  PrintLn("Billing Time")
  PrintLn("project: " + projectName)
  PrintLn("time logged: " + totalMinutes.ToString() + " minutes")
  PrintLn("draft total: " + totalCents.ToString() + " cents")
  Return 0
EndProcedure
```

ตัวอย่างฉบับเต็มอยู่ใน repository ที่ `examples/billing-time-cli` เนื้อหาเดียวกับในบทนี้
จึงใช้เป็น fixture ตรวจ compiler ได้โดยไม่ต้องคัดลอกโค้ดจากหน้าเว็บด้วยความหวังและ
สายตาที่เริ่มล้า

อ่านต่อ: [เดินชมภาษาในโปรแกรมนี้]({{< relref "/books/getting-started/03-billing-time-language-tour.md" >}})
