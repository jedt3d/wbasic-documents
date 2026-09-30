---
title: "Tutorial 01 · โครงสร้าง Billing Time"
description: "ขอบเขตของตัวอย่าง โครงไฟล์ และสถานะของส่วนที่ใช้ได้จริงกับส่วนที่ยังออกแบบอยู่"
weight: 1
---

Billing Time เป็นโครงการตัวอย่างของผู้รับงานอิสระหนึ่งคน งานของมันมีเส้นเรื่องสั้น ๆ:
สร้างลูกค้าและโครงการ กำหนดค่าบริการ บันทึกเวลา แล้วรวมรายการที่ยังไม่วางบิลเป็น
draft invoice จุดประสงค์คือให้เราเห็น model และ transaction ในบริบทจริง โดยยังเล็กพอ
ที่จะอ่านจบก่อนระบบบัญชีขอประชุมกับเรา

> **สถานะของบท:** โค้ด WBasic ในบทนี้เป็น design mockup ภาษาแกนหลักมี implementation
> แล้ว และ SQLite API ผ่านการทดสอบใน R5 แต่ package `Worm` ยังไม่มีใน compiler/runtime
> ปัจจุบัน คำสั่งตัวอย่างจึงยังรันไม่ได้

## โครงสร้างโครงการ

ผังนี้ใช้ตัวอักษร ASCII เท่านั้นเพื่อให้อ่านตรงกันใน editor และ terminal:

```text
billing-time/
|-- billing-time.wproj
|-- README.md
|-- docs/
|   `-- QuickStart.md
`-- src/
    `-- Main.wbas
```

| ไฟล์ | หน้าที่ |
|---|---|
| `billing-time.wproj` | ตั้งชื่อโครงการ เลือก entry point และประกาศ dependency `Worm` ที่วางแผนไว้ |
| `src/Main.wbas` | เก็บ model, กฎคำนวณ และ walkthrough ทั้งเส้นเรื่องในไฟล์เดียวเพื่อให้อ่านง่าย |
| `docs/QuickStart.md` | บันทึกเจตนาเดิม ข้อจำกัด และผลลัพธ์ที่คาดหวัง |
| `README.md` | ป้ายหน้าตัวอย่าง โดยต้องบอกสถานะ “ยัง compile ไม่ได้” ให้เห็นทันที |

โครงการจริงควรแยก model, persistence และ business workflow ออกจากกันเมื่อมีมากกว่าหนึ่ง
use case ตัวอย่างแรกยังรวมไว้ใน `Main.wbas` เพราะบทเรียนต้องการให้สายตาเดินตามเรื่องได้
ก่อน การแบ่งไฟล์ที่ดีช่วยให้หาเรื่องเจอ การแบ่งสิบไฟล์ตั้งแต่นาทีแรกเพียงช่วยให้เราได้
ออกกำลังกายด้วยเมาส์

## ไฟล์โครงการ

```toml
# DESIGN MOCKUP: Worm does not exist in the current compiler.
[project]
name = "BillingTime"
module = "BillingTime"
entry = "src/Main.wbas"
toolchain = "0.0.1"

[dependencies]
Worm = { bundled = true }
```

ค่าภายใต้ `[project]` แสดงรูปแบบ manifest ที่โครงการตั้งใจใช้ `entry` ชี้ไปยัง
`Procedure Main(args As Array Of String) As Integer` ส่วน dependency ของ WORM ยังเป็น
ข้อเสนอ จึงไม่ควรคัดลอกไปใช้แล้วคาดว่า package resolver จะรู้จัก

อ่านต่อ: [แนวคิดสำคัญและแผนที่อ้างอิง]({{< relref "/books/tutorials/02-billing-time-key-concepts.md" >}})
