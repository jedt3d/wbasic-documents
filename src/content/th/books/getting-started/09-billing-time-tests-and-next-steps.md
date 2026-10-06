---
title: "9 · รัน ตรวจ และไปต่อ"
description: "ทดลองแอป SQLite และแยกหลักฐานท้องถิ่นจาก release ที่เผยแพร่"
weight: 9
---

ดาวน์โหลด [source snapshot ของ Billing Time](https://jedt3d.github.io/wbasic-documents/downloads/billing-time-source.zip) แล้วแตกไฟล์ จากโฟลเดอร์ `billing-time` ใช้ compiler/runtime 0.2.0 ที่เข้าคู่กันใน portable package; แพ็กนี้มี compiler, runtime และ linker ของตนเอง การสร้าง compiler toolchain จาก source ในเครื่องนักพัฒนายังต้องมี SDK และ static runtime ที่ตรงรุ่น Manifest ปัจจุบันระบุ toolchain 0.2.0:

```console
wb check billing-time.wproj --json
wb run billing-time.wproj -- billing-time-demo.sqlite
```

จะละ argument เพื่อใช้ `billing-time-demo.sqlite` ใน working directory ปัจจุบันก็ได้ ส่ง path ที่ไม่ว่างได้หนึ่งค่า; ส่งมากกว่าหนึ่งค่าหรือส่ง path ว่างจะได้ error ก่อนเปิดฐานข้อมูล การรันครั้งแรกกับไฟล์ใหม่แสดงหกบรรทัด:

```text
schema: ready
project: Website refresh for Acme Studio
time logged: 210 minutes
invoice: #1 (2 lines)
invoice total: 18000 cents
billed entries: 2
```

การรันซ้ำกับไฟล์เดิมเพิ่ม customer, project, time entry และ invoice อีกชุด; invoice ID จึงขึ้นกับข้อมูลเดิม เช่น ครั้งถัดไปอาจเป็น `#2` ไม่ใช่การแก้ invoice เดิม [QuickStart](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/docs/QuickStart.md) และ [README](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/README.md) ให้คำสั่งและขอบเขตเพิ่มเติม ส่วน `scripts/verify.py` ใน snapshot มีการตรวจ SQLite และการรันซ้ำ

Snapshot ที่ pin 0.2.0 ผ่าน `scripts/verify.py` บน Windows ARM64 และ macOS ARM64 ด้วย compiler/runtime ที่เข้าคู่กัน ทั้ง debug/release: ครั้งแรก 18,000 cents, การรันซ้ำได้ invoice `#2`, path ค่าเริ่มต้นและที่ระบุเอง, และ argument ผิดหยุดก่อนเปิดฐานข้อมูล การตรวจ Windows ครั้งหนึ่งเคย timeout ในกรณี argument ผิด; การรันซ้ำครบชุดโดยไม่แก้โปรแกรมผ่าน ผลนี้ยังไม่รับรอง production หรือเครื่องทุกชนิด

หลักฐาน release 0.1.0 ที่ source `3901cf17` และผลต้นทางท้องถิ่นกับ compiler source `dfdcbdc` เป็นประวัติของ snapshot รุ่นเก่า ไม่ใช่ผลทดสอบ manifest 0.2.0 ปัจจุบัน

`wb build` สร้าง executable แยกได้ ชุด portable 0.2.0 ที่ตรวจบน developer host ใช้ linker/runtime ที่บรรจุมาสำหรับ build แอปจาก source; การสร้าง compiler toolchain เองจาก Rust source ยังต้องมี native SDK/toolchain ส่วน fresh-host no-SDK เป็น gate แยก ลองฐานข้อมูลใหม่หรือเปลี่ยนอัตราค่าบริการได้ โดยตรวจผลกับ source และฐานข้อมูลจริงก่อนสรุปนโยบายวันที่ ภาษี สกุลเงิน หรือการปัดเศษ

ไฟล์ดาวน์โหลดมีเฉพาะ source ไม่มี executable สำเร็จรูป README และ QuickStart ปัจจุบันอธิบายการ build/run แอปจาก source ด้วยชุด compiler/runtime 0.2.0 ที่เข้าคู่กัน; อย่าคาดว่า EXE จากเครื่องผู้เขียนอยู่ใน ZIP ใน VS Code ใช้ Command Palette เลือก **WBasic: Check Project**, **Run Project** หรือ **Build Project — Debug/Release (Development)** หลังเลือก compiler 0.2.0
