---
title: "9 · ทดสอบผ่าน Test Explorer"
description: "ค้นพบ รัน เลือก และยกเลิก native WBasic tests โดยรักษา identity ของ compiler"
weight: 9
---

> **ขอบเขตเวอร์ชัน — private v0.1.0 prerelease** ขั้นตอนนี้ใช้ private experimental compiler/runtime `0.1.0` ที่เผยแพร่แล้ว คู่กับ extension `wbasic-dev.wbasic@0.2.1` ในแพ็ก และ protocol package `0.0.2` จาก sealed source `3901cf17` เริ่มที่ [คู่มือแพ็กที่เข้าคู่กัน]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) แพ็ก private compiler `0.0.2` เดิมมี extension `0.1.0` และไม่มี project editor workflow เหล่านี้

เปิดมุมมอง **Testing** ใน Activity Bar เมื่อ project มี test catalog Extension จะเรียก
`wb test MANIFEST --list --json` แล้วสร้าง tree จาก identity ที่ compiler ส่งกลับ

## เขียน test แรก

ใน `tests/main_spec.wbas` ใช้รูปแบบที่ skeleton สร้างให้ หรือเพิ่ม case เช่น:

```basic
Module MyFirstWBasic
Import Test

Public Procedure Test_GivenNameWhenGreetingThenUnicode()
  ' Given: ชื่อผู้ใช้ที่เป็น Unicode
  Let name As String = "นักพัฒนา"

  ' When: สร้างข้อความต้อนรับ
  Let actual As String = Greeting(name)

  ' Then: ข้อความต้องรักษา Unicode ทุกตัว
  Test.Equal(actual, "สวัสดี นักพัฒนา จาก WBasic 🙂", "greeting")
EndProcedure
```

`Given`, `When` และ `Then` ในตัวอย่างเป็น comment ที่ช่วยจัดความคิด ไม่ใช่ keyword
ของภาษา ส่วนการตรวจผลจริงเกิดขึ้นที่ `Test.Equal` รายละเอียด syntax ของ test ให้ยึด skeleton และ
[Testing API]({{< relref "/books/api-reference/testing-and-doctor.md" >}})
ที่ตรงกับ compiler revision ของคุณ

## Discovery และ identity

Test Explorer รักษา case ID, group path, typed data-row ID และ Unicode label ตามรายงาน
ของ compiler การเลือก run case เดียวใช้ full identity filter หาก filter กำกวม Extension
จะปฏิเสธ ไม่ขยายไป run case อื่นอย่างเงียบ ๆ

## อ่านสถานะให้ถูก

| สถานะ | ความหมาย |
|---|---|
| Passed | assertion และ cleanup จบตามสัญญา |
| Failed | assertion ไม่ตรง |
| Error | โปรแกรมทดสอบเกิด typed runtime error |
| Crash | process จบผิดปกติ |
| Timeout | เกิน deadline ของ runner |
| Infrastructure | compiler/linker/harness ทำงานไม่สำเร็จ |

Expected-failure example ใน catalog ถือว่าผ่านบทเรียนเมื่อได้ failure ชนิดที่ประกาศ
แต่ใน Test Explorer การ assertion fail ยังคงแสดงเป็น failed test ไม่ถูกทาสีเขียวเพื่อ
ปลอบใจ

## Run และ Cancel

กด Run ที่ root เพื่อรันทั้งหมด หรือที่ case/data row เพื่อรันเฉพาะรายการ กด Stop เพื่อ
ยกเลิก Extension จะ terminate compiler process tree และปิด run อย่างชัดเจน หาก discovery
พบศูนย์ test จะรายงาน error ไม่แกล้งทำเป็น suite สีเขียว

{{< guide-screenshot name="09-test-explorer.png" alt="VS Code Testing view แสดง WBasic test group, passing case, assertion failure และ typed data rows พร้อมสถานะแยกกัน" caption="ภาพที่ควรถ่าย: Test Explorer หลัง discovery และ run หลายผลลัพธ์" >}}

## ภารกิจฝึกมือ

สร้าง passing case, assertion-failure case และ typed data rows จาก snippet
`Given/When/Then` แล้วสังเกต label กับสถานะแยกกันใน Test Explorer

อ่านต่อ: [เรียนจาก Examples และ TUI templates]({{< relref "/books/w-basic-extension/10-examples-and-tui.md" >}})

