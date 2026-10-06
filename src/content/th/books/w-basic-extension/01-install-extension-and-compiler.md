---
title: "1 · เตรียม VS Code, extension และ compiler"
description: "ติดตั้ง VSIX 0.3.0 เชื่อม wb 0.2.0 และตรวจว่า extension เห็น toolchain ที่ถูกต้อง"
weight: 1
---

> **ขอบเขตเวอร์ชัน — ชุด private experimental 0.2.0** คู่มือนี้ใช้ compiler/runtime `0.2.0`, protocol `0.1.0` และ VS Code extension `0.3.0` ที่เข้าคู่กันบน Windows/macOS ARM64 รุ่นเก่า `0.1.0`/extension `0.2.1` และการแก้ในเครื่อง `0.2.3` เป็นหลักฐานประวัติ ไม่ได้รับความสามารถ E01–E10 เพียงเพราะติดตั้ง extension ใหม่ ตรวจรุ่นและ capability ด้วย **WBasic: Show Toolchain Status** ก่อนเริ่ม

บทแรกมีเป้าหมายเดียว: ทำให้ VS Code กับ `wb` รู้จักกันก่อนสร้าง project หากข้ามขั้นนี้
autocomplete บางส่วนอาจยังดูสุภาพเรียบร้อย แต่คำสั่ง compile จะยืนเงียบเหมือนอาจารย์
ที่ยังไม่ได้รับรายชื่อนักศึกษา

## สิ่งที่ต้องมี

- VS Code 1.137 หรือใหม่กว่า
- VSIX รุ่น 0.3.0 ที่ `wb-package.json` ของแพ็ก 0.2.0 ระบุ
- `wb`, runtime assets, linker และ probe จาก ZIP 0.2.0 เดียวกัน
- MSVC ARM64 หรือ Apple Clang เฉพาะเมื่อ build toolchain จาก source

private experimental release นี้เป็นเครื่องมือสำหรับพัฒนา ไม่ใช่ Marketplace หรือ production release
ผล native Run/Build บน developer hosts ผ่านแล้ว แต่ fresh no-SDK host acceptance ยังเปิดอยู่

## ติดตั้ง VSIX

1. เปิดมุมมอง **Extensions** ใน VS Code
2. เปิดเมนู `…` ด้านบนของมุมมอง
3. เลือก **Install from VSIX…**
4. เลือก VSIX 0.3.0 ตาม `vscodeVsix.path` ใน `wb-package.json` และตรวจ SHA-256 ตาม release record
5. เมื่อ VS Code ขอ reload ให้ reload หน้าต่าง

หลังติดตั้งให้ใช้ **Developer: Reload Window** เพื่อให้หน้าต่างโหลดรุ่นใหม่ รุ่น 0.3.0 ผ่านการใช้งานจริงใน VS Code 1.140.0 บน Windows ARM64 และผ่าน isolated host checks; การทดสอบ editor/protocol บน Mac ARM64 เป็นอีกชุดหลักฐาน ไม่ใช่การทดสอบทุก UI action ในหน้าต่าง Mac จริง

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

ตรวจ extension `0.3.0` ใน Extensions view แล้วเปิด Command Palette เลือก **WBasic: Show Toolchain Status** สำหรับคู่มือนี้ ให้ตรวจว่า compiler เป็น `0.2.0` ผลที่พร้อมใช้งาน
ควรแสดง path, compiler version, development round และ native target ของเครื่องนี้

**WBasic: About and Credits** แสดงรุ่น extension ที่ติดตั้งได้แม้ไม่เรียก compiler
และเปิด local notices/licenses ของ extension ได้ใน Restricted Mode ส่วน notice ของ
compiler/runtime อยู่ในแพ็ก compiler แยกกัน ตรวจจากแพ็กที่เข้าคู่จริง

{{< guide-screenshot name="01-toolchain-status.png" alt="หน้าต่าง VS Code หลังเรียก WBasic: Show Toolchain Status โดยเห็น compiler path, version, development round และ native target แต่ไม่เห็นข้อมูลส่วนตัว" caption="ภาพที่ควรถ่าย: Toolchain Status หลังติดตั้ง VSIX และเชื่อม compiler สำเร็จ" >}}

## Workspace Trust

Syntax highlighting, Outline และสเปกที่มากับ extension เปิดอ่านได้ใน Restricted Mode
แต่การ check, run, build และ test จะทำงานเฉพาะ workspace ที่ trusted เพราะคำสั่งเหล่านี้
เรียก native compiler และอาจรันโปรแกรมของ project

ให้ trust เฉพาะโฟลเดอร์ที่คุณรู้ที่มา รุ่น 0.3.0 แสดง Check Project,
Run Project และ Build Project (Development) ทั้งสามคำสั่งใน Palette เสมอ
หากเลือกแล้วทำงานไม่ได้ ให้ตรวจ Workspace Trust กับ compiler capability จริง
ก่อนเปลี่ยน setting

## จุดตรวจ

- [ ] Extension แสดงเป็น `WBasic`
- [ ] Command Palette พบคำสั่ง `WBasic:`
- [ ] **Show Toolchain Status** รายงานสถานะพร้อมและ target ตรงกับเครื่อง
- [ ] Workspace ที่จะใช้ฝึกเป็น trusted

อ่านต่อ: [สร้าง project แรก]({{< relref "/books/w-basic-extension/02-create-first-project.md" >}})

