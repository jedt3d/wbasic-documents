---
title: "CSV"
weight: 70
---

สถานะ: **writer ผ่าน R5; การสร้างไฟล์แบบ exclusive ผ่าน native gate ของ WORM M5**

```basic
Import Csv

Csv.Create(path As String, delimiter As String = ",",
           newline As String = "\r\n", overwrite As Boolean = True) As Csv.Writer
writer.WriteRow(values As Array Of String)
writer.Close()
```

writer เขียน UTF-8 และ quote ค่าอย่างถูกต้องเมื่อมี delimiter, quote หรือ newline

```basic
Using output As Csv.Writer = Csv.Create("people.csv")
  output.WriteRow(["id", "name", "note"])
  output.WriteRow(["1", "ไทย, \"Alice\"", "บรรทัดหนึ่ง\nบรรทัดสอง"])
EndUsing
```

`overwrite := False` ปฏิเสธ path ที่มีอยู่แบบ atomic โดยไม่ตัดข้อมูลเดิม เหมาะกับไฟล์
`.partial` ที่อยู่ข้างไฟล์ปลายทาง แต่ไม่ได้ล็อกปลายทาง: cancellation อาจเหลือ partial
bytes และ `File.Move` ภายหลังไม่ได้รับประกัน idempotency หรือความทนทานเมื่อไฟดับ

close/flush errors รักษา primary/suppressed ordering เช่นเดียวกับ text streams
R7 showcase ทดสอบ export ขนาดใหญ่และ cancellation; M5 ทดสอบการสร้าง partial
แบบ exclusive ด้วยสอง process เพิ่มเติม

API ปัจจุบันเป็น **writer**; อย่าเขียนคู่มือให้ผู้อ่านคาดว่ามี public
`Csv.Reader` หาก source ยังไม่มี ชุดทดสอบสามารถอ่านผลกลับด้วย harness เพื่อ
พิสูจน์ round-trip ได้ แต่นั่นไม่ทำให้ harness กลายเป็นภาษา API
