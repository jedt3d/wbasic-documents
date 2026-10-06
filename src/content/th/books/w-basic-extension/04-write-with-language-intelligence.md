---
title: "4 · เขียนโปรแกรมด้วย language intelligence"
description: "ฝึก completion, hover, signature help และ Outline ด้วยโปรแกรมภาษาไทยโปรแกรมแรก"
weight: 4
---

> **ขอบเขตเวอร์ชัน — ชุด private experimental 0.2.0** คู่มือนี้ใช้ compiler/runtime `0.2.0`, protocol `0.1.0` และ VS Code extension `0.3.0` ที่เข้าคู่กันบน Windows/macOS ARM64 รุ่นเก่า `0.1.0`/extension `0.2.1` และการแก้ในเครื่อง `0.2.3` เป็นหลักฐานประวัติ ไม่ได้รับความสามารถ E01–E10 เพียงเพราะติดตั้ง extension ใหม่ ตรวจรุ่นและ capability ด้วย **WBasic: Show Toolchain Status** ก่อนเริ่ม

เปิด `src/Main.wbas` แล้วแทนเนื้อหาด้วย:

```basic
Module MyFirstWBasic

Procedure Greeting(name As String) As String
  Return "สวัสดี " + name + " จาก WBasic 🙂"
EndProcedure

Procedure Main()
  Let message As String = Greeting("นักพัฒนา")
  PrintLn(message)
EndProcedure
```

## ฝึก completion

วาง cursor หลังคำว่า `Pro` แล้วเรียก completion เลือก `Procedure` จากนั้นลองพิมพ์ชื่อ
procedure ที่ประกาศในไฟล์ Completion ของ extension มาจาก compiler symbol report
จึงแยก declaration จริงออกจากคำที่บังเอิญอยู่ใน comment หรือ string

เมื่อพิมพ์ `Greeting(` signature help จะแสดง parameter `name As String` และ return type
หาก cursor อยู่ใน nested call ระบบจะเลือก call context จาก compiler แทนการนับวงเล็บ
ด้วย regular expression

ใน project ที่ Import module ผ่าน alias ให้ลองพิมพ์ชื่อ alias ตามด้วยจุด แล้วเรียก
**Ctrl+Space** Completion เสนอ procedure/API ที่มองเห็นตาม compiler หากมี binding
ชนิด Structure ให้พิมพ์ชื่อนั้นตามด้วยจุดเพื่อดู field และ attached method ที่รองรับ
Parameter hints เลือก argument ภายใน nested call แม้ string จะมี comma
ผลลัพธ์ที่เป็นเพียงข้อความใน comment หรือ string ไม่ใช่ symbol ที่นำทางได้

{{< guide-screenshot name="04-source-intelligence.png" alt="Editor เปิด Main.wbas เห็น completion ของ procedure และ signature help ของ Greeting พร้อม Outline ที่ด้านข้าง" caption="ภาพที่ควรถ่าย: Completion, Signature Help และ Outline ใน source เดียวกัน" >}}

## ฝึก hover และ Outline

เลื่อน pointer เหนือ `Greeting` เพื่อดู signature และชนิดข้อมูล จากนั้นเปิด Outline
คุณควรเห็น module และ procedure สองตัว การคลิกชื่อใน Outline พาไปยัง declaration
โดยไม่ต้องเลื่อนหาเอง

Hover ของ procedure, local/parameter, nominal type และ field/member ที่ compiler รองรับ
อ้าง declaration, type หรือ signature ตาม source จริง ข้อความ comment ที่ผู้เขียนวางเหนือ
declaration ยังไม่ถูกดึงเป็น documentation; tooltip จึงไม่ควรอ้างคำอธิบายที่ compiler ไม่ส่งมา

Identifier ภาษาไทยและภาษาอื่นใช้ได้ตามกฎ Unicode NFC ตัวอย่างเช่น:

```basic
Procedure คำทักทาย(name As String) As String
  Return "ยินดีต้อนรับ " + name
EndProcedure
```

ห้ามผสมเลขไทยกับเลขสากลใน numeric expression เดียวกัน เช่น `๑๐ + 25` ใช้ numeral script
ให้สม่ำเสมอภายใน expression ตามกฎภาษา

## ขอบเขตของ completion ปัจจุบัน

สำหรับ binding ที่ประกาศชนิด Structure หรือ nominal type ที่ import ไว้อย่างตรงไปตรงมา
ให้พิมพ์จุดหลังชื่อ binding เพื่อดู field และ method ที่ compiler อนุญาตให้เห็น
ส่วน public API ต้องมี capability metadata จาก compiler ที่ตรงกัน Method ที่เป็น
private, internal ของ module อื่น หรือไม่ได้ import จะไม่อยู่ในรายการ Completion
ยังไม่รับประกัน expression chain ทุกแบบหรือ member ของ intrinsic String/Array ทุกตัว
การนำทาง local/parameter/type/member ทำงานเฉพาะตำแหน่งที่ compiler ให้ identity และช่วง
อ้างอิงอย่างครบถ้วน หากไม่มีข้อมูลที่ตรวจได้ คำสั่งจะไม่เดาชื่อจากข้อความรอบ cursor

รายละเอียดไวยากรณ์อ่านต่อได้ที่
[โปรแกรม WBasic หนึ่งโปรแกรม]({{< relref "/books/language-reference/01-a-wbasic-program.md" >}})

## ภารกิจฝึกมือ

เพิ่ม procedure `Farewell(name As String) As String` แล้วใช้ completion เรียกจาก `Main`
หาก hover แสดง signature และ Check Project ผ่าน ถือว่าภารกิจสำเร็จ

อ่านต่อ: [อ่าน diagnostics และใช้ quick fix]({{< relref "/books/w-basic-extension/05-diagnostics-and-quick-fixes.md" >}})


## แม่แบบใน 0.4.0 candidate

Candidate เพิ่ม **WBasic: Insert Template** พร้อมช่องกรอกที่เชื่อมกัน และ **WBasic: Insert File Template** ที่ใส่แม่แบบใน editor ภาษา WBasic ที่ว่างเท่านั้น แม่แบบเป็นจุดเริ่มเขียน code; ตรวจชื่อ, argument, resource และใช้ compiler Check หลังเติมค่า ดู [ขอบเขต candidate]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}}); File/linked template กับ Undo ผ่านในหน้าต่าง Windows ที่ติดตั้ง candidate. คำสั่ง Insert Template แบบ statement ก็ผ่านใน repaired VSIX: เข้า Vim Insert mode ก่อนเรียกคำสั่ง ได้ `Let value As Integer = 0`, Tab เลื่อนไปยัง placeholder ถัดไป และ Ctrl+Z คืนเอกสารว่างโดยไม่มี infrastructure popup.

### Vim กับ placeholder ของ candidate

เมื่อใช้ Vim ให้เข้า Insert mode ก่อนเรียก Insert Template เพื่อให้ Tab เลื่อน linked placeholder; Visual mode รับ Tab ไปในหน้าต่างที่ตรวจ. ตรวจชื่อทั้งสองตำแหน่งหลัง paste. ในหน้าต่าง Windows ที่ตรวจ ค่าเริ่มต้นถูกเลือกอยู่แล้ว แต่ paste ยังต่อท้ายค่าเดิมและอัปเดตทั้งสองตำแหน่ง; แก้ชื่อผลลัพธ์ตามต้องการ. การ paste นี้เป็นพฤติกรรม Vim/VS Code ที่สังเกตได้; Extension ไม่บังคับเปลี่ยนมัน.
