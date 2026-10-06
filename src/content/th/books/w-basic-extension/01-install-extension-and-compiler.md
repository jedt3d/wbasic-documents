---
title: "1 · เตรียม VS Code, extension และ compiler"
description: "ติดตั้ง development VSIX เชื่อม wb และตรวจว่า extension เห็น toolchain ที่ถูกต้อง"
weight: 1
---

> **ขอบเขตเวอร์ชัน — extension 0.2.3 ที่ตรวจในเครื่องแล้ว** VSIX รุ่น 0.2.3 ตรวจในเครื่องกับ development compiler/runtime ที่เข้าคู่กัน ส่วน private experimental compiler/runtime ที่เผยแพร่เป็นรุ่น `0.1.0` กับ protocol package `0.0.2` ZIP ARM64 ที่เผยแพร่บรรจุ extension `0.2.1` ไว้ตามเดิม ไม่มีการเผยแพร่ extension `0.2.3` หรือขึ้น Marketplace เริ่มที่ [คู่มือแพ็ก]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) แพ็ก private compiler `0.0.2` เดิมมี extension `0.1.0` และไม่มี project editor workflow เหล่านี้

บทแรกมีเป้าหมายเดียว: ทำให้ VS Code กับ `wb` รู้จักกันก่อนสร้าง project หากข้ามขั้นนี้
autocomplete บางส่วนอาจยังดูสุภาพเรียบร้อย แต่คำสั่ง compile จะยืนเงียบเหมือนอาจารย์
ที่ยังไม่ได้รับรายชื่อนักศึกษา

## สิ่งที่ต้องมี

- VS Code 1.137 หรือใหม่กว่า
- VSIX รุ่น 0.2.3 ที่ได้รับแยกต่างหาก; VSIX รุ่น 0.2.1 ที่ `editors/vscode/wbasic-0.2.1.vsix` อยู่ใน ZIP รุ่นเดิม
- `wb`, runtime assets และ linker จาก ZIP v0.1.0 เดียวกัน
- MSVC ARM64 หรือ Apple Clang เฉพาะเมื่อ build toolchain จาก source

private prerelease นี้เป็นเครื่องมือสำหรับพัฒนา ไม่ใช่ Marketplace หรือ production release
ชุด toolchain ใน portable ZIP รันและ build โดยไม่ใช้ SDK ของ host แต่ fresh no-SDK host acceptance ยังเปิดอยู่

## ติดตั้ง VSIX

1. เปิดมุมมอง **Extensions** ใน VS Code
2. เปิดเมนู `…` ด้านบนของมุมมอง
3. เลือก **Install from VSIX…**
4. เลือก VSIX 0.2.3 ที่ได้รับในเครื่อง หากใช้ `vscodeVsix.path` ใน `wb-package.json` จะติดตั้งรุ่น 0.2.1; ตรวจ SHA-256 ตาม record ของแพ็กเมื่อใช้รุ่นนั้น
5. เมื่อ VS Code ขอ reload ให้ reload หน้าต่าง

หลังติดตั้งให้ใช้ **Developer: Reload Window** เพื่อให้หน้าต่างโหลดรุ่นใหม่ รุ่น 0.2.3 ตรวจใน VS Code 1.140.0 บน Windows ARM64 แล้ว ส่วน ZIP ที่เผยแพร่ยังมีรุ่น 0.2.1 และ compiler/runtime/linker เดิม

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

ตรวจ extension `0.2.3` ใน Extensions view แล้วเปิด Command Palette เลือก **WBasic: Show Toolchain Status** สำหรับคู่มือนี้ ให้ตรวจว่า compiler เป็น `0.1.0` ผลที่พร้อมใช้งาน
ควรแสดง path, compiler version, development round และ native target ของเครื่องนี้

{{< guide-screenshot name="01-toolchain-status.png" alt="หน้าต่าง VS Code หลังเรียก WBasic: Show Toolchain Status โดยเห็น compiler path, version, development round และ native target แต่ไม่เห็นข้อมูลส่วนตัว" caption="ภาพที่ควรถ่าย: Toolchain Status หลังติดตั้ง VSIX และเชื่อม compiler สำเร็จ" >}}

## Workspace Trust

Syntax highlighting, Outline และสเปกที่มากับ extension เปิดอ่านได้ใน Restricted Mode
แต่การ check, run, build และ test จะทำงานเฉพาะ workspace ที่ trusted เพราะคำสั่งเหล่านี้
เรียก native compiler และอาจรันโปรแกรมของ project

ให้ trust เฉพาะโฟลเดอร์ที่คุณรู้ที่มา รุ่น 0.2.3 แสดง Check Project,
Run Project และ Build Project (Development) ทั้งสามคำสั่งใน Palette เสมอ
หากเลือกแล้วทำงานไม่ได้ ให้ตรวจ Workspace Trust กับ compiler capability จริง
ก่อนเปลี่ยน setting

## จุดตรวจ

- [ ] Extension แสดงเป็น `WBasic`
- [ ] Command Palette พบคำสั่ง `WBasic:`
- [ ] **Show Toolchain Status** รายงานสถานะพร้อมและ target ตรงกับเครื่อง
- [ ] Workspace ที่จะใช้ฝึกเป็น trusted

อ่านต่อ: [สร้าง project แรก]({{< relref "/books/w-basic-extension/02-create-first-project.md" >}})

