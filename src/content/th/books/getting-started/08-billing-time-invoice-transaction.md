---
title: "8 · สร้าง invoice ใน transaction"
description: "อ่านลำดับการเขียน การเลือกรายการ และการป้องกันวางบิลซ้ำ"
weight: 8
---

`Billing.CreateDraftInvoice` ใน [Domain.wbas](https://jedt3d.github.io/wbasic-documents/downloads/billing-time/modules/Billing.wmod/src/Domain.wbas) เปิด transaction แล้วตรวจ customer ของ project จากฐานข้อมูล จากนั้น insert หัว invoice เป็นการเขียนครั้งแรก **ก่อน** เลือกรายการเวลาที่ยังไม่วางบิล การเขียนนี้ขอสิทธิ์ writer ของ SQLite; หากชน writer หรือ snapshot เก่า จะคืน error โดยไม่ retry อัตโนมัติ

```basic
Let query As Worm.Query Of TimeEntry = Worm.Select(Of TimeEntry)()
query = Worm.Equal(Of TimeEntry)(query, "ProjectId", project.Id)
query = Worm.IsNull(Of TimeEntry)(query, "InvoiceId")
query = Worm.OrderBy(Of TimeEntry)(query, "Id", False)
Let unbilled As Array Of TimeEntry = Worm.All(Of TimeEntry)(tx, TimeMap(), query)
```

นี่เป็น **ส่วนตัดหลัง insert หัว invoice** ไม่ใช่ procedure ทั้งหมด แต่ละ entry สร้าง line ที่เก็บนาที อัตราที่บันทึกไว้ และจำนวนเงิน จากนั้น `Worm.Update` ใช้ `entry.Version` เชื่อม `InvoiceId` โดย field อื่นที่ไม่ได้ระบุใน `Changes` คงเดิม Version เก่าถูกปฏิเสธ และ unique constraint ของ `invoice_lines.TimeEntryId` กัน line ซ้ำ

`Commit` เกิดหลังสร้าง line และเชื่อมรายการครบ หากเกิด error ก่อน commit การออกจาก `Using` พยายาม rollback งานใน transaction นี้ ส่วน customer, project, service และ time entry ก่อนหน้าอยู่คนละ transaction จึงไม่ได้ย้อนกลับทั้งการรัน หากส่ง commit แล้วแต่ไม่ทราบผล transaction เป็น `Unknown`: ต้องตรวจผลในฐานข้อมูลก่อนทำซ้ำ ห้ามสมมติว่า rollback สำเร็จ ตัวอย่างยอมสร้าง draft ว่างเมื่อไม่มีรายการใหม่ Fixture ของ Billing ตรวจ persistence, rollback ปกติและ draft ว่าง; สัญญา `Unknown` ตรวจแยกใน WORM M5 outcome hooks อ่าน [WORM SQLite]({{< relref "/books/standard-library/worm-sqlite.md" >}}) ประกอบ

อ่านต่อ: [ทดสอบและไปต่อ]({{< relref "/books/getting-started/09-billing-time-tests-and-next-steps.md" >}})
