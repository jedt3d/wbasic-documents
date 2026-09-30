---
title: "8 · สร้าง invoice ใน transaction"
description: "เลือกเวลาที่ยังไม่วางบิล สร้าง line และเปลี่ยนสถานะอย่างเป็นอะตอม"
weight: 8
---

> **สถานะ: Planned / ยัง compile ไม่ได้** — transaction และ query ที่ใช้ `Worm.*`
> ในบทนี้เป็น acceptance design สำหรับ public API ที่ยังไม่มีใน runtime ปัจจุบัน

ช่วงสำคัญที่สุดของตัวอย่างเริ่มด้วยการเปิด transaction แล้ว query เฉพาะ `TimeEntry`
ของโครงการที่ `InvoiceId IS NULL` การเรียงด้วย ID ทำให้ผลลัพธ์มีลำดับคงที่

```basic
Using transaction As Worm.Transaction = db.BeginTransaction()
  Let totalCents As Integer = 0
  Let unbilled As Array Of TimeEntry = Worm.Query(Of TimeEntry)(transaction)
    .Where(TimeEntry.Columns.ProjectId.Eq(project.Id))
    .Where(TimeEntry.Columns.InvoiceId.IsNull())
    .OrderBy(TimeEntry.Columns.Id).All()

  Let invoice As Invoice = Worm.Insert(Of Invoice)(transaction,
    Worm.New(Of Invoice)()
      .SetCustomerId(customer.Id)
      .SetProjectId(project.Id)
      .SetIssuedOn("2026-09-29")
      .SetStatus("Draft"))
```

`Columns`, `Query` และ typed predicate เป็น WORM proposal ตัวกรองต้องทำงานใน SQLite
ไม่โหลดทุก row มากรองใน memory

## หนึ่งรายการเวลา หนึ่ง invoice line

ใน loop เราคำนวณยอด สร้าง `InvoiceLine` แล้วเปลี่ยน `InvoiceId` ของรายการเวลา:

```basic
  For Each entry As TimeEntry In unbilled
    Let amountCents As Integer = ExactAmountCents(
      entry.Minutes, entry.RateCentsPerHour)

    Let line As InvoiceLine = Worm.Insert(Of InvoiceLine)(transaction,
      Worm.New(Of InvoiceLine)()
        .SetInvoiceId(invoice.Id)
        .SetTimeEntryId(entry.Id)
        .SetDescription(entry.Note)
        .SetMinutes(entry.Minutes)
        .SetRateCentsPerHour(entry.RateCentsPerHour)
        .SetAmountCents(amountCents))
    totalCents += line.AmountCents

    Worm.UpdateById(Of TimeEntry)(transaction, entry.Id,
      Worm.Change(Of TimeEntry)().SetInvoiceId(invoice.Id))
  Next
  transaction.Commit()
  PrintLn("invoice total: " + totalCents.ToString() + " cents")
EndUsing
```

`Worm.Change` เก็บ update intent: field ที่ไม่ได้เรียก setter ต้องคงค่าเดิม ส่วน setter
ที่รับ `Null` ใน model อื่นต้องหมายถึงเขียน SQL NULL จริง ความต่างระหว่าง “ไม่แก้” กับ
“แก้เป็นว่าง” ต้องอยู่ใน type และ test ไม่ใช่ซ่อนอยู่ใน convention

ถ้าเกิด error ก่อน `Commit()` การออกจาก `Using` ต้อง rollback ทั้ง invoice, lines และ
การผูก time entries พร้อมกัน ระบบจริงยังต้องป้องกัน concurrent runs วางบิลรายการเดียวกัน
ด้วย constraint, isolation หรือ version check; transaction เพียงคำเดียวไม่ได้เสก race
condition ให้หายไป

อ่านต่อ: [ผลลัพธ์ แผนทดสอบ และขั้นต่อไป]({{< relref "/books/getting-started/09-billing-time-tests-and-next-steps.md" >}})
