---
title: "Entry point, เครื่องมือ และ diagnostics"
description: "Main ที่รองรับ คำสั่งพัฒนาที่มีอยู่ และสัญญารายงานข้อผิดพลาด"
weight: 13
---

บทสุดท้ายเชื่อมภาษากับเครื่องมือที่ใช้งาน implementation ปัจจุบัน หนังสือแยกคำสั่งที่
ตรวจแล้วออกจากสิ่งที่อยู่ในแผน เพื่อไม่ให้ตาราง roadmap แอบปลอมตัวเป็นคู่มือใช้งาน

หลักฐาน native ของคำสั่งในบทนี้มาจาก Windows 11 ARM64 และ macOS ARM64 ตาม
environment ที่บันทึกไว้ ยังไม่ใช่คำรับรองสำหรับ Linux ARM64, native x86_64 หรือ
เครื่องผู้ใช้ปลายทางที่ไม่มี SDK

## Main สามรูปแบบ

Executable มี `Main` ได้หนึ่งตัวและรองรับสาม signature:

```basic
Procedure Main()
EndProcedure
```

```basic
Procedure Main() As Integer
  Return 0
EndProcedure
```

```basic
Procedure Main(args As Array Of String) As Integer
  PrintLn(args.Length.ToString())
  Return 0
EndProcedure
```

Main ที่ไม่คืนค่าให้ exit status 0 เมื่อจบปกติ `args` ไม่รวมชื่อ executable และรักษา
Unicode arguments ค่า status ที่ผู้ใช้คืนต้องอยู่ระหว่าง 0–255 ค่านอกช่วงเป็น runtime
Validation error

## ตรวจและรัน

ตรวจ source โดยไม่ execute:

```console
wb check hello.wbas --json
```

รัน standalone file หรือ project manifest ผ่าน native development runner:

```console
wb run hello.wbas
wb run App.wproj -- first "ภาษาไทย"
```

`wb run` compile/link native executable ไม่ใช่ interpreter รุ่นที่เผยแพร่ล่าสุดคือ
**compiler/runtime 0.1.0** รุ่นเดียวกับ compiler ที่ Extension 0.2.3 ที่ตรวจในเครื่องแล้วเลือกใช้ โดย ZIP ที่เผยแพร่ยังบรรจุ 0.2.1
project และ module ต้อง pin `toolchain` ให้ตรงกัน ZIP ทั้งสองแพลตฟอร์มผ่าน
การทดสอบหลังแตกไฟล์บนเครื่องนักพัฒนาแล้ว ส่วน fresh-host no-SDK acceptance
ยังเป็น gate แยกที่ไม่ผ่าน

`wb build` รับ **project manifest** ไม่รับไฟล์ `.wbas` เดี่ยว:

```console
wb build App.wproj --profile release
```

คำสั่ง `check`, `emit-object`, `run`, `build` และ `test` รับ `--profile debug|release`;
หากไม่ระบุใช้ debug การ build นี้อยู่ในขอบเขตพัฒนาภายใน `wb --capabilities`
รายงาน `productionBuildEntitlement: false` และ `noSdkDistribution: false`

## ทดสอบ WBasic

`wb test` ค้น public procedures ที่ตรง convention ของ Test module และรันแต่ละ case
แยกจากกัน:

```console
wb test . --list
wb test App.wproj --filter Customer --json
```

Runner แยก assertion failure, unexpected Error, process crash และ timeout; zero discovered
tests ไม่ผ่านเงียบ ตัวเลือก `--allow-empty` ต้องระบุเจตนาเอง ชุด Test ปัจจุบันรองรับ
typed data rows, reports แบบกลุ่ม, structural collection/JSON matchers และ scoped aggregate

## เครื่องมือวิเคราะห์ที่มีอยู่

`wb symbols FILE --json` และ `wb references FILE --json` เปิด metadata ที่ผ่าน compiler
ให้ editor/protocol ส่วน `wb project-info MANIFEST --json` อ่าน project metadata และ
`wb --capabilities` รายงานความสามารถที่ binary นี้โฆษณา คำสั่งเหล่านี้ใช้ compiler
ชุดเดียวกับ check ไม่สร้าง parser เงาอีกชุด

ใน compiler 0.1.0 มี `wb editor-project --json` และ
`wb editor-manifest --json` รับ versioned JSON request ทาง stdin เพื่อวิเคราะห์
project/manifest โดยไม่ execute โปรแกรม ใช้กับ source overlays ที่ยังไม่บันทึก
LSP/Extension ใช้รายงานนี้กับ diagnostics, completion และ navigation ข้ามไฟล์
เมื่อ compiler รายงาน `editorProject: true` รุ่นเก่าจะได้เฉพาะบริการที่ capability
รองรับ ดู [ขอบเขตเวอร์ชัน]({{< relref "/implementation-status.md" >}})

สำหรับ terminal ใช้:

```console
wb tui doctor --font "JetBrainsMonoNL Nerd Font Mono" --format json --output report.json
```

Doctor แยกสิ่งที่ตรวจอัตโนมัติ ข้อมูล font ที่ผู้ใช้กรอก และผล visual inspection
มันไม่เปลี่ยน font settings และไม่เดาว่า glyph สวยเพียงเพราะ protocol ตอบได้

## Diagnostic คือข้อมูล ไม่ใช่เพียงประโยคสีแดง

Diagnostic มี stable code, stage, source file, line/column และช่วง source ที่ผิด รวมถึง
ข้อความแนะนำที่พูดด้วยศัพท์ WBasic JSON output เหมาะกับ editor, MCP/LSP และ CI
Source spans ภายในเก็บ byte offsets ได้ แต่ adapter แปลงเป็น position encoding ของ editor
อย่างถูกต้อง ชื่อไฟล์และข้อความ Unicode จึงไม่ทำให้ caret เลื่อนไปผิดตัว

CLI ยังไม่โฆษณา `wb fmt` การที่ `wb build` สำเร็จยังไม่ใช่หลักฐานว่าแพ็กเกจพร้อม
แจกจ่ายจริง ผ่านการลงนาม หรือผ่านการทดสอบบนเครื่องสะอาดที่ไม่มี SDK
