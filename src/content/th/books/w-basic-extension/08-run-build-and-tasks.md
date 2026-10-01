---
title: "8 · Run, Build และ Tasks"
description: "รัน source/project สร้าง Debug/Release development artifact และอ่าน problem matcher"
weight: 8
---

> **ขอบเขตเวอร์ชัน — branch R8B** บทนี้อธิบาย development branch `wbasic-dev.wbasic@0.2.0` ที่ยังไม่ได้รวม Extension ที่รวมแล้วเป็น `0.1.0` และไม่มีบางคำสั่งหรือมุมมองด้านล่าง ถ้าใช้ compiler `0.0.2` ณ `143be583` ให้อ่าน [วิธีใช้รุ่นที่รวมแล้ว]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}).

Extension แยกคำสั่งตามความตั้งใจ เพื่อไม่ให้การกด Run โดยบังเอิญกลายเป็น build สำหรับ
แจกจ่าย หรือการ Check ไปเปิด network/database ของโปรแกรม

## Run Active Source

เมื่อเปิด `.wbas` ที่ save แล้ว ใช้ **WBasic: Run Active Source in Terminal** คำสั่งนี้
รัน source เดี่ยวโดยใช้ directory ของไฟล์เป็น working directory เหมาะกับตัวอย่างเล็กที่
ไม่ต้องใช้ project imports

TUI ต้องรับ input จาก terminal จริง Extension จึงเปิด integrated terminal แทนการส่ง
โปรแกรมเข้า Output panel

## Run Project

ใช้ **WBasic: Run Project** สำหรับ `App.wproj` ที่มี module และ dependencies คำสั่งใช้
profile จาก `wbasic.defaultProfile` และส่ง manifest path เป็น argument ตรง ๆ path ที่มี
ช่องว่าง ภาษาไทย หรือ emoji จึงไม่ถูกประกอบเป็น shell string

## Development Build

มีสามคำสั่ง:

- **Build Project (Development)** ให้เลือก profile ที่ compiler ประกาศ
- **Build Project — Debug (Development)** เลือก Debug โดยตรง
- **Build Project — Release (Development)** เลือก Release โดยตรง

Compiler สร้าง native executable และ `.wb-build.json` record การ build นี้ยังต้องใช้
MSVC หรือ Apple Clang และไม่ใช่ production entitlement/no-SDK package คำว่า
“Development” อยู่ในชื่อเพื่อกันความเข้าใจผิด ไม่ใช่เครื่องประดับ

## VS Code Tasks

เปิด **Terminal: Run Task** จะพบ task `wbasic` ของแต่ละ manifest:

- Check
- Run
- Test
- Build Development Debug
- Build Development Release

Debug เป็น default build task และ Test เป็น default test task `$wbasic` problem matcher
ทำให้ error จาก compiler เปิดกลับ source ได้

{{< guide-screenshot name="08-run-build-tasks.png" alt="เมนู Run Task แสดง WBasic Check, Run, Test, Development Debug และ Development Release พร้อม integrated terminal ที่ไม่มีประวัติส่วนตัว" caption="ภาพที่ควรถ่าย: รายการ WBasic tasks และผล Run ใน integrated terminal" >}}

## Emit Object

**WBasic: Emit Project Object** ใช้เมื่อต้องการ native object ของ host ปัจจุบัน
Extension จะถาม output path แบบ absolute นี่เป็น contributor/development workflow
ผู้เริ่มต้นทั่วไปใช้ Build Project ได้ตรงกว่า

## ภารกิจฝึกมือ

1. Check Project
2. Run Project และตรวจ output ภาษาไทย
3. Build Debug แล้วเปิด build record
4. Build Release แล้วเปรียบเทียบ profile ใน record
5. ทำ type error หนึ่งจุด แล้วสังเกตว่า task link กลับไฟล์ถูกต้อง

อ่านต่อ: [ทดสอบผ่าน Test Explorer]({{< relref "/books/w-basic-extension/09-test-explorer.md" >}})

