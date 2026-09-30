---
title: "Error และอายุของ resource"
description: "Try/Catch/Finally, Error model, Using, cleanup order และ suppressed errors"
weight: 10
---

WBasic แยก “ไม่มีค่า” ออกจาก “ทำงานไม่สำเร็จ” กรณีแรกใช้ nullable ส่วนกรณีหลังใช้
`Error` การแยกนี้ช่วยให้ EOF ไม่ต้องแต่งตัวเป็นอุบัติเหตุ และอุบัติเหตุไม่ถูกซ่อนไว้ใต้ Null

## Try, Catch และ Finally

```basic
Procedure Main() As Integer
  Try
    Let content As String = File.ReadText("settings.txt")
    PrintLn(content)
    Return 0
  Catch err As Error
    If err.Kind = ErrorKind.IO Then
      Console.ErrorLn(err.Message)
      Return 1
    EndIf
    Throw
  Finally
    PrintLn("finished")
  EndTry
EndProcedure
```

Try ต้องมี Catch หรือ Finally อย่างน้อยหนึ่ง block และมี Catch ได้หนึ่ง block ใช้ If
หรือ Select แยก `Kind` และ `Code` `Throw err` ส่ง Error ส่วน `Throw` เปล่า rethrow
ได้ใน Catch โดยรักษาต้นทางเดิม Error ที่เกิดใน Catch ไม่ย้อนกลับเข้า Catch เดิม

Finally ทำงานเมื่อออกทางปกติ, Return, Break, Continue หรือ error ห้ามใช้ Return,
Break หรือ Continue ภายใน Finally เพราะจะกลบ control flow ที่กำลังออก

## Error ที่ตรวจด้วยโปรแกรมได้

Error เปิดอ่านข้อมูลต่อไปนี้:

- `Kind`: กลุ่ม เช่น IO, Network, Parse, Conversion, Bounds หรือ Validation
- `Code`: ชื่อที่คงที่และมี namespace เช่น `File.NotFound`
- `Message`: ข้อความสำหรับมนุษย์
- `Suppressed`: cleanup errors ที่ไม่ควรแย่งตำแหน่ง error หลัก

```basic
Throw Error.Create(ErrorKind.Validation, "App.InvalidName", "Name is required")
```

ให้ตัดสินใจด้วย Kind หรือ Code อย่า parse Message Unhandled Error รายงาน code/message
พร้อม source location เท่าที่มีและจบ process ด้วย exit code 1

## Using ปิด resource ทุกทางออก

ไฟล์ stream, database connection และ cursor เป็น opaque resource handles การ copy handle
ชี้ resource เดิม ไม่ได้ทำสำเนาเนื้อหา:

```basic
Procedure Main()
  Using reader As TextReader = File.OpenText("input.txt")
    While True
      If Let line As String = reader.ReadLine() Then
        PrintLn(line.Trim())
      Else
        Break
      EndIf
    EndWhile
  EndUsing
EndProcedure
```

Initializer ต้องสำเร็จก่อนเข้า scope `Using` เรียก Close เมื่อออกทุกเส้นทาง และ Using
ที่ซ้อนกันปิดย้อนลำดับเปิด `.Close()` เรียกซ้ำได้ Operation บน handle ที่ปิดแล้ว throw
`ErrorKind.ResourceClosed` ตัวแปรที่ Using ประกาศรับ handle ใหม่ไม่ได้

หาก body สำเร็จแต่ Close ล้มเหลว close error จะถูก throw หากมี error เดิมอยู่ error เดิม
ยังเป็นหลักและ close error ไปอยู่ใน `Suppressed` ARC เป็น safety net สำหรับ memory และ
OS handles แต่ไม่ควรใช้แทน Using เมื่อต้องทราบว่า flush/close สำเร็จจริง

Process-owned standard streams มีกฎการปิดเฉพาะของ Core และ resource types สร้างได้จาก
Core หรือ curated modules เท่านั้น รุ่นนี้ยังไม่มี user-defined resource type หรือ destructor
