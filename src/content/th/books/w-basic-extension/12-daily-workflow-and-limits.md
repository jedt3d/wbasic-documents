---
title: "12 · Workflow ประจำวันและขอบเขต"
description: "สรุปวงจรเขียน–ตรวจ–ทดสอบ–build และแยกสิ่งที่พร้อมใช้จากสิ่งที่ยัง Planned"
weight: 12
---

> **ขอบเขตเวอร์ชัน — extension 0.2.3 ที่ตรวจในเครื่องแล้ว** VSIX รุ่น 0.2.3 ตรวจในเครื่องกับ development compiler/runtime ที่เข้าคู่กัน ส่วน private experimental compiler/runtime ที่เผยแพร่เป็นรุ่น `0.1.0` กับ protocol package `0.0.2` ZIP ARM64 ที่เผยแพร่บรรจุ extension `0.2.1` ไว้ตามเดิม ไม่มีการเผยแพร่ extension `0.2.3` หรือขึ้น Marketplace เริ่มที่ [คู่มือแพ็ก]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) แพ็ก private compiler `0.0.2` เดิมมี extension `0.1.0` และไม่มี project editor workflow เหล่านี้

เมื่อคุ้นกับเครื่องมือแล้ว workflow ประจำวันควรสั้นและคาดเดาได้

## วงจรที่แนะนำ

1. เปิด workspace แล้วตรวจ active project ใน WBasic Projects
2. เขียน code โดยใช้ completion, hover และ signature help
3. อ่าน live diagnostics ก่อนเพิ่ม workaround
4. ใช้ definition/references เข้าใจผลกระทบก่อน rename
5. Save แล้ว Check Project เมื่อแตะ manifest, module หรือ Import
6. รัน case ที่เกี่ยวข้องใน Test Explorer
7. Run Project แล้วอ่านผลใน task terminal ที่ยังเปิดอยู่หลังจบ
8. Build Development Debug ระหว่างพัฒนา
9. รันทั้ง suite และ Build Development Release ก่อนส่ง review
10. บันทึก compiler/extension revision ในหลักฐานที่ต้องทำซ้ำภายหลัง

## Shortcut ทางความคิด

| ต้องการ | เครื่องมือ |
|---|---|
| ดูว่าคำนี้คืออะไร | Hover |
| ดูว่ารับ argument อะไร | Signature Help |
| ไปยังที่ประกาศ | Go to Definition |
| ดูผลกระทบ | Find All References |
| เปลี่ยนชื่อข้ามไฟล์ | Rename Symbol |
| ตรวจ unsaved source เดี่ยว | Check Active Source |
| ตรวจ project/module จริง | Check Project |
| รัน project | Run Project (TUI แบบรับ input ยังไม่ได้ทดสอบซ้ำใน 0.2.3) |
| ตรวจพฤติกรรมเล็ก | Test Explorer |
| ดู compiler ที่กำลังใช้ | Show Toolchain Status |

## สิ่งที่พร้อมใน guide นี้

- Source/manifest coloring และ Outline
- Compiler-backed diagnostics และ project-aware LSP
- Completion, hover, nested signature help และ workspace symbols
- Cross-file definition/references และ validated rename
- New Project, active project และ Projects view
- Direct local-module dependency management
- Check, Run, Development Build Debug/Release และ Tasks
- Native Test Explorer และ bundled examples
- Offline v0.3 specification

รายการพร้อมใช้ข้างต้นจำกัดอยู่ที่คู่ development ที่ตรวจในเครื่อง Project editor service เปิดตาม capability record ของ compiler เท่านั้น compiler รุ่นเก่าอาจไม่มี `editorProject` และจะไม่ได้ project feature เหล่านี้เพียงเพราะติดตั้ง extension ใหม่

## สิ่งที่ยัง Planned หรืออยู่นอกขอบเขต

- Debug Adapter Protocol, breakpoint และ stepping
- Compiler-backed formatter
- General import/manifest code actions นอก keyword-case quick fix
- Production entitlement และ fresh no-SDK host acceptance
- Signing, notarization และ Marketplace publication
- Linux ARM64 และ native x86_64 acceptance
- WebView และภาษา/ไลบรารีนอกขอบเขตที่ตรวจแล้ว; ตัวอย่าง WORM M2/M3 ใน catalog นี้ใช้ได้ตามขอบเขตที่ระบุ

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

