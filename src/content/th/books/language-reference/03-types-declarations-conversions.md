---
title: "ชนิดข้อมูล declaration และการแปลงค่า"
description: "ชนิดพื้นฐาน local value, constant, nullability และการแปลงตัวเลขแบบชัดเจน"
weight: 3
---

## ชนิดข้อมูลพื้นฐาน

ชนิดหลักของ WBasic ประกอบด้วย:

| ชนิด | ความหมาย |
|---|---|
| `Integer` | จำนวนเต็มมีเครื่องหมายขนาด 64 บิต |
| `Float` | ค่า IEEE 754 binary64 |
| `Byte` | จำนวนเต็มตั้งแต่ 0 ถึง 255 |
| `Boolean` | `True` หรือ `False` |
| `String` | ลำดับ Unicode scalar value ที่แก้ไขไม่ได้ โดยเก็บภายในเป็น UTF-8 |
| `T?` | รูป nullable ของชนิด `T` |
| `Array Of T` | collection แบบเรียงลำดับของชนิดเดียวกัน |
| `Map Of K To V` | collection ที่จับคู่ key กับ value |
| `Procedure(...) As T` | ชนิด procedure ที่เรียกได้ |

โพรซีเยอร์ที่ไม่ระบุ `As` หลังรายการพารามิเตอร์จะไม่คืนค่า WBasic ไม่มีชนิด
`Void` สำหรับกรณีนี้

## local declaration

`Let` ประกาศ local ที่แก้ค่าได้ ส่วน `Const` ประกาศ compile-time constant ทั้งคู่
ต้องระบุชนิดและค่าเริ่มต้น:

```basic
Let attempts As Integer = 0
Const ProductName As String = "WBasic"

attempts = attempts + 1
```

local มี block scope ไม่มีการกำหนดศูนย์ string ว่าง หรือ null ให้โดยปริยาย และ
`Dim` กับ `Var` ไม่ใช่คำพ้อง Module scope มี constant และ declaration ได้ แต่ไม่มี
mutable global variable

constant จำกัดไว้ที่ค่าซึ่งคำนวณได้ตอน compile ของชนิด primitive, `Enum` และ
`Flags` จึงเก็บ mutable collection หรือผลจาก runtime I/O ไม่ได้

## nullability

ค่าธรรมดาเก็บ `Null` ไม่ได้ เติม `?` เมื่อการไม่มีค่ามีความหมาย:

```basic
Let nickname As String? = Null

If Let name As String = nickname Then
  PrintLn(name)
EndIf
```

nullability เป็นส่วนหนึ่งของชนิด และไม่ได้สร้าง truthiness; condition ยังต้องเป็น
`Boolean`

## การแปลงค่าต้องมองเห็นได้

WBasic ไม่แปลงตัวเลขเป็น string, string เป็นตัวเลข หรือตัวเลขเป็น `Boolean` โดย
ปริยาย มีเพียง `Byte` ไป `Integer` ที่ widen อัตโนมัติ การเปลี่ยนตัวเลขแบบอื่นใช้
named conversion:

```basic
Let small As Byte = 12
Let count As Integer = small
Let ratio As Float = Float.FromInteger(count)
Let restoredCount As Integer = Integer.FromFloat(ratio)
Let checkedByte As Byte = Byte.FromInteger(count)
```

`Integer.FromFloat` รับเฉพาะค่าที่ finite เป็นจำนวนเต็มพอดีและอยู่ในช่วง ส่วน
`Byte.FromInteger` ตรวจช่วง 0–255 การคำนวณจำนวนเต็มและการแปลงที่อยู่นอกเงื่อนไข
เหล่านี้รายงาน error ทั้งใน debug และ release; ไม่มีการ wrap เงียบ ๆ ทั้งนี้
`Float.FromInteger` อาจปัดเศษตามกฎ binary64

`/` เป็น floating-point division ส่วน `Div` เป็น integer division และ `Mod` คืน
เศษแบบ integer การหารด้วยศูนย์เป็น error

## การ parse ข้อความ

การ parse เป็น library operation ที่ระบุชัด `Integer.Parse` คืนค่า `Integer` หรือ
throw เมื่อข้อความไม่ถูกต้อง ส่วน `Integer.TryParse` คืน `Integer?` โดยใช้ `Null`
แทนกรณี parse ไม่สำเร็จ ทั้งคู่ไม่ trim whitespace ให้อัตโนมัติ รับเลขฐานสิบเพียง
ชุดเดียวต่อ input และชุดเลขของ input ไม่ผูกกับชุดเลขใน source file ที่เรียก

```basic
Let value As Integer = Integer.Parse("125")
```

ถ้า application ต้องการรับ whitespace รอบข้อความ ให้เรียก text operation ที่ชัดเจน
ก่อน parse

## ไม่มี truthiness หรือการจัดรูปที่ซ่อนอยู่

เงื่อนไขต้องเป็น `Boolean` ตรง ๆ คอมไพเลอร์ไม่เล่นเกมทายใจจาก integer, string,
collection หรือ nullable value การจัดรูปค่าสำหรับ output ก็ทำผ่าน interpolation
หรือ formatting API ที่เหมาะสม กฎนี้ทำให้ overload resolution และการแปลงข้อมูล
ตรวจสอบได้จาก source
