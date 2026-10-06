---
title: "Getting Started"
description: "เริ่มใช้ WBasic ผ่าน Billing Time ตั้งแต่เครื่องมือ โครงสร้างโครงการ ภาษา และการ compile บน command line"
weight: -10
---

หนังสือเล่มนี้พาเริ่ม WBasic ผ่าน **Billing Time** โปรแกรมบรรทัดคำสั่งขนาดเล็กสำหรับ
รวมเวลาทำงานและคำนวณยอดก่อนวางบิล สี่บทแรกเป็นเส้นทางที่รันได้จริง: รู้จักเครื่องมือ
สร้างโครงการ อ่านภาษา แล้วตรวจ compile และรันจาก command line

บทที่ 5–9 อ่านตัวอย่าง SQLite/WORM ที่รันได้แล้ว พร้อมหลักฐาน native แยกต่างหาก
ส่วนสี่บทแรกยังเป็นโครงการเล็กที่ผู้อ่านสร้างเอง

คำสั่งและ manifest ปัจจุบันในเล่มใช้ **compiler/runtime 0.2.0** ซึ่งเข้าคู่กันทั้ง
CLI และ portable ZIP; VS Code Extension **0.3.0** ใช้ protocol **0.1.0** และเลือก compiler รุ่นนี้
ค่า `toolchain` ใน project และ module ต้องตรงกับ compiler ที่เลือก New Project pin รุ่นให้อัตโนมัติ
Release 0.1.0 และ Extension 0.2.1/0.2.3 เป็นหลักฐานย้อนหลัง ไม่ใช่ชุดที่ใช้กับ manifest 0.2.0
ดู [ขอบเขตเวอร์ชัน]({{< relref "/implementation-status.md" >}})

เริ่มที่ [รู้จักเครื่องมือและ compiler]({{< relref "/books/getting-started/01-tools-and-compiler.md" >}})
