# 6. Binary/text streams และ Json.Value

**R5 developer gate ผ่าน:** binary/text stream และ dynamic `Json.Value` ผ่าน native conformance บน Windows/macOS ARM64; [ตัวอย่างบทนี้](https://github.com/jedt3d/wbasic-language/blob/main/examples/r5/README.md) ผ่านตัวตรวจทั้งสอง host ดู [หลักฐาน R5](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/evidence/r5-complete-2026-09-28.json) และ [ดัชนี R5](../r5-feature-index.md) สำหรับสถานะราย feature

เริ่มจาก [stream-memory.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r5/stream-memory.wbas) `Memory.FromBytes(input)` รับ snapshot ของ Byte Array; การแก้ `input[0]` ภายหลังไม่เปลี่ยน byte ใน stream `ReadInto(ByRef buffer, 1, 2)` เขียนเข้าตัวแปรที่ผู้เรียกส่งอย่างชัดเจน แต่ `savedBuffer` ที่คัดไว้ยังมีค่าเดิม เมื่อ `Seek(5)` แล้วเขียน byte หนึ่งตัว ช่องว่างก่อนหน้าเป็นศูนย์ `Memory.ToBytes` คืน snapshot ใหม่ ใช้ `Using` เพื่อปิด resource เมื่อออกจาก scope

[text-memory.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r5/text-memory.wbas) ห่อ memory stream ด้วย `TextWriter.Create(..., leaveOpen := True, newline := "\n")` แล้วอ่านคืนผ่าน `TextReader` เนื้อหา UTF-8 `ไทย🙂` ต้องครบ byte `ReadLine()` คืน `String?`; EOF จึงใช้ `?? "EOF"` ระหว่าง reader ใช้ stream อยู่ การอ่าน binary จาก stream เดียวกันทำให้เกิด `ErrorKind.IO` (`IO.StreamInUse`) `leaveOpen` หมายถึงการปิด adapter ไม่ปิด stream ที่ยืมมา ไม่ใช่อนุญาตให้ใช้ binary/text พร้อมกัน

[json-value.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r5/json-value.wbas) แสดงผิว dynamic ที่ native lesson ทั้งสอง host ตรวจแล้ว: `Import Json`, `Json.Parse`, `Json.Value`, `.Kind`, `.Get`, `[]`, `.AsString()`, `.AsInteger()` และ `.AsStringOrNull()` JSON `null` เป็นค่า `Json.Value` ที่ `.Kind = Json.Kind.Null` แต่ `.Get("missing")` คืน nullable ที่ไม่มีค่า; key แบบ `[]` ที่ขาดโยน `MissingKey` Array ใช้ index ติดลบเพื่ออ่านจากท้ายตามกฎ WBasic Number token `9223372036854775807` ยังแปลงเป็น Integer ได้ตรง; type ผิดต้องเกิด `Conversion` และ object ที่มี key ซ้ำหลัง decode Unicode escape ต้องเกิด `Parse` ไม่ใช่เงียบ ๆ ทับค่า

หลัง build `wb`/runtime แบบ native บน host ที่รองรับ ให้รันจาก repository root:

```sh
node examples/r5/run-lesson.mjs
```

ตัวตรวจยืนยัน `wb check`, stdout แบบ UTF-8 byte-for-byte, และผล `wb test` ใน [บท TDD 6](../tdd-with-wbasic/06-r5-stream-tests.md) บทนี้ผ่าน Windows/macOS ARM64 ส่วน generated JSON codecs, Http, Sqlite, Csv, nested matchers และ aggregation อยู่ใน [บท 7](07-r5-codecs-data-libraries.md) ซึ่งผ่าน developer native gate ทั้งสอง host เช่นกัน
