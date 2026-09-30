---
title: "1 · เตรียม VS Code, extension และ compiler"
description: "ติดตั้ง development VSIX เชื่อม wb และตรวจว่า extension เห็น toolchain ที่ถูกต้อง"
weight: 1
---

บทแรกมีเป้าหมายเดียว: ทำให้ VS Code กับ `wb` รู้จักกันก่อนสร้าง project หากข้ามขั้นนี้
autocomplete บางส่วนอาจยังดูสุภาพเรียบร้อย แต่คำสั่ง compile จะยืนเงียบเหมือนอาจารย์
ที่ยังไม่ได้รับรายชื่อนักศึกษา

## สิ่งที่ต้องมี

- VS Code 1.137 หรือใหม่กว่า
- WBasic development VSIX ที่ตรงกับรอบ R8B
- `wb` และ static runtime ที่ build จาก revision เดียวกัน
- Native toolchain: MSVC ARM64 บน Windows หรือ Apple Clang บน macOS

รุ่นนี้เป็นเครื่องมือสำหรับพัฒนา ยังไม่ใช่ Marketplace release และยังไม่มี installer
สำหรับเครื่องสะอาดที่ไม่ติดตั้ง SDK

## ติดตั้ง VSIX

1. เปิดมุมมอง **Extensions** ใน VS Code
2. เปิดเมนู `…` ด้านบนของมุมมอง
3. เลือก **Install from VSIX…**
4. เลือกไฟล์ `wbasic-0.2.0.vsix`
5. เมื่อ VS Code ขอ reload ให้ reload หน้าต่าง

หลังติดตั้ง ให้เปิด Command Palette แล้วค้นหา `WBasic:` หากเห็นรายการอย่าง
**WBasic: New Project**, **WBasic: Show Toolchain Status** และ
**WBasic: Open v0.3 Specification** แสดงว่า extension activate แล้ว

## เชื่อม compiler

โดยปกติ extension ค้นหา `wb` ตามลำดับนี้:

1. ตำแหน่ง development toolchain ที่ extension จัดการ
2. debug build ใน repository ของ WBasic
3. `PATH` ของระบบ

ถ้าหาไม่พบ ให้เปิด Settings ค้นหา `WBasic: Compiler Path` แล้วใส่ absolute path
ของ `wb.exe` บน Windows หรือ `wb` บน macOS ห้ามใส่คำสั่ง shell หรือ argument ต่อท้าย
เพราะช่องนี้รับ path ของ executable เพียงค่าเดียว

เปิด Command Palette แล้วเลือก **WBasic: Show Toolchain Status** ผลที่พร้อมใช้งาน
ควรแสดง path, compiler version, development round และ native target ของเครื่องนี้

{{< guide-screenshot name="01-toolchain-status.png" alt="หน้าต่าง VS Code หลังเรียก WBasic: Show Toolchain Status โดยเห็น compiler path, version, development round และ native target แต่ไม่เห็นข้อมูลส่วนตัว" caption="ภาพที่ควรถ่าย: Toolchain Status หลังติดตั้ง VSIX และเชื่อม compiler สำเร็จ" >}}

## Workspace Trust

Syntax highlighting, Outline และสเปกที่มากับ extension เปิดอ่านได้ใน Restricted Mode
แต่การ check, run, build และ test จะทำงานเฉพาะ workspace ที่ trusted เพราะคำสั่งเหล่านี้
เรียก native compiler และอาจรันโปรแกรมของ project

ให้ trust เฉพาะโฟลเดอร์ที่คุณรู้ที่มา หากคำสั่ง compile ไม่ปรากฏทั้งที่ toolchain พร้อม
ให้ตรวจ Workspace Trust ก่อนแก้ setting ไปเรื่อย ๆ

## จุดตรวจ

- [ ] Extension แสดงเป็น `WBasic`
- [ ] Command Palette พบคำสั่ง `WBasic:`
- [ ] **Show Toolchain Status** รายงานสถานะพร้อมและ target ตรงกับเครื่อง
- [ ] Workspace ที่จะใช้ฝึกเป็น trusted

อ่านต่อ: [สร้าง project แรก]({{< relref "/books/w-basic-extension/02-create-first-project.md" >}})

