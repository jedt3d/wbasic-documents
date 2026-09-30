# 4. Error, Finally, Using และไฟล์ข้อความ

**R3 example verified on Windows 11 ARM64 and macOS ARM64 at `a92e0ad`.** บทนี้ใช้ [errors-and-file.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r3/errors-and-file.wbas) และ [ตัวตรวจ](https://github.com/jedt3d/wbasic-language/blob/main/examples/r3/run-lesson.mjs) กับ R3 compiler ที่รองรับ errors/cleanup, named Procedure values และ curated File/TextReader API ดู [ดัชนี R3](../r3-feature-index.md) สำหรับหลักฐานและขอบเขต

`File.WriteText("lesson.txt", "สวัสดี R3\n")` สร้างไฟล์ UTF-8 จากนั้น `File.OpenText` คืน `TextReader` ที่ต้องปิด บล็อก `Using reader As TextReader = ...` ปิด handle เมื่อออกจากบล็อก รวมถึงทางออกเพราะ error หรือ assertion; `reader.ReadToEnd()` อ่านข้อความทั้งหมด `File.ReadText` เป็นทางลัดสำหรับอ่านไฟล์ข้อความทั้งก้อน บทฝึกใช้ working directory ชั่วคราวเพื่อไม่ทิ้ง `lesson.txt` ใน repository

`Throw Error.Create(ErrorKind.User, "Lesson.Expected", "demonstration")` สร้าง error ที่ `Catch err As Error` รับได้ และอ่าน `err.Code` เพื่อแยกเหตุผล `Finally` ทำงานเมื่อออกจาก `Try` หลัง Catch ด้วย ถ้า cleanup ขณะมี error ค้างเกิด error อีกตัว สัญญา R3 เก็บ error เดิมเป็นหลักและแนบตัวใหม่ใน `Suppressed` ไม่ควรใช้ `Return`, `Break` หรือ `Continue` ใน `Finally`

`Let callback As Procedure(value As Integer) As Integer = Twice` ถือชื่อ Procedure เป็นค่าที่มี signature แน่นอน `Apply` รับ callback และ Integer แบบ by-value แล้วเรียก `operation(value)` การส่ง callback นี้ไม่ capture local state, ไม่ใช่ anonymous closure และไม่เปิด ByRef ทั่วไป

จาก repository root ใน developer environment ที่มี Rust/native linker/SDK และ build `wb` กับ runtime แล้วรัน:

```powershell
. ./scripts/Enter-DevEnvironment.ps1
cargo build --locked -p wb-compiler -p wb-runtime
node examples/r3/run-lesson.mjs
```

บน macOS ARM64 ให้ใช้ Mac-local checkout กับ Xcode command-line tools แล้วรัน Node command เดียวกันหลัง build ผล source ที่ตัวตรวจเทียบแบบ UTF-8 byte-for-byte คือ `สวัสดี R3` สองครั้ง (แต่ละครั้งตามด้วยบรรทัดว่างเพราะเนื้อไฟล์มี LF แล้ว), `6`, `Lesson.Expected`, `cleanup` ตัวตรวจยังอ่านไฟล์จริงและตรวจ `wb test` จากบทถัดไป

R3 นี้รองรับเฉพาะ curated file text I/O และ named primitive by-value callbacks ที่ทดสอบแล้ว `Array`/`Map` ทั่วไป, `ByRef`, user package linking, ARC/COW, richer matchers และ full stream/library catalog ยังเป็น **Planned** ไม่ใช้ตัวอย่างนี้อ้างความพร้อมของ no-SDK distribution
