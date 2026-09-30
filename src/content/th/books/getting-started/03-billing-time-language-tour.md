---
title: "3 · เดินชมภาษาใน Billing Time"
description: "อ่าน Procedure, Let, type, control flow, command-line arguments และ standard output"
weight: 3
---

เราไม่จำเป็นต้องจำทุก keyword ก่อน compile ครั้งแรก แต่ควรรู้ว่าแต่ละส่วนรับผิดชอบอะไร
WBasic ตั้งใจให้ทำงานกลุ่มเดียวกับที่คนมักเริ่มด้วย Python ได้ แต่เขียนลำดับงานให้อ่าน
เหมือนคำอธิบาย พร้อม type ที่เห็นตรงจุดประกาศ แล้ว compile เป็นโปรแกรม native ได้
ความอ่านง่ายจึงไม่ได้มาจากการซ่อนรายละเอียดทุกอย่าง แต่มาจากการวางรายละเอียดไว้ถูกที่

## Module, Procedure และ entry point

`Module BillingTime` ต้องเป็น declaration แรกและกำหนด namespace ของ source file นี้
ส่วน `Procedure` ประกาศหน่วยงานที่เรียกใช้ได้ `ExactAmountCents` รับ `Integer` สองค่าและ
คืน `Integer` ส่วน `Main` คือ entry point:

```basic
Procedure Main(args As Array Of String) As Integer
```

`args` เก็บ argument จาก command line และค่าที่ `Main` คืนกลายเป็น process exit code
การคืน `0` หมายถึงจบสำเร็จ

## ค่า ชนิด และเงิน

`Let` ประกาศ local value พร้อมชนิด เช่น:

```basic
Let designMinutes As Integer = 120
Let projectName As String = "Website refresh"
```

ตัวอย่างเก็บเงินเป็น cents ด้วย `Integer` เพื่อไม่ให้ binary floating point เปลี่ยนเศษ
สตางค์ตอนเราเผลอ สูตรใช้ `Div` สำหรับ integer division และเลือกตัวเลขที่หาร 60 ลงตัว
ระบบจริงยังต้องกำหนด rounding, overflow, currency และ tax ให้ชัด

## ตรวจขอบเขตก่อนอ่าน array

```basic
If args.Length > 0 Then
  projectName = args[0]
EndIf
```

เงื่อนไขพิสูจน์ว่ามีสมาชิกก่อนอ่านตำแหน่งแรก หากผู้ใช้ไม่ส่ง argument โปรแกรมจะใช้
ชื่อเริ่มต้น

## ส่งข้อความออก

`PrintLn` เขียนข้อความหนึ่งบรรทัดไป standard output ส่วน `ToString()` แปลงจำนวนเต็ม
เป็นข้อความก่อนใช้ `+` เชื่อมกับ label นี่เพียงพอสำหรับโปรแกรม CLI ที่ shell หรือระบบ
อื่นนำผลลัพธ์ไปอ่านต่อได้

อ่านเพิ่มได้ที่ [โปรแกรม WBasic หนึ่งโปรแกรม]({{< relref "/books/language-reference/01-a-wbasic-program.md" >}}),
[ชนิดและการประกาศ]({{< relref "/books/language-reference/03-types-declarations-conversions.md" >}}),
[Control flow]({{< relref "/books/language-reference/05-control-flow.md" >}}) และ
[Procedure กับ parameter]({{< relref "/books/language-reference/06-procedures-parameters.md" >}})

อ่านต่อ: [ตรวจ Compile และรันจาก command line]({{< relref "/books/getting-started/04-command-line-workflow.md" >}})
