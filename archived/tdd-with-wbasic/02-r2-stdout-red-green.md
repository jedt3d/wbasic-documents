# 2. Red/Green กับโปรแกรม WBasic จริง

**Verified R2.1 subset** ที่ source SHA `8c38f55883ac94a570ae19e736abedec3a1201ba`: ใน slice นี้ `wb check` และ `wb run` ใช้ [hello.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r2/hello.wbas) ได้ แต่ `wb test` และ Test API ยังเป็น **Planned** บทนี้ใช้ Node standard library เป็นตัวตรวจอิสระจาก compiler; [บท 3](03-r2-typed-red-green.md) เพิ่มกรณี typed core ของ R2 ดู [ดัชนี R2](../r2-feature-index.md) สำหรับผลของ host ที่ทดสอบ

Given: source มี `Main` และสอง `PrintLn` ที่เขียน `Hello, WBasic` กับ `สวัสดี 😀` ตามด้วย LF ทั้งสองบรรทัด When: `wb check ... --json` ตรวจ source แล้ว `wb run` คอมไพล์ ลิงก์ และรันโปรแกรม Then: check ต้อง accepted/diagnostics ว่าง, run ต้อง exit 0, stderr ว่าง และ stdout ต้องเท่ากับ UTF-8 byte sequence ที่ระบุทุก byte

รัน [บทฝึก](https://github.com/jedt3d/wbasic-language/blob/main/examples/r2/run-lesson.mjs) จาก repository root หลัง build compiler/runtime ตาม [Programming ch. 2](../programming-with-wbasic/02-r2-main-println.md):

```sh
node examples/r2/run-lesson.mjs
```

สคริปต์ตั้ง expectation ที่ผิดโดยจงใจ: ตัด emoji จากบรรทัดไทย แต่ source และ `wb run` ยังเหมือนเดิม การเทียบ stdout แบบ exact ต้องโยน `AssertionError` หนึ่งครั้ง สคริปต์จับเฉพาะ assertion mismatch นี้เป็น **expected Red: 1** แล้วใช้ expectation ที่ถูกต้องตรวจ **Green: 1** การเปรียบเทียบ byte ทำให้ LF, UTF-8, ลำดับบรรทัดและ emoji มีความหมาย ไม่มีการ trim หรือ normalize

Red นี้ต่างจาก source diagnostic: ถ้า `PrintLn(1)` ผิด type check ต้องรายงาน `WB300` ที่ stage `type` และ `wb run` ไม่ควรถึงขั้น assertion stdout ส่วน binary หาย, linker/SDK ใช้ไม่ได้, timeout, signal, check ไม่ accepted หรือ exit status ไม่ใช่ศูนย์คือ infrastructure/compile failure; สคริปต์โยน error และไม่นับเป็น Red ที่คาดไว้ นี่รักษาความหมายของวงจร Red/Green ตาม [testing plan](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/wbasic-testing-development-plan-draft-0.3.md)

เมื่อเพิ่ม behavior ใหม่ ให้เริ่มจากผลที่มองเห็นได้หนึ่งอย่าง เขียน expectation ผิดหรือ test ที่ยัง fail ด้วยเหตุผลที่ตั้งใจ ตรวจสาเหตุ ก่อนทำ Green และ refactor โดยรัน affected checks ต่อไป `wb test`, Test.Check/Fail, typed matchers, cleanup และ TUI fixtures ยังเป็น **Planned**; ตัวอย่าง Node นี้ไม่ได้รับรอง feature เหล่านั้น
