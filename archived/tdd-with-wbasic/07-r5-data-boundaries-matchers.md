# 7. ทดสอบ codec, เครือข่าย, ฐานข้อมูล และ matcher แบบซ้อน

**R5 developer gate ผ่าน:** fixture ของ data/matcher รันบน Windows/macOS ARM64 แล้ว ดู [หลักฐาน R5](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/evidence/r5-complete-2026-09-28.json), [round report](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/rounds/R5-streams-data-libraries.md) และ [ดัชนี R5](../r5-feature-index.md) บท [6](06-r5-stream-tests.md) ครอบคลุม memory stream และ failure class พื้นฐาน

## แยกสิ่งที่ควรใช้ double จาก I/O จริง

การทดสอบ logic ที่จัด URL หรือเตรียม parameter ใช้ handwritten stub/fake ได้ แต่ตัว adapter ต้องเจอขอบ I/O จริง [test-r5-http.mjs](https://github.com/jedt3d/wbasic-language/blob/main/scripts/test-r5-http.mjs) เป็น **loopback server** ที่ควบคุม response เอง จึงกำหนด 200/404, 302, redirect loop, UTF-8 ที่ผิด และ response เกิน 8 MiB ได้อย่าง deterministic โดยไม่พึ่ง public Internet ตัวตรวจต้องเห็น 404 เป็น response ก่อน `EnsureSuccess()`, นับ `/loop` ได้ 6 requests และแยก `Conversion`, `Validation` กับ `Http.ResponseTooLarge` ให้ถูกชนิด Failure เพราะ timeout, crash หรือ compiler rejection ไม่ใช่ผล Red ที่ตั้งใจ

[test-r5-data.mjs](https://github.com/jedt3d/wbasic-language/blob/main/scripts/test-r5-data.mjs) ใช้ temporary **SQLite จริง** กับ output CSV จริง ตรวจ typed bind ของ Integer ขนาดใหญ่, Thai text, BLOB และ NULL, cursor ที่อ่านทีละแถว, rollback ของ transaction ที่ไม่ได้ commit, และ online backup แล้วเปรียบเทียบ UTF-8 CSV byte-for-byte ความต่างของ `\r\n`/`\n`, quote หรือ comma ที่หายเป็น regression ไม่ใช่ formatting ที่อนุโลมได้ unit test ของ runtime แยกตรวจ placeholder mismatch, getter ผิดชนิด, cursor จำนวนมาก, close/cleanup และ backup ไปยัง hardlink ของฐานเดียวกัน

## Green และ Red ของ JSON แบบมีชนิด

[codecs-structure.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r5/codecs-structure.wbas) ตรวจผล Green ของ `SerializedName`, `SerializeIgnore`, field default และ `Json.Read/Write`; ทั้ง `Json.UnknownField` และ `Json.MissingField` ถูกจับพร้อม path ที่คาดไว้ [codecs-nested.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r5/codecs-nested.wbas) เพิ่ม Array/Map ซ้อนและ Byte นอกช่วง [codecs-customer.wbas](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r5/codecs-customer.wbas) เพิ่ม Integer ที่ใหญ่กว่าเลข exact ของ JavaScript, nested Structure, default/nullable และ strict fields ผู้ตรวจบทเทียบ stdout ทุก byte จึงจับ regression ที่คืน error ผิดชนิดหรือ path ผิดได้ [project fixture](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/projects/r5-codecs/App.wproj) ตรวจ codec ของชนิดข้าม module

[green JSON matcher tests](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/testing/r5-json-matchers/tests/json_spec.wbas) มี 2 case ที่ผ่าน: `ContainExactly` ต้องหาการจับคู่ครบแม้ matcher สองตัวทับซ้อนกัน, `MissingKey` ต้องต่างจาก key ที่มี JSON null, `All` บน Array ว่างเป็นจริง และ number token `9007199254740993` ต้องไม่เสีย precision [expected Red tests](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/testing/r5-json-matchers-fail/tests/json_spec.wbas) มี 5 `assertion_failed` กับ 1 unexpected `error`; ตัวตรวจ [test-r5-matchers.mjs](https://github.com/jedt3d/wbasic-language/blob/main/scripts/test-r5-matchers.mjs) ยืนยัน class และรายละเอียด ไม่ถือ exit 1 เพียงอย่างเดียวเป็นผล Red ที่ยอมรับ

ใน `Test.BeginAggregate()` assertion ที่ล้มไม่หยุดการตรวจถัดไป 3 ความล้มเหลวจาก `Check`, `Equal`, `Match` ถูกรวมเป็น `Test.AggregateFailed` พร้อม source span แยกกัน และ `Finally` ยังรัน เมื่อเกิด `Example.Unexpected` กลาง scope error นี้ยังเป็น primary ส่วน aggregate เป็น `Suppressed` ไม่กลับลำดับ Aggregate เก็บรายละเอียด child assertion ได้สูงสุด **8 รายการ** และเก็บ nested mismatch ได้ **1 รายการต่อ child** แต่ `total` ยังคงนับความล้มเหลวทั้งหมดตามจริง; `truncated = true` เมื่อรายละเอียดถูกตัด ขอบรายงาน 40 assertion จึงมี `total = 40`, เก็บ 8 details และระบุ `truncated = true` path ที่เป็น key จริง `ไทย[0]` ต้องแสดงเป็นหนึ่ง key segment จึงไม่สับสนกับ Array index

รันตัวตรวจเฉพาะบทหลัง native build:

```sh
node examples/r5/run-data-lesson.mjs
```

มันตรวจ metadata ของ target/features, 3 codec outputs, 3 projects, HTTP loopback, SQLite/CSV จริง และ matcher Green/Red ที่มีเหตุผลชัดเจน ค่า `WB_CLI`/`WB_RUNTIME_LIB` เลือก binary ได้ ไม่ใช้การผ่านของ fixture นี้อ้างว่า clean-machine distribution, public async syntax, `.xlsx`, YAML/XML หรือ Linux/x86_64 ผ่านแล้ว
