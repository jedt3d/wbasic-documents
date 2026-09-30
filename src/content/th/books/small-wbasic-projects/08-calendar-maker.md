---
title: "08 · พิมพ์ปฏิทินรายเดือนจากปีและเดือน"
description: "แผนบท: พิมพ์ปฏิทินรายเดือนจากปีและเดือน"
weight: 8
---

{{< project-download "08-calendar-maker" "PLAN.md" >}}
{{< project-download "08-calendar-maker" "draft.wbas.txt" >}}

> **สถานะ: บทร่าง; source check ผ่าน** ไฟล์ `draft.wbas.txt` ผ่าน `wb check --json` ด้วย compiler ที่ตรึงไว้โดยไม่มี diagnostic แล้ว แต่ยังไม่ผ่านการรัน native หรือเกณฑ์รับงาน และยังไม่ใช่ `main.wbas`

## เป้าหมายและขอบเขต

พิมพ์ปฏิทินจันทร์ถึงอาทิตย์หนึ่งเดือนจากปีและเดือนที่กำหนดใน `Main` ตัวอย่างเริ่มที่ปี 2000 เดือน 2; เปลี่ยนสองค่านั้นเพื่อส่งข้อมูลคู่ใหม่ ไม่มีการอ่านนาฬิกาเครื่องหรือใช้ `DateTime` ข้อตกลงของบทคือปฏิทิน Gregorian แบบย้อนหลัง ปี 1–9999 และเดือน 1–12 แม้ประวัติศาสตร์ของบางประเทศก่อนการเปลี่ยนปฏิทินจะต่างกัน

## คิดสูตรทีละชั้น

ปีอธิกสุรทินหาร 400 ลงตัว หรือหาร 4 ลงตัวแต่หาร 100 ไม่ลงตัว กุมภาพันธ์ 2000 จึงมี 29 วัน ส่วน 1900 มี 28 วัน เดือน 4, 6, 9, 11 มี 30 วัน ที่เหลือ 31 วัน โปรแกรมตรวจช่วงปีและเดือนก่อนคำนวณ

ให้วันจันทร์เป็นคอลัมน์ 0 ถึงวันอาทิตย์คอลัมน์ 6 จำนวนวันก่อน 1 มกราคมปี `y` คือ `(y−1)×365 + (y−1) Div 4 − (y−1) Div 100 + (y−1) Div 400` จากนั้นบวกวันของเดือนก่อนหน้า แล้วใช้ `Mod 7` โดยถือว่า 0001-01-01 เป็นจันทร์ สำหรับกุมภาพันธ์ 2000 วันก่อนปีนั้นคือ `730119` บวกมกราคม 31 ได้ `730150`; เศษหาร 7 เป็น 1 จึงเริ่มอังคาร

พิมพ์ช่องว่างสามตัวต่อคอลัมน์ก่อนวันที่ 1 แล้วพิมพ์วันที่ช่องละสามตัว ครบเจ็ดคอลัมน์จึงขึ้นบรรทัดใหม่ เมื่อจบเดือนให้พิมพ์บรรทัดที่ยังค้างอยู่เพียงครั้งเดียว สูตรกับหน้าตาแยกกันไว้: ถ้าวันที่ 1 ผิดคอลัมน์ ให้ตรวจจำนวนวันก่อนปรับช่องว่าง

## ร่างโปรแกรมสำหรับอ่านร่วมกัน

Code fence นี้แสดงข้อความเดียวกับไฟล์ดาวน์โหลด Source check ผ่านแล้ว; ผลพิมพ์จริงยังต้องตรวจจากการรัน native

```basic
' Draft for discussion; not verified or accepted as a runnable example.
' Change these two values to supply a year and month.
Procedure IsLeap(year As Integer) As Boolean
  Return year Mod 400 = 0 Or (year Mod 4 = 0 And year Mod 100 <> 0)
EndProcedure

Procedure DaysInMonth(year As Integer, month As Integer) As Integer
  If month = 2 Then
    If IsLeap(year) Then
      Return 29
    EndIf
    Return 28
  EndIf
  If month = 4 Or month = 6 Or month = 9 Or month = 11 Then
    Return 30
  EndIf
  Return 31
EndProcedure

' Monday is column 0. Gregorian 0001-01-01 is Monday.
Procedure FirstWeekday(year As Integer, month As Integer) As Integer
  Let previous As Integer = year - 1
  Let days As Integer = previous * 365 + previous Div 4 - previous Div 100 + previous Div 400
  For m As Integer = 1 To month - 1
    days += DaysInMonth(year, m)
  Next
  Return days Mod 7
EndProcedure

Procedure Cell(day As Integer) As String
  If day < 10 Then
    Return " " + day.ToString() + " "
  EndIf
  Return day.ToString() + " "
EndProcedure

Procedure PrintCalendar(year As Integer, month As Integer)
  If year < 1 Or year > 9999 Or month < 1 Or month > 12 Then
    PrintLn("year must be 1..9999; month must be 1..12")
    Return
  EndIf
  PrintLn(year.ToString() + "-" + month.ToString())
  PrintLn("Mo Tu We Th Fr Sa Su")
  Let column As Integer = FirstWeekday(year, month)
  Let line As String = ""
  For blank As Integer = 1 To column
    line += "   "
  Next
  For day As Integer = 1 To DaysInMonth(year, month)
    line += Cell(day)
    column += 1
    If column = 7 Then
      PrintLn(line)
      line = ""
      column = 0
    EndIf
  Next
  If column > 0 Then
    PrintLn(line)
  EndIf
EndProcedure

Procedure Main()
  Let year As Integer = 2000
  Let month As Integer = 2
  PrintCalendar(year, month)
EndProcedure
```

## เกณฑ์รับงานที่ยังไม่ได้ยืนยัน

- **Given** ปี 2000 เดือน 2 **When** พิมพ์ **Then** วันที่ 1 อยู่คอลัมน์อังคาร มี 29 แต่ไม่มี 30
- **Given** ปี 1900 เดือน 2 **When** พิมพ์ **Then** มี 28 แต่ไม่มี 29
- **Given** ปี 2024 เดือน 9 **When** พิมพ์ **Then** วันที่ 1 อยู่คอลัมน์อาทิตย์
- **Given** เดือน 0/13 หรือปี 0 **When** เรียก `PrintCalendar` **Then** แจ้งช่วงที่รับได้และไม่คำนวณ

## ลองต่อและสิ่งที่ยังขาด

ลองตรวจด้วยมือว่ากุมภาพันธ์ 2000 วันที่ 7 เป็นจันทร์และวันที่ 29 เป็นอังคาร แล้วเพิ่มการรับข้อมูลด้วย `ReadLine()` และ `Integer.Parse` โดยแยก EOF ข้อความผิดรูป และค่านอกช่วง การขอเดือนปัจจุบันจากนาฬิกาเครื่องเป็นคำขอไลบรารี **SWP-FR-02**; ไม่สมมติว่ามี `DateTime/Calendar` แล้ว ต้องตรวจผลพิมพ์จริงและปีขอบ 1/9999 ก่อนเรียกเป็นตัวอย่างที่รันได้

แนวคิดเริ่มจาก [บทต้นทาง](https://inventwithpython.com/bigbookpython/project8.html) ของ Al Sweigart; คำอธิบายและร่าง WBasic นี้เขียนใหม่
