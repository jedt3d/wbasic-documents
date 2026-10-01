---
title: "8 · สร้าง invoice ใน transaction"
description: "อ่านลำดับการเขียน เลือกแถว และป้องกันการวางบิลซ้ำ"
weight: 8
---

`Billing.CreateDraftInvoice` ใน [Domain.wbas](https://github.com/jedt3d/wbasic-language/blob/143be58/examples/billing-time-worm/modules/Billing.wmod/src/Domain.wbas) เริ่ม transaction แล้วตรวจเจ้าของ project จากฐานข้อมูลภายใน transaction เดียวกัน จากนั้น insert หัว invoice เป็นการเขียนครั้งแรก **ก่อน** เลือกรายการเวลาที่ยังไม่วางบิล การเขียนนี้ขอสิทธิ์ writer ของ SQLite; หากชน writer หรือ snapshot จะคืน error โดยไม่ retry อัตโนมัติ

```basic
Let query As Worm.Query Of TimeEntry = Worm.Select(Of TimeEntry)()
query = Worm.Equal(Of TimeEntry)(query, "ProjectId", project.Id)
query = Worm.IsNull(Of TimeEntry)(query, "InvoiceId")
query = Worm.OrderBy(Of TimeEntry)(query, "Id", False)
Let unbilled As Array Of TimeEntry = Worm.All(Of TimeEntry)(tx, TimeMap(), query)
```

นี่เป็น **ส่วนตัดหลัง insert หัว invoice** ไม่ใช่ procedure ทั้งหมด แต่ละ entry สร้าง line ที่เก็บนาที ราคาและยอด แล้วใช้ `Worm.Update` พร้อม `entry.Version` เชื่อม `InvoiceId` Field อื่นที่ไม่ระบุใน `Changes` คงเดิม ส่วน version เก่าถูกปฏิเสธ ฐานข้อมูลมี unique constraint ที่ `InvoiceLine.TimeEntryId` เพื่อกัน line ซ้ำ

`Commit` เกิดหลังสร้าง line และ link ครบ หากเกิด error ก่อน commit การออกจาก `Using`
พยายาม rollback ทั้งชุด หากส่ง commit แล้วแต่ไม่ทราบผล transaction เป็น `Unknown`
ต้องตรวจสถานะที่ฐานข้อมูลก่อนตัดสินใจทำซ้ำ ห้ามอ้างว่า rollback สำเร็จแน่นอน
ตัวอย่างยอมสร้าง draft ว่างเมื่อไม่มี entry ใหม่ fixture ของ Billing ตรวจการบันทึก,
rollback ปกติและ draft ว่าง ส่วน `Unknown` เป็นสัญญา transaction ที่ทดสอบแยกด้วย
outcome hooks ของ WORM M5 อ่าน [WORM SQLite]({{< relref "/books/standard-library/worm-sqlite.md" >}})
ประกอบ การทดลองต่อควรใช้ฐานข้อมูลใหม่เพื่อเห็นผลทีละรอบ

อ่านต่อ: [ทดสอบและไปต่อ]({{< relref "/books/getting-started/09-billing-time-tests-and-next-steps.md" >}})
