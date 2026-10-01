---
title: "รุ่น compiler และเครื่องมือที่คู่มืออ้างอิง"
description: "แยก compiler 0.0.2, VSIX ที่แจกจ่าย และสาขา R8B พร้อมขอบเขตผลทดสอบ"
---

ปรับข้อมูลเมื่อ **2 ตุลาคม 2026** โดยอ่าน source ที่รวมเข้า `main` แล้ว ณ
[`143be58`](https://github.com/jedt3d/wbasic-language/tree/143be583ce875629b430436ed4a4ffc9dac952bf)
และหลักฐานการเผยแพร่ **0.0.2 private experimental preview** รุ่น compiler นี้
ต่างจากเลข **draft v0.3** ของแบบออกแบบภาษา และต่างจากเลขเวอร์ชันของเว็บไซต์
ก่อนลองตัวอย่าง ควรรู้ว่าเรากำลังใช้เครื่องมือชุดไหน—compiler ไม่อ่านใจ แต่บอกรุ่นได้

## เลือกเส้นทางให้ตรงกับเครื่องมือ

| ส่วน | ขอบเขตปัจจุบัน |
|---|---|
| Compiler/runtime | 0.0.2 คู่กัน; Windows ARM64 และ macOS ARM64 |
| CLI | `check`, `run`, `build`, `emit-object`, `test`, `project-info`, `symbols`, `references`, `tui doctor` |
| Build | รับ project `.wproj`; profile `debug` และ `release`; production entitlement ยังเป็น `false` |
| WORM | SQLite แบบ experimental; typed mapping, changes, query, transaction และ optimistic version guard |
| VSIX ในแพ็ก | 0.1.0; VS Code `^1.139.0`; คำสั่งตรวจ/รัน/build/test และ help ตาม capability |
| LSP/MCP | compiler-backed diagnostics/help และ saved-project check; ไม่รัน application ผ่าน protocol |
| คู่มือ R8B | สาขา `1bba6f9` แยกต่างหาก; New Project, Projects view และ Test Explorer ไม่ได้อยู่ใน VSIX ข้างบน |

อ่าน [Getting Started]({{< relref "/books/getting-started/_index.md" >}}) สำหรับ CLI,
[WORM SQLite]({{< relref "/books/standard-library/worm-sqlite.md" >}}) สำหรับฐานข้อมูล
และ [คู่มือ Extension]({{< relref "/books/w-basic-extension/_index.md" >}})
สำหรับเส้นทาง editor ที่ตรงกับรุ่นของคุณ

## ZIP ทดลองและข้อจำกัดการแจกจ่าย

ผู้ที่มีสิทธิ์เข้าถึง repository รับแพ็กได้จาก
[private prerelease v0.0.2](https://github.com/jedt3d/wbasic-language/releases/tag/v0.0.2)
ตรวจ ZIP SHA-256 กับ sidecar ก่อนแตกไฟล์ แล้วใช้ `Install-And-Test` และ helper
ตั้ง PATH ของแพ็ก แพ็กมี runtime และเครื่องมือ link ที่เตรียมไว้; Node ใช้เฉพาะ protocol
และ VS Code ใช้เฉพาะ editor การทดลอง compile จาก ZIP กับการสร้าง compiler จาก Rust
source จึงมีขั้นตอนเตรียมเครื่องต่างกัน

แพ็กถูกทดสอบหลังแตกไฟล์บน developer hosts: Windows 11 Pro 25H2 ARM64
(PowerShell 5.1 และ 7) และ macOS 26.6.2 ARM64 ผลตรวจ core, Unicode, native Hello,
test discovery และ billing ผ่าน แต่ **ยังไม่ใช่หลักฐานเครื่องใหม่ที่ไม่มี SDK**
ผล operator ที่รายงาน compiler ผ่านไม่แทน inventory ของเครื่องสะอาด
signing/notarization, เงื่อนไขการแจกจ่ายและ production acceptance ยังเปิดอยู่
รายละเอียดอยู่ใน [release notes](https://github.com/jedt3d/wbasic-language/blob/143be583ce875629b430436ed4a4ffc9dac952bf/docs/releases/v0.0.2.md)
และ [หลักฐานเผยแพร่](https://github.com/jedt3d/wbasic-language/blob/143be583ce875629b430436ed4a4ffc9dac952bf/docs/evidence/v0.0.2-release-2026-10-02.json)

## ผลทดสอบหมายถึงอะไร

catalog ของ normative v0.3 ปัจจุบันเป็น **72 Passed / 23 Planned / 0 Deferred**
ยังไม่ใช่ compiler v0.3 ที่ครบทุกข้อ และตัวเลขนี้ไม่ได้รวม milestone WORM แยกต่างหาก
R6 D1–D5 มี native acceptance ครบใน scope ที่บันทึกแล้ว Windows OSC52 read
เชิงบวกผ่านบน private Microsoft ConPTY ที่ pin ไว้; host ที่มากับ Windows บางรุ่น
ยัง timeout ได้ การอ่านผ่าน NativeLocal กับ OSC52 ต้องแยก route กัน

ทดสอบ Linux ARM64 และ native x86_64 ยังไม่ผ่าน acceptance ส่วนการเปรียบเทียบเวลา
เรียนรู้/รีวิวของมนุษย์และต้นทุน AI ยังไม่มีผลที่ใช้สรุปความได้เปรียบของภาษาได้
ดู [R6 integrated report](https://github.com/jedt3d/wbasic-language/blob/143be583ce875629b430436ed4a4ffc9dac952bf/docs/rounds/R6-main-integration-verification.md)
สำหรับ profile และ endpoint จริง

## หลักฐานตัวอย่างเก่าคงอยู่

Small WBasic Projects ยังมี 29 ตัวอย่าง native-verified และ 52 บท Planned ตาม
revision ที่แต่ละชุดบันทึกไว้ การอัปเดตคู่มือครั้งนี้ไม่ได้รันทุกรายการด้วย 0.0.2
และไม่ได้ย้ายป้าย Planned ให้ผ่านโดยอัตโนมัติ ตัวอย่าง R8B ก็ยังอ้างหลักฐานของ
สาขานั้น ไม่ใช้แทนผลทดสอบ VSIX 0.1.0
