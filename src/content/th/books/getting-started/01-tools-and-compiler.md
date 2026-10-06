---
title: "1 · รู้จักเครื่องมือและ compiler"
description: "สำรวจ wb, ตรวจรุ่น และเข้าใจว่า compiler ทำอะไรให้โครงการ Billing Time"
weight: 1
---

เราจะเริ่มด้วย Billing Time โปรแกรมบรรทัดคำสั่งเล็ก ๆ สำหรับรวมเวลาทำงานและคำนวณ
ยอดร่างก่อนวางบิล ตัวอย่างนี้เล็กพอให้เห็นทั้งโครงการในครั้งเดียว แต่มีงานจริงให้ทำ
จึงเหมาะกว่าการเริ่มด้วยโปรแกรมที่ทักทายโลกแล้วปล่อยให้โลกจัดการส่วนที่เหลือเอง

## สิ่งที่ใช้

บทนี้ใช้ release **compiler/runtime 0.2.0** กับ Extension **0.3.0** และ protocol **0.1.0** ที่เข้าคู่กัน
ใช้ manifest และ runtime ให้ตรงกับ compiler ที่เลือก อ่าน [รุ่นของเครื่องมือ]({{< relref "/implementation-status.md" >}})
ก่อนใช้ขั้นตอนข้ามชุด

| เครื่องมือ | หน้าที่ |
|---|---|
| `wb` | อ่านโครงการ ตรวจ source, compile, link และรันโปรแกรม |
| terminal | ป้อนคำสั่งและดูผลลัพธ์ |
| native toolchain | การสร้าง compiler toolchain จาก Rust source ใช้ MSVC บน Windows และ Apple Clang บน macOS; portable ZIP มี linker สำหรับ build แอป WBasic มาให้ |

ตรวจว่าเรียก compiler ได้ด้วย:

```console
wb --version
wb --capabilities
```

`--version` บอก compiler/target ที่กำลังใช้ ส่วน `--capabilities` ส่งข้อมูลความสามารถ
แบบ JSON สำหรับเครื่องมืออื่น การสร้าง compiler toolchain จาก Rust source บนเครื่องนักพัฒนา
ยังใช้ native toolchain/SDK และ static runtime ที่ตรงกับ `wb` รุ่น 0.2.0 มี private experimental
portable ZIP สำหรับ ARM64 ซึ่งรวม compiler, runtime และ linker ตรงชุด และ build แอป WBasic
จาก source ได้บน developer host ที่ทดสอบ ผล smoke test
ของ ZIP ยังไม่ใช่การยอมรับเครื่องสะอาดแบบ no-SDK Core CLI ไม่ต้องมี Node; Node ใช้กับ
protocol tooling ที่เลือกติดตั้งเพิ่ม

คำสั่งหลักในบทนี้คือ:

```text
wb project-info <manifest.wproj> --json
wb check <file-or-manifest> --json
wb run <file-or-manifest> [--profile debug|release] [-- arguments...]
wb build <manifest.wproj> [--profile debug|release] --output <path>
wb emit-object <file-or-manifest> --output <path> [--target <target>]
```

`wb run` compile-link-run ส่วน `wb build` สร้าง binary แยกจาก project manifest เท่านั้น
`emit-object` สร้างเฉพาะ object file ถ้าไม่ระบุ profile จะใช้ debug และ `wb check`
ต้องระบุ `--json` หรือ `--format vscode`

ใน VS Code ให้ตั้ง `wbasic.compilerPath` ไปยัง `wb` ของชุด 0.2.0 แล้วเปิด Command Palette
(`Ctrl+Shift+P` บน Windows) เพื่อเลือก **WBasic: Check Project**, **Run Project** หรือ
**Build Project — Debug/Release (Development)**. ชุด portable ที่ตรวจบน developer host
ใช้ linker/runtime ที่บรรจุมาสำหรับ build แอป; การสร้าง compiler toolchain เองจาก Rust source
ยังต้องมี SDK/native toolchain ผล private portable ZIP ไม่ใช่การยืนยัน fresh-host no-SDK

อ่านต่อ: [สร้างโครงการ Billing Time]({{< relref "/books/getting-started/02-create-billing-time-project.md" >}})
