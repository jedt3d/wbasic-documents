---
title: "Tutorials"
description: "เรียน WBasic ผ่านโครงการตัวอย่าง ตั้งแต่โครงไฟล์ไปจนถึงเหตุผลของโค้ดแต่ละส่วน"
weight: 5
---

หนังสือเล่มนี้ใช้หนึ่งโครงการต่อหนึ่ง tutorial แล้วค่อย ๆ เปิดดูตั้งแต่โครงสร้างไฟล์
แนวคิดสำคัญ ไปจนถึง code walkthrough แต่ละหน้าอ่านต่อกันได้ และใช้เป็นแผนที่กลับไปหา
คู่มือภาษา, Standard Library และ API Reference เมื่อต้องการรายละเอียดที่เป็นสัญญา
ของ implementation

## Tutorial 01 · Billing Time

สร้างระบบเล็กสำหรับเก็บลูกค้า โครงการ ประเภทงาน เวลา และ draft invoice ตัวอย่างนี้
สอนเรื่อง value model, nullable field, เงินแบบจำนวนเต็ม, SQLite และ transaction

> **สถานะ: Design tutorial** — ส่วนภาษาและ SQLite ที่ลิงก์ไว้มี implementation แล้ว
> แต่ `Worm.*` เป็น API ในข้อเสนอ WORM ซึ่งใช้ R6.5 เป็นชื่อทำงาน และยังไม่มี
> implementation จึง compile ไม่ได้ใน `wb` ปัจจุบัน หนังสือจงใจเก็บตัวอย่างนี้ไว้
> เป็น acceptance design ไม่แกล้งทำเป็น demo ที่ผ่านแล้ว

เริ่มที่ [ภาพรวมและโครงสร้างโครงการ]({{< relref "/books/tutorials/01-billing-time-project-structure.md" >}})

Tutorial ถัดไปจะเพิ่มภายหลัง เมื่อมีตัวอย่างที่ควรสอนและมีหลักฐานรองรับเพียงพอ
หนังสือไม่แข่งกันยาวกับ roadmap—roadmap วิ่งเร็วกว่าหนังสืออยู่แล้ว และมักไม่ใส่รองเท้า
