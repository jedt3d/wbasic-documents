---
title: "7 · บันทึกเวลาและเก็บอัตรา ณ เวลาที่บันทึก"
description: "อ่านการ insert ที่ระบุ field ชัดเจนและการคำนวณจำนวนเต็ม"
weight: 7
---

`Billing.LogTime` ใน [Domain.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Domain.wbas) บันทึก project, service, วันที่, นาที, note และอัตราปัจจุบันของ service ลง `TimeEntry` อัตราที่เก็บไว้กับรายการเป็นหลักฐานสำหรับการวางบิลภายหลัง:

```basic
changes = Worm.Set(Of TimeEntry)(changes, "Note", note)
changes = Worm.Set(Of TimeEntry)(changes, "RateCentsPerHour", service.RateCentsPerHour)
Using tx As Worm.Transaction = db.BeginTransaction()
  Let saved As TimeEntry = Worm.InsertReturning(Of TimeEntry)(tx, TimeMap(), changes)
  tx.Commit()
  Return saved
EndUsing
```

นี่เป็นเพียง **ส่วนหนึ่งของ procedure**; โค้ดเต็มตั้งค่าทุก field ที่จำเป็นก่อน insert โดยเว้น `Id` และ `Version` ให้ SQLite สร้าง แล้ว `InsertReturning` อ่านแถวที่บันทึกกลับมา การเว้น field กับการตั้งเป็น `Null` เป็นคนละเจตนา แต่ละรายการเวลาถูกบันทึกใน transaction ของตัวเอง

[Main.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/src/Main.wbas) บันทึกงาน Design 120 นาทีที่ 6,000 cents/hour และ Development 90 นาทีที่ 4,000 cents/hour สูตร `(minutes * rateCentsPerHour) Div 60` ให้ 12,000 + 6,000 = **18,000 cents** `ExactAmountCents` ปฏิเสธนาทีและอัตราติดลบ การคูณ `Integer` ตรวจ overflow และ `Div` ตัดเศษเมื่อหารไม่ลงตัว ตัวเลขในตัวอย่างหารลงตัวพอดี โปรแกรมนี้ยังไม่มีนโยบายสกุลเงิน ภาษี การตรวจวันที่ หรือการปัดเศษทางธุรกิจ

อ่านต่อ: [สร้าง invoice]({{< relref "/books/getting-started/08-billing-time-invoice-transaction.md" >}})
