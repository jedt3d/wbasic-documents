---
title: "6 · Navigation และ refactoring"
description: "ใช้ definition, references, workspace symbols และ compiler-validated rename ข้ามไฟล์"
weight: 6
---

> **ขอบเขตเวอร์ชัน — private v0.1.0 prerelease** ขั้นตอนนี้ใช้ private experimental compiler/runtime `0.1.0` ที่เผยแพร่แล้ว คู่กับ extension `wbasic-dev.wbasic@0.2.1` ในแพ็ก และ protocol package `0.0.2` จาก sealed source `3901cf17` เริ่มที่ [คู่มือแพ็กที่เข้าคู่กัน]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) แพ็ก private compiler `0.0.2` เดิมมี extension `0.1.0` และไม่มี project editor workflow เหล่านี้

เมื่อ project โตขึ้น การเลื่อนหา declaration ด้วยสายตาเริ่มแพ้เครื่องมืออย่างสุภาพ
Extension ใช้ identity และ span จาก compiler สำหรับ navigation ข้ามไฟล์

## คำสั่งหลัก

- **Go to Definition** ไปยัง declaration ของ procedure หรือ symbol
- **Find All References** แสดงตำแหน่งใช้งานใน project
- **Go to Symbol in Workspace** ค้นหา public/project symbol
- **Rename Symbol** สร้างการแก้ไขหลายไฟล์แล้วให้ compiler ตรวจ snapshot ทั้งชุด

ลองคลิกขวา `Greeting` ใน `Main` แล้วเลือก Go to Definition จากนั้น Find All References
ผลลัพธ์ไม่ควรรวมชื่อใน comment หรือ string

## Rename ที่ไม่เสี่ยงเดาสุ่ม

เลือก Rename Symbol เปลี่ยน `Greeting` เป็น `WelcomeMessage` Extension จะใช้ compiler
identity จับ declaration และ references แล้วตรวจ source ที่แก้ครบชุดก่อนส่ง WorkspaceEdit
หาก validation ไม่ผ่าน จะไม่แก้เพียงครึ่ง project

{{< guide-screenshot name="06-navigation-rename.png" alt="Rename preview ของ VS Code แสดง declaration และ references ของ WelcomeMessage ใน source สองไฟล์ โดยไม่รวม comment หรือ string" caption="ภาพที่ควรถ่าย: Compiler-validated rename ข้ามไฟล์ก่อนยืนยันการแก้ไข" >}}

Rename ทำงานเมื่อ compiler capability `rename` เป็น true และ overlay อยู่ในขอบเขตที่
รองรับ ปัจจุบัน project overlay จำกัด 32 เอกสารเปิด, ไฟล์ละ 1 MiB และรวม 4 MiB
เมื่อเกินขอบเขต ระบบจะ fail closed แทนการเดา

## สิ่งที่ยังไม่ควรคาดหวัง

- Local-variable indexing ครบทุก scope ยังไม่มี
- Rename ข้าม project ที่ไม่เป็น dependency กันไม่ได้
- String-based reflection ไม่ถือเป็น reference
- Textual Include และ global include path ไม่มีในภาษา

สำหรับ module และ visibility อ่าน
[Module, package และ visibility]({{< relref "/books/language-reference/12-modules-packages-visibility.md" >}})

## ภารกิจฝึกมือ

1. สร้างไฟล์ `src/Messages.wbas`
2. ย้าย `Greeting` ไปไฟล์ใหม่โดยคง `Module MyFirstWBasic`
3. ใช้ Go to Definition จาก `Main.wbas`
4. Rename ผ่านเครื่องมือ
5. Save แล้ว Check Project

อ่านต่อ: [จัดการ module และ dependency path]({{< relref "/books/w-basic-extension/07-modules-and-dependency-paths.md" >}})

