---
title: "5 · Model ที่รันได้จริง"
description: "อ่าน Structure และ mapping ของ Billing Time ที่ใช้กับ SQLite"
weight: 5
---

จากโครงการเล็กในบทก่อน เราจะอ่านตัวอย่าง [Billing Time WORM ฉบับเต็ม](https://github.com/jedt3d/wbasic-language/tree/143be58/examples/billing-time-worm) ซึ่งตรวจและรันกับ compiler 0.0.2 แล้ว ตัวอย่างใช้หก model: `Customer`, `Project`, `ServiceType`, `TimeEntry`, `Invoice` และ `InvoiceLine` โดยเก็บ `DraftInvoice` เป็นผลลัพธ์ของงานวางบิล

ใน [Models.wbas](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/modules/Billing.wmod/src/Models.wbas) แต่ละ model เป็น `Structure` ธรรมดา เช่น:

```basic
Public Structure TimeEntry
  Id As Integer
  Version As Integer
  ProjectId As Integer
  ServiceTypeId As Integer
  WorkDate As String
  Minutes As Integer
  Note As String
  RateCentsPerHour As Integer
  InvoiceId As Integer?
EndStructure
```

`InvoiceId` เป็น nullable เพราะรายการเวลาที่ยังไม่วางบิลไม่มี invoice ส่วน `RateCentsPerHour` เก็บราคา ณ วันที่บันทึกงาน แถวฐานข้อมูลมี `Version` สำหรับตรวจการแก้ไขชนกัน การ map ระบุใน procedure แยกจากค่า:

```basic
Procedure TimeMap() As Worm.Mapping Of TimeEntry
  Return Worm.Mapping(Of TimeEntry)("billing.time_entry", 1, "time_entries", "Id", "Version")
EndProcedure
```

เลข `1` ตรงนี้เป็นรุ่นนิยาม mapping ไม่ใช่ค่า `Version` ของแถว Compiler 0.0.2 ปฏิเสธนิยามต่างกันที่ใช้ `modelId` กับรุ่นเดียวกันในโปรแกรมเดียวด้วย WB301; ยังไม่ตรวจว่า schema ที่ค้างอยู่ในฐานข้อมูลตรงกับ mapping โดยอัตโนมัติ ดังนั้นการออกแบบ migration ยังเป็นหน้าที่แอป

อ่านต่อ: [Schema และ migration]({{< relref "/books/getting-started/06-billing-time-schema-and-seed.md" >}})
