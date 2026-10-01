---
title: "4 · ตรวจ Compile และรันจาก command line"
description: "ใช้ project-info, check, run และ emit-object กับโครงการที่สร้างจริง"
weight: 4
---

เปิด terminal ที่หา `wb` และ runtime ที่เข้าคู่กันเจอ แล้วกำหนด path ของ manifest
ในตัวอย่างต่อไปนี้ คำสั่งใช้ได้เหมือนกันทั้ง PowerShell และ shell ทั่วไปเมื่อใส่ path
ให้ถูกตามระบบ

## 1. ตรวจว่า compiler เห็นโครงการอย่างไร

```console
wb project-info billing-time/BillingTime.wproj --json
```

ผลลัพธ์บอกชื่อโครงการ, entry point, source และ dependency ที่ resolver มองเห็น JSON นี้
เหมาะกับการตรวจโครงสร้างและให้เครื่องมืออื่นอ่านต่อ

## 2. ตรวจ source โดยยังไม่รัน

```console
wb check billing-time/BillingTime.wproj --json
```

ถ้าโปรแกรมถูกต้อง process จะจบด้วย exit code `0` และ `accepted` เป็น `true` หากผิด
diagnostic จะบอก stage, code และตำแหน่งใน source การตรวจนี้เร็วและไม่สร้างโปรแกรมถาวร

## 3. Compile, link และรัน

```console
wb run billing-time/BillingTime.wproj -- "Website refresh"
```

หลัง `--` คือ argument ของโปรแกรม ค่าแรกกลายเป็น `args[0]` ผลลัพธ์ควรเป็น:

```text
Billing Time
project: Website refresh
time logged: 210 minutes
draft total: 18000 cents
```

`wb run` สร้าง object, link กับ WBasic runtime ผ่าน native toolchain แล้วรัน executable
ชั่วคราว หาก runtime ไม่ได้อยู่ตำแหน่งมาตรฐาน ใช้ `--runtime <path>`

## 4. เมื่อต้องการ object file

```console
wb emit-object billing-time/BillingTime.wproj --output BillingTime.obj
```

บน macOS นิยมตั้งชื่อปลายทาง `.o` คำสั่งนี้หยุดหลังสร้าง object การ link executable
ยังเป็นความรับผิดชอบของ caller และต้องใช้ runtime ที่ตรงรุ่น จนกว่า distribution workflow
จะมีสัญญาที่เสถียร ให้ใช้ `wb run` เป็นทางเริ่มต้นที่สั้นและตรวจสอบได้

หากต้องการ binary แยก ใช้ `wb build billing-time/BillingTime.wproj --output BillingTime`
(บน Windows ตั้งชื่อ output เป็น `.exe`) คำสั่งนี้รับ project manifest บทถัดไปจะอ่าน
ตัวอย่าง WORM/SQLite อีกโครงการหนึ่งที่รันได้จริง

อ่านต่อ: [ออกแบบ model สำหรับ Billing Time]({{< relref "/books/getting-started/05-billing-time-models.md" >}})
