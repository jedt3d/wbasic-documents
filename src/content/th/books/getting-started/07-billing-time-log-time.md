---
title: "7 · บันทึกเวลาและราคา"
description: "เก็บ rate snapshot และคำนวณยอดด้วย integer arithmetic ที่ตรวจสอบเหตุผลได้"
weight: 7
---

> **สถานะ: Planned / ยัง compile ไม่ได้** — การคำนวณจำนวนเต็มใช้ได้จริง แต่
> `Worm.Insert` และ mapper ที่ล้อมตัวอย่างยังเป็น acceptance design

เมื่อบันทึกงาน ตัวอย่างคัดลอก rate จาก `ServiceType` ลง `TimeEntry` ด้วย หากเดือนหน้า
เราเปลี่ยนราคา Design จาก 60 เป็น 75 ดอลลาร์ต่อชั่วโมง งานของเดือนนี้ยังคงราคาเดิม

```basic
Let sketch As TimeEntry = Worm.Insert(Of TimeEntry)(db,
  Worm.New(Of TimeEntry)()
    .SetProjectId(project.Id)
    .SetServiceTypeId(design.Id)
    .SetWorkDate("2026-09-28")
    .SetMinutes(120)
    .SetNote("Homepage sketches")
    .SetRateCentsPerHour(design.RateCentsPerHour))
```

ตัวอย่างมีงานสองรายการ:

| บริการ | นาที | rate (cents/hour) | ยอด (cents) |
|---|---:|---:|---:|
| Design | 120 | 6,000 | 12,000 |
| Development | 90 | 4,000 | 6,000 |
| **รวม** | **210** | | **18,000** |

## คำนวณแบบตรงไปตรงมา

```basic
Procedure ExactAmountCents(minutes As Integer, rateCentsPerHour As Integer) As Integer
  Return (minutes * rateCentsPerHour) Div 60
EndProcedure
```

ตัวเลขของ tutorial หาร 60 ลงตัว จึงได้ยอดแน่นอน แต่ชื่อ `ExactAmountCents` ไม่ใช่
ใบอนุญาตให้ใช้สูตรนี้กับทุกธุรกิจ งานจริงต้องกำหนดว่าเศษนาทีปัดอย่างไร ตรวจ overflow
ตรงไหน ใช้สกุลเงินใด และคิดภาษีเมื่อใด

`WorkDate` ยังเป็น `String` เพื่อไม่ดึงเรื่องวัน เวลา และเขตเวลาเข้ามากลางบทเรียน
นี่เป็นการลดขอบเขตของตัวอย่าง ไม่ใช่คำแนะนำให้ระบบออก invoice จริงเก็บวันที่เป็นข้อความ
ตลอดไป

อ่านต่อ: [สร้าง draft invoice ใน transaction]({{< relref "/books/getting-started/08-billing-time-invoice-transaction.md" >}})
