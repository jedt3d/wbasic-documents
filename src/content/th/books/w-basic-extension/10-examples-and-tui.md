---
title: "10 · Examples และ TUI workflow"
description: "เปิดหรือ copy ตัวอย่างที่ตรวจแล้ว และเริ่ม TUI/Jobs ด้วย deterministic template"
weight: 10
---

> **ขอบเขตเวอร์ชัน — private v0.1.0 prerelease** ขั้นตอนนี้ใช้ private experimental compiler/runtime `0.1.0` ที่เผยแพร่แล้ว คู่กับ extension `wbasic-dev.wbasic@0.2.1` ในแพ็ก และ protocol package `0.0.2` จาก sealed source `3901cf17` เริ่มที่ [คู่มือแพ็กที่เข้าคู่กัน]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) แพ็ก private compiler `0.0.2` เดิมมี extension `0.1.0` และไม่มี project editor workflow เหล่านี้

Extension บรรจุ example catalog ที่ผ่านการตรวจโครงสร้างและ hash เดียวกับ repository
ปัจจุบันมี 31 examples ใน 10 หมวด รวม teaching files 61 ไฟล์ ครอบคลุม language core, modules, tests, streams,
JSON, Jobs, TUI และ complete SQLite showcase

## Open กับ Copy ต่างกันอย่างไร

**WBasic: Open Example** เปิดตัวอย่างสำหรับอ่านและทดลองตาม action ที่ประกาศ
**WBasic: Copy Example** copy teaching files ไปโฟลเดอร์ใหม่ที่คุณเป็นเจ้าของและไม่แก้
repository specimen

เลือก Copy เมื่อจะทดลอง refactor หรือเพิ่มไฟล์ เลือก Open เมื่ออยากอ่าน source หรือ
ตรวจ feature อย่างรวดเร็ว ตัวอย่างที่ประกาศ expected diagnostic/runtime error/failure
ไม่ได้เสีย แต่กำลังสอน boundary นั้นโดยเจตนา

{{< guide-screenshot name="10-examples.png" alt="Quick Pick ของ WBasic: Open Example แสดงหมวด ชื่อ ระดับ และ action ของตัวอย่างโดยไม่มี recent files ส่วนตัว" caption="ภาพที่ควรถ่าย: Example picker ที่ใช้เลือกบทเรียนตามหัวข้อ" >}}

## เส้นทางเรียนที่แนะนำ

1. `hello-wbasic` — Run source และ Unicode output
2. `language-core` — declaration, control flow และ procedure
3. `local-module-project` — manifest, dependency และ navigation ข้ามไฟล์
4. `native-test-basics` — Test Explorer
5. `memory-streams` และ `json-values` — typed API help
6. `tui-counter` — deterministic model/update/view
7. `sqlite-customer-showcase` — project ขนาดใหญ่ที่ประกอบหลาย module

`worm-m2-sqlite` กับ `worm-m3-billing` copy เป็น project ครบชุดได้ รวม module และ SQLite schema เมื่อจำเป็น Automated action ของสองตัวนี้คือ Check และ Build ถ้าจะรันตัวอย่างฐานข้อมูล ต้องส่ง path ของ SQLite เป็น program argument หลัง `--` อย่างชัดเจน คำสั่ง Run Project ทั่วไปไม่ถาม path นี้ `worm-m4-ui-reference` เปิดได้เฉพาะ reference ใน repository และไม่อยู่ใน Copy Example เพราะต้อง stage Billing module ไปยัง local dependency path ก่อน

## New TUI/Jobs Example

**WBasic: New TUI/Jobs Example** เปิด template เป็น unsaved document ให้เลือก terminal
counter หรือ deterministic headless Jobs example Save ก่อน Run

เริ่มจาก headless test เพื่อพิสูจน์ state transition และ virtual clock จากนั้นค่อยใช้
integrated terminal กับ Tui.Run วิธีนี้ทำให้ bug ส่วนใหญ่ถูกจับโดย test ก่อน terminal
จะเข้ามาเพิ่มสีสันและ escape sequence

## TUI doctor

Terminal/font capability ต้องตรวจใน terminal โดยตรง:

```console
wb tui doctor
```

หรือบันทึกรายงานแบบไม่ interactive:

```console
wb tui doctor --non-interactive --format json --output REPORT.json
```

Extension ไม่รัน doctor อัตโนมัติ เพราะ terminal profile, font และ endpoint เป็นข้อมูล
ของ session จริง ไม่ควรถูกเดาจาก editor

อ่านต่อ: [Settings, Trust และ troubleshooting]({{< relref "/books/w-basic-extension/11-settings-trust-troubleshooting.md" >}})

