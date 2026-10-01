---
title: "4 · เขียนโปรแกรมด้วย language intelligence"
description: "ฝึก completion, hover, signature help และ Outline ด้วยโปรแกรมภาษาไทยโปรแกรมแรก"
weight: 4
---

> **ขอบเขตเวอร์ชัน — branch R8B** บทนี้อธิบาย development branch `wbasic-dev.wbasic@0.2.0` ที่ยังไม่ได้รวม Extension ที่รวมแล้วเป็น `0.1.0` และไม่มีบางคำสั่งหรือมุมมองด้านล่าง ถ้าใช้ compiler `0.0.2` ณ `143be583` ให้อ่าน [วิธีใช้รุ่นที่รวมแล้ว]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}).

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

{{< guide-screenshot name="04-source-intelligence.png" alt="Editor เปิด Main.wbas เห็น completion ของ procedure และ signature help ของ Greeting พร้อม Outline ที่ด้านข้าง" caption="ภาพที่ควรถ่าย: Completion, Signature Help และ Outline ใน source เดียวกัน" >}}

## ฝึก hover และ Outline

เลื่อน pointer เหนือ `Greeting` เพื่อดู signature และชนิดข้อมูล จากนั้นเปิด Outline
คุณควรเห็น module และ procedure สองตัว การคลิกชื่อใน Outline พาไปยัง declaration
โดยไม่ต้องเลื่อนหาเอง

Identifier ภาษาไทยและภาษาอื่นใช้ได้ตามกฎ Unicode NFC ตัวอย่างเช่น:

```basic
Procedure คำทักทาย(name As String) As String
  Return "ยินดีต้อนรับ " + name
EndProcedure
```

ห้ามผสมเลขไทยกับเลขสากลใน numeric literal เดียวกัน เช่น `๑๐ + 25` ใช้ numeral script
ให้สม่ำเสมอภายใน expression ตามกฎภาษา

## ขอบเขตของ completion ปัจจุบัน

Typed member completion รองรับ receiver ที่ประกาศชนิดตรง ๆ, field ของ Structure และ
public API ที่ compiler เปิดผ่าน capability metadata ยังไม่รับประกัน expression chain
ซับซ้อนทุกแบบ, member ของ intrinsic String/Array ทุกตัว หรือ local-variable navigation

รายละเอียดไวยากรณ์อ่านต่อได้ที่
[โปรแกรม WBasic หนึ่งโปรแกรม]({{< relref "/books/language-reference/01-a-wbasic-program.md" >}})

## ภารกิจฝึกมือ

เพิ่ม procedure `Farewell(name As String) As String` แล้วใช้ completion เรียกจาก `Main`
หาก hover แสดง signature และ Check Project ผ่าน ถือว่าภารกิจสำเร็จ

อ่านต่อ: [อ่าน diagnostics และใช้ quick fix]({{< relref "/books/w-basic-extension/05-diagnostics-and-quick-fixes.md" >}})

