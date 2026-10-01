---
title: "รุ่น compiler และเครื่องมือที่คู่มือนี้อ้างอิง"
description: "Compiler/runtime 0.1.0 และ Extension 0.2.1 ใช้ compiler รุ่นเดียวกันทั้ง CLI และ editor"
---

อัปเดต **2 ตุลาคม 2026** สำหรับ [private experimental release v0.1.0](https://github.com/jedt3d/wbasic-language/releases/tag/v0.1.0) รุ่น compiler/runtime ปัจจุบันเป็น **0.1.0** บน Windows ARM64 และ macOS ARM64 ส่วน VS Code Extension เป็น **0.2.1** ทั้ง CLI, portable ZIP และ compiler ที่เลือกใน VS Code ใช้เลขรุ่น compiler เดียวกัน รุ่น v0.0.1/v0.0.2 ยังคงดาวน์โหลดย้อนหลังได้โดยไม่แก้ tag หรือแพ็กเดิม

เลข compiler release แยกจากแบบออกแบบภาษา **draft v0.3** และเลขเผยแพร่เว็บไซต์ [manifest ของ compiler release](https://jedt3d.github.io/wbasic-documents/compiler-release.json) ระบุ source ที่ตรึงไว้และ SHA-256 ของ ZIP ทั้งสองแพลตฟอร์ม Compiler ยังอ่านใจไม่ได้ แต่ `wb --version` ช่วยไขปริศนาได้มากกว่าที่คิด

## ชุดเครื่องมือปัจจุบัน

| ส่วนประกอบ | ขอบเขตปัจจุบัน |
|---|---|
| Compiler/runtime | รุ่น 0.1.0 เข้าคู่กันบน native Windows ARM64 / macOS ARM64 |
| CLI | `check`, `run`, `build`, `emit-object`, `test`, `project-info`, `symbols`, `references`, `tui doctor`, `editor-project`, `editor-manifest` |
| Build | รับ project manifest; profile debug/release; production entitlement ยังเป็น false |
| WORM | SQLite ทดลอง: typed mapping, changes, query, transaction และ optimistic version guard |
| VS Code Extension | `wbasic-dev.wbasic@0.2.1`; ZIP มี `editors/vscode/wbasic-0.2.1.vsix` |
| LSP/MCP | protocol package 0.0.2; ใช้ project snapshots และ metadata จาก compiler |
| Pin ของ project/module | `toolchain = "0.1.0"`; New Project pin รุ่น compiler ที่เลือกให้อัตโนมัติ |
| คู่มือ | Getting Started, reference และ Extension Guide อ้างชุด release นี้ร่วมกัน |

Extension กับ protocol ยังใช้เลขรุ่นของตัวเอง หลังติดตั้งให้ Reload Window แล้วเปิด **WBasic: Show Toolchain Status** ตรวจว่า compiler ที่เลือกเป็น 0.1.0 ตั้ง `wbasic.compilerPath` เป็น absolute path ของ compiler ใน portable ZIP ได้ โดยเก็บ runtime และ linker ที่เข้าคู่กันไว้ในแพ็กนั้น การสร้าง compiler จาก Rust source หรือใช้ชุดนักพัฒนายังต้องมี native toolchain/SDK ตามแพลตฟอร์ม

## ความสามารถของ editor และขอบเขตที่ยังมีอยู่

Live diagnostics และ navigation ใช้ project snapshot รวม source ที่ยังไม่บันทึก Completion ตรวจ visibility และจับ fields/methods ของ receiver ที่ประกาศชนิดแบบง่ายด้วย binding identities จาก compiler ส่วน rename ข้ามไฟล์ให้ compiler ตรวจ snapshot หลังแก้ก่อนนำไปใช้ Catalog มี **31 รายการ / 10 หมวด / 61 ไฟล์สอน** ตัวอย่าง WORM M2/M3 คัดลอกพร้อม module และใช้ Check/Build ได้ การรันฐานข้อมูลต้องส่ง path เอง M4 UI เป็นตัวอย่างอ้างอิงใน repository ที่ต้อง stage module จึงไม่อยู่ใน Copy Example

Expression chains, type aliases บางรูปแบบ และ intrinsic String/Array member completion ยังไม่ครบ ยังไม่โฆษณา debugger หรือ formatter ชุด integration บันทึกผล **71 protocol**, **120 editor** และ **11 real VS Code Extension Host checks** ต่อแพลตฟอร์ม ARM64 รวมถึง Rust 519 Windows / 507 macOS ที่ผ่าน โดยแยก opt-in ignored tests ตามเดิม งาน release เพิ่ม native release build ที่เข้าคู่กันและการทดสอบ ZIP หลังแตกไฟล์ ไม่ได้อ้างว่ารันทุกตัวอย่างเก่าใหม่ทั้งหมด

## ติดตั้งและตรวจแพ็ก

ตรวจ ZIP SHA-256 กับ sidecar และ release record ก่อนแตกไฟล์ แล้วรัน `Install-And-Test.ps1` หรือ `Install-And-Test.sh` และใช้ helper ตั้ง PATH เฉพาะ session Core compilation ไม่ต้องมี Node; Node ใช้กับ protocol adapters ที่เลือกเพิ่ม ส่วน VS Code ใช้กับ editor อ่าน [Getting Started]({{< relref "/books/getting-started/_index.md" >}}), [WORM SQLite]({{< relref "/books/standard-library/worm-sqlite.md" >}}) และ [Extension Guide]({{< relref "/books/w-basic-extension/_index.md" >}}) ต่อได้

ผล native developer-host package verification ครอบคลุม Windows 11 Pro 25H2 ARM64 (PowerShell 5.1 และ 7) กับ macOS 26.6.2 ARM64: Unicode, compile/run/build, test discovery ที่พบ case จริง และ billing ผ่าน ผลนี้ **ไม่ใช่หลักฐานเครื่องใหม่แบบ no-SDK** การตรวจเงื่อนไขแจกจ่าย, signing/notarization และ production entitlement ยังเปิดอยู่ `noSdkDistribution` ยังคง false

## Acceptance และตัวอย่างย้อนหลัง

Normative draft v0.3 ยังเป็น **72 Passed / 23 Planned / 0 Deferred** โดยไม่รวม milestone WORM แยกต่างหาก R6 D1–D5 ผ่านใน scope ที่บันทึกไว้ Windows OSC52 เชิงบวกใช้ private Microsoft ConPTY ที่ pin ไว้ ส่วน inbox host บางรุ่นยัง timeout ได้ NativeLocal กับ OSC52 เป็นคนละ route Linux ARM64 และ native x86_64 ยังไม่มีผล execution ที่ผ่าน acceptance

Small WBasic Projects คง **29 ตัวอย่าง native-verified / 52 บท Planned** ตาม revision ที่แต่ละชุดบันทึกไว้ Release นี้ไม่ย้ายป้าย Planned ให้ผ่านเอง และไม่สร้างข้อสรุปต้นทุนมนุษย์/AI หลักฐานย้อนหลังรักษารุ่นและ hash เดิม ส่วน release record กับ manifest ของเว็บไซต์ระบุชุดปัจจุบัน
