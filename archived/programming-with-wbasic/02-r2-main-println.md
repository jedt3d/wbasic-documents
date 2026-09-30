# 2. โปรแกรมแรก: Main และ PrintLn

**Verified R2.1 subset:** `Procedure Main()` หนึ่งตัวและ `PrintLn` ที่รับ String literal เท่านั้น หลักฐาน compiler ที่ใช้เขียนบทนี้คือ source SHA `8c38f55883ac94a570ae19e736abedec3a1201ba`; ผลรันบทฝึกบนแต่ละ host ดู [ดัชนี R2](../r2-feature-index.md) นี่เป็นบางส่วนของ [ภาษา v0.3](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/wbasic-language-spec-draft-0.3.md) ยังไม่ใช่ภาษา v0.3 ทั้งหมด

อ่าน [hello.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r2/hello.wbas):

```wbas
Procedure Main()
  PrintLn("Hello, WBasic")
  PrintLn("สวัสดี 😀")
EndProcedure
```

`Main` เป็นจุดเริ่มต้น ไม่มีพารามิเตอร์ใน slice นี้ แต่ละ `PrintLn` เขียน UTF-8 แล้วตามด้วย LF หนึ่งตัว คำสั่งและชื่อแยกตัวพิมพ์ใหญ่เล็ก; `println` ไม่ใช่ `PrintLn` String ปกติรองรับ escape ตาม slice ปัจจุบัน รวม `\n`, `\"`, `\\` และ `\u{HEX}`; raw `r"..."` รองรับด้วย แต่ interpolated String ยังไม่รองรับ

จาก repository root บนเครื่องพัฒนา ARM64 ให้ติดตั้ง native Rust และ linker/SDK ตาม [developer setup](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/development-readiness.md) ก่อน บน Windows ใช้ PowerShell 7 เพื่อเปิด HostARM64 MSVC environment:

```powershell
. ./scripts/Enter-DevEnvironment.ps1
cargo build --locked -p wb-compiler -p wb-runtime
node examples/r2/run-lesson.mjs
```

บน macOS ARM64 ใช้ Xcode command-line tools และ Rust toolchain ที่ pin ใน repository แล้วรัน `cargo build --locked -p wb-compiler -p wb-runtime` กับ `node examples/r2/run-lesson.mjs` จาก Mac-local checkout SHA เดียวกัน Node script จะตรวจ `wb check` ว่า source ผ่านโดยไม่มี diagnostic แล้วให้ `wb run` สร้างและรัน executable native ชั่วคราว ผล stdout ต้องเป็น `Hello, WBasic` และ `สวัสดี 😀` โดยแต่ละบรรทัดจบด้วย LF ตรงตาม byte ที่ script คาด

ลอง `target/debug/wb check examples/r2/hello.wbas --json` (Windows ใช้ `target/debug/wb.exe`) เพื่อดู `accepted: true` และ `diagnostics: []` ด้วยตนเอง ถ้า source ผิด CLI ให้ exit 1 และ diagnostic ที่มี stage, code, byte span `[start,end)` และตำแหน่ง line/column; ปัญหาอ่านไฟล์หรือ linker เป็น exit 2 สคริปต์บทเรียนแยกผลเหล่านี้จาก output assertion

ข้อจำกัดของ **R2.1 slice ในบทนี้**: `PrintLn` รับ String literal หนึ่งตัวและยังไม่มี variables, types, expressions, control flow หรือ procedure อื่น จากนั้น R2 เพิ่ม language core ตาม [บท 3](03-r2-language-core.md) `wb test`, source debugger และแพ็กเกจสำหรับเครื่องผู้ใช้ที่ไม่มี SDK ยังเป็น **Planned** บท R1 ก่อนหน้าอธิบายสถานะในเวลานั้น; `wb-native-probe` ยังคงเป็น IR probe แยกจากการรัน source ของ R2
