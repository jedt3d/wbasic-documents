---
title: "10 · Examples และ TUI workflow"
description: "เปิดหรือ copy ตัวอย่างที่ตรวจแล้ว และเริ่ม TUI/Jobs ด้วย deterministic template"
weight: 10
---

> **ขอบเขตเวอร์ชัน — branch R8B** บทนี้อธิบาย development branch `wbasic-dev.wbasic@0.2.0` ที่ยังไม่ได้รวม Extension ที่รวมแล้วเป็น `0.1.0` และไม่มีบางคำสั่งหรือมุมมองด้านล่าง ถ้าใช้ compiler `0.0.2` ณ `143be583` ให้อ่าน [วิธีใช้รุ่นที่รวมแล้ว]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}).

Extension บรรจุ example catalog ที่ผ่านการตรวจโครงสร้างและ hash เดียวกับ repository
ปัจจุบันมี 27 examples ใน 10 หมวด ครอบคลุม language core, modules, tests, streams,
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

