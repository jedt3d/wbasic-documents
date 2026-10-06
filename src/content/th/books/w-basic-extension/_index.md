---
title: "WBasic Extension Guide"
description: "คู่มือใช้ WBasic 0.2.0 กับ VS Code extension 0.3.0 ตั้งแต่ project ถึง editor, run, build และ test"
weight: -4
---

**เลือกเวอร์ชันที่เข้าคู่กัน** บทที่ 1–12 ใช้ compiler/runtime `0.2.0`, protocol `0.1.0` และ extension `wbasic-dev.wbasic@0.3.0` ของชุด private experimental ARM64 รุ่นเก่า `0.1.0`/extension `0.2.1` ยังเป็นประวัติ release แยกต่างหาก ไม่ใช่เครื่องมือสำหรับทำ E01–E10 ตามเล่มนี้ เริ่มที่ [คู่มือแพ็ก]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}})

คู่มือ development ปัจจุบัน สอนใช้ **WBasic Extension for VS Code** แบบลงมือทำจริง ตั้งแต่เปิด
workspace ว่าง สร้าง project แรก เขียน source ด้วย autocomplete และ diagnostics
ไปจนถึงจัดการ module, build โปรแกรม และรัน test ผ่าน Test Explorer

เราจะใช้ project เล็กชื่อ `MyFirstWBasic` เป็นเส้นเรื่องเดียวกันตลอดเล่ม ทุกบทมี
**ภารกิจฝึกมือ** และ **จุดตรวจ** เพื่อให้รู้ว่าทำสำเร็จจริง ไม่ใช่เพียงกดตามรูปแล้ว
หวังว่า compiler จะเห็นใจ

Extension 0.3.0 ผ่าน E01–E10 happy paths ใน VS Code 1.140.0 บน Windows 11 ARM64,
และการยกเลิก native test run ผ่าน Testing/Command Palette ซึ่งแสดงผลของ case ที่จบแล้ว
กับ case ที่ถูกขัดจังหวะแยกกัน ส่วน inline Run Test ผ่าน happy path แบบหนึ่ง case
Editor/protocol suites ผ่านบน Windows/macOS ARM64 ที่ source revision เดียวกัน
ผลนี้ไม่ใช่การตรวจ UI ทุก action บน Mac หรือ Linux เมื่อใช้ compiler, runtime assets
และ linker ที่เข้าคู่กัน การ Run และ Development Build ผ่านบน developer hosts;
fresh no-SDK host acceptance กับ production distribution ยังเปิดอยู่

เมื่อใช้ prerelease ที่เข้าคู่กัน ให้เริ่มที่ [เตรียม VS Code, extension และ compiler]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}})

