---
title: "6 · Navigation และ refactoring"
description: "ใช้ definition, references, highlights, rename และ direct-call hierarchy จาก compiler"
weight: 6
---

> **ขอบเขตเวอร์ชัน — ชุด private experimental 0.2.0** คู่มือนี้ใช้ compiler/runtime `0.2.0`, protocol `0.1.0` และ VS Code extension `0.3.0` ที่เข้าคู่กันบน Windows/macOS ARM64 รุ่นเก่า `0.1.0`/extension `0.2.1` และการแก้ในเครื่อง `0.2.3` เป็นหลักฐานประวัติ ไม่ได้รับความสามารถ E01–E10 เพียงเพราะติดตั้ง extension ใหม่ ตรวจรุ่นและ capability ด้วย **WBasic: Show Toolchain Status** ก่อนเริ่ม

เมื่อ project โตขึ้น การเลื่อนหา declaration ด้วยสายตาเริ่มแพ้เครื่องมืออย่างสุภาพ
Extension ใช้ identity และ span จาก compiler สำหรับ navigation ข้ามไฟล์

## คำสั่งหลัก

- **Go to Definition** ไปยัง declaration ของ procedure หรือ symbol
- **Find All References** แสดงตำแหน่งใช้งานใน app, module และ test ที่ค้นพบ
- **Peek Definition** เปิด declaration โดยไม่ออกจากตำแหน่งที่เรียก
- **Usage highlights** ขีดเฉพาะตำแหน่งที่มี identity เดียวกันในไฟล์ปัจจุบัน
- **Go to Symbol in Workspace** ค้นหา public/project symbol
- **Rename Symbol** สร้างการแก้ไขหลายไฟล์แล้วให้ compiler ตรวจ snapshot ทั้งชุด
- **Show Call Hierarchy** แสดง caller/callee ของ direct call ที่ compiler resolve ได้

ลองคลิกขวา `Greeting` ใน `Main` แล้วเลือก Go to Definition จากนั้น Find All References
ผลลัพธ์ไม่ควรรวมชื่อใน comment หรือ string

ใช้ **F12** ไปยัง declaration, **Alt+F12** ดู Peek และ **Shift+F12** ดู references
ถ้าชื่อ local ภาษาไทยเหมือนกันในสอง procedure ไฮไลต์กับ references จะติดเฉพาะ
binding ที่ compiler เลือก ไม่รวมตัวที่สะกดเหมือนกันแต่คนละ scope

## Rename ที่ไม่เสี่ยงเดาสุ่ม

เลือก Rename Symbol เปลี่ยน `Greeting` เป็น `WelcomeMessage` Extension จะใช้ compiler
identity จับ declaration และ references แล้วตรวจ source ที่แก้ครบชุดก่อนส่ง WorkspaceEdit
หาก validation ไม่ผ่าน จะไม่แก้เพียงครึ่ง project

{{< guide-screenshot name="06-navigation-rename.png" alt="Rename preview ของ VS Code แสดง declaration และ references ของ WelcomeMessage ใน source สองไฟล์ โดยไม่รวม comment หรือ string" caption="ภาพที่ควรถ่าย: Compiler-validated rename ข้ามไฟล์ก่อนยืนยันการแก้ไข" >}}

Rename ทำงานเมื่อ compiler capability `rename` เป็น true และ overlay อยู่ในขอบเขตที่
รองรับ ปัจจุบัน project overlay จำกัด 32 เอกสารเปิด, ไฟล์ละ 1 MiB และรวม 4 MiB
เมื่อเกินขอบเขต ระบบจะ fail closed แทนการเดา

ใน compiler `0.2.0` graph ครอบคลุม procedure, local, parameter, constant, nominal type
และ field/enum member ที่ resolve ได้ รวมถึง label ของ named argument ที่ผูกกับ parameter
จริง Rename parameter จึงแก้ declaration, การใช้ใน body และ label ของ call ใน app/test
โดยไม่แตะ parameter ชื่อเดียวกันใน method อื่น References และ incoming hierarchy
ตรวจ test files ที่ค้นพบเป็น context แยกกัน เพื่อไม่ให้ rename จาก app ทิ้ง call ใน test
ไว้ข้างหลัง หาก test file ที่บันทึกแล้วไม่มี case ที่ค้นพบหรือ snapshot เปลี่ยนระหว่างตรวจ
คำสั่งจะคืนว่าใช้ไม่ได้ แทนการส่ง edit ที่ไม่ครบ Rename ชื่อ procedure ที่เป็น test entry
ยังไม่รองรับ เพราะอาจเปลี่ยน identity ใน catalog

Call Hierarchy แสดงเฉพาะ direct call ที่ compiler ระบุ caller/callee และตำแหน่งชื่อ call
ได้แน่นอน รวม recursion และ call จาก test ที่ค้นพบ การเรียกผ่าน procedure value แบบ
indirect ไม่มี target ที่จะเดาให้ โหมด Go to Implementation ไม่อยู่ในชุดความสามารถนี้

## สิ่งที่ยังไม่ควรคาดหวัง

- Identifier ที่ compiler ไม่สร้าง semantic identity หรือ reference ครบถ้วนจะไม่ถูกแก้ด้วยการค้นข้อความ
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


## คำสั่งเลือกการกระทำใน 0.4.0 candidate

**WBasic: Actions at Caret** และ **WBasic: Refactor This** รวบรวมการกระทำที่ใช้ได้ตามตำแหน่งและ capability; การเปลี่ยนโครงสร้างที่ compiler ยังไม่รองรับไม่ปรากฏเป็น refactor ที่พิสูจน์แล้ว. **WBasic: Surround With** ห่อ selection ด้วย If หรือ Try/Finally ตามที่ผู้ใช้เลือก ต้องอ่านเงื่อนไขและ cleanup แล้ว Check Project. ดู [ขอบเขต candidate]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}}); Actions at Caret, Refactor This, Rename preview และ Surround With พร้อม Check/Undo ผ่านในหน้าต่าง Windows ที่ติดตั้ง candidate.

### เมื่อ Vim รับปุ่มลัด

ในหน้าต่าง Windows ที่ตรวจ Vim Visual Line mode รับ **Ctrl+B** ก่อนคำสั่ง Definition; ใช้ **Go to Definition** ใน Command Palette หรือ **F12**. **Alt+Enter** เรียก **WBasic: Actions at Caret** เมื่อ binding ไม่ชน. หลังแก้ protocol, F12 ไปยัง Amount ใน project ได้แม้เปิด Template ที่ไม่เป็นสมาชิก project อยู่.
