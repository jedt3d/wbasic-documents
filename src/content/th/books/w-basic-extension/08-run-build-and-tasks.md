---
title: "8 · Run, Build และ Tasks"
description: "รัน source/project สร้าง Debug/Release development artifact และอ่าน problem matcher"
weight: 8
---

> **ขอบเขตเวอร์ชัน — ชุด private experimental 0.2.0** คู่มือนี้ใช้ compiler/runtime `0.2.0`, protocol `0.1.0` และ VS Code extension `0.3.0` ที่เข้าคู่กันบน Windows/macOS ARM64 รุ่นเก่า `0.1.0`/extension `0.2.1` และการแก้ในเครื่อง `0.2.3` เป็นหลักฐานประวัติ ไม่ได้รับความสามารถ E01–E10 เพียงเพราะติดตั้ง extension ใหม่ ตรวจรุ่นและ capability ด้วย **WBasic: Show Toolchain Status** ก่อนเริ่ม

Extension แยกคำสั่งตามความตั้งใจ เพื่อไม่ให้การกด Run โดยบังเอิญกลายเป็น build สำหรับ
แจกจ่าย หรือการ Check ไปเปิด network/database ของโปรแกรม

## Run Active Source

เมื่อเปิด `.wbas` ที่ save แล้ว ใช้ **WBasic: Run Active Source in Terminal** คำสั่งนี้
รัน source เดี่ยวโดยใช้ directory ของไฟล์เป็น working directory เหมาะกับตัวอย่างเล็กที่
ไม่ต้องใช้ project imports

TUI ต้องรับ input จาก terminal จริง คำสั่ง source เดี่ยวนี้จึงเปิด integrated terminal
ผล Check/Build/Run ของ workflow นี้ไม่ใช่หลักฐานว่า interactive TUI input ผ่านทุก endpoint

## Run Project

ใช้ **WBasic: Run Project** สำหรับ `App.wproj` ที่มี module และ dependencies คำสั่งใช้
profile จาก `wbasic.defaultProfile` และส่ง manifest path เป็น argument ตรง ๆ path ที่มี
ช่องว่าง ภาษาไทย หรือ emoji จึงไม่ถูกประกอบเป็น shell string รุ่น 0.3.0 ที่ตรวจในเครื่อง
เปิด VS Code `ProcessExecution` task เฉพาะ project ที่เลือก แสดง output ค้างไว้หลังจบ
และล้าง terminal เดิมเมื่อใช้ซ้ำ Run อาจเปลี่ยนข้อมูล project เช่น BillingTime
จะเพิ่มรายการตัวอย่างทุกครั้งที่รัน

## Development Build

มีสามคำสั่ง:

- **Build Project (Development)** ให้เลือก profile ที่ compiler ประกาศ
- **Build Project — Debug (Development)** เลือก Debug โดยตรง
- **Build Project — Release (Development)** เลือก Release โดยตรง

Compiler สร้าง native executable และ `.wb-build.json` record รุ่น 0.3.0 ใช้
process task แบบเดียวกับ Run สำหรับ Build โดยส่ง argument ตรง เลือก profile,
กำหนด scope ตาม project และใช้ `$wbasic` problem matcher Output ยังอ่านได้หลังจบ
handler ยังตรวจ Workspace Trust และ capability จริงก่อนทำงาน เมื่อใช้ compiler,
runtime assets และ linker ที่มากับ ZIP ที่เผยแพร่ Run/Build ทั้ง debug และ release
ผ่านโดยไม่ใช้ SDK ของ host ส่วนการ build compiler จาก source ยังต้องใช้ native tools
ผลลัพธ์ยังเป็น Development Build โดยไม่มี production entitlement หรือ fresh no-SDK host acceptance

หากทำงานจาก terminal โดยไม่ใช้ VS Code คำสั่งเดียวกันคือ:

```console
wb check App.wproj --json
wb test App.wproj --json
wb run App.wproj --profile debug
wb build App.wproj --profile debug
wb build App.wproj --profile release
```

ให้รันจากโฟลเดอร์ project หรือส่ง path ของ manifest แบบเต็ม `wb run` รับ argument
ของโปรแกรมต่อท้าย `--` เมื่อโปรแกรมต้องใช้ เช่น path ฐานข้อมูล ค่า profile ของ
`wbasic.defaultProfile` มีผลกับคำสั่งใน extension ไม่ได้แก้ manifest หรือเปลี่ยน release
build ให้เป็น production artifact

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


## Named Run ใน 0.4.0 candidate

ตั้ง `wbasic.runConfigurations` ใน workspace settings โดยแต่ละรายการมี `name`, `manifest` แบบ relative ต่อ workspace, `profile` debug/release และ `arguments` แบบ string array. **WBasic: Select Run Configuration** เปิด Run task ของรายการที่เลือก; **WBasic: Run Again** จำเพียงชื่อแล้วอ่านค่า config ปัจจุบันใหม่. ไม่มีการขยาย environment หรือเปลี่ยน working directory จาก config และไม่ควรเก็บ secret ใน `arguments`. ตรวจ invocation ก่อนรัน: การทำซ้ำอาจเขียนไฟล์หรือฐานข้อมูลซ้ำตามพฤติกรรมของโปรแกรม เช่น BillingTime เพิ่ม invoice ใหม่. Select Run Configuration และ Shift+F10 Run Again ผ่านในหน้าต่าง Windows; candidate ยังไม่เผยแพร่; คำสั่ง Run Project ของ 0.3.0 ด้านบนยังเป็นเส้นทาง release ที่เผยแพร่. ดู [ขอบเขต candidate]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}}).
