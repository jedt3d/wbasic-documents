---
title: "WBasic Extension Guide"
description: "เริ่มจากงานที่อยากทำ: How can I…? และประสบการณ์พัฒนาใหม่ใน Extension 0.4.0 candidate"
weight: -4
---

หนังสือเล่มนี้พาใช้ **WBasic ใน VS Code ตั้งแต่ความคิดจนถึงการตรวจผล** เริ่ม project, หา code ที่ต้องแก้, เขียนด้วยแม่แบบ, ตรวจข้อผิดพลาด, run และวนกลับมาทดสอบ จุดเด่นใหม่ของ **Extension 0.4.0** คือช่วยลดขั้นตอนระหว่างงานเหล่านี้ โดยยังให้ compiler เป็นผู้ตัดสินความถูกต้องของโปรแกรม

**เริ่มจากคำถามของคุณ:** เปิด [How can I…? — ลงมือใช้แต่ละฟีเจอร์]({{< relref "/books/w-basic-extension/13-how-can-i.md" >}}) เลือกงานที่ต้องการ แล้วทำตามขั้นตอนและจุดตรวจ หากยังไม่มี toolchain ให้เริ่มจาก [คู่มือแพ็ก]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) ก่อน

## จุดเด่นของ 0.4.0: เขียน แก้ รัน และตรวจได้ต่อเนื่อง

| งานที่อยากทำ | เครื่องมือที่จะได้ลอง |
|---|---|
| ค้นคำสั่งโดยไม่จำปุ่มลัด | Shortcut Guide พร้อม profile `standard` และตัวเลือก `intellij` (DX01) |
| เลือกการกระทำให้ตรงจุดที่กำลังแก้ | Actions at Caret และ Refactor This ตาม context/capability (DX02) |
| เริ่มเขียนโดยไม่พิมพ์รูปแบบเดิมซ้ำ | Insert Template แบบ linked placeholders และ Insert File Template ใน editor ว่าง (DX03) |
| ห่อ statements แล้วตรวจและย้อนกลับได้ | Surround With แบบ If หรือ Try/Finally พร้อม Check และ Undo (DX04) |
| เลือกชุด argument แล้วรันซ้ำ | Select Run Configuration และ Run Again ซึ่งอ่านค่าปัจจุบันใหม่ (DX05) |
| ไปมาระหว่าง source กับ test | Go to Test or Source และ New Test Scaffold ที่เริ่มด้วย assertion ล้มเหลวโดยตั้งใจ (DX06) |
| แก้ test ที่ล้มเหลวแล้วตรวจเฉพาะจุด | Testing: Rerun Failed Tests from Last Run ใช้ผลและ identity จาก native runner (DX07) |
| หา declaration ที่ยังไม่ได้เปิด | Workspace Symbols จาก compiler reports ภายในขอบเขตค้นหาที่กำหนด (DX08) |
| อ่านความหมายของชื่อได้ง่ายขึ้น | Semantic colors ของ identity ที่ compiler resolve แล้ว (DX09) |
| แก้ปัญหาเครื่องมืออย่างมีข้อมูล | Toolchain Doctor แสดง capabilities และแนวทางกู้คืน config (DX10) |

Surround With เป็นแม่แบบข้อความที่ต้องอ่านและตรวจต่อ ไม่ใช่การ refactor ที่พิสูจน์ว่าความหมายเท่าเดิม ส่วน Run Again รันโปรแกรมจริงอีกครั้ง จึงทำผลข้างเคียงซ้ำได้ เช่น เขียนฐานข้อมูล เราจะฝึกกับ project และข้อมูลทดลองที่เลือกเอง

## เลือกชุดเครื่องมือให้ตรงกับบท

| สถานะ | Extension | Protocol | Compiler/runtime |
|---|---|---|---|
| private experimental release ที่ดาวน์โหลดได้ | 0.3.0 | 0.1.0 | 0.2.0 |
| development candidate ที่ตรวจแล้วสำหรับ DX01–DX10 | 0.4.0 | 0.2.0 | 0.2.0 เดิม |

**0.4.0 ยังไม่ได้เผยแพร่เป็น release หรือ Marketplace** ณ จุดตรวจนี้ ซอร์สที่อ้างอิงคือ `5907381` การติดตั้งแพ็ก release จึงยังได้ Extension 0.3.0 และไม่เพิ่มคำสั่ง DX ใหม่ให้อัตโนมัติ แต่ละสูตรใน How can I…? ระบุว่าใช้รุ่นใด ก่อนเริ่มให้ตรวจเวอร์ชันในหน้า Extensions และ **WBasic: Show Toolchain Status** อย่าเปลี่ยน toolchain pin ของ project เป็น 0.4.0 เพราะนั่นคือรุ่น Extension

บท 1–12 สอนพื้นฐานบนชุดเผยแพร่ และติดป้ายส่วน candidate ที่เพิ่มเข้ามา เราใช้ project เล็ก `MyFirstWBasic` เป็นเส้นเรื่อง พร้อมขั้นตอนและจุดตรวจ เมื่อคุ้นแล้วใช้ How can I…? เป็นทางลัดกลับมายังงานแต่ละอย่างได้

## หลักฐานที่อยู่เบื้องหลังขั้นตอน

Candidate ผ่าน protocol 98/98 บนทั้ง Windows และ macOS ARM64; editor ผ่าน 154 ข้อ โดยข้ามกรณี Mac-alias 1 ข้อบน Windows; บน macOS ผ่าน 155/155; repaired isolated Windows host ผ่าน 16/16 ขั้นตอน DX ที่บันทึกในหน้าต่าง Windows ที่ติดตั้งจริงผ่านแล้ว รวมถึงกรณีใช้ Vim, Check/Undo, failed-test rerun และการนำทางขณะเปิด Template ที่อยู่นอก project ดู [รายงานและขอบเขตแต่ละงาน](https://github.com/jedt3d/wbasic-language/blob/5907381/docs/rounds/VSCode-current-compiler-DX-2026-10-06.md)

ผล UI เหล่านี้ไม่ใช่การตรวจหน้าต่างจริงบน macOS หรือ Linux และไม่ได้รับรอง fresh no-SDK host หรือ production distribution ชุด release 0.3.0 ยังคงหลักฐาน E01–E10 ของตัวเอง; การเพิ่มบท candidate ไม่เปลี่ยนผลเดิมย้อนหลัง
