---
title: "WBasic Extension Guide"
description: "คู่มือจับมือใช้ WBasic บน VS Code ตั้งแต่สร้าง project จนถึง run, build, test และจัดการ module"
weight: -4
---

หนังสือเล่มนี้สอนใช้ **WBasic Extension for VS Code** แบบลงมือทำจริง ตั้งแต่เปิด
workspace ว่าง สร้าง project แรก เขียน source ด้วย autocomplete และ diagnostics
ไปจนถึงจัดการ module, build โปรแกรม และรัน test ผ่าน Test Explorer

เราจะใช้ project เล็กชื่อ `MyFirstWBasic` เป็นเส้นเรื่องเดียวกันตลอดเล่ม ทุกบทมี
**ภารกิจฝึกมือ** และ **จุดตรวจ** เพื่อให้รู้ว่าทำสำเร็จจริง ไม่ใช่เพียงกดตามรูปแล้ว
หวังว่า compiler จะเห็นใจ

Extension รุ่นที่หนังสืออ้างอิงคือ development preview `wbasic-dev.wbasic@0.2.0`
จาก R8B ซึ่งทดสอบกับ VS Code 1.137 ขึ้นไปบน Windows 11 ARM64 และ macOS ARM64
การ build ในเล่มเป็น **Development Build** ที่ยังต้องใช้ native SDK ของระบบ
ไม่ใช่ package สำหรับแจกจ่ายบนเครื่องสะอาด

เริ่มที่ [เตรียม VS Code, extension และ compiler]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}})

