---
title: "Json.Value และ codecs"
weight: 30
---

สถานะ: **ผ่าน R5** ทั้ง dynamic values, generated codecs และ reader/writer

## Dynamic JSON

```basic
Json.Parse(text As String) As Json.Value
Json.Stringify(value As Json.Value) As String
value.Get(key As String) As Json.Value?
value.AsString() As String
value.AsInteger() As Integer
value.AsFloat() As Float
value.AsBoolean() As Boolean
value.AsStringOrNull() As String?
```

object ใช้ `value["key"]`, array ใช้ `value[index]` และ `Kind` เปรียบเทียบกับ
`Json.Kind.Null` เป็นต้น `Get` คืน `Null` เมื่อไม่มี key; JSON `null` ยังคงเป็น
`Json.Value` คนละกรณีกัน

```basic
Import Json

Procedure Main()
  Let value As Json.Value = Json.Parse("{\"name\":\"ไทย🙂\",\"count\":7}")
  PrintLn(value["name"].AsString())
  PrintLn((value.Get("missing") ?? Json.Parse("\"fallback\"")).AsString())
EndProcedure
```

Integer เก็บ exact 64-bit; overflow หรือการแปลงชนิดผิดรายงาน `Conversion`
duplicate object keys หลัง decode escape รายงาน `Parse` และมี depth limit

## Concrete codecs

```basic
Json.Decode(Of T)(text, strictFields := False) As T
Json.Encode(Of T)(value As T) As String
Json.FromValue(Of T)(value As Json.Value, strictFields := False) As T
Json.ToValue(Of T)(value As T) As Json.Value
Json.Read(Of T)(reader As TextReader, strictFields := False) As T
Json.Write(Of T)(writer As TextWriter, value As T)
```

`T` เป็น concrete supported type; ไม่ได้เปิด user-defined generic codec
รองรับ nested `Structure`, `Array`, `Map`, nullable และ field defaults พร้อม
`SerializedName`/`SerializeIgnore` ตาม metadata ที่ compiler ตรวจ
`strictFields := True` ปฏิเสธ unknown fields พร้อม path

`Read` ไม่ปิด reader และปฏิเสธ trailing data; `Write` ไม่ flush หรือปิด writer
ให้เอง จึงยังเป็นหน้าที่ของเจ้าของ resource ข้อจำกัดนี้ดูจุกจิก แต่ช่วยให้
ประกอบ pipeline ได้โดยไม่ถูก library แอบปิดก๊อกน้ำกลางบ้าน
