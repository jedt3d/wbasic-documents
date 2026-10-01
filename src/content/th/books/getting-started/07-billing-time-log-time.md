---
title: "7 · บันทึกเวลาและราคา"
description: "ดู insert intent และราคา snapshot จาก source ที่รันได้"
weight: 7
---

`Billing.LogTime` บันทึก project, service, วันที่, นาทีและ note พร้อมคัดลอก rate ของ service ลง `TimeEntry` จึงไม่เปลี่ยนยอดย้อนหลังเมื่อแก้ราคาบริการในอนาคต ตัวอย่างใน [Domain.wbas](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/modules/Billing.wmod/src/Domain.wbas) สร้างเจตนาการ insert อย่างชัดเจน:

```basic
changes = Worm.Set(Of TimeEntry)(changes, "Note", note)
changes = Worm.Set(Of TimeEntry)(changes, "RateCentsPerHour", service.RateCentsPerHour)
Using tx As Worm.Transaction = db.BeginTransaction()
  Let saved As TimeEntry = Worm.InsertReturning(Of TimeEntry)(tx, TimeMap(), changes)
  tx.Commit()
  Return saved
EndUsing
```

ข้อความนี้เป็น **ส่วนตัดจาก procedure**; source เต็มกำหนด field ที่ต้องใช้ทั้งหมดก่อน insert `Id` และ `Version` ถูกละไว้ให้ SQLite สร้างและคืนค่าผ่าน `InsertReturning` การละ field กับการกำหนด `Null` เป็นคนละเจตนา

[Main.wbas](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/src/Main.wbas) บันทึก Design 120 นาทีที่ 6,000 cents/hour และ Development 90 นาทีที่ 4,000 cents/hour สูตร `(minutes * rateCentsPerHour) Div 60` ให้ 12,000 + 6,000 = **18,000 cents** `ExactAmountCents` ปฏิเสธค่าติดลบและการคูณ `Integer` มี overflow check ตัวเลขตัวอย่างหารลงตัว; ไม่มีนโยบายภาษี สกุลเงิน การตรวจวันที่ หรือการปัดเศษทางธุรกิจครบถ้วน

อ่านต่อ: [สร้าง invoice]({{< relref "/books/getting-started/08-billing-time-invoice-transaction.md" >}})
