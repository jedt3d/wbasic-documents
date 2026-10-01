---
title: "9 · ทดสอบและไปต่อ"
description: "รันตัวอย่างจริงและแยกหลักฐานจากขอบเขตที่ยังไม่พิสูจน์"
weight: 9
---

จาก root ของ source repository ใช้ `wb` 0.0.2 ที่เข้าคู่กับ static runtime:

```console
wb check examples/billing-time-worm/App.wproj --json
wb run examples/billing-time-worm/App.wproj -- billing-time-demo.sqlite
```

การรันครั้งแรกกับ path ใหม่ให้ผลหกบรรทัด (invoice ID อาจต่างเมื่อใช้ไฟล์เดิม):

```text
schema: ready
project: Website refresh for Acme Studio
time logged: 210 minutes
invoice: #1 (2 lines)
invoice total: 18000 cents
billed entries: 2
```

[README ตัวอย่าง](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/README.md) ให้คำสั่งและขอบเขตครบ [fixture อิสระ](https://github.com/jedt3d/wbasic-language/tree/143be58/fixtures/projects/worm-billing-tests) เรียก public `Billing` procedures เพื่อตรวจ migration drift, generated values, rate snapshot, rollback, conflict, duplicate link, empty draft และ competing writer กับ SQLite จริง หลักฐาน M3/M5 ผ่าน native debug/release บน Windows ARM64 และ macOS ARM64; ไม่ใช่ข้ออ้างว่าผู้ใช้ทุกเครื่องหรือ production ผ่านแล้ว

ถ้าต้องการ executable แยก `wb build` รับ project manifest เท่านั้นและใช้ `--profile debug|release` ได้; `wb run` เหมาะกับวงจรทดลอง รุ่น 0.0.2 มี private experimental portable ZIP สำหรับ ARM64 ที่รวม compiler, runtime และ linker ตรงชุด Node ไม่จำเป็นต่อ core CLI; ใช้กับ protocol tooling เท่านั้น การ build จาก source บน developer host ยังใช้ toolchain/SDK ส่วนการยอมรับบนเครื่องสะอาดแบบ no-SDK ยังเป็น gate คนละเรื่อง

อ่าน source แล้วเปลี่ยน rate หรือลองฐานข้อมูลใหม่ได้ แต่อย่าเพิ่มนโยบายวันที่ ภาษี หรือการปัดเศษให้โปรแกรมในใจโดยไม่มีโค้ดและการทดสอบรองรับ
