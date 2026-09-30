---
title: "ข้อความต้นฉบับ ชื่อ literal และการจัดบรรทัด"
description: "วิธีที่ WBasic อ่าน UTF-8, identifier, comment, ตัวเลข, string และ logical line"
weight: 2
---

## encoding และตัวพิมพ์เล็กใหญ่

ไฟล์ WBasic ใช้ UTF-8 จะมี byte-order mark หรือไม่ก็ได้ LF และ CRLF มีความหมาย
เหมือนกัน diagnostic เก็บไฟล์ บรรทัด คอลัมน์ และช่วงข้อความเดิมไว้

keyword และ identifier แยกตัวพิมพ์เล็กใหญ่ ต้องเขียน keyword ตามรูปที่กำหนด เช่น
`Procedure`, `Let` และ `EndProcedure` ส่วน `total`, `Total` และ `TOTAL` คือสามชื่อ
ที่ต่างกัน

## identifier แบบ Unicode

ชื่ออาจใช้อักษรไทยและระบบอักษรอื่นได้:

```basic
Procedure ทักทาย(ชื่อ As String) As String
  Return $"สวัสดี {ชื่อ}"
EndProcedure
```

อักขระตัวแรกต้องเป็น `_` หรืออักขระตาม Unicode `XID_Start` ส่วนอักขระถัดไปต้อง
เป็น `_` หรืออักขระตาม `XID_Continue`

WBasic ทำชื่อให้อยู่ในรูป NFC ก่อนเปรียบเทียบ และปฏิเสธ control character,
bidirectional control และ default-ignorable character ส่วน keyword ยังคงเป็น
ภาษาอังกฤษ ชื่อที่ผสมระบบอักษรซึ่งไม่เกี่ยวข้องกันอาจได้รับ warning เพื่อช่วยค้นหา
ชื่อหน้าตาคล้ายกัน

## logical line และ block

หนึ่ง logical line มีหนึ่ง statement WBasic ไม่มี semicolon หรือ colon สำหรับคั่น
statement การเขียนต่อบรรทัดทำได้เมื่อยังอยู่ภายใน `()`, `[]` หรือ `{}` เท่านั้น:

```basic
Let message As String = BuildMessage(
  "WBasic",
  "ภาษาไทย"
)
```

การเรียก procedure ต้องมีวงเล็บเสมอ การเยื้องมีไว้ช่วยสายตาคนอ่าน ไม่ได้สร้าง
block; คอมไพเลอร์ดู `EndProcedure`, `EndIf` และคำปิด block ที่ตรงกันเป็นหลัก
ส่วน formatter ใช้สองช่องว่างต่อหนึ่งระดับ

## comment และเอกสารประกอบ

เครื่องหมาย `'` เริ่ม comment ธรรมดาจนถึงท้ายบรรทัดเมื่ออยู่นอก string ส่วน `///`
จะเป็น documentation comment ของ declaration ถัดไปเมื่ออยู่ต้น logical line หลัง
whitespace เท่านั้น:

```basic
/// คืนคำทักทายสำหรับชื่อที่รับมา
Procedure Greeting(name As String) As String
  Return $"Hello, {name}"
EndProcedure
```

## ตัวเลขฐานสิบและฐานอื่น

ไฟล์หนึ่งเลือกใช้เลขฐานสิบ Unicode เพียงหนึ่งชุด เลข ASCII และเลขไทยใช้ได้ทั้งคู่
แต่ห้ามผสมในไฟล์เดียวกัน แม้จะอยู่ใน conditional source ที่ไม่ทำงานหรือ expression
ภายใน string interpolation

```basic
' ไฟล์ที่ใช้เลข ASCII
Let total As Integer = 10 + 25
```

```basic
' ไฟล์ที่ใช้เลขไทย
Let ผลรวม As Integer = ๑๐ + ๒๕
```

`Let total As Integer = ๑๐ + 25` ถูกปฏิเสธ เลขฐานสิบหกและฐานสองเป็นข้อยกเว้น:
prefix และ digit เป็น ASCII ส่วน float ใช้ `.` และ `e` หรือ `E` แบบ ASCII แต่
digit ฐานสิบยังต้องตรงกับชุดของไฟล์ underscore วางได้เฉพาะระหว่าง digit

integer literal ฐานสิบมีชนิด `Integer` ส่วน literal ที่มีจุดทศนิยมหรือ exponent
มีชนิด `Float` ทั้งนี้ integer literal อาจรับ expected type เป็น `Byte` หรือ `Float`
ได้เมื่อค่าดังกล่าวแทนได้พอดี

## รูปแบบของ string

string ธรรมดารู้จัก escape เช่น `\n`, `\t`, `\"` และ `\\` raw string เขียนเป็น
`r"..."` และไม่แปล backslash; หากต้องการ double quote หนึ่งตัวภายในให้เขียน `""`
ส่วน interpolated string ขึ้นต้นด้วย `$`; expression อยู่ในวงเล็บปีกกา และ
วงเล็บปีกกาซ้ำใช้แทนวงเล็บจริง:

```basic
Let escaped As String = "C:\\work\\main.wbas"
Let raw As String = r"C:\work\main.wbas"
Let report As String = $"{name}: {score} points; {{verified}}"
```

string เหล่านี้อยู่ใน logical line เดียว ภาษารุ่น 0.3 ยังไม่มี multiline string
