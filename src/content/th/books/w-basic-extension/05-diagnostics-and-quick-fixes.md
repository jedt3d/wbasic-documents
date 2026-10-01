---
title: "5 · อ่าน diagnostics และใช้ quick fix"
description: "แยก syntax, type และ infrastructure error พร้อมใช้ keyword-case fix อย่างปลอดภัย"
weight: 5
---

> **ขอบเขตเวอร์ชัน — private v0.1.0 prerelease** ขั้นตอนนี้ใช้ private experimental compiler/runtime `0.1.0` ที่เผยแพร่แล้ว คู่กับ extension `wbasic-dev.wbasic@0.2.1` ในแพ็ก และ protocol package `0.0.2` จาก sealed source `3901cf17` เริ่มที่ [คู่มือแพ็กที่เข้าคู่กัน]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) แพ็ก private compiler `0.0.2` เดิมมี extension `0.1.0` และไม่มี project editor workflow เหล่านี้

Diagnostics ที่ดีไม่ควรเพียงบอกว่า “ผิด” แต่ควรบอกไฟล์ ตำแหน่ง stage และรหัสที่ช่วยให้
แก้สาเหตุแทนการสุ่มเติม semicolon ซึ่งใน WBasic ก็ไม่ได้ช่วยอะไรอยู่ดี

## ทดลองสร้าง type error

แก้ `Main` ชั่วคราวเป็น:

```basic
Procedure Main()
  Let count As Integer = 3
  If count Then
    PrintLn("ไม่ควรผ่าน")
  EndIf
EndProcedure
```

เงื่อนไข `If` ต้องเป็น Boolean compiler จึงขีดช่วง `count` และแสดง diagnostic
เปิด Problems panel แล้วคลิกรายการเพื่อกลับไปยังตำแหน่งนั้น แก้เป็น:

```basic
If count > 0 Then
```

{{< guide-screenshot name="05-diagnostics.png" alt="Main.wbas มี typed Boolean diagnostic ใต้ count และ Problems panel แสดงไฟล์ บรรทัด คอลัมน์และ diagnostic code" caption="ภาพที่ควรถ่าย: Type error ที่ compiler ระบุตำแหน่งตรงกับ Problems panel" >}}

## Unsaved diagnostics กับ saved project

Language server ส่ง unsaved source เป็น bounded overlay ให้ compiler จึงวิเคราะห์ไฟล์
ที่กำลังพิมพ์ได้โดยไม่ต้อง save ทุกตัวอักษร ผลเก่าที่มาช้าจะถูกทิ้ง ไม่ย้อนมาทับผลของ
ข้อความรุ่นใหม่

อย่างไรก็ตาม manifest และ dependency workflow อาศัย project ที่บันทึกแล้ว หาก error
เกี่ยวกับ Import หรือ module path ให้ save แล้วใช้ **Check Project**

Project service วิเคราะห์ไฟล์ที่เปิดและยังไม่บันทึกร่วมกันเป็น snapshot ของ project แบบมีขอบเขต เมื่อ manifest หรือ dependency เปลี่ยน หรือ snapshot ถูกปฏิเสธ ผลเก่าของ open overlay ที่เกี่ยวข้องจะถูกล้าง Save แล้วใช้ Check Project เพื่อยืนยันสถานะไฟล์บนดิสก์ทั้งหมด

## Keyword case quick fix

เมื่อ compiler ส่ง WB200/WB201 สำหรับ keyword ที่สะกดตัวพิมพ์ผิด Extension อาจเสนอ
Quick Fix เพื่อแก้เฉพาะ span นั้น Candidate จะถูกตรวจด้วย compiler อีกครั้งก่อนใช้
Extension ไม่ค้นหาแล้วแทนคำเหมือนกันทั้งไฟล์ และไม่แตะ comment หรือ string

ถ้าไม่มี quick fix ไม่ได้แปลว่า extension เสีย อาจเป็น error ที่ไม่มี safe edit หรือ
compiler รุ่นที่เชื่อมอยู่ไม่ได้เปิด capability `quickFix`

## แยกปัญหาให้ถูกชั้น

| อาการ | ตรวจที่ไหนก่อน |
|---|---|
| ขีดแดงใน source | Problems และ diagnostic code |
| Manifest หรือ Import หาไม่พบ | Save แล้ว Check Project |
| คำสั่งหายจาก Command Palette | Workspace Trust และ compiler capabilities |
| Compiler เริ่มไม่ได้ | Show Toolchain Status |
| Language help หยุดอัปเดต | Show Language Server Output |

รายละเอียด diagnostic contract อยู่ใน
[Entry point, เครื่องมือ และ diagnostics]({{< relref "/books/language-reference/13-entry-tools-diagnostics.md" >}})

อ่านต่อ: [กระโดดหา code และ rename อย่างปลอดภัย]({{< relref "/books/w-basic-extension/06-navigation-and-refactoring.md" >}})

