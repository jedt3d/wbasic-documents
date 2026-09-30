---
title: "การควบคุมลำดับงาน"
description: "If, Select, While, For, For Each และการออกจากลูปอย่างชัดเจน"
weight: 5
---

WBasic ใช้ block ที่มีคำปิดชัดเจน การย่อหน้าช่วยมนุษย์อ่าน ส่วน `EndIf`, `Next`
และ `EndWhile` ช่วยทั้งมนุษย์และ compiler ตกลงกันว่า block จบตรงไหน

## If และ Select

เงื่อนไขของ `If` และ `ElseIf` ต้องเป็น Boolean ไม่มี truthy/falsy จากเลขหรือ String:

```basic
If count = 0 Then
  PrintLn("ไม่มีรายการ")
ElseIf count < 10 Then
  PrintLn("รายการไม่มาก")
Else
  PrintLn("เตรียมกาแฟก่อนอ่าน")
EndIf
```

`Select` ประเมินค่าตั้งต้นครั้งเดียว แต่ละ `Case` เป็น compile-time constant ชนิดเดียวกัน
ไม่มี fallthrough จึงไม่ต้องใส่ `Break` ท้าย Case:

```basic
Select command
Case "start"
  PrintLn("starting")
Case "stop"
  PrintLn("stopping")
Else
  PrintLn("unknown")
EndSelect
```

## While และ For

`While` ตรวจ Boolean ก่อนทำ body ทุกครั้ง:

```basic
While count > 0
  PrintLn(count.ToString())
  count -= 1
EndWhile
```

`For ... To ... Step ...` ใช้ Integer และรวมค่าปลายทาง Start, end และ step
ถูกประเมินครั้งเดียวตามลำดับเมื่อเข้าลูป หากไม่เขียน `Step` จะใช้ 1:

```basic
For i As Integer = 1 To 5 Step 2
  PrintLn(i.ToString())
Next

For i As Integer = 3 To 1 Step -1
  PrintLn(i.ToString())
Next
```

Step เป็นศูนย์ทำให้เกิด Validation error ทิศทางที่ไม่มีทางถึงปลายทางทำให้ body
ทำงานศูนย์ครั้ง ตัวแปรลูปอยู่ใน scope ของลูปและแก้เองไม่ได้ Compiler ตรวจจบลูปก่อน
เพิ่มค่ารอบถัดไป จึงไม่สร้าง overflow หลอกเมื่อวนใกล้ `Integer.MaxValue`

`Break` ออกจากลูปชั้นในสุด และ `Continue` ไปยังรอบถัดไป ทั้งคู่ใช้ใน loop เท่านั้น

## For Each และ snapshot

`For Each` ประเมิน collection หนึ่งครั้ง Array และ Map ใช้ snapshot ตาม value
semantics จึงแก้ collection ต้นทางระหว่างวนได้โดยไม่ทำให้ iterator สับสน:

```basic
Let names As Array Of String = ["Ada", "Grace"]
For Each name As String In names
  PrintLn(name)
  names.Append(name + "!")
Next
```

ลูปนี้วนเพียงสองค่าจาก snapshot เดิม ตัวแปร `name` เป็น local copy การแก้มันไม่แก้
สมาชิกต้นทาง Map วนเป็น key ตาม insertion order และ String วนทีละ Unicode scalar
โดยแต่ละค่ามีชนิด String

## Return ต้องครบทุกเส้นทาง

`Return` จบ procedure ทันที Procedure ที่ประกาศชนิดค่าคืนต้องคืนค่าชนิดนั้นในทุก
เส้นทางปกติ Compiler ไม่รับคำสัญญาทำนอง “น่าจะเข้ากิ่งนี้เสมอ” เพราะคอมพิวเตอร์มีนิสัย
ชอบเจอกิ่งที่เราไม่ได้คิดไว้

ภาษาในรุ่นนี้ไม่มี `Goto`, line number, `GoSub`, `Do/Loop` หรือ pattern matching
ใช้โครงสร้างข้างต้นและแยก procedure เมื่อ block เริ่มยาวเกินอ่านสบาย
