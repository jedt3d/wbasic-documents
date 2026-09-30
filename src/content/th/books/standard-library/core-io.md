---
title: "Core I/O และ standard handles"
weight: 10
---

สถานะ: **ผ่าน R5 บน Windows 11 ARM64 และ macOS ARM64**

## การพิมพ์และอ่านบรรทัด

```basic
Print(text As String)
PrintLn(text As String)
ReadLine() As String?
Console.ErrorLn(text As String)
```

`Print` และ `PrintLn` เขียนผ่าน `Console.Output`; `ReadLine` อ่านผ่าน
`Console.Input` และคืน `Null` เมื่อถึง EOF จึงแยก EOF ออกจากบรรทัดว่างได้
ชื่อ API แยกตัวพิมพ์: `println` ไม่ใช่ `PrintLn`—คอมพิวเตอร์ละเอียดรอบคอบจน
บางครั้งคล้ายอาจารย์ตรวจข้อสอบด้วยปากกาสีแดง

```basic
Procedure Main()
  Print("ชื่อ: ")
  If Let name As String = ReadLine() Then
    PrintLn("สวัสดี " + name)
  Else
    Console.ErrorLn("ไม่มีข้อมูลเข้า")
  EndIf
EndProcedure
```

## Text และ byte handles

| สมาชิก | ชนิด | ownership |
|---|---|---|
| `Console.Input` | `TextReader` | process-owned, ใช้ซ้ำ |
| `Console.Output` | `TextWriter` | process-owned, ใช้ซ้ำ |
| `Console.Error` | `TextWriter` | process-owned, ใช้ซ้ำ |
| `IO.Stdin` | `Stream` | process-owned |
| `IO.Stdout` | `Stream` | process-owned |
| `IO.Stderr` | `Stream` | process-owned |

การ `Close()` standard handle เป็นการปล่อย alias ของโปรแกรม ไม่ปิด OS handle
ของ process; alias อื่นยังใช้ได้ ส่วน file/memory stream ที่โปรแกรมเป็นเจ้าของ
ปิดร่วมกันทุก alias และการใช้ต่อรายงาน `ErrorKind.ResourceClosed`

## Error และข้อจำกัด

- redirected stdin/stdout/stderr ใช้ได้ รวมข้อมูล byte ที่มี NUL
- `Seek` บน pipe รายงาน `UnsupportedOperation`
- TUI จะตรวจ ownership ของ terminal ข้าม aliases เพื่อไม่ให้ Core I/O เขียนทับ frame
- I/O นี้เป็น synchronous; ใน `Init`, `Update` หรือ `View` ให้ใช้ `Jobs`
