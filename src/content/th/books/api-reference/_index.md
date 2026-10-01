---
title: "คู่มือ API"
description: "signature และสัญญาการทำงานของ API สาธารณะ แยกตาม module"
weight: 3
---

ส่วนนี้เตรียมไว้สำหรับค้นหา API แบบเจาะจง แต่ละหน้าจะระบุชนิด parameter,
ค่าคืน, error, ข้อจำกัดของ platform และสถานะการตรวจสอบ เนื้อหาจะเพิ่มจาก API
ที่ merge และผ่านการทดสอบแล้วเท่านั้น

สถานะ behavior catalog ณ จุดรวม R6 คือ 72 Passed, 23 Planned และ 0 Deferred
หน้าที่กล่าวว่า API “ผ่าน” หมายถึงผ่าน gate รายกลุ่มบน Windows 11 ARM64 และ macOS
ARM64 ตาม revision ที่บันทึกไว้ ไม่ได้หมายความว่า composite acceptance ทุกข้อผ่านแล้ว

## สารบัญ

1. [TUI model loop และ effects](tui-model-loop.md)
2. [Layout, navigation และ forms](layout-navigation-forms.md)
3. [Data controls และ rich output](data-and-rich-output.md)
4. [Jobs](jobs.md)
5. [Tui.Test และ doctor](testing-and-doctor.md)
6. [Terminal lifecycle และข้อจำกัดแพลตฟอร์ม](terminal-lifecycle.md)

หน้ากลุ่ม widget อธิบาย implementation ที่ผ่าน native examples และ round gates
รายกลุ่มแล้ว แต่ไม่ใช้แทนการประกาศว่า composite clauses ทุกข้อใน behavior
catalog ผ่านทั้งหมด—คำว่า “มี API” กับ “ผ่านทุก terminal บนโลก” เป็นคนละประโยค

Positive OSC52 read ผ่านบน Microsoft ConPTY รุ่นที่ pin และแยกทดสอบแล้ว แต่การส่งต่อ
บน inbox/default host เดิมยังไม่มีหลักฐาน ส่วน Linux ARM64, native x86_64
และ fresh-host no-SDK packaging ยังไม่ผ่าน acceptance ห้ามอนุมานสถานะ
เหล่านี้จากผลบน Windows/macOS ARM64
