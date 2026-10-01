---
title: "WBasic Extension Guide"
description: "คู่มือจับมือใช้ WBasic บน VS Code ตั้งแต่สร้าง project จนถึง run, build, test และจัดการ module"
weight: -4
---

**เลือกเวอร์ชันที่เข้าคู่กัน** บทที่ 1–12 อธิบาย private experimental prerelease ของ compiler/runtime `0.1.0` คู่กับ extension `wbasic-dev.wbasic@0.2.1` และ protocol package `0.0.2` ZIP สำหรับ Windows/macOS ARM64 และ VSIX ในแพ็กเผยแพร่แล้ว และมีการดาวน์โหลดตรวจ hash ซ้ำกับ sealed source เริ่มที่ [คู่มือแพ็ก]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) แพ็ก private `0.0.2` เดิมมี extension `0.1.0` ซึ่งใช้ project editor workflow ในบทที่ 1–12 ไม่ได้

คู่มือ development ปัจจุบัน สอนใช้ **WBasic Extension for VS Code** แบบลงมือทำจริง ตั้งแต่เปิด
workspace ว่าง สร้าง project แรก เขียน source ด้วย autocomplete และ diagnostics
ไปจนถึงจัดการ module, build โปรแกรม และรัน test ผ่าน Test Explorer

เราจะใช้ project เล็กชื่อ `MyFirstWBasic` เป็นเส้นเรื่องเดียวกันตลอดเล่ม ทุกบทมี
**ภารกิจฝึกมือ** และ **จุดตรวจ** เพื่อให้รู้ว่าทำสำเร็จจริง ไม่ใช่เพียงกดตามรูปแล้ว
หวังว่า compiler จะเห็นใจ

Extension รุ่นที่หนังสืออ้างอิงคือ development payload ที่ตรวจแล้ว `wbasic-dev.wbasic@0.2.1`
ทดสอบกับ VS Code 1.139.1 บน Windows 11 ARM64 และ 1.140.0 บน macOS ARM64
เมื่อใช้ compiler, runtime assets และ linker ที่เข้าคู่กันในแพ็ก การ Run และ Development Build ไม่ต้องใช้ SDK ของ host แต่การ build จาก source ยังต้องใช้ native SDK ส่วน fresh no-SDK host acceptance และ production distribution ยังเปิดอยู่

เมื่อใช้ prerelease ที่เข้าคู่กัน ให้เริ่มที่ [เตรียม VS Code, extension และ compiler]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}})

