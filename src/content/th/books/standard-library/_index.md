---
title: "ไลบรารีมาตรฐาน"
description: "โมดูล ชนิดข้อมูล และ procedure มาตรฐานที่โปรแกรม WBasic เรียกใช้ได้"
weight: 2
---

ส่วนนี้จัดตามโมดูล โดยบอก signature ผลลัพธ์ error และตัวอย่างสั้น ครอบคลุม
ไลบรารี R5 และ WORM SQLite แบบทดลองที่ตรวจถึง M5 บน Windows/macOS ARM64

คำว่า “ผ่าน” ในเล่มนี้จึงหมายถึงผ่านบนสอง host และ revision ที่บันทึกไว้ ไม่ได้ขยาย
เป็นคำรับรอง Linux ARM64 หรือ native x86_64 และไม่ได้แทน gate การแจกจ่ายแบบไม่มี SDK
ของ R8

หน้าที่ยังวางแผนอยู่จะไม่ถูกเขียนให้ดูเหมือนเป็น API ที่พร้อมใช้—เพราะคู่มือ
อ้างอิงควรช่วยลดเรื่องประหลาดใจ ไม่ใช่เป็นคนสร้างเรื่องประหลาดใจเสียเอง

## สารบัญ

1. [Core I/O และ standard handles](core-io.md)
2. [Stream และข้อความ](streams-and-text.md)
3. [Json.Value และ codecs](json.md)
4. [File และ Memory](file-and-memory.md)
5. [HTTP](http.md)
6. [SQLite](sqlite.md)
7. [CSV](csv.md)
8. [WORM SQLite แบบทดลอง](worm-sqlite.md)

ทุก API ในเล่มนี้เป็น synchronous หากเรียกจาก TUI callback โดยตรง runtime จะ
รายงาน `Tui.BlockingOperation`; ให้นำงาน I/O ไปทำผ่าน `Jobs` แทน
