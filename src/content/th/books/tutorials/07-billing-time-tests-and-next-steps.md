---
title: "Tutorial 01 · ทดสอบและไปต่อ"
description: "ผลลัพธ์ที่คาดหวัง acceptance cases และเส้นแบ่งก่อนเรียกตัวอย่างว่ารันได้"
weight: 7
---

เมื่อ WORM implementation พร้อม โครงการบนฐานข้อมูลใหม่ควรให้ผลลัพธ์เทียบเท่านี้:

```text
schema: ready
project: Website refresh for Acme Studio
time logged: 210 minutes
invoice: #1 (2 lines)
invoice total: 18000 cents
billed entries: 2
```

ID อาจต่างกัน ข้อความข้างบนจึงเป็น **ผลลัพธ์ประกอบการออกแบบ** ไม่ใช่ log ที่จับจาก
โปรแกรมปัจจุบัน

## ชุดทดสอบแรกที่ควรมี

| Given | When | Then |
|---|---|---|
| ฐานข้อมูลใหม่ | insert customer | ได้ generated ID และอ่านกลับเป็นค่าเดิม |
| nullable field | update โดยไม่ระบุ field | ค่าของ field เดิมไม่เปลี่ยน |
| nullable field มีค่า | update ด้วย `Set... (Null)` | เขียน SQL NULL จริง |
| time entries สองรายการ | สร้าง draft invoice | ได้ 2 lines รวม 18,000 cents |
| เกิด error ระหว่างสร้าง line | ออกจาก transaction | invoice, lines และ links ถูก rollback ทั้งหมด |
| สอง worker เลือกรายการเดียวกัน | ทั้งคู่พยายามวางบิล | constraint หรือ concurrency policy ยอมให้สำเร็จเพียงครั้งเดียว |
| ปิดและเปิดฐานข้อมูลใหม่ | query invoice | snapshot rate และ amount ยังตรงเดิม |

การทดสอบควรใช้ temporary SQLite database จริงที่ boundary เพราะ fake ที่ตอบ “ครับ”
ทุกครั้งไม่ช่วยพิสูจน์ migration, constraint หรือ rollback

## เมื่อใด tutorial นี้จึงเปลี่ยนสถานะได้

ก่อนเปลี่ยนป้ายจาก Design tutorial เป็น Runnable tutorial ต้องมีอย่างน้อย:

1. syntax และ public API ของ WORM ผ่านการตัดสินใจและมี implementation
2. โครงการ compile ด้วย `wb` ที่ revision ระบุได้
3. acceptance cases ด้านบนผ่านบน Windows 11 ARM64 และ macOS ARM64
4. output และคำสั่งรันในหนังสือจับจากโปรแกรมจริง
5. link ไป API Reference ของ WORM แทนการอ้าง proposal

ระหว่างนี้ ผู้อ่านสามารถนำแนวคิดไปเขียนด้วย [SQLite Standard Library]({{< relref "/books/standard-library/sqlite.md" >}})
ที่มีอยู่แล้ว โดยใช้ SQL และ parameter binding ตรง ๆ จะยาวกว่าเล็กน้อย แต่เป็นความยาว
ที่ซื่อสัตย์และรันได้ ซึ่งดีกว่าความสั้นที่เกิดจากการแอบข้าม implementation
