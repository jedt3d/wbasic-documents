---
title: "9 · รัน ตรวจ และไปต่อ"
description: "ทดลองแอป SQLite และแยกหลักฐานท้องถิ่นจาก release ที่เผยแพร่"
weight: 9
---

ดาวน์โหลด [source snapshot ของ Billing Time](https://jedt3d.github.io/wbasic-documents/downloads/billing-time-source.zip) แล้วแตกไฟล์ จากโฟลเดอร์ `billing-time` ใช้ `wb` และ static runtime ที่เข้าคู่กัน Manifest ระบุ toolchain 0.1.0:

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

Snapshot นี้ผ่านการตรวจบน Windows ARM64 และ macOS ARM64 ด้วย CLI release 0.1.0 ที่ปิดผนึกจาก source `3901cf17`: ทั้ง debug/release, ผล 18,000 cents, การรันซ้ำได้ invoice `#2`, การใช้ path ค่าเริ่มต้น/ระบุเอง และ argument ผิดที่หยุดก่อนเปิดฐานข้อมูล โค้ดต้นทางท้องถิ่นยังรายงานผลกับ compiler source `dfdcbdc` แยกต่างหาก หลักฐานเหล่านี้ไม่ใช่การรับรอง production หรือเครื่องทุกชนิด

`wb build` สร้าง executable แยกได้ การ build จาก source บน developer host ยังต้องมี native toolchain/SDK ส่วน fresh-host no-SDK เป็น gate แยก ลองฐานข้อมูลใหม่หรือเปลี่ยนอัตราค่าบริการได้ โดยตรวจผลกับ source และฐานข้อมูลจริงก่อนสรุปนโยบายวันที่ ภาษี สกุลเงิน หรือการปัดเศษ

ไฟล์ดาวน์โหลดมีเฉพาะ source ไม่มี executable สำเร็จรูป README และ QuickStart เดิมกล่าวถึงไฟล์ที่ผู้เขียนส่งไว้ในเครื่องของตนด้วย ให้ build สำเนาของคุณตามคำสั่งในหนังสือนี้ ไม่ต้องคาดว่า EXE ในเครื่องเดิมจะอยู่ใน ZIP
