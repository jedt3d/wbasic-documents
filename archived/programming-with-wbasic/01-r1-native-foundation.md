# 1. ก่อนมีโปรแกรม WBasic: native foundation

**Verified R1 ที่ source SHA `c3a264181c6a917756395f7a266d760db9d9f51f`, Windows 11 ARM64 และ macOS ARM64.** บทนี้สอนวิธีอ่านหลักฐานของขั้นวางรากฐาน นักพัฒนามี `wb-native-probe` ที่สร้าง ARM64 COFF หรือ Mach-O object จาก IR ภายใน ไม่มี parser สำหรับ `.wbas` และยังไม่มี `wb`, `wbc`, `wb run`, `wb build` หรือ `wb test` ให้ใช้กับ source ผู้เขียนโปรแกรมจึงยังไม่สามารถทำบท Hello World ตามภาษาได้

## ลองรัน native probe บน Windows ARM64

เปิด PowerShell 7 ที่ repository root เครื่องต้องมี Rust 1.98.1, HostARM64 MSVC 14.44.35207 และ Windows SDK 10.0.26100.0 ตาม [developer setup](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/development-readiness.md) นี่เป็นเครื่องพัฒนา ไม่ใช่เกณฑ์แพ็กเกจผู้ใช้ปลายทาง

```powershell
. ./scripts/Enter-DevEnvironment.ps1
cargo build --locked -p wb-compiler
./examples/r1/Inspect-NativeProbe.ps1
```

อ่าน [source ของตัวอย่าง](https://github.com/jedt3d/wbasic-language/blob/main/examples/r1/Inspect-NativeProbe.ps1) เป็นแหล่งเดียวของคำสั่งที่รันจริง ตัวอย่างเรียก `--version`, `--capabilities` และ `--output <path>` โดยส่ง argument array ใน PowerShell จึงไม่ต้องประกอบคำสั่งเป็นสตริงเมื่อ path มีช่องว่าง สคริปต์ตรวจ exit code, metadata และ machine field ของทั้ง object และ executable ว่าเป็น `0xAA64` หากไฟล์ไม่มีหรือ header ไม่ตรงจะหยุดด้วย error วัตถุประสงค์ของ `--output` คือสร้าง object ของ probe; ไม่รับ WBasic source file

ผลที่คาดจาก artifact R1: version ระบุ target `aarch64-pc-windows-msvc`; `nativeIrProbe=True`, `sourceCompilation=False`, `wbTest=False`; และ `COFF and PE machine: 0xAA64` ตำแหน่ง object เปลี่ยนทุก run ใน `.artifacts/book-r1/` การดู machine field อย่างเดียวพิสูจน์รูปแบบไฟล์ ไม่ได้พิสูจน์ว่า object link/run ได้ หลักฐาน Windows link, native execution, C ABI และ generated IR source-line/local/unwind 11 assertions อยู่ใน [R1 round report](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/rounds/R1-native-foundation.md); debug proof นี้ยังไม่ใช่ debugger ของ WBasic source

## ลองรัน native proof บน macOS ARM64

จาก clean checkout ของ SHA เดียวกันบน macOS ARM64 ให้ใช้ Rust 1.98.1, Xcode command-line tools และ native Node.js (หลักฐาน R1 ใช้ 26.8.2) แล้วรันจาก repository root:

```sh
node scripts/test-native-macos.mjs
```

[สคริปต์ macOS](https://github.com/jedt3d/wbasic-language/blob/main/scripts/test-native-macos.mjs) ตรวจ host/checkout, build workspace, สร้าง ARM64 Mach-O จาก IR, link กับ C driver และ runtime แล้วรัน native ABI probe จริง โดยคาด `R1 ARM64: callback=42, stack-args=55, float=3.75` จากนั้นตรวจ Rust, protocol และ editor logic ตามสคริปต์ ผลที่ SHA ข้างต้นผ่านและบันทึก `result.json` ใน `.artifacts/r1-macos/` ของเครื่อง Mac โดยมี `sourceCompilation=false`, `wbTest=false` และ `generatedSourceDebugging=false` สำหรับ macOS ผลนี้ยังไม่ใช่การรัน WBasic source หรือการตรวจ debugger ของ source ที่สร้างบน Mac

ถ้า build ล้มเพราะ toolchain, target หรือ SDK นั่นคือปัญหา environment ไม่ใช่ Red ของพฤติกรรมภาษา ถ้า script ล้มหลังสร้าง object ให้ตรวจ exit code และ machine field ก่อนสรุปผล probe อย่านับความล้มเหลวในขั้น setup เป็น language diagnostic เครื่อง Linux ARM64 และ x86_64 ยังไม่ผ่าน native run ใน R1; clean-machine แบบไม่มี SDK ยังไม่ได้ทดสอบ

## ทางจาก IR probe ไปสู่ภาษา

เป้าหมายของ [language spec v0.3](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/wbasic-language-spec-draft-0.3.md) คือ `.wbas` UTF-8 → lexer/parser → typed IR → Cranelift AOT → native object → linker/runtime → executable โดย CLI, LSP และ MCP ใช้ compiler library ร่วมกัน บทต่อไปจะเริ่มเมื่อ `Procedure Main()` และ `PrintLn` มี conformance case ที่ผ่านจริง ตัวอย่างในสเปกยังเป็น **Planned** แม้หน้าตาจะอ่านเหมือนโปรแกรมพร้อมรัน

สำหรับ v0.3 เอกสารกำหนด `Let ... As ...`, `Procedure`, `Import` และ Unicode rules ไว้แล้ว เราจะสอนแต่ละเรื่องพร้อม source เดียวใน `examples/`, command, expected result, source SHA และ platform เมื่อ implementation ผ่าน gate ของเรื่องนั้น ไม่มีคำสั่ง `wb` หรือ output ที่คาดเดาไว้ในบทนี้
