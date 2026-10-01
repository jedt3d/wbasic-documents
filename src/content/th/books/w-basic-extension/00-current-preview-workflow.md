---
title: "0 · ใช้ extension รุ่นที่รวมแล้ว"
description: "วิธีใช้ VS Code ตาม source ของ compiler 0.0.2 และ extension 0.1.0"
weight: 0
---

บทนี้ใช้กับ source editor/tool ที่รวมแล้ว ณ `143be583` (ยังเหมือนกันที่ `e7edb1e`) และแพ็ก private experimental `v0.0.2` ที่ตรึง source ณ `b9c8ef99` VSIX ซึ่งเป็นทางเลือกใน ZIP เป็น extension รุ่น `0.1.0` ต้องใช้ VS Code `^1.139.0` และระบุว่าเป็น R6 Draft ยังไม่ใช่ extension ใน Marketplace ใช้ compiler/runtime ที่เข้าคู่กัน ZIP มี compiler, linker และ runtime มาให้ ส่วนการ build ไฟล์เหล่านี้จาก source checkout ต้องใช้ native SDK การรับรองเครื่องสะอาดที่ไม่มี SDK และการแจกจ่ายระดับ production ยังไม่เสร็จ

## ติดตั้งจาก private ZIP

เลือก `wbasic-0.0.2-windows-arm64.zip` หรือ `wbasic-0.0.2-macos-arm64.zip` ให้ตรงกับเครื่อง ARM64 ตรวจ SHA-256 กับไฟล์ `.sha256` ที่ให้มา แล้วแตก ZIP โดยรักษา top-level folder ไว้ แพ็กมี `wb.exe`/`wb`, `wb-native-probe.exe`/`wb-native-probe`, `wb-linker.json`, linker และ runtime ที่รวมมา, draft specification แบบ offline ใน `docs/` และ VSIX ทางเลือก `editors/vscode/wbasic-r5-0.1.0.vsix` ตรวจ source, target และรายการไฟล์ของแพ็กใน `wb-package.json`

ในมุมมอง Extensions ของ VS Code เลือก **Install from VSIX…** แล้วเลือก `wbasic-r5-0.1.0.vsix` จากแพ็ก ใน workspace ที่เชื่อถือแล้ว ตั้ง `wbasic.compilerPath` เป็น **path เต็ม** ของ `wb.exe` ที่อยู่บนสุดของแพ็กบน Windows หรือ `wb` บน macOS หากใช้ **WBasic: Inspect R1 Native Probe** ให้ตั้ง `wbasic.probePath` เป็น path เต็มของ probe executable ที่อยู่บนสุดของแพ็ก ไฟล์ `docs/wbasic-language-spec-draft-0.3.md` ในแพ็กอ่านได้โดยไม่ต่อเน็ต ให้เปิดไฟล์นี้โดยตรง คำสั่ง **Open Draft v0.3 Specification** คำนวณ path จากที่ติดตั้ง extension และยังไม่ได้ยืนยันว่าใช้ได้กับ VSIX ที่ติดตั้งแยก

`Install-And-Test.ps1` บน Windows หรือ `Install-And-Test.sh` บน macOS ตรวจตัวอย่าง native ในแพ็กและเขียนรายงาน VSIX เป็นทางเลือกสำหรับ core `wb check`, `wb run`, `wb test` และ `wb build` แพ็ก private ยังเป็น development preview; gate ของเครื่องสะอาด, editor host และการแจกจ่ายต้องตรวจแยก

## เชื่อมจาก source checkout

สั่ง `cargo build --workspace --locked` ใน repository วิธีนี้ต้องมี native build tools/SDK เปิด `editors/vscode` เป็น project สำหรับพัฒนา extension หรือ package และติดตั้ง source นี้ด้วยเครื่องมือพัฒนา VS Code ใน workspace ที่เชื่อถือแล้ว ตั้ง `wbasic.compilerPath` เป็น **path เต็มของ executable** `target/debug/wb.exe` บน Windows หรือ `target/debug/wb` บน macOS ถ้าเว้นว่าง extension จะใช้ debug build ที่อ้างอิงจาก source ของ extension เอง ส่วน `wbasic.probePath` ใช้เฉพาะคำสั่ง **Inspect R1 Native Probe**

extension ที่รวมแล้วไม่มีคำสั่ง **Show Toolchain Status** และไม่ค้นหา toolchain ที่จัดการไว้หรือ `PATH` ให้เรียก compiler ผ่าน path เต็มใน terminal พร้อม `--capabilities` และ `--version` ข้อมูล capability ของ compiler เป็นตัวกำหนดความช่วยเหลือและคำสั่ง profile ที่ใช้ได้ สีใน editor ไม่ใช่หลักฐานว่า compile ผ่าน คำสั่งที่เรียก compiler/probe ต้องใช้ Workspace Trust; การลงสี source ใช้ได้ใน Restricted Mode

## สร้าง project เล็กด้วยตนเอง

สร้าง `App.wproj` และ `src/Main.wbas` ใน workspace รุ่นนี้ไม่มีคำสั่ง **New Project**

```toml
# App.wproj
[project]
name = "MyFirstWBasic"
module = "App"
entry = "src/Main.wbas"
toolchain = "0.0.2"

[dependencies]
```

```wbasic
Module App

Procedure Main()
  PrintLn("Hello from WBasic")
EndProcedure
```

ค่า toolchain ใน manifest ต้องตรงกับรุ่น compiler ที่เลือก package ใช้ไดเรกทอรี `src` และไฟล์ entry ประกาศ `Module App` ถ้าจะเพิ่ม dependency ในเครื่อง ให้เพิ่ม path `.wmod` แบบ relative โดยตรงใน `[dependencies]` และให้ module นั้นมี `module.toml` กับ `src` ของตนเอง ไม่มี Include แบบข้อความ Extension รุ่นนี้ไม่มี completion ของ key ใน manifest หรือมุมมอง Projects

## ตรวจ รัน build และ test

ใช้ **WBasic: Check Project** กับ manifest, module และ import ที่บันทึกแล้ว **WBasic: Show Project Modules** แสดงข้อมูล project จาก compiler ถ้ามี manifest เดียวจะเลือกให้อัตโนมัติ ถ้ามีหลายไฟล์จะเลือกจากตำแหน่งไฟล์ที่เปิดหรือถามให้เลือก **WBasic: Check Active Source** ส่งข้อความใน editor รวมทั้งที่ยังไม่บันทึกไปยัง `wb check - --json` แบบไฟล์เดี่ยว จึง resolve import ของ project ไม่ได้ สำหรับไฟล์ `_spec.wbas` จะใช้ test mode

**WBasic: Run Project** เปิด terminal แบบโต้ตอบ **WBasic: Test Project** รันทั้ง suite และแสดงตัวตนของ case, status และยอดรวม ยังไม่มี Test Explorer หรือ UI เลือกรันทีละ case **WBasic: Emit Project Object** สร้าง native object ไม่ใช่ application สำหรับแจกจ่าย **WBasic: Run Active Source in Terminal** รันไฟล์ `.wbas` ที่บันทึกแล้ว **WBasic: New R6 TUI/Jobs Template** เปิดตัวอย่างพื้นฐานเป็นเอกสารที่ยังไม่บันทึก เฉพาะเมื่อ compiler รายงาน `r6-tui-jobs-foundation`; บันทึกก่อนรัน

ตั้ง `wbasic.buildProfile` เป็น `debug` (ค่าเริ่มต้น) หรือ `release` สำหรับ Check, Run, Build, Emit Object และ Test ของ project คำสั่ง **WBasic: Build Project** และ release ต้องมี capability `r8-shared-build-profile` จาก compiler ผลลัพธ์เป็น development build ภายใน หาก task `wbasic` ระบุ `profile` ชัดเจน ค่านั้นจะทับ setting Task provider ค้นหา `.wproj` ที่บันทึกแล้วและเสนอ check, run, test รวมถึง build เมื่อมี capability Run task รับ `arguments` แบบส่งค่าโดยตรง ส่วน emit-object task ต้องใช้ `outputPath` แบบ absolute ไม่มี setting `wbasic.defaultProfile`

## ความช่วยเหลือและขอบเขตของ editor

สี source เป็นการแยกคำตามรูปแบบ Diagnostics ที่ยืนยันด้วย compiler มาจาก Check Active Source หรือ Check Project Completion, hover และ signature ของ library แบบมีชื่อกำกับจะปรากฏตาม feature ID ที่ compiler รายงานเท่านั้น ความช่วยเหลือ `Csv.Create` แบบสี่ argument ต้องมี `csv-exclusive-create`; ความช่วยเหลือ WORM ต้องมีทั้ง `worm-sqlite-feasibility` และ metadata version 1 ที่ตรงกัน capability เหล่านี้อธิบาย API ที่จำกัด ไม่ได้อนุมาน field หรือ instance member ทั่วไป

Go to Definition, Find References และ Rename รองรับเฉพาะ **procedure ที่มีชื่อในไฟล์เดียวกัน** ซึ่ง compiler resolve ได้ Rename ตรวจ source ที่แก้แล้วอีกครั้ง Quick fix แก้ตัวพิมพ์ keyword ต้องมี capability `quickFix` และ span WB200/WB201 ที่ตรงพอดี package นี้ยังไม่มีการนำทาง symbol ข้ามไฟล์ การ rename ทั้ง project ดัชนี local variable การเชื่อม LSP แบบ live ใน extension, Outline ของ manifest, Projects view, Test Explorer หรือ browser ตัวอย่างที่ bundle มา Adapter LSP/MCP แยกใน `tools/protocol` ให้ query source และ saved project ตามขอบเขตของ compiler แต่ไม่รันโปรแกรมผ่าน LSP/MCP

บทที่ 1–12 และภาพประกอบอธิบาย branch R8B `0.2.0` ที่ยังไม่ได้รวม ใช้ขั้นตอนเหล่านั้นเมื่อมี extension branch นั้นและ compiler ที่ตรงกัน หากใช้ source ที่รวมแล้ว ให้ยึดบทนี้กับผล `wb --capabilities` เป็นขอบเขตการใช้งาน
