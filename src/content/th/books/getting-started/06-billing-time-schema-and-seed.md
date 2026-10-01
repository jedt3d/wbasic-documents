---
title: "6 · Schema และ migration"
description: "เปิดฐานข้อมูลอย่างชัดเจนและบันทึก migration ในแอป"
weight: 6
---

[App.wproj](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/App.wproj) ใช้ `toolchain = "0.0.2"`, `Worm = { bundled = true }` และ module `Billing` แบบ local path โค้ด [Main.wbas](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/src/Main.wbas) รับ path ฐานข้อมูลหนึ่งค่า เปิด SQLite แล้วเรียก migration เอง:

```basic
Using db As Worm.Database = Worm.OpenSqlite(args[0])
  Billing.ApplyMigration(db)
```

`Worm.OpenSqlite` ไม่สร้าง schema ให้เอง [Domain.wbas](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/modules/Billing.wmod/src/Domain.wbas) เก็บข้อความ SQL ของ migration ชื่อ `001_billing_time` ใน `schema_migrations` และรัน DDL เจ็ดคำสั่งใน transaction หากชื่อเดิมมี SQL ต่างจากเดิม จะรายงาน `Billing.MigrationChanged` ข้อความที่ใช้มี LF ปิดท้ายและสะท้อนใน [schema.sql](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/schema.sql) นี่เป็น procedure ของแอป ไม่ใช่ migration framework ทั่วไป

หลัง migration, `Main` เรียก `Billing.CreateCustomer`, `CreateProject` และ `CreateService` ตัวอย่างตั้งใจเพิ่มข้อมูลใหม่ทุกครั้งที่รัน ไฟล์เดิมจึงได้โครงการและ invoice เพิ่ม ไม่ใช่การ seed แบบ idempotent การทดลองครั้งแรกควรใช้ SQLite path ใหม่

อ่านต่อ: [บันทึกเวลา]({{< relref "/books/getting-started/07-billing-time-log-time.md" >}})
