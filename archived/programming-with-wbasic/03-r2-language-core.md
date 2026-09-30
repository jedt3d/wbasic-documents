# 3. ตัวแปร การตัดสินใจ ลูป และ Procedure

**Verified R2 core:** compiler SHA `7492885ff0a98dbcd70f987596c61095f59e7818` ผ่าน Rust 29/29, native conformance 75/75 และ release native 13/13 บน Windows 11 ARM64 และ macOS ARM64 ที่ SHA เดียวกัน บทฝึกนี้ผ่านทั้ง Windows/macOS ARM64 แล้ว ดู [ดัชนี R2](../r2-feature-index.md)

อ่าน [core-lesson.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r2/core-lesson.wbas) ก่อนรัน ตัวอย่างใช้ `Let name As Type = value` กับชนิด `Integer`, `Float`, `Byte`, `Boolean` และ `String` ทุกตัวมี initializer และกำหนดค่าใหม่ได้ เช่น `total = total + Square(i)` ส่วน `Const Greeting As String` เป็นค่าคงที่; การกำหนดค่าใหม่ให้ `Const` เป็น type error `String` เองเป็นค่า immutable แม้ตัวแปร `Let` ที่ถือ String จะกำหนดค่าใหม่ได้

`PrintLn` รับ String เท่านั้น จึงใช้ `count.ToString()` ก่อนต่อกับข้อความ `Byte` ขยายเป็น Integer สำหรับการคำนวณ, `/` คืน Float และ Integer arithmetic ตรวจ overflow; ไม่มี implicit Boolean/String conversion `If` กับ `While` ต้องรับ Boolean `And`/`Or` ประเมินแบบ short circuit: `False And (1 Div 0 = 1)` ในบทฝึกไม่หารด้วยศูนย์ เพราะไม่ประเมินด้านขวา

`For i As Integer = 1 To 3 Step 1` รวมปลายทางและให้ `i` อยู่ใน scope ของลูป `While total > 10` ทำงานจนเงื่อนไขเป็น False `Select total` ประเมินค่าที่เลือกหนึ่งครั้งและแต่ละ `Case` ไม่ไหลต่อไปยัง case ถัดไป ตัวอย่างแยก `Square(value As Integer) As Integer` ไว้หลัง `Main` เพื่อแสดงการเรียก Procedure ที่ประกาศทีหลัง; พารามิเตอร์ปกติเป็น local copy และ `Return` ส่งค่าตามชนิดที่ประกาศ ตัวอย่าง [conformance control flow](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r2-control-flow.wbas) เพิ่ม `ElseIf`, `Break`, `Continue` และ `For Step 2`; [conformance procedures](https://github.com/jedt3d/wbasic-language/blob/main/fixtures/source/r2-procedures.wbas) เพิ่ม recursion

`Main(args As Array Of String) As Integer` รับ Unicode OS arguments โดยไม่รวมชื่อ executable ในบทนี้ใช้ `args.Length`, `args[0]` และ `Return 7` จึงเห็น exit status 7 จริง จาก repository root บน Windows ARM64 ให้เปิด [developer environment](https://github.com/jedt3d/wbasic-language/blob/main/scripts/Enter-DevEnvironment.ps1) และ build compiler/runtime ด้วย Rust toolchain ที่ pin ไว้; บน macOS ARM64 ใช้ Xcode command-line tools และ Mac-local checkout:

```powershell
. ./scripts/Enter-DevEnvironment.ps1
cargo build --locked -p wb-compiler -p wb-runtime
node examples/r2/run-core-lesson.mjs
```

ถ้าสร้าง binary ไว้แล้ว `node examples/r2/run-core-lesson.mjs` เป็นคำสั่งเดียวที่ต้องรัน ผลโปรแกรมหลักเป็น UTF-8 และ LF ตามนี้ ก่อน checker ตรวจ diagnostic กับ runtime error แยกกัน:

```text
สวัสดี ไทย 😀
args:2
total:10
7
2.5
```

`wb run examples/r2/core-lesson.wbas -- 'ไทย 😀' 'สอง'` ใช้ native linker/SDK ของเครื่องพัฒนา; `--` แยก arguments ของโปรแกรมจาก options ของ `wb` สคริปต์ตรวจ stdout ทุก byte, stderr ว่าง และ exit 7 การแจกจ่ายแบบไม่ต้องมี SDK ยังเป็น **Planned**

String runtime ของ R2 ใช้ arena ชั่วคราวแบบ immutable จำกัดข้อมูลและ overhead ที่คิดบัญชีรวม 64 MiB และไม่เกินหนึ่งล้าน entries; ยังไม่มี ARC/COW ที่สเปก v0.3 กำหนดไว้ Error ที่ไม่ถูกจับ เช่น Integer overflow พิมพ์ `ErrorKind.Arithmetic` ลง stderr และ exit 1 เพราะ `Try`/`Catch` ยังเป็น **Planned** `Array Of String` ในบทนี้รองรับเฉพาะ entry args; Array/Map ทั่วไป, `ByRef`, Structure, nullable, modules, TUI และ `wb test` ยังไม่ใช่ความสามารถที่บทนี้รับรอง
