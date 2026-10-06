---
title: "10 · Examples และ TUI workflow"
description: "เปิดหรือ copy ตัวอย่างที่ตรวจแล้ว และเริ่ม TUI/Jobs ด้วย deterministic template"
weight: 10
---

> **ขอบเขตเวอร์ชัน — ชุด private experimental 0.2.0** คู่มือนี้ใช้ compiler/runtime `0.2.0`, protocol `0.1.0` และ VS Code extension `0.3.0` ที่เข้าคู่กันบน Windows/macOS ARM64 รุ่นเก่า `0.1.0`/extension `0.2.1` และการแก้ในเครื่อง `0.2.3` เป็นหลักฐานประวัติ ไม่ได้รับความสามารถ E01–E10 เพียงเพราะติดตั้ง extension ใหม่ ตรวจรุ่นและ capability ด้วย **WBasic: Show Toolchain Status** ก่อนเริ่ม

ชุด 0.3.0 ผ่าน editor/protocol checks บน Windows และ Mac ARM64; การใช้ E01–E10
ผ่านหน้าต่าง VS Code จริงบน Windows เท่านั้น ผลนี้ไม่ครอบคลุม interactive TUI input
ทุก terminal หรือการใช้ editor ผ่าน UI บน Linux

Extension บรรจุ example catalog ที่ผ่านการตรวจโครงสร้างและ hash เดียวกับ repository
ปัจจุบัน catalog มี 32 examples ใน 10 หมวด รวม teaching files 66 ไฟล์ ครอบคลุม language core, modules, tests, streams,
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

ตัวอย่าง `editor-daily-workflow` ใน source tag `v0.2.0` ใช้ฝึก alias, structure field,
Enum member, local ภาษาไทย, rename ข้าม app/module/test, Quick Fix, formatting และ
direct-call hierarchy โดยไม่ต้องใช้ฐานข้อมูล `wb check` ยอมรับ, `wb test` ผ่าน 2/2,
`wb run` แสดง `24` ตัวอย่าง BillingTime แยกต่างหากพิสูจน์ native debug/release กับ
SQLite จริง: fresh invoice มี 2 lines รวม 18000 cents; การรันซ้ำสร้าง invoice ลำดับถัดไป

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

