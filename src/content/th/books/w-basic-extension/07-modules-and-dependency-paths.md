---
title: "7 · Module และ dependency paths"
description: "เพิ่ม local module ผ่าน manifest โดยไม่ใช้ Include หรือ search path ที่ซ่อนอยู่"
weight: 7
---

> **ขอบเขตเวอร์ชัน — branch R8B** บทนี้อธิบาย development branch `wbasic-dev.wbasic@0.2.0` ที่ยังไม่ได้รวม Extension ที่รวมแล้วเป็น `0.1.0` และไม่มีบางคำสั่งหรือมุมมองด้านล่าง ถ้าใช้ compiler `0.0.2` ณ `143be583` ให้อ่าน [วิธีใช้รุ่นที่รวมแล้ว]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}).

WBasic แบ่ง code ด้วย Module, Import และ direct dependency ใน manifest ภาษาไม่มี textual
`Include` และ Extension ไม่มี global include path ให้ตั้ง การรู้ว่า source มาจากไหนจึง
อ่านได้จาก project โดยไม่ต้องตามหาค่าในเครื่องของแต่ละคน

## โครง local module

ตัวอย่าง module ชื่อ `Acme`:

```text
MyFirstWBasic/
|-- App.wproj
|-- src/
`-- modules/
    `-- Acme.wmod/
        |-- module.toml
        `-- src/
            `-- Math/
                `-- Total.wbas
```

`module.toml` มีรูปแบบ:

```toml
[module]
name = "Acme"
toolchain = "0.0.1"
```

## เพิ่มผ่าน Extension

1. สร้างหรือ copy module ไว้ภายใน workspace
2. เลือก project ใน **WBasic Projects**
3. ใช้ **WBasic: Add Local Module Dependency**
4. เลือกโฟลเดอร์ที่ลงท้าย `.wmod`
5. อ่าน preview แล้วเลือก Apply

Extension ตรวจทั้ง project และ module manifest, ปฏิเสธ path ที่ออกนอก workspace,
symlink, ชื่อซ้ำ และ path ซ้ำ จากนั้นบันทึก relative path แบบ forward slash พร้อมรักษา
comment, ordering และ line ending ที่ไม่เกี่ยวข้อง

{{< guide-screenshot name="07-module-dependency.png" alt="App.wproj เปิดที่ dependencies พร้อม preview การเพิ่ม Acme จาก modules/Acme.wmod และ Projects view แสดง direct module" caption="ภาพที่ควรถ่าย: Preview ก่อนเพิ่ม local module และผลใน manifest" >}}

ผลใน `App.wproj` จะคล้าย:

```toml
[dependencies]
Acme = { path = "modules/Acme.wmod" }
```

ใช้ **Show Project Modules and Dependencies** เพื่อตรวจว่า compiler เห็น dependency
ตรงกับ manifest และใช้ **Remove Local Module Dependency** เมื่อต้องการลบรายการ
คำสั่งลบแก้ manifest เท่านั้น ไม่ลบโฟลเดอร์ module จาก disk

## Import จาก source

```basic
Module MyFirstWBasic
Import Acme.Math As Numbers

Procedure Main()
  PrintLn(Numbers.Total(5).ToString())
EndProcedure
```

Public ใช้ข้าม dependency ได้, Internal ใช้ร่วมภายใน package/module boundary ที่กำหนด
และ Private จำกัดตามกฎ module ในสเปก Completion กับ navigation จะเคารพ visibility
จาก compiler

## จุดตรวจ

- [ ] Dependency อยู่ใน `[dependencies]` เพียงครั้งเดียว
- [ ] Projects view แสดง module path
- [ ] Go to Definition กระโดดเข้าไฟล์ของ module ได้
- [ ] Check Project ผ่านหลัง Import

อ่านต่อ: [Run, Build และ Tasks]({{< relref "/books/w-basic-extension/08-run-build-and-tasks.md" >}})

