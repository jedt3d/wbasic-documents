# 5. Typed rows, กลุ่มรายงาน และ assertion ของค่าประกอบ

**บท R4: ตัวตรวจบทผ่าน Windows/macOS ARM64 ที่ SHA `7184490`.** ใช้ [ตัวตรวจบท](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/run-lesson.mjs) เพื่อรัน green/red อย่างแยกผลจริงจากความตั้งใจ

อ่าน [typed-rows/tests/add_spec.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/typed-rows/tests/add_spec.wbas) คู่กับ [test-catalog.json](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/typed-rows/tests/test-catalog.json) `Case_Add(row As AddRow)` เป็น body ที่มี parameter หนึ่งตัว จึงไม่ถูกค้นเป็น `Test_` ปกติ แต่ละ row ระบุ provider Procedure ที่คืน `AddRow` ที่เป็น type เดียวกัน catalog เก็บชื่อ ไม่เก็บ WBasic expression หรือแปลง JSON เป็นค่าภาษา `suite`, `context`, `displayName`, `label` ใช้ทำรายงานและ identity; row `wrong expected value` ตั้งใจ Red ส่วน `negative after failure` ต้องยังผ่านเพราะแต่ละ row เป็น process/working directory ใหม่ `Finally` พิมพ์ `row cleanup` แม้ assertion fail

อ่าน [matchers/tests/collections_spec.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/matchers/tests/collections_spec.wbas) `Test.ContainExactly` เปรียบ Array แบบไม่สนลำดับแต่ยังนับจำนวนสมาชิกซ้ำ; `Test.Equal` ของ Map ไม่สนลำดับ insertion แต่ key ยังคงเป็น String exact `Test.IncludeEntries` อนุญาต key เพิ่มเติมเฉพาะ Map ชั้นนอก; value ที่เป็น Array ยังเปรียบเทียบตามลำดับ `HaveKey`/`MissingKey` รับ literal key จึงไม่ตีความ `a.b` เป็น path `HaveLength` ของ String นับ Unicode scalar (`ก้😀` มี 3) `Test.All` และ `Test.Any` รับ named predicate; `All([])` เป็นจริง ส่วน `Any([])` เป็นเท็จ

[matchers-expected-failure](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/matchers-expected-failure/tests/collections_spec.wbas) ทำ Red สามแบบ: duplicate count ผิด, Array ที่ซ้อนใน Map สลับลำดับ, และ `Any` บน Array ว่าง ตัวตรวจบังคับให้ทั้งสามเป็น `assertion_failed` พร้อม path/detail ของ structural mismatch ที่ตรวจได้ ไม่ยอมรับ ordinary error, timeout, crash หรือ compiler diagnostic เป็น Red ที่คาดไว้ รายงานต้องมี counts ตรงและ cleanup ของ case แรก

จาก repository root หลัง build native `wb`/runtime:

```sh
wb test examples/r4/typed-rows --json
wb test examples/r4/matchers --json
wb test examples/r4/matchers-expected-failure --json
node examples/r4/run-lesson.mjs
```

คำสั่งแรกและที่สามตั้งใจ exit 1 ส่วน Node checker exit 0 เมื่อผลที่คาดตรงทุกอย่าง `wb test` ยังแยกจาก Rust integration/native conformance ชุดอื่น และ `Given/When/Then` ยังเป็น comments ตามแนวคิด ไม่ใช่ language keywords Nested matcher descriptors, aggregate scopes, JSON mapper contract และ deterministic TUI/Jobs tests ยังเป็น **Planned** ดู [R4 testing contract](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/wb-test-r4-contract.md) สำหรับ type/signature และ limit ของ matcher
