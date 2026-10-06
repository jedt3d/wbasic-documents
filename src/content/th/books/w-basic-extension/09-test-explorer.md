---
title: "9 · ทดสอบผ่าน Test Explorer"
description: "ค้นพบ รัน เลือก และยกเลิก native WBasic tests โดยรักษา identity ของ compiler"
weight: 9
---

> **ขอบเขตเวอร์ชัน — ชุด private experimental 0.2.0** คู่มือนี้ใช้ compiler/runtime `0.2.0`, protocol `0.1.0` และ VS Code extension `0.3.0` ที่เข้าคู่กันบน Windows/macOS ARM64 รุ่นเก่า `0.1.0`/extension `0.2.1` และการแก้ในเครื่อง `0.2.3` เป็นหลักฐานประวัติ ไม่ได้รับความสามารถ E01–E10 เพียงเพราะติดตั้ง extension ใหม่ ตรวจรุ่นและ capability ด้วย **WBasic: Show Toolchain Status** ก่อนเริ่ม

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

สำหรับ test procedure ที่ compiler ค้นพบ มี **Run Test** อยู่เหนือ declaration ใน editor
กดแล้ว extension ส่ง full test identity ให้ native runner เพื่อรัน case เดียว ไม่เลือก case
อื่นที่ชื่อคล้ายกัน ต้อง save source ของ project ที่เปลี่ยนก่อน; dirty/stale source จะปฏิเสธ
inline action จำกัด source file ไม่เกิน 1 MiB และรายการที่แสดงไม่เกิน 100 case
หากต้องการรันทั้งชุดให้ใช้ Test Explorer หรือ `wb test App.wproj --json`

การกด Stop ระหว่าง native run จะเก็บผลของ case ที่จบแล้ว แยก case ที่ยังไม่เริ่มหรือถูก
ขัดจังหวะออกอย่างชัดเจน ไม่รายงานว่าทั้ง suite ผ่าน การใช้งานจริงในหน้าต่าง VS Code
บน Windows ตรวจการยกเลิกแล้ว โดยผล timeout ที่จบก่อนหน้าคงอยู่ และ case ถัดไปถูก
ระบุว่า skipped พร้อมข้อความ cancellation

{{< guide-screenshot name="09-test-explorer.png" alt="VS Code Testing view แสดง WBasic test group, passing case, assertion failure และ typed data rows พร้อมสถานะแยกกัน" caption="ภาพที่ควรถ่าย: Test Explorer หลัง discovery และ run หลายผลลัพธ์" >}}

## ภารกิจฝึกมือ

สร้าง passing case, assertion-failure case และ typed data rows จาก snippet
`Given/When/Then` แล้วสังเกต label กับสถานะแยกกันใน Test Explorer

อ่านต่อ: [เรียนจาก Examples และ TUI templates]({{< relref "/books/w-basic-extension/10-examples-and-tui.md" >}})


## นำทางและสร้าง test ใน 0.4.0 candidate

**WBasic: Go to Test or Source** ใช้ compiler project inventory และ native test discovery เสนอไฟล์ผู้สมัครทั้งสองทิศทาง โดยไม่อ้างความสัมพันธ์ coverage. **WBasic: New Test Scaffold** ต้องมี directory `tests` อยู่แล้ว สร้างไฟล์ใหม่โดยไม่ทับของเดิม ตรวจ native discovery และใส่ `Test.Check(False, "TODO: specify expected behavior")` ซึ่งต้องล้มเหลวไว้ก่อน ผู้เขียนต้องเติม expected value จริงและรันตาม identity ที่ compiler ค้นพบ; อย่านับ skeleton เป็น coverage ที่ผ่าน. การรันซ้ำผลล้มเหลวต้องรักษา case identity และแยก assertion, timeout, crash และ cancellation. ดู [ขอบเขต candidate]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}}); Test navigation, scaffold ที่ล้มเหลวตามตั้งใจ และ native failed-case rerun ผ่านในหน้าต่าง Windows ที่ติดตั้ง candidate.
