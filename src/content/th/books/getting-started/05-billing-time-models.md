---
title: "5 · Model ที่บันทึกลง SQLite"
description: "อ่าน Structure, ค่า Null และ mapping ของ Billing Time ฉบับฐานข้อมูล"
weight: 5
---

สี่บทแรกใช้โปรแกรมเล็กที่ผู้อ่านสร้างเอง ตั้งแต่บทนี้เราเปลี่ยนมาอ่าน [Billing Time ฉบับ SQLite ที่ดาวน์โหลดได้](https://jedt3d.github.io/wbasic-documents/downloads/billing-time-source.zip) ซึ่งเป็นแอปอีกชุดหนึ่ง มี module `Billing` และ schema ของตัวเอง Snapshot นี้ไม่ใช่ตัวอย่างที่รวมอยู่ใน Git tag ของ compiler

ใน [Models.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Models.wbas) มี `Structure` หกตัว: `Customer`, `Project`, `ServiceType`, `TimeEntry`, `Invoice` และ `InvoiceLine` ส่วน `DraftInvoice` รวบรวมผลการวางบิล ตัวอย่างหนึ่งคือ:

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

`InvoiceId` เป็น `Integer?`: รายการที่ยังไม่วางบิลเก็บ `Null` ได้ `RateCentsPerHour` เก็บอัตราตอนบันทึกงาน ดังนั้นการเปลี่ยนราคาบริการภายหลังไม่เปลี่ยนรายการเดิม `Version` ของแถวใช้ตรวจการแก้ไขชนกัน ส่วน mapping อยู่ใน [Domain.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Domain.wbas):

```basic
Procedure TimeMap() As Worm.Mapping Of TimeEntry
  Return Worm.Mapping(Of TimeEntry)("billing.time_entry", 1, "time_entries", "Id", "Version")
EndProcedure
```

เลข `1` เป็นรุ่นของนิยาม mapping ไม่ใช่ `Version` ของแถว Compiler 0.2.0 รายงาน WB301 เมื่อนิยาม `modelId` และรุ่นเดียวกันในโปรแกรมเดียวขัดกัน แต่ไม่ได้ตรวจ schema ที่มีอยู่ในฐานข้อมูลให้ตรงกับ mapping โดยอัตโนมัติ แอปจึงต้องจัดการ migration เอง

อ่านต่อ: [Schema และ migration]({{< relref "/books/getting-started/06-billing-time-schema-and-seed.md" >}})
