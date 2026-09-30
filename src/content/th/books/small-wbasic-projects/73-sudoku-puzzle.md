---
title: "73 · ตรวจหรือแก้ตารางซูโดกุ"
description: "แผนบท: ตรวจหรือแก้ตารางซูโดกุ"
weight: 73
---

{{< project-download "73-sudoku-puzzle" "PLAN.md" >}}
{{< project-download "73-sudoku-puzzle" "draft.wbas.txt" >}}

> **สถานะ: บทร่าง; source check ผ่าน** `draft.wbas.txt` ผ่าน `wb check --json` ด้วย compiler ที่ตรึงไว้โดยไม่มี diagnostic แล้ว แต่ยังไม่ผ่านการรัน native หรือเกณฑ์รับงาน ร่างนี้ตรวจข้อขัดแย้งเท่านั้น ยังไม่ใช่ solver, generator หรือ `main.wbas`

## เป้าหมายและข้อมูล

เริ่มจากคำถามที่เล็กแต่ตรวจได้: กระดาน 9×9 นี้มีเลขขัดกติกาหรือไม่? ใช้ `0` แทนช่องว่างและเลข `1..9` แทนค่าที่ใส่แล้ว แต่ละแถว หลัก และกล่อง 3×3 ต้องไม่มีเลขบวกซ้ำ `ValidBoard` คืน `True` เมื่อ **ยังไม่ขัดกติกา** ไม่ได้บอกว่ากระดานเต็ม มีคำตอบ หรือมีคำตอบเดียว ซูโดกุไม่ยอมให้เราข้ามความต่างสามอย่างนี้ไปด้วยรอยยิ้ม

## ตรวจอย่างไรไม่ให้หลงกล่อง

`ValidGroup` ใช้ `seen` สิบช่อง โดย index 0 ไม่ทำเครื่องหมาย ค่านอก `0..9` ผิดทันที; ศูนย์ข้ามได้เพราะช่องว่างมีหลายช่อง; เลขบวกที่เคยเห็นแล้วผิด `ValidBoard` ตรวจจำนวนแถวและความยาวทุกแถว **ก่อน** อ่าน index 0..8 แล้วสร้างอาร์เรย์ของแต่ละหลัก และแต่ละกล่องด้วย `boxRow*3+dr`, `boxCol*3+dc`

ลองรอยเดินมือ แถวแรกคือ `5,3,0,0,7,0,0,0,0` พบ 5 แล้วทำ `seen[5]` เป็นจริง พบ 3 แล้วทำ `seen[3]` ศูนย์ผ่าน ถ้าเปลี่ยนช่อง `(0,2)` เป็น 5 จะพบ `seen[5]` เป็นจริงและคืน `False` แม้ยังไม่ได้ตรวจหลักหรือกล่อง ถ้าใส่ 5 ที่ `(1,1)` จะขัดกล่องซ้ายบนด้วย

## ร่างโปรแกรมสำหรับอ่านร่วมกัน

Code fence นี้ใช้ข้อความเดียวกับไฟล์ร่างดาวน์โหลด ร่างกำหนดให้พิมพ์ `legal so far` หรือ `invalid board` โดยผ่าน source check แล้ว แต่ยังต้องตรวจการรัน native และกรณี acceptance ก่อนยืนยันผล

```basic
' Draft for discussion; not verified or accepted as a runnable example.
' Zero represents an empty cell. This checks legality, not solvability.
Procedure ValidGroup(values As Array Of Integer) As Boolean
  Let seen As Array Of Boolean = [False, False, False, False, False, False, False, False, False, False]
  For i As Integer = 0 To values.Length - 1
    Let value As Integer = values[i]
    If value < 0 Or value > 9 Then
      Return False
    EndIf
    If value > 0 Then
      If seen[value] Then
        Return False
      EndIf
      seen[value] = True
    EndIf
  Next
  Return True
EndProcedure

Procedure ValidBoard(board As Array Of (Array Of Integer)) As Boolean
  If board.Length <> 9 Then
    Return False
  EndIf
  For row As Integer = 0 To 8
    If board[row].Length <> 9 Then
      Return False
    EndIf
  Next
  For row As Integer = 0 To 8
    If Not ValidGroup(board[row]) Then
      Return False
    EndIf
    Let column As Array Of Integer = []
    For col As Integer = 0 To 8
      column.Append(board[col][row])
    Next
    If Not ValidGroup(column) Then
      Return False
    EndIf
  Next
  For boxRow As Integer = 0 To 2
    For boxCol As Integer = 0 To 2
      Let box As Array Of Integer = []
      For dr As Integer = 0 To 2
        For dc As Integer = 0 To 2
          box.Append(board[boxRow * 3 + dr][boxCol * 3 + dc])
        Next
      Next
      If Not ValidGroup(box) Then
        Return False
      EndIf
    Next
  Next
  Return True
EndProcedure

Procedure Main()
  Let board As Array Of (Array Of Integer) = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ]
  If ValidBoard(board) Then
    PrintLn("legal so far")
  Else
    PrintLn("invalid board")
  EndIf
EndProcedure
```

## เกณฑ์รับงานที่ยังไม่ได้ยืนยัน

- **Given** กระดานตัวอย่างที่มีศูนย์ **When** ตรวจ **Then** ได้ `True` ในความหมายว่าไม่พบเลขขัดกติกา
- **Given** เปลี่ยน `(0,2)` เป็น 5 **When** ตรวจ **Then** ได้ `False` เพราะแถวแรกมี 5 ซ้ำ
- **Given** เลขเดียวกันซ้ำในหลักหรือกล่อง **When** ตรวจ **Then** ได้ `False`
- **Given** แถวสั้นกว่าเก้าช่อง หรือมีค่า −1/10 **When** ตรวจ **Then** ได้ `False` โดยไม่อ่าน index เกิน
- **Given** กระดานถูกกติกาแต่ยังว่าง **When** ตรวจ **Then** ห้ามแสดงว่าไขเสร็จหรือมีคำตอบเดียว

## จากตัวตรวจไปสู่ตัวแก้

ตัวแก้แบบ backtracking เป็น **แผนขั้นถัดไป**: เลือกช่อง 0 หนึ่งช่อง ลองเลข 1 ถึง 9 ทีละตัว ตรวจแถว/หลัก/กล่องก่อนวาง แล้วเรียกตัวเองกับช่องว่างถัดไป ถ้าทางนั้นตันให้คืนค่า 0 ที่ช่องเดิมแล้วลองเลขต่อ เมื่อไม่มีช่องว่างจึงได้คำตอบหนึ่งชุด ต้องตัดสินว่าจะหยุดที่คำตอบแรกหรือเดินต่อเพื่อนับคำตอบ หากจะพิสูจน์ว่ามีคำตอบเดียว ให้นับจนถึง 2 แล้วหยุด เก็บกระดานโจทย์แยกจากกระดานที่แก้เพื่อไม่ให้การย้อนกลับทำลาย input

ตัวสร้างปริศนาเป็นงานอีกขั้น: เริ่มจากกระดานสมบูรณ์ ลบช่องโดยนับคำตอบหลังแต่ละครั้ง และคงการลบเฉพาะเมื่อยังมีคำตอบเดียว ถ้าต้องการสุ่มลำดับ ต้องกำหนด seed และตรวจช่วงค่าของ PRNG **SWP-FR-01** เป็นคำขอไลบรารีสุ่ม ไม่ใช่ API ที่ร่างนี้ใช้

แบบฝึกหัด: เพิ่ม `IsComplete` เพื่อแยกกระดานเต็มจากกระดานถูกกติกาบางส่วน แล้วทดสอบแถว หลัก กล่องที่ซ้ำแยกกัน สิ่งที่ยังขาดคือการรันตัวตรวจ ตัวแก้พร้อมกรณีไม่มีคำตอบ/หลายคำตอบ การพิสูจน์เอกลักษณ์ของตัวสร้าง และการรับ input

แนวคิดเริ่มจาก [บทต้นทาง](https://inventwithpython.com/bigbookpython/project73.html) ของ Al Sweigart; คำอธิบายและร่าง WBasic นี้เขียนใหม่
