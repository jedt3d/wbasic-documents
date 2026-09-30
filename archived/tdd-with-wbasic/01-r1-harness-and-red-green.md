# 1. บอกพฤติกรรมก่อนเขียน implementation

**Verified R1 ที่ source SHA `c3a264181c6a917756395f7a266d760db9d9f51f`, Windows 11 ARM64 และ macOS ARM64.** ตอนนี้ยังไม่มี `wb test` หรือ WBasic application specs แต่มี independent Rust harness ที่ตรวจ process outcome, stdout/stderr, stage report และ diagnostic code/span จาก fixture ได้ บทนี้ใช้ actor สำหรับทดสอบ harness เอง; actor ไม่ใช่ compiler หรือโปรแกรม WBasic

## Given–When–Then ของกรณีเล็ก

**Given:** fixture [actor-pass.json](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/harness/actor-pass.json) คาดว่า actor ออกด้วย code 0, เขียน `สวัสดี` พร้อม LF และ stage `execute` ที่ไม่มี diagnostics อีก fixture [actor-diagnostic.json](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/harness/actor-diagnostic.json) คาด exit 2 พร้อม stage `lexer`, code `WB001` และ byte span 1–3

**When:** harness รัน actor ใน working directory แยกสำหรับแต่ละ case แล้วอ่าน stdout/stderr และ stage report จากไฟล์ที่กำหนดผ่าน `WB_HARNESS_STAGE_REPORT`

**Then:** สอง case ต้องถูก discover และผ่านทั้งคู่ กรณี diagnostic ผ่านเพราะ *คาด exit 2 และ diagnostic นี้ไว้* ไม่ใช่เพราะ harness มองทุก nonzero exit ว่าถูกต้อง Stage metadata ใน stdout ไม่สามารถแทน report file ได้

บทฝึก Green/Red ต่อไปนี้เป็นสคริปต์ PowerShell สำหรับ Windows ARM64 รันจาก repository root หลัง [developer setup](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/development-readiness.md):

```powershell
. ./scripts/Enter-DevEnvironment.ps1
cargo build --locked -p wb-harness
./examples/r1/Run-HarnessLesson.ps1
```

[สคริปต์เดียวที่รันจริง](https://github.com/jedt3d/wbasic-language/blob/main/examples/r1/Run-HarnessLesson.ps1) ส่ง path และ args เป็น array เรียก `wb-harness.exe run fixtures/harness --report <path> --actor harness-actor.exe` แล้วตรวจ JSON report ว่ามี 2 discovered, 2 passed, 0 failed เงื่อนไข discovered > 0 สำคัญ: suite ว่างไม่ใช่ Green

บน macOS ARM64 [สคริปต์ native proof](https://github.com/jedt3d/wbasic-language/blob/main/scripts/test-native-macos.mjs) รัน Rust harness selftests จาก clean checkout เดียวกันด้วย `node scripts/test-native-macos.mjs` โดยผล R1 ผ่าน 10 harness tests ในชุด Rust 13 tests; selftests ครอบคลุม expected mismatch, stage/code/span, timeout, crash และ child-process cleanup บน macOS สคริปต์นี้เป็น developer verification ที่รวม build/ABI/protocol/editor checks ไม่ใช่บทฝึก PowerShell Green/Red ข้างต้น

## Red ที่มีเหตุผล แล้ว Green

สคริปต์สร้าง fixture ชั่วคราวจากกรณี pass และเปลี่ยนเฉพาะ `expected.stdout` ให้ผิดโดยตั้งใจ Actor ยังออก code 0 และเขียนข้อความเดิม จึงควรได้ runner exit 1, report 1 discovered/0 passed/1 failed และ mismatch ที่ stdout นี่คือ **expected assertion Red** ที่บอกว่าตัวตรวจจับความผิดจริง หลังจากคืน expectation ให้ถูก กรณีเดิมเป็น Green และ refactor harness ได้โดยผลภายนอกไม่เปลี่ยน ไฟล์ negative fixture นี้อยู่ใน `.artifacts/book-r1/` ที่ ignore ไม่ปะปนกับ active suite

แยก failure ให้ชัด: ถ้า executable หาย, fixture JSON อ่านไม่ได้, report ไม่ถูกสร้าง หรือ discovered เป็น 0 นั่นเป็น infrastructure/configuration failure ไม่ใช่ Red ของ behavior ถ้า expected diagnostic stage/code/span ผิด นั่นเป็น diagnostic mismatch; timeout กับ crash เป็น outcome คนละชนิด; output ถูกตัดก็มี flags แยก รายละเอียด contract อยู่ที่ [harness README](https://github.com/jedt3d/wbasic-language/blob/main/crates/wb-harness/README.md) และ [testing plan §4](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/wbasic-testing-development-plan-draft-0.3.md#4-วงจรทำงานต่อหนึ่ง-behavior)

## ขั้นถัดไปของวงจร

เมื่อ compiler รองรับ source ขั้นเล็กแล้ว ให้เลือกหนึ่ง acceptance ID เขียน Given/When/Then สำหรับผลภายนอกและ diagnostic ที่ผิดจริง รันให้เห็น Red จาก assertion ก่อนทำ Green แล้ว refactor พร้อมรัน affected checks ฝั่ง Rust unit/integration, native conformance และ `wb test` ในอนาคตต้องยังแยกกัน เพื่อไม่ให้ compiler กับ runner พลาดร่วมกันแล้วรายงานเขียว บท `wb test`, typed matchers และ TUI testing ยังเป็น **Planned**; ทั้ง 95 language/TUI requirements ไม่ได้ผ่านเพราะตัวอย่าง R1 นี้
