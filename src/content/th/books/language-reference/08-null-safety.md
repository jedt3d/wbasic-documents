---
title: "Null safety"
description: "Non-null by default, nullable types, If Let, safe call และ lazy fallback"
weight: 8
---

ชนิดทุกชนิดใน WBasic ไม่รับ `Null` โดยปริยาย `String` จึงหมายถึงมี String เสมอ
ส่วน `String?` หมายถึงอาจมี String หรือ `Null` เครื่องหมายคำถามหนึ่งตัวช่วยลดคำถามอีก
หลายข้อใน production ได้อย่างน่าประหลาด

```basic
Let nickname As String? = Null
Let title As String = nickname?.Trim() ?? "Guest"
PrintLn(title)
```

`T?` รับ T หรือ Null และไม่มี nullable ซ้อน `T??` วงเล็บช่วยแยกตำแหน่ง:
`Array Of String?` คือ array ที่สมาชิก nullable ส่วน `(Array Of String)?` คือ nullable array

## แกะค่าด้วย If Let

```basic
If Let name As String = nickname Then
  PrintLn(name.ToUpper())
Else
  PrintLn("No nickname")
EndIf
```

Expression ทางขวาถูกประเมินครั้งเดียว เมื่อมีค่าจะสร้าง local non-nullable ชื่อ `name`
ซึ่งอยู่เฉพาะ then-block การเขียน `If nickname <> Null` ไม่ทำ implicit smart cast
ให้ใช้ `If Let` เพื่อให้เส้นทางที่แกะค่าเห็นชัด

## Safe call และ fallback

`?.` เรียก property หรือ method ที่มีผลลัพธ์อย่างปลอดภัย หาก receiver เป็น Null จะไม่
ประเมิน arguments และผลเป็น nullable หาก method คืน nullable อยู่แล้วก็ไม่ซ้อนอีกชั้น

`left ?? right` ใช้ด้านซ้ายเมื่อมีค่า มิฉะนั้นจึงประเมินด้านขวา ความ lazy นี้สำคัญ:

```basic
Procedure ExpensiveDefault() As String
  PrintLn("computing default")
  Return "Guest"
EndProcedure

Procedure Main()
  Let present As String? = "Ada"
  PrintLn(present?.Trim() ?? ExpensiveDefault())
EndProcedure
```

ตัวอย่างไม่พิมพ์ `computing default` เพราะด้านซ้ายมีค่า

Safe call ใช้เป็น assignment target หรือเรียก mutating operation ไม่ได้ Nullable receiver
ของ `.Equals()` ต้อง unwrap หรือใช้ `=` เปรียบเทียบ Null ตามกฎ equality

## Absence ต่างจาก failure

Nullable เหมาะกับ “ไม่มีค่า” ที่เป็นเหตุการณ์ปกติ เช่น Map `Get` ไม่พบ key หรือ
`TextReader.ReadLine()` ถึง EOF ส่วนอ่านไฟล์ไม่ได้ JSON ผิดรูป หรือ index เกินขอบเขต
เป็น Error ไม่ควรคืน Null มาปิดบังสาเหตุ

ภาษาไม่มี `!!`, implicit unwrap หรือ unchecked cast จึงไม่มีปุ่ม “ฉันมั่นใจมาก” ที่กดแล้ว
โยนภาระให้ runtime ถ้าค่าต้องมีจริงให้ตรวจด้วย `If Let` หรือออกแบบ parameter เป็น
non-nullable ตั้งแต่ต้น
