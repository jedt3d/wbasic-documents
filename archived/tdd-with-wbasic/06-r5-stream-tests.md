# 6. ทดสอบ stream ที่ขอบ I/O และ failure class

**R5 developer gate ผ่าน:** binary/text runtime และ [ตัวตรวจบท](https://github.com/jedt3d/wbasic-language/blob/main/examples/r5/run-lesson.mjs) ผ่าน Windows/macOS ARM64: 2 Green และ 1 deliberate assertion Red ดู [หลักฐาน R5](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/evidence/r5-complete-2026-09-28.json) และ [ดัชนี R5](../r5-feature-index.md)

ใน [green/tests/stream_spec.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r5/green/tests/stream_spec.wbas) กรณีแรกเขียน Given–When–Then เป็นชื่อและลำดับโค้ด: Given Byte Array, When `Memory.FromBytes` แล้วแก้ต้นฉบับ, Then อ่าน stream ได้ค่าเดิม กรณีที่สอง Given byte sequence UTF-8 ที่ผิด, When `TextReader.ReadToEnd()`, Then จับ `ErrorKind.Conversion` และให้ `Test.Check` ตรวจว่า error ชนิดนั้นเกิดจริง ถ้าอ่านสำเร็จโดยผิดสัญญา ตัวแปร `sawConversion` จะยังเป็น False และ case ล้มเหลว

[expected-red/tests/stream_spec.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r5/expected-red/tests/stream_spec.wbas) จงใจคาดว่า stream จะเห็นการแก้ input หลังสร้าง snapshot จึงเป็น Red จาก assertion เท่านั้น ตัวตรวจต้องเห็น `status = assertion_failed` และ `Test.AssertionFailed` พร้อมตำแหน่ง source การ compile ไม่ผ่าน, runtime error, timeout หรือ crash ไม่ใช่ Red ที่ยอมรับ `wb test` แต่ละกรณีทำงานใน process/working directory ของตนเอง; ตัวอย่างใช้ memory stream เพื่อหลีกเลี่ยง clock, filesystem หรือ network ที่ไม่จำเป็น

หลัง native build รัน:

```sh
wb test examples/r5/green --json
wb test examples/r5/expected-red --json
node examples/r5/run-lesson.mjs
```

คำสั่งที่สองตั้งใจ exit 1 ส่วน Node checker จะ exit 0 ก็ต่อเมื่อผล Green สอง case, Red หนึ่ง case และ exact output ของ stream/text/JSON program ตรงกัน การทดสอบไฟล์จริงยังเป็นหน้าที่ของ native conformance ที่ I/O boundary; ไม่ควรใช้ fake แทนทั้งหมด Generated codecs, Http loopback, Sqlite temporary database, Csv contracts, nested matcher descriptors และ aggregate scopes ต่อใน [บท 7](07-r5-data-boundaries-matchers.md) ซึ่งผ่าน developer native gate ทั้งสอง host แล้ว
