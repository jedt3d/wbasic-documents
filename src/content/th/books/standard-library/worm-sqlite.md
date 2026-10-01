---
title: "WORM SQLite แบบทดลอง"
weight: 80
---

**สถานะ:** API จำกัดขอบเขตใน WBasic `0.0.2` ผ่าน native gate บน Windows/macOS ARM64 ตาม [หลักฐาน M2–M5](https://github.com/jedt3d/wbasic-language/blob/143be58/docs/evidence/worm-m5-m7-2026-10-02.json) SQLite เป็น provider เดียวที่ตรวจแล้ว นี่ไม่ใช่ API ORM ทั่วไปหรือการรับรองใช้งาน production

## Mapping และเจตนาการเขียน

`Worm.OpenSqlite(path As String) As Worm.Database` เปิดฐานข้อมูล แต่ไม่สร้างหรือ migrate schema ให้แอป `Worm.Mapping(Of T)(modelId As String, version As Integer, table As String, key As String, versionField As String)` ผูก public flat `Structure` กับตาราง โดยระบุ qualified model ID, version, ชื่อตาราง, key และ version field เป็น literal ชนิด field ที่รองรับคือ `Integer`, `Byte`, `Boolean`, `Float`, `String` และ nullable scalar เหล่านี้ ขีดจำกัด metadata คือ 256 fields, 100,000 rows และ 999 parameters

ภายในโปรแกรมที่ compile ครั้งเดียวกัน ทุก source module ต้องให้ `(modelId, version)` เดียวกันหมายถึง Structure, field layout, table และ key/version policy เดียวกัน การประกาศซ้ำที่ตรงกันทำได้; ถ้าขัดกัน compiler รายงาน `WB301` ที่ model ID literal **ก่อนแตะฐานข้อมูล** การเปลี่ยน mapping version ไม่ได้ตรวจ schema เดิมหรือ migrate ข้อมูล แยก version ของ mapping ออกจากค่า `Version` ที่ใช้ตรวจการแก้ row ชนกัน

`Worm.NewChanges(Of T)()` สร้าง request ที่ละทุก field; `Worm.Set(Of T)(changes, "Field", value)` คืน request ค่าใหม่ จึงต้องเก็บผลที่คืน Field literal ผ่านการตรวจชื่อและชนิดตอน compile ค่าที่ละไว้ใช้ database default เมื่อ insert; `Null` ที่ระบุชัดเขียน SQL NULL เฉพาะ field nullable อย่าเดาเจตนาจากค่า default ของ Structure หรือจาก `String?` อย่างเดียว

## Query กับ transaction

`Worm.Select(Of T)()` สร้าง query description โดยยังไม่ทำ I/O ใช้ `Equal`, `GreaterThan`, `IsNull`, `IsNotNull`, `OrderBy` และ `Limit` เติมเงื่อนไขที่ตรวจ field literal และ bind ค่า `Worm.All` รัน query และคืน model เต็ม; `Worm.Project` คืน projection Structure ที่แยกต่างหาก ส่วน `Worm.RawAll` ใช้ SQL ที่ bind parameter บน transaction เดียวกันและตรวจชื่อ ลำดับ และชนิด column ให้ตรงกับผลลัพธ์

`db.BeginTransaction()` เริ่ม SQLite DEFERRED transaction; writer lock ได้ตอนเขียนครั้งแรก ให้แก้ draft ธรรมดาและตรวจธุรกิจก่อนเปิด transaction แล้วส่ง `Worm.Transaction` ตัวเดียวให้ทุกขั้นของการ save `Worm.Insert`, `InsertReturning` และ `Update` ทำงานภายใน transaction `InsertReturning` คืนค่าจริงที่ฐานสร้าง แต่ยังไม่ยืนยัน durability จน `Commit()` สำเร็จ ถ้าออกจาก `Using` โดยไม่ commit ระบบพยายาม rollback; ไม่มี implicit commit

`Worm.Update(tx, mapping, changes, key, expectedVersion)` ใช้ version guard และเพิ่ม version แบบ atomic หากไม่พบ row ที่ version ตรงกันให้ `Worm.Conflict` และ transaction เป็น `Failed` จึง commit ต่อไม่ได้ `Busy` เป็นอีกกรณีหนึ่ง ต้องเปิด transaction ใหม่และอ่านข้อมูลใหม่ก่อนตัดสินใจ retry หาก commit ถูกปฏิเสธแน่นอน state เป็น `Failed`; หากส่ง commit แล้วไม่ทราบผล state เป็น `Unknown` อย่าอ้างว่า rollback สำเร็จหรือ retry การเขียนซ้ำโดยไม่ตรวจผล `tx.State()` อ่าน `Active`, `Failed`, `Committed`, `RolledBack` หรือ `Unknown` ก่อนปิด; หลังปิด alias ทุกตัวเป็น `Worm.ResourceClosed`

WORM database/transaction เป็น resource ไม่ข้าม Jobs; ให้ worker เปิดและปิดเอง UI ส่ง ordinary draft/request/result values ผ่าน Jobs ได้ `Sqlite.Connection` ของ R5 เป็น resource แยก แม้เปิดไฟล์เดียวกัน ไม่มี relations, savepoints, migration API, PostgreSQL/MariaDB หรือการตรวจ persistent schema identity ในรุ่นนี้ ดู [metadata ที่ compiler ประกาศ](https://github.com/jedt3d/wbasic-language/blob/143be58/crates/wb-compiler/src/worm_metadata.rs) และ [ตัวอย่างที่รันได้](https://github.com/jedt3d/wbasic-language/tree/143be58/examples/worm)
