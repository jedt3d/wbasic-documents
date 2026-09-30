# 4. Given–When–Then ด้วย `wb test` รุ่นเล็ก

**R3 example verified on Windows 11 ARM64 and macOS ARM64 at `a92e0ad`.** `wb test` ค้น `tests/**/*_spec.wbas` และรันเฉพาะ `Public Procedure Test_...()` ที่ไม่มี parameter/return value แต่ละ case compile และรันใน process กับ working directory ชั่วคราวของตนเอง [contract R3](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/wb-test-r3-contract.md) ระบุ `--json`, `--filter`, `--timeout-ms` และ `--allow-empty` ดู [ดัชนี R3](../r3-feature-index.md)

อ่าน [pass/tests/lesson_spec.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r3/pass/tests/lesson_spec.wbas): comments `Given`, `When`, `Then` อธิบายพฤติกรรมและไม่ใช่ keywords ของภาษา `Import Test` เปิด `Test.Check(Boolean, message)` case แรกเขียน UTF-8 ใน working directory ของตนแล้วอ่านด้วย `Using`; case ที่สองส่ง named Procedure value แบบ by-value ไปยัง helper ในไฟล์เดียวกัน การใช้ `Procedure` ที่ไม่เป็น public `Test_` ยังเป็น helper ปกติ source แต่ละไฟล์เป็น compilation unit แยกกัน จึงไม่อ้าง helper ข้ามไฟล์หรือ private-access bypass

อ่าน [expected-failure/tests/cleanup_spec.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r3/expected-failure/tests/cleanup_spec.wbas): `Test.Check(False, ...)` กับ `Test.Fail(...)` เป็น intentional Red สอง case ทั้งคู่รัน `Finally` ก่อนรายงาน `assertion_failed` case ที่สาม `Throw Error.Create(...)` เป็น unexpected ordinary `error` แม้จะมี cleanup เช่นกัน ตัวตรวจ Node ยืนยันชนิดผล, code, source line/column และ stdout ของ cleanup; ไม่ถือ error, timeout, crash หรือ compiler diagnostic เป็น assertion Red

รันจาก repository root หลังเตรียม native developer toolchain และ build ตาม [Programming ch. 4](../programming-with-wbasic/04-r3-errors-resources.md):

```sh
wb test examples/r3/pass --json
wb test examples/r3/expected-failure --json
node examples/r3/run-lesson.mjs
```

คำสั่งที่สองตั้งใจ exit 1; JSON ต้องมี `discovered=3`, `failed=2`, `errors=1` และแต่ละ case มีสถานะของตนเอง Node checker จึงเป็นคำสั่งสะดวกสำหรับตรวจผลทั้งหมดและ exit 0 เมื่อ expected Red ถูกจัดประเภทถูกต้อง หากไม่มี case แล้วไม่ระบุ `--allow-empty`, suite ไม่ผ่านเงียบ ๆ `wb check file --json --test` ตรวจ test source ที่ไม่มี Main ได้ แต่ native conformance และ Rust tests ยังต้องรันแยกจาก `wb test`

ตอนนี้ `Test.Check` รับ Boolean/message เท่านั้น ไม่มี power assertion, equality matcher สำหรับ Array/Map, data rows, test hooks หรือ fixture framework ที่บทนี้รับรอง ใช้ explicit setup ใน case และ `Using`/`Finally` สำหรับ cleanup; อย่าผูกผลของ case หนึ่งกับไฟล์ที่อีก case เขียน
