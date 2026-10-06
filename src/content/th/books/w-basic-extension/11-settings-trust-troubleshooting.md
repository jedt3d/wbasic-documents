---
title: "11 · Settings, Trust และ troubleshooting"
description: "ตั้งค่าเฉพาะที่จำเป็น อ่าน log และแก้ปัญหาเป็นชั้นโดยไม่รีเซ็ตทุกอย่าง"
weight: 11
---

> **ขอบเขตเวอร์ชัน — ชุด private experimental 0.2.0** คู่มือนี้ใช้ compiler/runtime `0.2.0`, protocol `0.1.0` และ VS Code extension `0.3.0` ที่เข้าคู่กันบน Windows/macOS ARM64 รุ่นเก่า `0.1.0`/extension `0.2.1` และการแก้ในเครื่อง `0.2.3` เป็นหลักฐานประวัติ ไม่ได้รับความสามารถ E01–E10 เพียงเพราะติดตั้ง extension ใหม่ ตรวจรุ่นและ capability ด้วย **WBasic: Show Toolchain Status** ก่อนเริ่ม

WBasic Extension มี setting จำนวนน้อยโดยตั้งใจ เพื่อให้ project behavior อยู่ใน manifest
และ compiler metadata มากกว่าซ่อนอยู่ในเครื่องผู้ใช้

## Settings ที่มี

| Setting | ใช้เมื่อ |
|---|---|
| `wbasic.compilerPath` | auto-discovery หา `wb` ไม่พบ หรือต้อง pin compiler เฉพาะ |
| `wbasic.defaultProfile` | เลือก `debug` หรือ `release` สำหรับ Run/default build |
| `wbasic.probePath` | contributor ต้องใช้ native feasibility probe |
| `wbasic.trace.server` | วิเคราะห์ LSP ที่ `off`, `messages` หรือ `verbose` |

`verbose` อาจบันทึก source text ลง local Output channel เปิดเฉพาะตอนวิเคราะห์ปัญหา
และปิดเมื่อเสร็จ

คู่มือรุ่น 0.3.0 นี้ใช้ `wbasic.defaultProfile` ส่วน extension เดิม 0.1.0 ใช้ `wbasic.buildProfile` หลังเปลี่ยน VSIX ให้ Reload Window แล้วตรวจ Show Toolchain Status ว่าเป็น compiler `0.2.0` จากแพ็กเดียวกับ runtime ที่ใช้ build

## ลำดับตรวจเมื่อ extension ไม่ทำงาน

1. **Show Toolchain Status** — path, version, target และ capabilities ถูกหรือไม่
2. ตรวจ **Workspace Trust** — คำสั่ง execution ถูกปิดใน Restricted Mode
3. Save manifest แล้วใช้ **Check Project**
4. เปิด **Show Language Server Output** ดู startup และ protocol error
5. ตั้ง trace เป็น `messages` ก่อน `verbose`
6. ตรวจว่า VS Code และ VSIX เป็นรุ่นที่รองรับกัน

## อาการที่พบบ่อย

### มีสีแต่ไม่มี completion

TextMate grammar ทำงานได้แม้ compiler/LSP ยังไม่พร้อม ตรวจ toolchain และ output channel

### Completion มีไม่ครบ

ตรวจชนิด receiver และ capability ของ compiler ปัจจุบัน Arbitrary expression chain
และ intrinsic String/Array member metadata ยังไม่ครบ Compiler 0.2.0 มี semantic graph
สำหรับ local/parameter/type/member ที่ resolve ได้ แต่ไม่เดาความหมายของ token ที่ไม่มี graph

### ค้นหา Check, Run หรือ Build ไม่พบ

รุ่น 0.3.0 แสดง **Check Project**, **Run Project** และ Build Project (Development)
ทั้งสามคำสั่งใน Command Palette เสมอ หากเพิ่งติดตั้ง ให้ใช้ **Developer: Reload Window**
แล้วตรวจรุ่นใน Extensions คำสั่งที่เห็นยังอาจปฏิเสธการทำงานเมื่อ workspace ไม่ trusted
หรือ compiler ไม่ประกาศ capability ที่ต้องใช้

### เห็นคำสั่ง แต่ compiler ใช้ไม่ได้

ตรวจ **Show Toolchain Status** และ path จากหน้าต่าง VS Code จริง บน Windows
เครื่องที่ตรวจพบว่า live VS Code process มองไม่เห็น executable ที่จัดไว้ใน
`%LOCALAPPDATA%/WBasic` แม้ process ภายนอกมองเห็น ย้ายชุด compiler/runtime/linker
ที่เข้าคู่กันไปยังตำแหน่งที่หน้าต่างนี้เข้าถึงได้ แล้วตั้ง `wbasic.compilerPath`
และ `wbasic.probePath` ตามความจำเป็น ผลนี้จำกัดเฉพาะเครื่องที่ตรวจ
ยังไม่พิสูจน์กฎทั่วไปของ Store/MSIX

### Build ถูกปฏิเสธ

Compiler ต้องประกาศ development build capability และ profile ที่รองรับ Extension จะ
fail closed ไม่สร้างคำสั่งเลียนแบบขึ้นเอง

หาก compiler แจ้งว่าผล build เดิมใช้ runtime คนละชุด ให้เก็บ output เดิมเป็น backup
แล้วสร้างใหม่ด้วย compiler/runtime/linker จากแพ็ก `0.2.0` เดียวกัน อย่า copy DLL หรือ
archive รุ่นเก่ากลับไปทับเพียงเพื่อให้การตรวจผ่าน

### References, Rename หรือ Call Hierarchy ใช้ไม่ได้

ตรวจ capability `editorProject`, `editorSemanticGraph` และ `editorProjectTests` ตามงาน
ที่กำลังทำ Save test files ให้ compiler ค้นพบ case ก่อน การอ้างอิงข้าม app/test ต้อง
ตรวจทุก test context ที่เกี่ยวข้อง; ถ้า context ล้าหรือมี test file ที่ไม่มี case,
extension ปฏิเสธผลบางส่วน ดีกว่าการแก้ชื่อไม่ครบ Project overlay จำกัด 32 เอกสาร,
ไฟล์ละ 1 MiB และรวม 4 MiB ส่วน inline Run Test จำกัด 100 cases/ไฟล์ source 1 MiB

### Module path ถูกแต่ Check ไม่ผ่าน

ใช้ Add Local Module Dependency แทนแก้ TOML แบบเดา ตรวจว่า module อยู่ภายใน workspace,
ไม่ผ่าน symlink และชื่อใน `module.toml` ไม่ซ้ำ

### TUI แสดงความกว้างผิด

รัน `wb tui doctor` ใน terminal/profile/font นั้น ปัญหา font rendering แยกจาก text-width
contract ของ framework อย่าสรุปจาก terminal หนึ่งตัวว่าใช้ได้หรือไม่ได้ทุกระบบ

## ข้อมูลที่ควรแนบเมื่อรายงาน bug

- VS Code version และ architecture
- Extension version
- ผล Show Toolchain Status
- Project manifest ขนาดเล็กที่ทำซ้ำปัญหาได้
- Diagnostic code หรือ bounded language-server trace
- OS/terminal/font เฉพาะเมื่อเกี่ยวกับ native/TUI boundary

อ่านต่อ: [Workflow ประจำวันและขอบเขต]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}})

