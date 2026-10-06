---
title: "0 · เลือกชุดเครื่องมือ 0.2.0 ที่เข้าคู่กัน"
description: "ตรวจแพ็ก ARM64, VSIX 0.3.0 และ compiler ที่ VS Code เลือก ก่อนเริ่ม workflow ประจำวัน"
weight: 0
---

คู่มือนี้อธิบายชุด **private experimental** ที่เข้าคู่กัน: compiler/runtime `0.2.0`, protocol `0.1.0` และ VS Code extension `wbasic-dev.wbasic@0.3.0` สำหรับ Windows/macOS ARM64 ดาวน์โหลดจาก [private release ของ WBasic](https://github.com/jedt3d/wbasic-language/releases/tag/v0.2.0) ซึ่งต้องมีสิทธิ์เข้าถึง repository ก่อน รุ่นเก่า `0.1.0` พร้อม extension `0.2.1` ยังเป็นประวัติ release ที่แยกกัน; extension `0.2.3` เคยตรวจในเครื่อง แต่ไม่ใช่ VSIX ที่มากับแพ็กใหม่นี้ อย่ารวม binary, runtime, manifest pin หรือผลทดสอบจากต่างรุ่นเป็นชุดเดียวกัน

## เลือกและตรวจแพ็ก

เลือก ZIP Windows ARM64 หรือ macOS ARM64 ที่ระบุ compiler `0.2.0` ให้ตรงกับเครื่อง ตรวจ SHA-256 กับไฟล์ `.sha256` และ release record ก่อนแตกไฟล์ จากนั้นอ่าน `wb-package.json` ในแพ็ก: `sourceRevision`, target, compiler version, inventory และ `vscodeVsix.path`/`sha256` ต้องตรงกับ asset ที่ดาวน์โหลด เก็บ `wb`, runtime assets, linker และ native probe จากแพ็กเดียวกันไว้ด้วยกัน ไม่ใช้ runtime ค้างจาก 0.1.0 โฟลเดอร์ build ที่เคยสร้างด้วย runtime อีกชุดอาจถูก compiler ปฏิเสธ; เก็บผลเก่าไว้แยกก่อนสร้างใหม่

แพ็กนี้เป็นเครื่องมือพัฒนาแบบ private experimental ผล native Windows/macOS ARM64 ตรวจบน developer hosts แล้ว ทั้ง source-backed fixture และ BillingTime debug/release ส่วน production entitlement, fresh no-SDK host acceptance, signing/notarization และแพลตฟอร์มอื่นยังไม่ผ่านเกณฑ์แจกจ่าย production

## เชื่อม VS Code

ใน Extensions เลือก **Install from VSIX…** แล้วเลือก VSIX `0.3.0` ที่ `wb-package.json` ระบุ ตรวจ hash ตาม record และใช้ **Developer: Reload Window** เปิด project ใน trusted workspace แล้วเรียก **WBasic: Show Toolchain Status** ให้เห็น compiler `0.2.0` และ native target ของเครื่อง หากค้นหา compiler ไม่พบ ตั้ง `wbasic.compilerPath` เป็น absolute path ของ `wb.exe` หรือ `wb` จากแพ็กที่เลือก; `wbasic.probePath` ใช้เมื่อแยกตำแหน่ง probe เท่านั้น ช่องเหล่านี้รับ path ไม่รับคำสั่ง shell

คำสั่ง Check, Run, Build และ Test ต้องใช้ Workspace Trust กับ capability ที่ compiler ประกาศ Coloring, Outline, About and Credits และสเปกใน extension ยังเปิดได้ใน Restricted Mode ความสามารถ editor แบบ project ต้องมี `editorProject`, `editorSemanticGraph` และเมื่อเกี่ยวกับ test source ต้องมี `editorProjectTests`; compiler เก่าจะไม่ได้ graph ใหม่นี้จากการติดตั้ง VSIX อย่างเดียว

## เริ่ม project และตรวจผล

ใช้ **WBasic: New Project** ในโฟลเดอร์ว่าง Manifest ที่สร้างจะ pin รุ่นที่ compiler ตัวที่เลือกประกาศ: สำหรับคู่นี้ `toolchain = "0.2.0"` ทั้งใน `App.wproj` และ `module.toml` ที่เกี่ยวข้อง ใช้ **WBasic: Check Project** กับ project ที่บันทึกแล้ว; live diagnostics จะอ่าน unsaved project overlays ที่อยู่ในขอบเขต ส่วน **Check Active Source** ตรวจ source เดี่ยวและไม่แทน project check ที่มี Import

ตัวอย่าง [daily editor workflow ที่ tag v0.2.0](https://github.com/jedt3d/wbasic-language/tree/v0.2.0/examples/editor-daily-workflow) อยู่ใน source ที่ pin ตาม release และมากับแพ็ก เป็น project ข้าม module ที่ตรวจแล้ว `wb check` ยอมรับ, `wb test` ผ่าน 2/2 และ `wb run` พิมพ์ `24` เริ่มจากบท [ติดตั้ง extension และ compiler]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}}) แล้วตามบท 2–12 เพื่อใช้การเขียน, navigation, formatting, inline test และ direct-call hierarchy ใน VS Code จริง
