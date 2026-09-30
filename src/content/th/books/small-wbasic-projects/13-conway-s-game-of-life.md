---
title: "13 · คำนวณชีวิตบนตารางรุ่นต่อรุ่น"
description: "แผนบท: คำนวณชีวิตบนตารางรุ่นต่อรุ่น"
weight: 13
---

{{< project-download "13-conway-s-game-of-life" "PLAN.md" >}}
{{< project-download "13-conway-s-game-of-life" "draft.wbas.txt" >}}

> **สถานะ: บทร่าง; source check ผ่าน** `draft.wbas.txt` ผ่าน `wb check --json` ด้วย compiler ที่ตรึงไว้โดยไม่มี diagnostic แล้ว แต่ยังไม่ผ่านการรัน native หรือเกณฑ์รับงาน และยังไม่ใช่ `main.wbas`

## เป้าหมายและข้อมูล

Game of Life มีกฎสั้นจนดูเหมือนเขียนเสร็จก่อนชงชา แต่ความผิดพลาดชอบซ่อนตรงคำว่า “พร้อมกัน” บทนี้เริ่มจากตาราง Boolean 5×5 พิมพ์รุ่น 0 แล้วคำนวณและพิมพ์รุ่น 1 เพียงครั้งเดียว `False` คือตาย `True` คือมีชีวิต ขอบนอกตารางถือว่าตายถาวร ไม่วนทะลุไปอีกด้าน ตัวอย่างใช้เส้นแนวนอนสามเซลล์กลางกระดาน ไม่มีหน้าจอสด ตัวจับเวลา หรือการรับคีย์

## กฎและรอยเดินมือ

นับเพื่อนบ้านแปดตำแหน่งโดยไม่รวมตัวเอง เซลล์มีชีวิตอยู่ต่อเมื่อมีเพื่อนบ้าน 2 หรือ 3 เซลล์ เซลล์ตายเกิดใหม่เมื่อมี 3 เซลล์ จึงเขียนผลว่า `neighbors = 3 Or (alive And neighbors = 2)` ได้

รุ่น 0 มีชีวิตที่ `(2,1)`, `(2,2)`, `(2,3)` หัวซ้ายและขวามีเพื่อนบ้านเพียง 1 จึงตาย ตรงกลางมี 2 จึงอยู่ต่อ ช่อง `(1,2)` และ `(3,2)` เห็น 3 จึงเกิดใหม่ รุ่น 1 เป็นเส้นแนวตั้ง ถ้าแก้ตารางเดิมระหว่างวน ผลช่องหลังอาจขึ้นกับช่องก่อนที่เพิ่งถูกแก้ `NextGeneration` จึงอ่าน `grid` เดิมและสร้าง `next` ใหม่ทีละแถว

`AliveAt` ตรวจขอบก่อนอ่าน index เพื่อให้มุมปลอดภัย ร่างนี้สมมติว่าทุกแถวยาวเท่ากัน การตรวจตารางผิดรูปเป็นงานเพิ่มก่อนรับข้อมูลภายนอก

## ร่างโปรแกรมสำหรับอ่านร่วมกัน

Code fence นี้ใช้ข้อความเดียวกับไฟล์ร่างดาวน์โหลด Source check ผ่านแล้ว; ผลคำนวณจริงยังต้องตรวจจากการรัน native

```basic
' Draft for discussion; not verified or accepted as a runnable example.
' A false border outside the array is permanently dead.
Procedure AliveAt(grid As Array Of (Array Of Boolean), row As Integer, col As Integer) As Integer
  If row < 0 Or row >= grid.Length Then
    Return 0
  EndIf
  If col < 0 Or col >= grid[row].Length Then
    Return 0
  EndIf
  If grid[row][col] Then
    Return 1
  EndIf
  Return 0
EndProcedure

Procedure NeighborCount(grid As Array Of (Array Of Boolean), row As Integer, col As Integer) As Integer
  Let count As Integer = 0
  For dr As Integer = -1 To 1
    For dc As Integer = -1 To 1
      If dr <> 0 Or dc <> 0 Then
        count += AliveAt(grid, row + dr, col + dc)
      EndIf
    Next
  Next
  Return count
EndProcedure

Procedure NextGeneration(grid As Array Of (Array Of Boolean)) As Array Of (Array Of Boolean)
  Let next As Array Of (Array Of Boolean) = []
  For row As Integer = 0 To grid.Length - 1
    Let nextRow As Array Of Boolean = []
    For col As Integer = 0 To grid[row].Length - 1
      Let neighbors As Integer = NeighborCount(grid, row, col)
      Let lives As Boolean = neighbors = 3 Or (grid[row][col] And neighbors = 2)
      nextRow.Append(lives)
    Next
    next.Append(nextRow)
  Next
  Return next
EndProcedure

Procedure PrintGrid(grid As Array Of (Array Of Boolean))
  For row As Integer = 0 To grid.Length - 1
    Let line As String = ""
    For col As Integer = 0 To grid[row].Length - 1
      If grid[row][col] Then
        line += "#"
      Else
        line += "."
      EndIf
    Next
    PrintLn(line)
  Next
EndProcedure

Procedure Main()
  Let current As Array Of (Array Of Boolean) = [
    [False, False, False, False, False],
    [False, False, False, False, False],
    [False, True, True, True, False],
    [False, False, False, False, False],
    [False, False, False, False, False]
  ]
  PrintLn("generation 0")
  PrintGrid(current)
  Let next As Array Of (Array Of Boolean) = NextGeneration(current)
  PrintLn("generation 1")
  PrintGrid(next)
EndProcedure
```

## เกณฑ์รับงานที่ยังไม่ได้ยืนยัน

- **Given** เส้นแนวนอนกลางตาราง **When** คำนวณหนึ่งรุ่น **Then** มีชีวิตเฉพาะ `(1,2)`, `(2,2)`, `(3,2)`
- **Given** ตารางตายทั้งหมด **When** คำนวณ **Then** ทุกเซลล์ยังตาย
- **Given** บล็อก 2×2 กลางตาราง **When** คำนวณ **Then** บล็อกอยู่ตำแหน่งเดิม
- **Given** เซลล์มุมเดียว **When** คำนวณ **Then** มุมตายและไม่มีการเกิดใหม่

## ลองต่อและสิ่งที่ยังขาด

คำนวณรุ่น 2 ด้วยมือก่อน: เส้นแนวตั้งควรกลับเป็นแนวนอน ลองเพิ่ม procedure ตรวจความยาวแถวทุกแถว แล้วแยกการพิมพ์ออกเพื่อทดสอบ grid โดยตรง ถ้าจะเพิ่มโหมดสด ต้องออกแบบการหยุด ความเร็ว และ event loop โดยใช้ขอบเขต TUI/Jobs ที่ยืนยันแล้ว ร่างนี้ยังไม่ตรวจ integration ดังกล่าว สิ่งที่ต้องทำก่อนเลื่อนสถานะคือการรันหนึ่งรุ่น กรณีขอบ ตารางผิดรูป และหลายรุ่น

แนวคิดเริ่มจาก [บทต้นทาง](https://inventwithpython.com/bigbookpython/project13.html) ของ Al Sweigart; คำอธิบายและร่าง WBasic นี้เขียนใหม่
