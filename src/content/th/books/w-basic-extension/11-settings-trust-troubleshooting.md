---
title: "11 · Settings, Trust และ troubleshooting"
description: "ตั้งค่าเฉพาะที่จำเป็น อ่าน log และแก้ปัญหาเป็นชั้นโดยไม่รีเซ็ตทุกอย่าง"
weight: 11
---

> **ขอบเขตเวอร์ชัน — extension 0.2.3 ที่ตรวจในเครื่องแล้ว** VSIX รุ่น 0.2.3 ตรวจในเครื่องกับ development compiler/runtime ที่เข้าคู่กัน ส่วน private experimental compiler/runtime ที่เผยแพร่เป็นรุ่น `0.1.0` กับ protocol package `0.0.2` ZIP ARM64 ที่เผยแพร่บรรจุ extension `0.2.1` ไว้ตามเดิม ไม่มีการเผยแพร่ extension `0.2.3` หรือขึ้น Marketplace เริ่มที่ [คู่มือแพ็ก]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) แพ็ก private compiler `0.0.2` เดิมมี extension `0.1.0` และไม่มี project editor workflow เหล่านี้

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

คู่มือรุ่น 0.2.3 นี้ใช้ `wbasic.defaultProfile` เช่นเดียวกับ 0.2.1 และ 0.2.2 ส่วน extension เดิม 0.1.0 ใช้ `wbasic.buildProfile` จึงต้องตั้งค่าให้ตรงกับ extension ที่โหลดจริง หลังเปลี่ยน VSIX ให้ Reload Window แล้วตรวจ Show Toolchain Status ว่าเป็น compiler `0.1.0`

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

ตรวจชนิด receiver และ capability ของ compiler ปัจจุบัน Arbitrary expression chain,
intrinsic String/Array member metadata และ local-variable navigation ยังไม่ครบ

### ค้นหา Check, Run หรือ Build ไม่พบ

รุ่น 0.2.3 แสดง **Check Project**, **Run Project** และ Build Project (Development)
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

