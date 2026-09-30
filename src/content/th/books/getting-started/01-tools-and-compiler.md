---
title: "1 · รู้จักเครื่องมือและ compiler"
description: "สำรวจ wb, ตรวจรุ่น และเข้าใจว่า compiler ทำอะไรให้โครงการ Billing Time"
weight: 1
---

เราจะเริ่มด้วย Billing Time โปรแกรมบรรทัดคำสั่งเล็ก ๆ สำหรับรวมเวลาทำงานและคำนวณ
ยอดร่างก่อนวางบิล ตัวอย่างนี้เล็กพอให้เห็นทั้งโครงการในครั้งเดียว แต่มีงานจริงให้ทำ
จึงเหมาะกว่าการเริ่มด้วยโปรแกรมที่ทักทายโลกแล้วปล่อยให้โลกจัดการส่วนที่เหลือเอง

## สิ่งที่ใช้

| เครื่องมือ | หน้าที่ |
|---|---|
| `wb` | อ่านโครงการ ตรวจ source, compile, link และรันโปรแกรม |
| terminal | ป้อนคำสั่งและดูผลลัพธ์ |
| native toolchain | link object กับ WBasic runtime; ปัจจุบันใช้ MSVC บน Windows และ Apple Clang บน macOS |

ตรวจว่าเรียก compiler ได้ด้วย:

```console
wb --version
wb --capabilities
```

`--version` บอก compiler/target ที่กำลังใช้ ส่วน `--capabilities` ส่งข้อมูลความสามารถ
แบบ JSON สำหรับเครื่องมืออื่น ในรุ่นพัฒนาปัจจุบัน ต้องมี `wb`, static runtime ที่เข้าคู่กัน
และ native toolchain ของระบบ การติดตั้งสำหรับเครื่องสะอาดโดยไม่ต้องมี SDK เป็นงานของ
distribution รอบถัดไป

คำสั่งหลักในบทนี้คือ:

```text
wb project-info <manifest.wproj> --json
wb check <file-or-manifest> --json
wb run <file-or-manifest> [--runtime <path>] [-- arguments...]
wb emit-object <file-or-manifest> --output <path> [--target <target>]
```

`wb run` คือเส้นทาง compile-link-run ที่ใช้ได้ตอนนี้ ส่วน `emit-object` สร้างเฉพาะ
object file ยังไม่มีคำสั่ง `wb build` สำหรับสร้างชุดแจกจ่าย จึงไม่ควรแต่งคำสั่งนั้นเพิ่ม
เพียงเพราะชื่อฟังดูคุ้นหู

อ่านต่อ: [สร้างโครงการ Billing Time]({{< relref "/books/getting-started/02-create-billing-time-project.md" >}})
