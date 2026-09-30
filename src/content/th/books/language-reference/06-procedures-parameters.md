---
title: "Procedure และ parameter"
description: "การประกาศ การเรียก optional/named argument, ByRef และ procedure value"
weight: 6
---

WBasic ใช้คำว่า `Procedure` สำหรับงานทุกแบบ Procedure ที่คืนค่ามักเรียกเชิงอธิบาย
ว่า function และ attached procedure มักเรียกว่า method แต่ไม่ได้มี keyword `Function`
หรือ `Method` เพิ่มมาให้จำอีกชุดหนึ่ง

## ประกาศและเรียก

```basic
Procedure Repeat(text As String, times As Integer = 1) As String
  Let output As String = ""
  For i As Integer = 1 To times
    output = output + text
  Next
  Return output
EndProcedure

Procedure Main()
  PrintLn(Repeat("Hi", times := 2))
EndProcedure
```

Parameter และค่าคืนต้องระบุชนิด Optional parameter อยู่ท้ายรายการและ default
ต้องเป็น compile-time constant ที่เข้าชนิดได้ การเรียกใช้ positional arguments ก่อน
แล้วตามด้วย named arguments แบบ `name := value` ได้ ห้ามซ้ำและห้ามวาง positional
argument หลัง named argument

WBasic ยังไม่มี user overload และ variadic parameter ให้ใช้ชื่อต่างกันหรือ optional
parameter แทน Procedure ระดับ module มองเห็นกันก่อนตรวจ body จึงเรียกสิ่งที่ประกาศ
ภายหลังและเขียน recursion ได้

## ByRef ทำให้ผลข้างเคียงมองเห็น

Parameter ปกติรับค่าเป็น local copy หากต้องการแก้ตัวแปรของผู้เรียกต้องเขียน `ByRef`
ทั้งสองฝั่ง:

```basic
Procedure AddOne(ByRef value As Integer)
  value += 1
EndProcedure

Procedure Main()
  Let count As Integer = 0
  AddOne(ByRef count)
  PrintLn(count.ToString())
EndProcedure
```

ByRef รับเฉพาะ mutable local variable หรือ mutable parameter ทั้งตัว ไม่รับ field,
index, temporary หรือ property และไม่มี default ห้ามส่งตัวแปรเดียวกันเข้า ByRef มากกว่า
หนึ่งตำแหน่งในการเรียกเดียว ส่วน value arguments ถูก snapshot ก่อนเริ่ม body

```basic
Procedure Change(ByRef value As Integer, before As Integer)
  value += 1
  PrintLn(before.ToString())
EndProcedure

Procedure Main()
  Let n As Integer = 4
  Change(ByRef n, n)  ' before ยังคงเป็น 4
EndProcedure
```

ByRef ยืมค่าเฉพาะช่วง call ห้ามเก็บลง Structure, return ออกมา หรือส่งต่อให้ callback
ที่เก็บไว้ภายหลัง

## Procedure เป็นค่า

Named procedure ระดับ module สามารถเก็บเป็น procedure value เมื่อ signature ตรงกัน:

```basic
Procedure IsPositive(value As Integer) As Boolean
  Return value > 0
EndProcedure

Procedure Main()
  Let predicate As Procedure(value As Integer) As Boolean = IsPositive
  PrintLn(predicate(7).ToString())
EndProcedure
```

ชื่อ parameter ไม่เป็นส่วนของ signature แต่ชนิด ลำดับ ByRef และชนิดค่าคืนเป็นส่วนสำคัญ
รุ่นนี้ไม่มี anonymous procedure, nested procedure, closure capture หรือ bound instance
method Callback ของ TUI และ Jobs ก็ใช้ named procedures ภายใต้กฎเดียวกัน โดย runtime
เป็นผู้ถือ state และส่ง context ที่ยืมมาเฉพาะ call

คำว่า `Of T` ที่เห็นใน curated calls เช่น JSON, TUI และ Jobs ไม่ได้เปิดให้ผู้ใช้ประกาศ
generic procedure เอง Compiler รองรับเฉพาะ API ที่กำหนดไว้และ concrete type ต้องมองเห็นได้
