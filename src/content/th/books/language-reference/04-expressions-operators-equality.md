---
title: "นิพจน์ ตัวดำเนินการ และความเท่ากัน"
description: "ลำดับการคำนวณ arithmetic, Boolean, nullable fallback และ value equality"
weight: 4
---

นิพจน์ของ WBasic ตั้งใจให้อ่านได้ใกล้ภาษาพูด แต่ยังมีกฎลำดับการคำนวณที่แน่นอน
เครื่องคิดเลขเองก็ต้องมีกติกา มิฉะนั้น `2 + 3 * 4` อาจทำให้เกิดการประชุมที่ยาวเกินเหตุ

## ลำดับของตัวดำเนินการ

จากจับแน่นที่สุดไปหลวมที่สุดคือ postfix `()`, `[]`, `.`, `?.`; unary `+` และ
`-`; `*`, `/`, `Div`, `Mod`; `+`, `-`; bitwise `&`, `^`, `|`; comparison;
`Not`; `And`; `Or`; และ nullable fallback `??`

```basic
Procedure Main()
  PrintLn((2 + 3 * 4).ToString())
  PrintLn((5 / 2).ToString())
  PrintLn((-5 Div 2).ToString())
  PrintLn((-5 Mod 2).ToString())
EndProcedure
```

`/` คืนผลหารแบบทศนิยม ส่วน `Div` หารจำนวนเต็มโดยตัดเข้าหาศูนย์ และ `Mod`
ให้เศษที่สอดคล้องกับกฎนั้น ตัวอย่างจึงได้ `14`, `2.5`, `-2`, `-1`
ตามลำดับ Arithmetic overflow เป็น error เหมือนกันทั้ง debug และ release

`And` และ `Or` เป็น short-circuit ส่วน `??` ประเมินด้านขวาเมื่อด้านซ้ายเป็น
`Null` เท่านั้น ถ้านิพจน์เริ่มหน้าตาคล้ายปริศนาอักษรไขว้ ให้ใส่วงเล็บ ผู้อ่านในอนาคต
จะขอบคุณเรา:

```basic
Let name As String? = Null
Let printable As Boolean = (name ?? "") = ""
```

ห้ามเขียน comparison ต่อกันอย่าง `a < b < c` ให้ใช้ `a < b And b < c`

## Assignment ไม่ใช่นิพจน์

เครื่องหมาย `=` มีสองบทบาทซึ่งแยกด้วยบริบทอย่างชัดเจน ใน statement มันกำหนดค่า
แต่ใน expression มันเปรียบเทียบค่า:

```basic
Let count As Integer = 1
count = count + 1
If count = 2 Then
  PrintLn("two")
EndIf
```

WBasic ไม่มี assignment expression จึงนำ `count = 2` ไปซ่อนอยู่ใน argument
ไม่ได้ Compound assignment `+=`, `-=`, `*=`, `/=` ประเมินตำแหน่งปลายทางครั้งเดียว
และผลต้องกำหนดกลับเข้าชนิดเดิมได้

## Equality คือ equality ของค่า

Primitive และ String เปรียบเทียบค่าตรงชนิด String เปรียบเทียบ Unicode scalar
แบบ case-sensitive และไม่ normalize เนื้อหาเอง Array และ Structure เปรียบเทียบสมาชิก
ตามลำดับ ส่วน Map เปรียบเทียบชุด key/value โดยไม่สน insertion order

```basic
Structure Person
  Id As Integer
  Name As String
EndStructure

Procedure Person.SameIdentity(other As Person) As Boolean
  Return Self.Id = other.Id
EndProcedure

Procedure Main()
  Let a As Person = Person(Id := 1, Name := "Alice")
  Let b As Person = Person(Id := 1, Name := "Alicia")
  PrintLn((a = b).ToString())
  PrintLn(a.Equals(b).ToString())
  PrintLn(a.SameIdentity(b).ToString())
EndProcedure
```

สองบรรทัดแรกพิมพ์ `False` เพราะชื่อไม่เท่ากัน บรรทัดสุดท้ายพิมพ์ `True`
เพราะ `SameIdentity` เป็นกฎทางธุรกิจที่เราเขียนเอง Intrinsic `.Equals()` ให้ผลตรงกับ
`=` ของ operand คู่เดียวกันเสมอ และชื่อ `Equals` ถูกสงวนไว้ ผู้ใช้จึงประกาศ field หรือ
attached procedure ชื่อนี้ไม่ได้

Nullable ชนิดเดียวกันเท่ากันเมื่อเป็น `Null` ทั้งคู่หรือเมื่อค่าข้างในเท่ากัน Float
รักษากฎ IEEE: NaN ไม่เท่ากับค่าใดรวมทั้งตัวเอง และ `+0` เท่ากับ `-0`

WBasic รุ่นปัจจุบันยังไม่มี user-defined operator overloading และ `.equal()` ไม่ใช่
alias ของ `.Equals()` เพราะชื่อทั้งหมด case-sensitive หากต้องการ business equality
ให้ใช้ procedure ที่ตั้งชื่อบอกความหมาย เช่น `SameIdentity` แทนการเปลี่ยนความหมายของ `=`
