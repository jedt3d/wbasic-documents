---
title: "CSV"
weight: 70
---

สถานะ: **writer ผ่าน R5; ใช้จริงใน R7 SQLite showcase**

```basic
Import Csv

Csv.Create(path As String, delimiter As String = ",",
           newline As String = "\r\n") As Csv.Writer
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

close/flush errors รักษา primary/suppressed ordering เช่นเดียวกับ text streams
R7 showcase ทดสอบ export ขนาดใหญ่, cancellation และการรักษาไฟล์ปลายทางเดิม
ด้วย temporary file + `File.Move`

API ปัจจุบันเป็น **writer**; อย่าเขียนคู่มือให้ผู้อ่านคาดว่ามี public
`Csv.Reader` หาก source ยังไม่มี ชุดทดสอบสามารถอ่านผลกลับด้วย harness เพื่อ
พิสูจน์ round-trip ได้ แต่นั่นไม่ทำให้ harness กลายเป็นภาษา API
