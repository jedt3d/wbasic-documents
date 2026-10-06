---
title: "12 · Workflow ประจำวันและขอบเขต"
description: "สรุปวงจรเขียน–ตรวจ–ทดสอบ–build และแยกสิ่งที่พร้อมใช้จากสิ่งที่ยัง Planned"
weight: 12
---

> **ขอบเขตเวอร์ชัน — ชุด private experimental 0.2.0** คู่มือนี้ใช้ compiler/runtime `0.2.0`, protocol `0.1.0` และ VS Code extension `0.3.0` ที่เข้าคู่กันบน Windows/macOS ARM64 รุ่นเก่า `0.1.0`/extension `0.2.1` และการแก้ในเครื่อง `0.2.3` เป็นหลักฐานประวัติ ไม่ได้รับความสามารถ E01–E10 เพียงเพราะติดตั้ง extension ใหม่ ตรวจรุ่นและ capability ด้วย **WBasic: Show Toolchain Status** ก่อนเริ่ม

เมื่อคุ้นกับเครื่องมือแล้ว workflow ประจำวันควรสั้นและคาดเดาได้

## วงจรที่แนะนำ

1. เปิด workspace แล้วตรวจ active project ใน WBasic Projects
2. เขียน code โดยใช้ completion, hover และ signature help
3. อ่าน live diagnostics ก่อนเพิ่ม workaround
4. ใช้ definition/references, highlights และ Call Hierarchy เข้าใจผลกระทบก่อน rename
5. Save แล้ว Check Project เมื่อแตะ manifest, module หรือ Import
6. รัน case ที่เกี่ยวข้องผ่าน inline Run Test หรือ Test Explorer
7. Run Project แล้วอ่านผลใน task terminal ที่ยังเปิดอยู่หลังจบ
8. Build Development Debug ระหว่างพัฒนา
9. รันทั้ง suite และ Build Development Release ก่อนส่ง review
10. จัดรูปแบบ Document/Selection เมื่อจำเป็น แล้วบันทึก compiler/extension revision ในหลักฐานที่ต้องทำซ้ำภายหลัง

## Shortcut ทางความคิด

| ต้องการ | เครื่องมือ |
|---|---|
| ดูว่าคำนี้คืออะไร | Hover |
| ดูว่ารับ argument อะไร | Signature Help |
| ไปยังที่ประกาศ | Go to Definition |
| ดูที่ประกาศโดยไม่ออกจากไฟล์ | Peek Definition |
| ดูผลกระทบ | Find All References |
| ดูการใช้คำในไฟล์นี้ | Usage highlights |
| เปลี่ยนชื่อข้ามไฟล์ | Rename Symbol |
| ดูว่าใครเรียกใคร | Show Call Hierarchy → Incoming/Outgoing |
| แก้ keyword case ที่ compiler ระบุ | Ctrl+. → Quick Fix |
| จัดย่อหน้าโดยคง token | Format Document/Format Selection ใน Command Palette |
| ตรวจ unsaved source เดี่ยว | Check Active Source |
| ตรวจ project/module จริง | Check Project |
| รัน project | Run Project ใน terminal ของ VS Code |
| ตรวจพฤติกรรมเล็ก | Test Explorer |
| รัน test ที่ declaration | Run Test เหนือ test procedure ที่ค้นพบ |
| ดู compiler ที่กำลังใช้ | Show Toolchain Status |

## สิ่งที่พร้อมใน guide นี้

- Source/manifest coloring และ Outline
- Compiler-backed diagnostics และ project-aware LSP
- Completion, hover, nested signature help และ workspace symbols
- Cross-file definition/references, Peek, highlights และ compiler-validated rename
- Quick Fix แบบ WB200/WB201 ที่ตรวจ candidate ด้วย compiler
- Format Document/Selection แบบรักษา token, comment, string และ line ending
- Inline Run Test ตาม exact compiler-discovered identity และ direct-call hierarchy
- New Project, active project และ Projects view
- Direct local-module dependency management
- Check, Run, Development Build Debug/Release และ Tasks
- Native Test Explorer และ bundled examples
- Offline v0.3 specification

รายการพร้อมใช้ข้างต้นจำกัดอยู่ที่ชุด compiler/runtime 0.2.0, protocol 0.1.0 และ
extension 0.3.0 ที่ตรวจแล้ว Project editor service เปิดตาม capability record ของ compiler
เท่านั้น compiler รุ่นเก่าอาจไม่มี `editorProject`/`editorSemanticGraph`/`editorProjectTests`
และจะไม่ได้ project feature เหล่านี้เพียงเพราะติดตั้ง extension ใหม่

ตัวอย่าง daily editor workflow ที่ตรวจบน Windows/macOS ARM64 มี `wb check` ยอมรับ,
`wb test` ผ่าน 2/2 และ `wb run` แสดง `24` การกระทำปกติ E01–E10 ผ่านในหน้าต่าง
VS Code จริงบน Windows ส่วน editor/protocol suites บน Windows/Mac ผ่าน 131/131
และ 90/90 ตามลำดับ Inline Run Test ผ่าน happy path แบบหนึ่ง case ส่วนการยกเลิก
native test run ผ่าน Testing/Command Palette ผ่านหน้าต่างจริงแล้ว โดยผลที่จบก่อนหน้า
ยังถูกเก็บและ case ที่ถูกขัดจังหวะแสดงสถานะต่างจาก Passed

## สิ่งที่ยัง Planned หรืออยู่นอกขอบเขต

- Debug Adapter Protocol, breakpoint และ stepping
- Formatter ที่ compiler ออกแบบ layout เอง; formatter ปัจจุบันเป็นตัวร่วมของ extension/protocol
  ที่ปรับ indentation อย่างอนุรักษ์นิยมและไม่เปลี่ยน token
- General import/manifest code actions นอก keyword-case quick fix
- Production entitlement และ fresh no-SDK host acceptance
- Signing, notarization และ Marketplace publication
- Linux ARM64 และ native x86_64 acceptance
- WebView และภาษา/ไลบรารีนอกขอบเขตที่ตรวจแล้ว; ตัวอย่าง WORM M2/M3 ใน catalog นี้ใช้ได้ตามขอบเขตที่ระบุ
- Go to Implementation และ call target ของการเรียกผ่าน procedure value ที่ resolve ไม่ได้

Rename test-entry procedure ที่เปลี่ยน identity ใน catalog ยังไม่รองรับ หาก test file
บน disk ไม่มี case ที่ค้นพบ หรือ snapshot app/test เปลี่ยนระหว่างตรวจ References/Rename/
incoming Call Hierarchy จะไม่ส่งผลบางส่วน Inline Run Test ต้อง save project sources ก่อน
และจำกัด 100 cases กับไฟล์ source 1 MiB; project overlays จำกัด 32 ไฟล์, 1 MiB ต่อไฟล์,
รวม 4 MiB ข้อจำกัดเหล่านี้ช่วยให้ผล editor ตรวจสอบย้อนกลับได้ ไม่ใช่คำสัญญาว่า
identifier ทุกชนิดและทุก expression มี navigation/rename ที่สมบูรณ์

การไม่มี debugger ในรุ่นนี้ไม่ได้แปลว่า Run เป็นของชั่วคราว Run, Build และ Test ใช้
compiler pipeline ที่ทดสอบร่วมกัน เพียงแต่การหยุดโปรแกรมทีละบรรทัดต้องรอ source-level
debug contract ที่พิสูจน์ได้ก่อน

## จบเล่มด้วยการฝึกหนึ่งรอบ

Copy ตัวอย่าง `local-module-project`, เปลี่ยนชื่อ project, เพิ่ม procedure ภาษาไทย,
ใช้ Rename ข้ามไฟล์, เพิ่ม test case, รัน Test Explorer แล้ว Build Development Release
หากทุกขั้นผ่านโดยไม่เปิด terminal ภายนอก คุณได้ใช้เส้นทางหลักของ Extension ครบแล้ว

อ่านต่อได้ที่ [คู่มือภาษา]({{< relref "/books/language-reference/_index.md" >}}),
[ไลบรารีมาตรฐาน]({{< relref "/books/standard-library/_index.md" >}}) และ
[คู่มือ API]({{< relref "/books/api-reference/_index.md" >}})

