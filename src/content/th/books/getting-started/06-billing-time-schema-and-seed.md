---
title: "6 · Schema และ migration"
description: "เปิด SQLite และใช้ migration ที่แอประบุอย่างชัดเจน"
weight: 6
---

[billing-time.wproj](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/billing-time.wproj) ระบุ `toolchain = "0.1.0"`, `Worm = { bundled = true }` และ module `Billing` แบบ local path โปรแกรม [Main.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/src/Main.wbas) รับ path ฐานข้อมูลได้ไม่เกินหนึ่งค่า ถ้าไม่ส่งจะใช้ `billing-time-demo.sqlite` ใน working directory ปัจจุบัน; path ว่างหรือ argument เกินหนึ่งค่าคืน error ก่อนเปิด SQLite

หลังเปิดฐานข้อมูล `Main` เรียก migration เอง:

```basic
Using db As Worm.Database = Worm.OpenSqlite(databasePath)
  Billing.ApplyMigration(db)
```

`Worm.OpenSqlite` ไม่สร้าง schema ให้ [Domain.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Domain.wbas) สร้างตาราง `schema_migrations`, รัน DDL เจ็ดคำสั่งทีละคำสั่งใน transaction เดียว และบันทึก SQL ที่ต่อด้วย LF ภายใต้ชื่อ `001_billing_time` ถ้าพบชื่อเดิมแต่ข้อความต่างกัน จะคืน `Billing.MigrationChanged` นี่คือ migration เฉพาะแอป ไม่ใช่ framework ทั่วไป

[schema.sql](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/schema.sql) เป็นไฟล์ประกอบให้อ่านโครงสร้างตาราง ไม่ใช่สคริปต์ที่ส่งเข้า `Worm.Execute` ทั้งไฟล์ เพราะ `Execute` รับ prepared statement ครั้งละหนึ่งคำสั่ง ให้ใช้ `Billing.ApplyMigration` ซึ่งแยกคำสั่งไว้ใน `SchemaStatements()` และบันทึกข้อความที่แอปใช้จริง

หลัง migration, `Main` เพิ่ม customer, project และ service ใหม่ทุกครั้งที่รัน การใช้ไฟล์เดิมจึงเพิ่มข้อมูล ไม่ใช่ seed แบบรันซ้ำแล้วได้ฐานข้อมูลเดิม ลองครั้งแรกกับ path SQLite ใหม่เพื่ออ่านผลได้ง่าย

อ่านต่อ: [บันทึกเวลา]({{< relref "/books/getting-started/07-billing-time-log-time.md" >}})
