---
title: "3 · เดินชม workspace และ manifest"
description: "อ่าน App.wproj, Outline และ Projects view ให้เข้าใจก่อนเริ่มเขียนโปรแกรม"
weight: 3
---

> **ขอบเขตเวอร์ชัน — private v0.1.0 prerelease** ขั้นตอนนี้ใช้ private experimental compiler/runtime `0.1.0` ที่เผยแพร่แล้ว คู่กับ extension `wbasic-dev.wbasic@0.2.1` ในแพ็ก และ protocol package `0.0.2` จาก sealed source `3901cf17` เริ่มที่ [คู่มือแพ็กที่เข้าคู่กัน]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) แพ็ก private compiler `0.0.2` เดิมมี extension `0.1.0` และไม่มี project editor workflow เหล่านี้

เปิด `App.wproj` โครงพื้นฐานมีหน้าตาประมาณนี้:

```toml
[project]
name = "MyFirstWBasic"
module = "MyFirstWBasic"
entry = "src/Main.wbas"
toolchain = "0.1.0"

[dependencies]
```

`name` คือชื่อ project ที่แสดงต่อผู้ใช้ `module` คือ namespace หลัก และ `entry` เป็น path
ที่นับจาก manifest `toolchain` ผูก project กับ contract ของเครื่องมือที่รองรับ

## เครื่องมือที่ช่วยอ่าน manifest

- **Syntax highlighting** แยก section, key, string และ comment
- **Outline** แสดง section กับ key เพื่อกระโดดไปตำแหน่งที่ต้องการ
- **Completion** เสนอเฉพาะ key ของ `.wproj` หรือ `module.toml` ตามบริบท
- **Hover** อธิบายหน้าที่ของ key และ dependency path
- **WBasic Projects** สรุปข้อมูลที่ compiler อ่านได้จริง

สีใน editor เป็น lexical hint เท่านั้น หากสะกด path ผิดแต่ยังมีสีสวย compiler ก็ยังมี
สิทธิ์ปฏิเสธ ความสวยงามไม่ใช่ type system

Completion เสนอ key ของ manifest และ path ของ local dependency ที่ใช้ได้ แต่ยังต้องใช้ **Check Project** ตรวจ project ที่บันทึกแล้วกับ compiler จริง

## ตรวจ project ครั้งแรก

เปิด Command Palette แล้วเลือก **WBasic: Check Project** คำสั่งนี้ตรวจ manifest,
source, module และ dependency ที่บันทึกลง disk แล้ว รายการปัญหาจะใช้ problem matcher
พากลับไปยังไฟล์ บรรทัด คอลัมน์ และ diagnostic code

สำหรับ source ที่กำลังแก้แต่ยังไม่ save ใช้ live diagnostics หรือ
**WBasic: Check Active Source** คำสั่งหลังส่งข้อความใน editor ตรงไปยัง compiler แต่ตรวจ
แบบ source เดี่ยว จึงไม่แทน **Check Project** เมื่อโปรแกรมใช้ Import หรือหลาย module

## เปลี่ยน profile เริ่มต้น

Setting `wbasic.defaultProfile` มีค่า `debug` หรือ `release` ค่าเริ่มต้น `debug` เหมาะกับ
วงจรแก้–รัน ส่วน `release` ใช้เมื่ออยากตรวจพฤติกรรมตาม release profile ที่ compiler
รองรับ ไม่ได้เปลี่ยน Development Build ให้กลายเป็น production distribution

## จุดตรวจ

- [ ] Outline ของ manifest แสดง `[project]` และ `[dependencies]`
- [ ] Hover บน `entry` อธิบาย path
- [ ] Check Project จบโดยไม่มี error
- [ ] รู้ความต่างระหว่าง Check Active Source กับ Check Project

อ่านต่อ: [เขียนโปรแกรมด้วย language intelligence]({{< relref "/books/w-basic-extension/04-write-with-language-intelligence.md" >}})

