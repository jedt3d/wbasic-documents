---
title: "2 · สร้าง project แรก"
description: "ใช้ New Project สร้าง manifest, source และ test skeleton โดยไม่ต้องวางไฟล์เอง"
weight: 2
---

> **ขอบเขตเวอร์ชัน — extension 0.2.3 ที่ตรวจในเครื่องแล้ว** VSIX รุ่น 0.2.3 ตรวจในเครื่องกับ development compiler/runtime ที่เข้าคู่กัน ส่วน private experimental compiler/runtime ที่เผยแพร่เป็นรุ่น `0.1.0` กับ protocol package `0.0.2` ZIP ARM64 ที่เผยแพร่บรรจุ extension `0.2.1` ไว้ตามเดิม ไม่มีการเผยแพร่ extension `0.2.3` หรือขึ้น Marketplace เริ่มที่ [คู่มือแพ็ก]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) แพ็ก private compiler `0.0.2` เดิมมี extension `0.1.0` และไม่มี project editor workflow เหล่านี้

เราจะสร้าง `MyFirstWBasic` ด้วยคำสั่งของ extension เพื่อให้ได้โครงเดียวกับที่ compiler
และ Test Explorer คาดหวัง

## สร้างจาก Command Palette

1. เปิด Command Palette
2. เลือก **WBasic: New Project**
3. เลือกโฟลเดอร์ว่างที่จะเป็นรากของ project
4. ตั้งชื่อ `MyFirstWBasic`
5. เปิดโฟลเดอร์นั้นเป็น workspace เมื่อ VS Code เสนอ

{{< guide-screenshot name="02-new-project.png" alt="Command Palette ของ VS Code เลือก WBasic: New Project และหน้าต่างเลือกโฟลเดอร์ว่าง โดยไม่แสดง recent projects ส่วนตัว" caption="ภาพที่ควรถ่าย: จุดเริ่มคำสั่ง New Project และการเลือกโฟลเดอร์ปลายทาง" >}}

ชื่อ project ต้องเป็น Unicode identifier แบบ NFC ที่ compiler ยอมรับ ชื่อภาษาไทยใช้ได้
แต่ไม่ควรใช้ชื่อที่ต่างกันเพียงรูป normalization เพราะมนุษย์มองเหมือนกัน ส่วนเครื่องมือ
ต้องนั่งแยกแยะเหมือนตรวจลายมือ

คำสั่งจะไม่เขียนทับไฟล์เดิม โฟลเดอร์ปลายทางจึงต้องว่าง ผลลัพธ์มีโครงดังนี้:

```text
MyFirstWBasic/
|-- App.wproj
|-- src/
|   `-- Main.wbas
`-- tests/
    |-- main_spec.wbas
    `-- test-catalog.json
```

ไฟล์ `App.wproj` ที่สร้างจะเขียนค่า `toolchain` จากเวอร์ชันที่ compiler ตัวที่เลือกประกาศ คู่ที่ใช้ในเล่มนี้ต้องเป็น `0.1.0` ตรวจค่านี้ก่อนทำต่อ หากเลือก compiler อื่น ค่าใน manifest จะเป็นเวอร์ชันของตัวนั้น

## รู้จักไฟล์ทั้งสี่

`App.wproj` เป็น manifest ระบุชื่อ module, entry source, toolchain และ direct dependency
ของ project ส่วน `src/Main.wbas` เป็นโปรแกรมเริ่มต้น

`tests/main_spec.wbas` เก็บ test source และ `tests/test-catalog.json` เก็บรายการ test
ที่ native runner ใช้ค้นพบ case ต่าง ๆ Extension อ่าน identity จาก compiler ไม่ตั้งชื่อ
test ขึ้นเอง

## เลือก active project

ถ้า workspace มี `.wproj` เพียงไฟล์เดียว extension จะเลือกให้โดยอัตโนมัติ ถ้ามีหลายไฟล์
ให้ใช้ **WBasic: Select Active Project** การเลือกถูกจำแยกตาม workspace folder ดังนั้น
multi-root workspace จะไม่เผลอเอา project ฝั่งซ้ายไป build ในฝั่งขวา

เปิดมุมมอง **WBasic Projects** แล้วกด refresh หากยังไม่เห็น manifest มุมมองนี้จะแสดง
entry source, namespace, dependency, profile และ toolchain ของ project ที่เลือก

{{< guide-screenshot name="03-projects-view.png" alt="Explorer แสดง App.wproj, src, tests และ WBasic Projects view แสดง active project, entry, profile และ toolchain" caption="ภาพที่ควรถ่าย: โครง project ที่สร้างเสร็จพร้อม Projects view" >}}

## ภารกิจฝึกมือ

เปิด `App.wproj` แล้วทดลองพิมพ์บรรทัดใหม่ใต้ `[project]` สังเกต completion ของ key
จากนั้นยกเลิกการแก้ไข เรายังไม่ควรเพิ่ม key ที่ไม่เข้าใจเพียงเพราะรายการ completion
ดูน่าเก็บสะสม

## จุดตรวจ

- [ ] มีไฟล์ทั้งสี่ตามโครง
- [ ] `App.wproj` ใช้ภาษา `WBasic Manifest`
- [ ] `Main.wbas` ใช้ภาษา `WBasic`
- [ ] WBasic Projects แสดง project และ entry ถูกต้อง

อ่านต่อ: [เดินชม workspace และ manifest]({{< relref "/books/w-basic-extension/03-workspace-and-manifest.md" >}})

