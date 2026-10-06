---
title: "รุ่น compiler และเครื่องมือที่คู่มือนี้อ้างอิง"
description: "ชุด private experimental compiler/runtime 0.2.0, protocol 0.1.0 และ Extension 0.3.0"
---

อัปเดต **6 ตุลาคม 2026** คู่มือปัจจุบันอ้างชุด [private experimental release v0.2.0](https://github.com/jedt3d/wbasic-language/releases/tag/v0.2.0): compiler/runtime **0.2.0**, protocol **0.1.0** และ VS Code Extension **0.3.0** สำหรับ Windows/macOS ARM64 Source ที่ตรึงไว้คือ `8d740dabe72bdf27f978f979d64725dc26c84be0` ให้ตรวจ ZIP/VSIX และ SHA-256 กับ release record และ [compiler release manifest](https://jedt3d.github.io/wbasic-documents/compiler-release.json) ก่อนติดตั้ง รุ่น `0.1.0` และ VSIX `0.2.1` ยังคงเป็นประวัติที่ไม่ถูกแทนที่; Extension `0.2.3` เป็นการแก้ที่เคยตรวจในเครื่อง ไม่ใช่ส่วนของแพ็กใหม่นี้

เลข compiler release แยกจากแบบออกแบบภาษา **draft v0.3** และเลขเผยแพร่เว็บไซต์ ทั้ง CLI, portable ZIP และ compiler ที่เลือกใน VS Code ต้องใช้รุ่น `0.2.0` เดียวกันกับ runtime/linker ที่เข้าคู่ `wb --version` และ **WBasic: Show Toolchain Status** ช่วยตรวจรุ่นจริงก่อนปรับ manifest

## ชุดเครื่องมือปัจจุบัน

| ส่วนประกอบ | ขอบเขตปัจจุบัน |
|---|---|
| Compiler/runtime | รุ่น 0.2.0 ที่เข้าคู่กันบน native Windows ARM64 / macOS ARM64 |
| CLI | `check`, `run`, `build`, `emit-object`, `test`, `project-info`, `symbols`, `references`, `tui doctor`, `editor-project`, `editor-manifest` |
| Build | Project manifest; profile debug/release; production entitlement ยังเป็น false |
| WORM | SQLite ทดลอง: typed mapping, changes, query, transaction และ optimistic version guard |
| VS Code Extension | `wbasic-dev.wbasic@0.3.0` พร้อม E01–E10 ที่ตรวจใน Windows VS Code จริง; Marketplace ไม่อยู่ในขอบเขต |
| LSP/MCP | Protocol package 0.1.0; ใช้ project snapshots และ compiler-owned semantic graph |
| Pin ของ project/module | `toolchain = "0.2.0"`; New Project pin รุ่น compiler ที่เลือกให้อัตโนมัติ |
| คู่มือ | Getting Started, reference และ Extension Guide อ้างชุดที่เข้าคู่นี้ |

Extension แสดง Check/Run/Development Build ใน Command Palette แต่ handler ยังตรวจ Workspace Trust และ capability จริง Run/Build ใช้ process task ที่คง output ให้อ่านหลังจบ `wbasic.compilerPath` รับ absolute path ของ compiler; หากเปลี่ยนแพ็ก ให้เก็บ runtime/linker จากแพ็กเดียวกันและสร้าง output ที่เคยใช้ runtime ต่างรุ่นใหม่ อย่าแก้ mixed-pair error ด้วยการทับไฟล์รุ่นเก่า

## ความสามารถของ editor และขอบเขต

E01–E10 happy paths ผ่านใน VS Code 1.140.0 บน Windows ARM64: hover, definition, rename, completion/parameter hints, references/Peek, highlights, Quick Fix, Format Document/Selection, inline Run Test หนึ่ง case และ direct-call hierarchy การยกเลิก native test run จาก Testing/Command Palette ผ่านแยกต่างหาก: ผล case ที่จบแล้วคงอยู่และ case ที่ถูกขัดจังหวะแสดงสถานะไม่ใช่ Passed การทำงานกับ test source รวม context ที่ค้นพบแยกกันเพื่อไม่ให้ rename จาก app ทิ้ง test calls ไว้

Editor/protocol suites ผ่าน **131/131** และ **90/90** ทั้ง Windows/macOS ARM64; isolated Windows Extension Host ผ่าน **12 checks** Workspace Rust checks ผ่าน **544 Windows** (5 ignored) และ **532 Mac** (3 ignored) โดย ignored ไม่ใช่ Passed Catalog ตัวอย่างปัจจุบันมี **32 รายการ / 10 หมวด / 66 ไฟล์สอน** `editor-daily-workflow` ผ่าน check, test 2/2 และ run output `24` บนทั้งสอง native hosts BillingTime ผ่าน debug/release กับ SQLite จริง: fresh invoice สองบรรทัดรวม 18000 cents และรันซ้ำสร้าง invoice ถัดไป

Formatter ปัจจุบันเป็นตัวร่วมของ extension/protocol ที่เปลี่ยน indentation อย่างอนุรักษ์นิยมและรักษา token, comment, string, line ending; ไม่ใช่ compiler-owned layout engine Hover ไม่ดึง comment ที่ผู้เขียนวางเหนือ declaration มาเป็น documentation Call Hierarchy แสดงเฉพาะ direct call ที่ compiler resolve ได้; Go to Implementation และ target ของ indirect procedure-value call ไม่อยู่ในขอบเขตนี้ Expression chains และ intrinsic String/Array member completion ยังไม่ครบ Rename test-entry procedure ที่เปลี่ยน catalog identity ยังไม่รองรับ และผลที่ไม่ครอบคลุม test context จะถูกปฏิเสธแทนการส่ง edit บางส่วน

## ติดตั้งและตรวจแพ็ก

ตรวจ ZIP/VSIX SHA-256 กับ sidecar และ release record ก่อนแตกไฟล์ ใช้ `Install-And-Test.ps1` หรือ `Install-And-Test.sh` และ helper ตั้ง PATH เฉพาะ session Core compilation ไม่ต้องมี Node; Node ใช้กับ protocol adapters ส่วน VS Code ใช้เมื่อทำงานใน editor อ่าน [Getting Started]({{< relref "/books/getting-started/_index.md" >}}), [WORM SQLite]({{< relref "/books/standard-library/worm-sqlite.md" >}}) และ [Extension Guide]({{< relref "/books/w-basic-extension/_index.md" >}}) ต่อได้

Native evidence ข้างต้นเป็นผลบน developer hosts ไม่ใช่ fresh no-SDK host acceptance หรือ production distribution ที่ผ่านแล้ว Production entitlement, redistribution notices, signing/notarization และ Linux ARM64/native x86_64 acceptance ยังเปิดอยู่ `noSdkDistribution` ยังคง false

## Acceptance และตัวอย่างย้อนหลัง

ณ checkpoint ของ **v0.1.0** ที่เผยแพร่ catalog ของ normative draft v0.3 เป็น **72 Passed / 23 Planned / 0 Deferred** โดยไม่รวม milestone WORM แยกต่างหาก ตัวเลขนี้เป็นขอบเขต release เก่า ไม่ใช่สถานะปัจจุบัน Source catalog ที่ติดตามแยกต่างหากยังคง **93 Passed / 2 Planned**; งาน editor/เว็บไซต์รอบนี้ไม่เลื่อนสถานะนั้นเอง R6 D1–D5 ผ่านในขอบเขตที่บันทึกไว้ Windows OSC52 เชิงบวกใช้ private Microsoft ConPTY ที่ pin ไว้ ส่วน inbox host บางรุ่นยัง timeout ได้ NativeLocal กับ OSC52 เป็นคนละ route หลักฐานรุ่นเก่าไม่รวม Linux ARM64 และ native x86_64

Small WBasic Projects คง **29 ตัวอย่าง native-verified / 52 บท Planned** ตาม revision ที่แต่ละชุดบันทึกไว้ การเปลี่ยนคู่มือไม่ย้ายป้าย Planned ให้ผ่านเองและไม่สร้างข้อสรุปต้นทุนมนุษย์/AI หลักฐานย้อนหลังรักษารุ่นและ hash เดิม ส่วน release record กับ manifest ของเว็บไซต์ระบุชุดปัจจุบัน
