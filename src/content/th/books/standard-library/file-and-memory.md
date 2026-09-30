---
title: "File และ Memory"
weight: 40
---

สถานะ: **ผ่าน R5; `File.Move` เพิ่มและผ่านใน R7 showcase**

```basic
File.OpenRead(path As String) As Stream
File.OpenWrite(path As String, overwrite As Boolean = True) As Stream
File.OpenAppend(path As String) As Stream
File.OpenReadWrite(path As String, create As Boolean = False) As Stream
File.ReadBytes(path As String) As Array Of Byte
File.WriteBytes(path As String, data As Array Of Byte)
File.ReadText(path As String) As String
File.WriteText(path As String, text As String)
File.OpenText(path As String) As TextReader
File.Exists(path As String) As Boolean
File.Move(source As String, destination As String)
```

`File.ReadText`, `WriteText` และ `OpenText` ใช้ UTF-8 ตามสัญญา R5 ข้อผิดพลาด
filesystem รายงานเป็น typed `Error` ไม่คืนค่าหลอก เช่น empty string

`File.Move` ใช้ใน R7 export เพื่อเปลี่ยนชื่อไฟล์ชั่วคราวเป็นชื่อจริงใน directory
เดียวกันหลังปิด writer แล้ว การทำเช่นนี้ผ่านการทดสอบ atomic name replacement
ในขอบเขตดังกล่าว แต่ **ไม่ได้** สัญญา power-loss durability หรือ cross-directory move

```basic
Memory.Create() As Stream
Memory.FromBytes(data As Array Of Byte) As Stream
Memory.ToBytes(stream As Stream) As Array Of Byte
```

`FromBytes` และ `ToBytes` ให้ snapshot เชิงค่า ไม่มี alias mutable กับ array
ของผู้เรียก memory stream อ่าน เขียน และ seek ได้; การเขียนเลย EOF เติม gap ด้วย
ศูนย์

```basic
Using stream As Stream = Memory.FromBytes([1, 2, 3])
  stream.Seek(0)
  PrintLn(stream.Read(2).Length.ToString())
EndUsing
```

ใช้ `Using` กับ owned resources เสมอ ส่วน standard handles เป็น process-owned
ตามหน้าก่อน
