---
title: "โปรแกรม WBasic หนึ่งโปรแกรม"
description: "โปรแกรมที่สมบูรณ์และเล็กที่สุด รูปแบบ entry point และคำสั่งสำหรับตรวจและรัน"
weight: 1
---

## โปรแกรมที่เล็กที่สุด

ไฟล์ต้นฉบับ WBasic แบบโปรแกรมเดี่ยวใช้นามสกุล `.wbas` โปรแกรมที่สร้างเป็น
ไฟล์รันได้มีโพรซีเยอร์เริ่มต้นชื่อ `Main` ได้หนึ่งตัว

```basic
Procedure Main()
  PrintLn("Hello, WBasic")
  PrintLn("สวัสดี 😀")
EndProcedure
```

บันทึกโปรแกรมเป็น `hello.wbas` คำว่า `Procedure` เริ่มคำประกาศโพรซีเยอร์
`Main()` ระบุรายการพารามิเตอร์ และ `EndProcedure` ปิดส่วนคำสั่งของโพรซีเยอร์
การย่อหน้าใช้สองช่องว่างตามข้อตกลงเพื่อให้อ่านง่าย แต่ไม่ได้เป็นตัวสร้าง block

`PrintLn` อยู่ใน Core โปรแกรมนี้จึงไม่ต้อง `Import` การเรียกทุกครั้งต้องมี
วงเล็บ รวมถึงการเรียกที่ไม่มี argument—วงเล็บอาจว่างได้ แต่หายไปไม่ได้
เพราะคอมไพเลอร์ไม่รับคำใบ้

## ตรวจก่อนรัน

`wb check` แยกวิเคราะห์ไวยากรณ์และตรวจชนิดโดยไม่รันโปรแกรม:

```console
wb check hello.wbas --json
```

หากข้อความต้นฉบับถูกปฏิเสธ รายงานต้องมี diagnostic code, stage, file, line,
column และ source span ที่คงที่ ส่วน warning ที่เครื่องมือรายงานไม่จำเป็นต้องทำให้
โปรแกรมถูกปฏิเสธ Editor และเครื่องมืออื่นใช้รายงานจาก compiler ชุดเดียวกัน
ไม่สร้าง parser แยกขึ้นมาอีกชุด

รันโปรแกรมด้วย development runner:

```console
wb run hello.wbas
```

ผลลัพธ์คือ:

```text
Hello, WBasic
สวัสดี 😀
```

`wb run` คือเส้นทางสำหรับการพัฒนาที่ตรวจสอบแล้วในเอกสารรุ่นนี้ ส่วน `wb build`
จะถูกกำหนดและตรวจสอบในรอบงานด้านการแจกจ่ายภายหลัง บทนี้จึงยังไม่อ้างว่า
คำสั่งดังกล่าวพร้อมใช้งาน

## รูปแบบของ entry point

WBasic ยอมรับรูปแบบของ `Main` สามแบบ โพรซีเยอร์ที่ไม่ระบุชนิดค่าคืนจะให้
สถานะจบการทำงานเป็นศูนย์เมื่อทำงานปกติ:

```basic
Procedure Main()
  PrintLn("ready")
EndProcedure
```

`Main` ที่คืนค่า `Integer` ใช้ค่านั้นเป็นสถานะจบการทำงานของ process:

```basic
Procedure Main() As Integer
  Return 0
EndProcedure
```

Command-line arguments ใช้ `Array Of String` โดยไม่รวมชื่อ executable และรักษา
argument Unicode:

```basic
Procedure Main(args As Array Of String) As Integer
  PrintLn($"Received {args.Length} arguments")
  Return 0
EndProcedure
```

Exit status ที่ผู้ใช้คืนได้อยู่ระหว่าง `0` ถึง `255` เพื่อให้พฤติกรรมตรงกัน
ข้ามระบบปฏิบัติการที่รองรับ ค่านอกช่วงทำให้เกิด runtime validation error

## ไฟล์และ declaration

Source file ประกอบด้วย declaration ที่ module scope ไม่มี executable statement
หรือ mutable global variable ตัวอย่างนี้ผิด:

```basic
PrintLn("runs at module scope")  ' invalid
```

ให้นำ statement ที่ทำงานไปไว้ใน procedure ส่วน `Const` ใช้ประกาศค่าคงที่ที่
module scope ได้ ชื่อ procedure ระดับโมดูล resolve ได้ก่อนตรวจ body ทุกไฟล์
จึงเรียก procedure ที่ประกาศภายหลังและเขียน recursion ได้:

```basic
Const Greeting As String = "Hello"

Procedure Greet(name As String) As String
  Return $"{Greeting}, {name}"
EndProcedure

Procedure Main()
  PrintLn(Greet("Ada"))
EndProcedure
```

บทต่อไปกำหนดวิธีอ่าน source text และวิธีกำหนดชนิดให้ค่าที่ประกาศแต่ละค่า
