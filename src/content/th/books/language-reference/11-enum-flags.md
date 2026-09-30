---
title: "Enum และ Flags"
description: "ชนิดค่าที่มีชื่อ ชุด bit flags และข้อจำกัดการแปลงค่า"
weight: 11
---

`Enum` ใช้เมื่อค่าหนึ่งต้องเป็นหนึ่งในตัวเลือกที่ตั้งชื่อ ส่วน `Flags` ใช้เมื่อค่าหนึ่งรวม
ตัวเลือกหลายข้อได้ ทั้งสองทำให้โปรแกรมบอกความหมายได้ดีกว่าเลขลึกลับที่มาถึงโต๊ะทำงาน
โดยไม่มีป้ายชื่อ

## Enum

```basic
Enum ExportMode
  Csv
  Text
EndEnum

Procedure Main()
  Let mode As ExportMode = ExportMode.Csv
  Select mode
  Case ExportMode.Csv
    PrintLn("CSV")
  Case ExportMode.Text
    PrintLn("Text")
  EndSelect
EndProcedure
```

สมาชิกอยู่ใต้ชื่อ type Enum คนละชนิดใช้แทนกันไม่ได้และไม่แปลงเป็น Integer โดยปริยาย
แต่ละสมาชิกมี ordinal ภายในเริ่มจากศูนย์ตามลำดับประกาศ อย่างไรก็ตาม ordinal ไม่ใช่
persistent wire/file format ถ้าข้อมูลต้องอยู่ข้ามรุ่นให้ serialize ชื่อหรือ mapping ที่ประกาศชัด

## Flags

```basic
Flags FileOptions
  Read
  Write
  Create
EndFlags

Procedure Main()
  Let options As FileOptions = FileOptions.Read | FileOptions.Write
  PrintLn(options.Has(FileOptions.Read).ToString())
EndProcedure
```

สมาชิก Flags ได้ค่า power-of-two อัตโนมัติตามลำดับและมีได้สูงสุด 64 สมาชิก `None`
เป็นชื่อสงวนสำหรับค่า 0 ตัวดำเนินการ `|`, `&`, `^` ใช้กับ Flags ชนิดเดียวกัน
`.Has(flag)` ตรวจว่ามีทุก bit ที่ส่งมา และ `.Has(Type.None)` ให้ True

ห้ามผสม Flags กับ bare Integer แม้หน้าตา bit จะคล้ายกัน เพราะความบังเอิญทางเลขไม่ใช่
สัญญาชนิด `&`, `^`, `|` ยังใช้กับ Integer สองค่าได้ตามปกติ

Enum และ Flags มี value equality ใช้ `=` และ `.Equals()` ได้ แต่ automatic JSON codec
ยังไม่รองรับโดยตรง ให้แปลงเป็นชื่อหรือค่าที่ประกาศ policy เองก่อน serialize
