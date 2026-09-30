# 3. Red/Green เมื่อผลลัพธ์มีชนิดและข้อผิดพลาด

**Verified R2 core compiler** ที่ SHA `7492885ff0a98dbcd70f987596c61095f59e7818` ผ่าน native conformance 75/75 ทั้ง Windows/macOS ARM64 บทฝึก [run-core-lesson.mjs](https://github.com/jedt3d/wbasic-language/blob/main/examples/r2/run-core-lesson.mjs) ผ่านทั้ง Windows/macOS ARM64 โดยใช้ Node standard library เป็นตัวตรวจอิสระ; รายละเอียดดู [ดัชนี R2](../r2-feature-index.md) `wb test` และ Test API ยังเป็น **Planned**

Given: [core-lesson.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r2/core-lesson.wbas) รับ Unicode args สองค่า คำนวณด้วย Procedure และ control flow แล้ว `Return 7` When: `wb check ... --json` และ `wb run ... -- 'ไทย 😀' 'สอง'` Then: check accepted โดย diagnostics ว่าง; run ออกด้วย status 7, stderr ว่าง และ stdout ต้องเท่ากับ UTF-8 bytes `สวัสดี ไทย 😀\nargs:2\ntotal:10\n7\n2.5\n` ทุก byte

สคริปต์จงใจตั้ง expected stdout ผิดหนึ่งจุดโดยลบ emoji จากบรรทัดแรก หลังตรวจแล้วว่าโปรแกรมรันสำเร็จ มันจับเฉพาะ `AssertionError` จาก byte mismatch นี้เป็น **expected Red 1** แล้วใช้ expected bytes ที่ถูกต้องเป็น **Green 1** การเปลี่ยน LF, ลำดับ หรืออักขระ Unicode จะทำให้ Green ไม่ผ่าน ไม่มีการ trim หรือ normalize ผลเพื่อให้ผ่านง่ายขึ้น

ข้อผิดพลาดสองแบบมีสัญญาคนละอย่าง [invalid-condition.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r2/invalid-condition.wbas) ใช้ `If 1 Then` ซึ่งผิดชนิด: `wb check` ต้อง exit 1 และคืน diagnostic stage `type`, code `WB301`, line 2 column 6 โดย span ชี้เลข `1` ส่วน [arithmetic-error.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r2/arithmetic-error.wbas) type-check ผ่าน แต่ `wb run` ต้อง exit 1 โดย stdout ว่างและ stderr เท่ากับ `ErrorKind.Arithmetic\n` หลัง Integer overflow ทั้งสองกรณีไม่ใช่ assertion Red ที่ตั้งใจ ถ้า binary/linker/SDK หาย, timeout, signal หรือเช็กไม่ถึง expected stage/code ให้ถือว่าเป็น failure ของบทฝึก

รันจาก repository root หลัง build compiler/runtime และเตรียม native SDK ตาม [Programming ch. 3](../programming-with-wbasic/03-r2-language-core.md):

```sh
node examples/r2/run-core-lesson.mjs
```

แนวทางนี้รักษาวงจร Given/When/Then → Red ที่มีเหตุผล → Green จากพฤติกรรมจริง → refactor พร้อมรัน affected checks โดยแยก compiler diagnostics, uncaught runtime errors และ assertion mismatch ออกจากกัน เมื่อมี `wb test`, typed matchers และ fixture clock/jobs ในรอบต่อไปจึงเพิ่มบททดสอบในภาษาได้; บทนี้ไม่อ้างว่าความสามารถเหล่านั้นผ่านแล้ว
