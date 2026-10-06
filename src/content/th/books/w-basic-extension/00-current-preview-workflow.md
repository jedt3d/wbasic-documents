---
title: "0 · เลือกแพ็ก 0.1.0 ที่เข้าคู่กัน"
description: "แยกแพ็ก ARM64 ที่เผยแพร่กับ VS Code extension 0.2.3 ที่ตรวจในเครื่อง"
weight: 0
---

**Private experimental v0.1.0 prerelease** [หน้า private release](https://github.com/jedt3d/wbasic-language/releases/tag/v0.1.0) มี compiler/runtime `0.1.0`, VS Code extension `wbasic-dev.wbasic@0.2.1` ใน ZIP และ protocol package `0.0.2` จาก sealed source `3901cf17ce971dd0c7f591b424d73b086610fc46` Asset ทั้งแปดถูกดาวน์โหลดและตรวจ hash ซ้ำก่อนเผยแพร่ ต้องมีสิทธิ์เข้า private repository จึงเปิดลิงก์ได้ คู่มือนี้ใช้ extension `0.2.3` ที่ได้รับแยกต่างหาก ผล Command Palette บน Windows จริงใช้ development compiler source `dfdcbdc` ส่วน compiler `0.1.0` ที่เผยแพร่เป็น sealed source `3901cf17` เลขรุ่นเท่ากันไม่ได้ทำให้หลักฐานทดสอบเป็นชุดเดียวกัน ยังไม่มี 0.2.3 release หรือ Marketplace

เมื่อนำ extension 0.2.3 มาตรวจกับ compiler/runtime ที่เผยแพร่จาก sealed source ชุดทดสอบ editor 127 รายการผ่านโดยไม่มีรายการข้าม และ VS Code host แบบแยก 11 รายการผ่านบน Windows ARM64 ส่วนผล Check/Run/Build ผ่าน Command Palette ของหน้าต่างผู้ใช้จริงและ output ที่ค้างให้อ่าน ยังอ้าง development source `dfdcbdc`

## เลือกและตรวจ ZIP

ดาวน์โหลด `wbasic-0.1.0-windows-arm64.zip` หรือ `wbasic-0.1.0-macos-arm64.zip` จาก private release ให้ตรงกับเครื่อง ตรวจ SHA-256 ของ ZIP เทียบกับไฟล์ `.sha256` และ release record ก่อนแตกไฟล์ Windows ZIP มี hash `85c135ce9ad6ccf2edadd3c892ea677110f1ca0f15d012ec348a924213d93a74` ส่วน macOS ZIP มี hash `50abba3266fd1209666865e1351a68a899aabed95f5a486522d996bc1a93bad6` ดู `wb-package.json` ใน top-level folder เพื่อยืนยัน compiler version, source revision, target, inventory และ `vscodeVsix.path`/`sha256` VSIX ที่ระบุคือ `editors/vscode/wbasic-0.2.1.vsix` มี SHA-256 `d2aa385b5ec035b278aadfcfea500093e23e98797d91b307902cf14413f6158f` ตรวจทั้ง path และ hash เก็บ compiler, runtime assets ที่เข้าคู่กัน, linker และ probe จาก ZIP เดียวกันไว้ด้วยกัน Runtime ในแพ็กใช้ platform libraries ไม่ใช่ไฟล์ static runtime แยก

`Install-And-Test.ps1` บน Windows หรือ `Install-And-Test.sh` บน macOS ตรวจ native examples และเขียน report คำสั่งหลัก `wb check`, `wb run`, `wb test` และ `wb build` ไม่ต้องใช้ VS Code แพ็กที่แตกแล้วผ่าน Run/Build ทั้ง debug และ release โดยใช้ compiler, runtime assets และ linker ในแพ็กโดยไม่ใช้ SDK ของ host ส่วนการ build จาก source ยังต้องมี native development tools แพ็ก private experimental นี้ยังแยกจาก production distribution ส่วน fresh no-SDK acceptance, redistribution notices, signing/notarization และ production entitlement ยังเปิดอยู่

## เชื่อม VS Code

ใน Extensions เลือก **Install from VSIX…** แล้วเลือก VSIX 0.2.3 ที่ได้รับในเครื่อง หากมีเพียง VSIX ที่ `wb-package.json` ระบุ จะได้รุ่น 0.2.1 พร้อมพฤติกรรมเดิม Reload Window แล้วตรวจเลขรุ่นใน Extensions ใน trusted workspace ตั้ง `wbasic.compilerPath` เป็น absolute path ของ `wb.exe` หรือ `wb` ที่หน้าต่าง VS Code เข้าถึงได้ ตั้ง `wbasic.probePath` เฉพาะเมื่อใช้ native probe แยกต่างหาก เรียก **WBasic: Show Toolchain Status** แล้วตรวจว่า compiler เป็น `0.1.0` และ target ตรงกับเครื่อง Extension ยังค้นหา managed development toolchain, debug build ใน repository และ `PATH` ด้วย

สเปกแบบ offline อยู่ใน `docs/` ของแพ็ก ต้อง trust workspace เพื่อเรียก compiler, build, run และ test ส่วน coloring, Outline และเอกสารในเครื่องใช้ได้ใน Restricted Mode

## เริ่ม project

ใช้ **WBasic: New Project** ในโฟลเดอร์ว่าง `App.wproj` จะ pin เวอร์ชันที่ compiler ตัวที่เลือกประกาศ จึงต้องตรวจว่า `toolchain = "0.1.0"` ก่อน Check Project ถ้ามี module ไฟล์ `module.toml` ต้องใช้ toolchain รุ่นเดียวกัน อย่านำ manifest หรือ compiler/runtime binary ของ v0.0.2 มาปนกับแพ็กนี้โดยไม่ปรับและตรวจอย่างชัดเจน ใช้ **WBasic: Check Project** ตรวจ import และ direct dependency ที่บันทึกแล้ว ส่วน **Check Active Source** ตรวจ unsaved standalone file และใช้แทน project check ไม่ได้

อ่านต่อที่ [เตรียม VS Code, extension และ compiler]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}}) แล้วทำบทที่ 2–12 สำหรับ Projects, diagnostics, completion, navigation, Test Explorer, examples และ Development Build แพ็ก private v0.0.2 เดิมมี extension 0.1.0 ซึ่งไม่มี editor workflow เหล่านี้ หากใช้เวอร์ชันนั้นให้ดู release notes และเอกสารที่มากับแพ็กของมัน
