---
title: "Stream และข้อความ"
weight: 20
---

สถานะ: **ผ่าน R5** รวม short reads, EOF, COW, encoding และ cleanup errors

## Stream

```basic
stream.Read(maxBytes As Integer) As Array Of Byte
stream.ReadInto(ByRef buffer As Array Of Byte, offset As Integer, count As Integer) As Integer
stream.Write(data As Array Of Byte)
stream.Flush()
stream.CopyTo(destination As Stream, bufferSize As Integer = 65536) As Integer
stream.Seek(offset As Integer, origin As SeekOrigin = SeekOrigin.Begin) As Integer
stream.Close()
```

properties: `CanRead`, `CanWrite`, `CanSeek`, `IsClosed`, `IsTerminal`,
`Position`, `Length` โดยสองตัวหลังต้องเป็น stream เปิดที่ seek ได้

- `Read` อาจคืนข้อมูลสั้นกว่าที่ขอ; empty array เท่านั้นที่หมายถึง EOF
- `Read(0)` และ `ReadInto(..., count := 0)` คืนทันที
- `ReadInto` แก้เฉพาะ buffer ที่ส่ง `ByRef`; snapshot alias เดิมไม่เปลี่ยน
- `CopyTo` ใช้ bounded reusable buffer ไม่ flush/close ปลายทาง และห้าม copy
  underlying stream เดียวกัน
- `Flush` ส่ง buffered bytes ลงชั้นถัดไป แต่ไม่รับประกัน power-loss durability

```basic
Using source As Stream = Memory.FromBytes([65, 66, 67])
  Using target As Stream = Memory.Create()
    Let copied As Integer = source.CopyTo(target)
    PrintLn(copied.ToString())
  EndUsing
EndUsing
```

## TextReader และ TextWriter

```basic
TextReader.Create(stream, encoding := TextEncoding.Utf8, leaveOpen := False) As TextReader
reader.Read(maxChars As Integer) As String
reader.ReadLine() As String?
reader.ReadToEnd() As String
reader.Close()

TextWriter.Create(stream, encoding := TextEncoding.Utf8, leaveOpen := False,
                  newline := "\n", emitBom := False) As TextWriter
writer.Write(text As String)
writer.WriteLine(text As String)
writer.Flush()
writer.Close()
```

รองรับ `Utf8`, `Utf16LE`, `Utf16BE` และ `Ascii` แบบตรวจเข้ม malformed หรือ
incomplete sequence รายงาน `Conversion`; ASCII เขียนอักษรไทยไม่ได้ตามชื่อที่
บอกไว้ตรง ๆ ไม่มีเวทมนตร์อยู่หลังม่าน

`leaveOpen := True` ทำให้อะแดปเตอร์ไม่ปิด stream ต้นทาง หาก buffered reader
ยังถือ unread bytes การเข้าถึง raw stream ก่อนปิด reader รายงาน
`IO.StreamInUse` เพื่อไม่ทำข้อมูลหายเงียบ ๆ ถ้า close/flush หลายชั้นล้มเหลว
error หลักคงเดิมและ error รองอยู่ใน `Suppressed`
