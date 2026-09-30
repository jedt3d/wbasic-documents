---
title: "6 · Schema และข้อมูลเริ่มต้น"
description: "เปิด SQLite อย่างมีขอบเขต ใช้ migration ชัดเจน และสร้างข้อมูลตั้งต้นแบบ typed"
weight: 6
---

> **สถานะ: Planned / ยัง compile ไม่ได้** — `Worm.*` ในบทนี้เป็น acceptance design
> ส่วน SQLite API ระดับ SQL มี implementation แล้วและลิงก์ไว้ท้ายบท

`Main` รับ path ของ SQLite จาก command line แล้วเปิดฐานข้อมูลภายใน `Using` เพื่อให้
resource ถูกปิดแม้ workflow จบด้วย error

```basic
Procedure Main(args As Array Of String) As Integer
  Using db As Worm.Database = Worm.OpenSqlite(args[0])
    db.Migrations.Apply("001_billing_time", [
      Worm.Entity(Of Customer)(), Worm.Entity(Of Project)(),
      Worm.Entity(Of ServiceType)(), Worm.Entity(Of TimeEntry)(),
      Worm.Entity(Of Invoice)(), Worm.Entity(Of InvoiceLine)()
    ])
    PrintLn("schema: ready")
    ' ...
  EndUsing
  Return 0
EndProcedure
```

ทั้ง `Worm.OpenSqlite`, `Worm.Entity` และ migration API ในตัวอย่างเป็น Planned
สัญญาที่ต้องรักษาคือ **การเปิด connection อย่างเดียวต้องไม่แก้ schema** การเปลี่ยน schema
ต้องผ่าน migration ที่มีชื่อ ลำดับ version/checksum และรายงาน failure ได้

## Seed ที่ไม่แกล้งเป็น idempotent

ตัวอย่างสร้างลูกค้า โครงการ และ service type ใหม่ทุกครั้ง เพราะต้องการเดินเรื่องให้สั้น:

```basic
Let project As Project = Worm.Insert(Of Project)(db,
  Worm.New(Of Project)()
    .SetCustomerId(customer.Id)
    .SetName("Website refresh"))

Let design As ServiceType = Worm.Insert(Of ServiceType)(db,
  Worm.New(Of ServiceType)()
    .SetName("Design")
    .SetRateCentsPerHour(6000))
```

จึงควรใช้ไฟล์ SQLite ใหม่ในการทดลอง การรันซ้ำกับไฟล์เดิมจะได้ข้อมูลเพิ่ม ไม่ใช่การ
update row เดิม ใน production ให้แยก migration, reference data และ sample fixture
ออกจากกันอย่างชัดเจน

หากต้องทำสิ่งเดียวกันด้วย API ที่มีอยู่วันนี้ ให้อ่าน [SQLite Standard Library]({{< relref "/books/standard-library/sqlite.md" >}}):
ใช้ `Sqlite.Open`, parameter binding และ SQL migration ที่เขียนตรง ๆ ก่อน WORM จะมี
หลักฐานพร้อมใช้งาน

อ่านต่อ: [บันทึกเวลาและคำนวณยอด]({{< relref "/books/getting-started/07-billing-time-log-time.md" >}})
