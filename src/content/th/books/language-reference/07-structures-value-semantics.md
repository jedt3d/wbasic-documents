---
title: "Structure และ value semantics"
description: "Named records, defaults, attached procedures และการคัดลอกค่าที่ไม่สร้าง alias แฝง"
weight: 7
---

`Structure` คือ record ที่มีชื่อ ใช้แทนข้อมูลที่มี schema เช่น customer, configuration
หรือผลลัพธ์จากงาน ไม่ใช่ class ไม่มี inheritance และไม่ต้องจัดพิธีเปิดตัว object ยาวเหยียด

## ประกาศและสร้างค่า

```basic
Structure ExportOptions
  Destination As String
  IncludeHeader As Boolean = True
EndStructure

Procedure Main()
  Let options As ExportOptions = ExportOptions(Destination := "out.csv")
  Let copy As ExportOptions = options
  copy.Destination = "backup.csv"
  PrintLn(options.Destination)
  PrintLn(copy.Destination)
EndProcedure
```

Field ทุกตัวต้องมีชนิด Default เป็น compile-time constant เท่านั้น Field ที่ไม่มี default
ต้องส่งตอนสร้างค่า Constructor ที่ compiler สร้างรับ named fields เท่านั้น ไม่มี positional
construction, custom constructor, inheritance หรือ property getter/setter

ค่า mutable เขียน field ได้โดยตรง ตัวอย่างจึงพิมพ์ `out.csv` แล้วตามด้วย
`backup.csv`: การเปลี่ยน `copy` ไม่เปลี่ยน `options` เพราะ Structure มี value semantics

## Attached procedure

```basic
Procedure ExportOptions.Describe() As String
  Return $"Export to {Self.Destination}"
EndProcedure
```

Attached procedure ต้องประกาศใน module เดียวกับ Structure และ resolve แบบ static
`Self` เป็น receiver ที่อ่านได้แต่แก้ตรง ๆ ไม่ได้ หากต้องการแปลงค่าแบบ chain ให้คืน
Structure ใหม่ หากต้องการแก้ตัวแปรเดิมให้ใช้ standalone procedure ที่รับ ByRef

ชื่อ attached procedure ห้ามชนกับ field หรือ intrinsic `Equals` ไม่มี virtual dispatch,
destructor หรือ lifecycle hook ของผู้ใช้

## คัดลอกลึกในเชิงความหมาย

Primitive, String, Structure, Array และ Map ล้วนมี value semantics:

```basic
Let a As Array Of (Array Of Integer) = [[1, 2], [3]]
Let b As Array Of (Array Of Integer) = a
b[0][1] = 9
b[1].Append(4)
PrintLn(a[0][1].ToString())
PrintLn(a[1].Length.ToString())
```

ผลคือ `2` และ `1` แม้เป็น collection ซ้อนกัน Implementation อาจใช้ ARC และ
copy-on-write เพื่อประหยัดการคัดลอก แต่รายละเอียดนั้นต้องไม่รั่วออกมาเป็น alias ที่ผู้ใช้
สังเกตได้ ทางที่ระบุชัดสำหรับการแก้ค่าของผู้เรียกคือ ByRef

Structure วาง Structure อื่นและ collections เป็น field ได้ การอ้างตัวเองต้องผ่าน
Array หรือ Map ไม่ฝังตัวเองตรง ๆ Field ที่เป็น resource handle มีข้อยกเว้น: การ copy
Structure คัดลอก handle ที่ชี้ resource เดิม ไม่ได้เปิด resource ใหม่ อ่านเรื่องนี้ต่อใน
บท Error และอายุของ resource

## Structure กับข้อมูลภายนอก

Structure เป็น model หลักสำหรับ JSON mapper ที่ implementation รองรับ Metadata
`SerializedName` และ `SerializeIgnore` กำหนดชื่อหรือข้าม field ได้ แต่ Structure ไม่ได้
กลายเป็น ORM และ database, YAML หรือ XML mapper ยังไม่ควรถูกอนุมานจากความสามารถนี้
