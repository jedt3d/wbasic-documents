---
title: "Collection และข้อความ Unicode"
description: "Array, Map, indexing, slicing, value semantics และกฎของ String"
weight: 9
---

WBasic ใช้ `Array Of T` เป็น collection หลักที่ขยายขนาดได้ จึงทำหน้าที่เดียวกับ
ArrayList ของบางภาษาโดยไม่เพิ่มชื่อชนิดอีกหนึ่งชื่อ ส่วน key/value collection ใช้ชื่อ
`Map Of K To V` คำว่า Dictionary ไม่ใช่ alias

## Array

```basic
Let values As Array Of Integer = [10, 20, 30]
values.Append(40)
values.Insert(1, 15)
PrintLn(values[-1].ToString())
PrintLn(values[1:3].Length.ToString())
```

Array มีสมาชิกชนิดเดียวกัน Literal ต้องมี expected type จาก declaration, parameter,
return หรือ collection ชั้นนอก `[]` จึงสร้าง empty array ได้เมื่อบริบทบอกชนิด

Index เริ่มที่ 0 และ index ติดลบนับจากท้าย `-1` คือตัวสุดท้าย Index นอกช่วงเป็น
`ErrorKind.Bounds` ทั้ง debug และ release Slice `[start:stop]` รวม start แต่ไม่รวม stop
ละ start หมายถึง 0 และละ stop หมายถึง Length Bound ติดลบถูก normalize แล้ว clamp
เข้าเขต; stop น้อยกว่า start ได้ empty array ไม่ใช่ error

Slice คืน collection ใหม่ ไม่ใช่ mutable view ยังไม่มี slice step หรือ slice assignment
Nested arrays เป็น jagged arrays:

```basic
Let grid As Array Of (Array Of Integer) = [[1, 2], [3]]
grid[0][1] = 9
```

Methods ที่แก้ Array เช่น `Append`, `Insert`, `RemoveAt` ไม่คืนค่า Methods ที่คืนค่าใหม่
เช่น `Filter`, `Sorted`, `Reversed` ใช้ chain ได้ `Contains` คืน Boolean และ `IndexOf`
คืน nullable index แรก `Insert` รับตำแหน่ง 0 ถึง Length และไม่รับ negative index

## Map

```basic
Let scores As Map Of String To Integer = {}
scores["Alice"] = 100
scores["Length"] = 200
PrintLn(scores["Alice"].ToString())
PrintLn(scores.Length.ToString())
```

Key รุ่นนี้เป็น String, Integer หรือ Enum ส่วน value ไม่เป็น nullable การอ่าน `map[key]`
เมื่อ key ไม่มี throw `MissingKey`; `Get(key)` คืน nullable value และ `ContainsKey`
คืน Boolean `{}` ต้องมี expected Map type และยังไม่มี nonempty Map literal

Map รักษา insertion order การแทนค่า key เดิมไม่ย้ายตำแหน่ง แต่ลบแล้วเพิ่มใหม่จะไปท้าย
`Keys()` และ `Values()` คืน Array ตามลำดับนี้ Value semantics ทำให้การแก้สำเนา Map
ไม่แก้ต้นฉบับ

Key access ใช้ `[]` เท่านั้น `scores.Alice` เป็น compile error จุดสงวนไว้สำหรับ member
จริง จึงไม่มีวันสับสนระหว่าง key ชื่อ `Length` กับ property `Length`

## String คือ Unicode scalar sequence

```basic
Let text As String = "ก้😀"
PrintLn(text.Length.ToString())
PrintLn(text[0])
PrintLn(text[-1])
PrintLn(text[0:2])
```

Length เป็น 3 เพราะนับ Unicode scalar values ไม่ใช่ UTF-8 bytes, UTF-16 code units
หรือ grapheme clusters Index คืน String หนึ่ง scalar และ slice ใช้กฎเดียวกับ Array
String immutable จึงเขียน `text[0] = ...` ไม่ได้

WBasic ไม่ normalize text อัตโนมัติ String ที่มองคล้ายกันแต่มี scalar sequence ต่างกัน
อาจไม่เท่ากัน `.Trim()` ใช้ Unicode White_Space ที่ pin มากับ toolchain และ
`.Split(separator)` แบ่ง exact substring โดยเก็บ empty fields Byte I/O ใช้
`Array Of Byte`; malformed UTF-8 เป็น Conversion error ไม่แทน U+FFFD เงียบ ๆ

อย่าใช้ `String.Length` วัดความกว้างบนจอ TUI เพราะ scalar หนึ่งตัวอาจกินศูนย์ หนึ่ง
หรือสอง terminal cells ให้ใช้ API วัดข้อความของ Tui ซึ่งมี width profile โดยเฉพาะ
