# 5. ค่าประกอบ, ByRef และ source module

**บท R4: ตัวตรวจบทผ่าน Windows/macOS ARM64 ที่ SHA `7184490`.** รัน [ตัวตรวจบท](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/run-lesson.mjs) เพื่อยืนยันผลจริงบน host ของคุณ ดัชนี [R4](../r4-feature-index.md) แยกผลที่ตรวจแล้วกับส่วน Planned

เริ่มที่ [array-copy.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/array-copy.wbas): `Let copy As Array Of Integer = original` เก็บ snapshot เชิงค่า เมื่อเปลี่ยน `copy[0]`, `original[0]` ยังเป็น `10` การอ่าน `copy[-1]` คืนสมาชิกท้าย (`20`) แต่ index นอกขอบเขตแบบ element access ทำให้เกิด `ErrorKind.Bounds` [nested-copy.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/nested-copy.wbas) ขยายการทดลองเป็น Array ซ้อนกัน: เปลี่ยน element ชั้นในและ append ที่สำเนาแล้วต้นฉบับยังคงเดิม พฤติกรรมที่สังเกตได้คือ value snapshot; implementation ใช้ ARC/COW แต่ไม่ควรเขียนโปรแกรมโดยอาศัยจำนวน reference หรือจังหวะ copy ภายใน

[map-order.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/map-order.wbas) แสดง `Map Of String To Integer`: key เป็น String แบบ exact, การกำหนด key ซ้ำปรับค่าโดยไม่เพิ่มจำนวนสมาชิก, `Keys()` เดินตามลำดับที่ใส่ครั้งแรก และ `Get` คืน nullable เพื่อใช้ `??` ได้ `a["missing"]` ต่างกัน: โยน `MissingKey` [structure-equality.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/structure-equality.wbas) ใช้ constructor ระบุ field ด้วย `:=`; สำเนา Structure แยกจากต้นฉบับ `.Equals` และ `=` เปรียบเทียบทั้งค่า ส่วน `SameIdentity` เป็น method ที่เขียนเองและเปรียบเทียบเฉพาะ `Id` จึงตอบต่างกันได้

[byref-snapshot.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/byref-snapshot.wbas) ใช้ `ByRef` อย่างชัดเจนทั้ง declaration และ call: `Change(ByRef n, n)` อ่าน argument by-value ก่อนเข้า Procedure แล้วเปลี่ยน `n` ผ่าน reference โดยมีผลที่ผู้เรียกเห็น การส่ง Array ผ่าน `ByRef` ให้ `Append` เปลี่ยนตัวแปรผู้เรียก แต่ `saved` ซึ่งสร้างก่อนเรียกยังมี length เดิม สอง argument ที่พยายามยืม mutable location เดียวกันขัดกฎ alias และ compiler ปฏิเสธ

[nullable-lazy.wbas](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/nullable-lazy.wbas) มี `String?`, `Null`, optional chaining `?.`, coalescing `??` และ `If Let` เพื่อแกะค่าที่มีอยู่ ฝั่งขวาของ `??` ประเมินเมื่อฝั่งซ้ายเป็น Null เท่านั้น; `SideEffect()` จึงไม่พิมพ์ `unexpected` ในผลผ่าน ตัวอย่างนี้ใช้ String ที่รองรับ ไม่ได้แปลว่า handle หรือทุก type เปรียบเทียบกันได้

ตัวอย่าง [module-project](https://github.com/jedt3d/wbasic-language/blob/main/examples/r4/module-project/App.wproj) มี application `App`, direct source dependency `Acme.wmod`, และ import ด้วย alias `Numbers` `Numbers.Total(5)` คืน `17` โดย public entry เรียก private helper ใน namespace เดียวและ internal helper ภายใน package ของตนเอง `CompileIf` ตัด inactive Linux import ออกจากการ resolve บน Windows/macOS ตาม [manifest contract](https://github.com/jedt3d/wbasic-language/blob/main/dev-docs/wb-project-manifest-v0.3.md) Module header กับ directory path ต้องตรงกัน นี่คือ source package linking ที่ใช้ manifest ไม่ใช่ textual `Include`, package registry หรือ bundled library ที่ยังไม่ส่งมอบ

หลังเตรียม developer toolchain และ build `wb`/runtime ใน Mac-local หรือ Windows checkout ให้รันจาก repository root:

```sh
node examples/r4/run-lesson.mjs
```

ตัวตรวจเทียบ stdout แบบ UTF-8 byte-for-byte ของ value examples, ตรวจ `wb check`, รัน module project และบททดสอบถัดไป หาก binary หรือ native linker ไม่พร้อม ตัวตรวจล้มเหลวและไม่ถือเป็นผลผ่าน Clean-machine no-SDK packaging, libraries ใน R5, และ Linux/x86_64 native execution ยังเป็น **Planned**
