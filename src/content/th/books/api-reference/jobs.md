---
title: "Jobs"
weight: 40
---

สถานะ: **R6 Jobs foundation ผ่าน; progress values และ showcase ผ่าน R7**

## เริ่มงาน

```basic
Jobs.Start(Of M, I, O)(
  context As Tui.Context Of M,
  key As String,
  input As I,
  work As Procedure(input As I, job As Jobs.Context) As O,
  done As Procedure(ByRef model As M, id As Jobs.Id, output As O,
                    context As Tui.Context Of M),
  failed As Procedure(ByRef model As M, id As Jobs.Id, error As Error,
                      context As Tui.Context Of M),
  progress As Procedure(ByRef model As M, id As Jobs.Id,
                        value As Jobs.Progress,
                        context As Tui.Context Of M)
) As Jobs.Id
```

input/output ถูก snapshot แบบ value/COW ก่อนข้าม thread resource handles และ
opaque TUI values ที่ถ่ายโอนไม่ได้ถูก compiler ปฏิเสธพร้อม field path

```basic
Procedure Work(input As Integer, job As Jobs.Context) As String
  job.CheckCancelled()
  job.Report(Jobs.Progress(Completed := 1, Total := 1,
                           Message := "เสร็จแล้ว"))
  Return input.ToString()
EndProcedure
```

`Jobs.Context` มี `IsCancellationRequested`, `CheckCancelled()`, `Delay(...)`
และ `Report(progress)`; `Jobs.Progress` เปิด `Completed`, nullable `Total` และ
`Message`

## Queue, generation และ cancellation

- queue และ payload มีขอบเขต; เต็มรายงาน `Jobs.QueueFull`/`PayloadLimit`
- progress storm ถูก coalesce/bound แต่ terminal outcome ไม่หาย
- key/generation ป้องกันผลเก่าทับคำขอใหม่; callback หลัง session close ไม่เกิด
- `context.CancelJob(id)` เป็น cooperative cancellation
- File/HTTP/SQLite waits มี finite cancellation bridge แต่ side effect ที่ commit
  ไปแล้วไม่ถูกย้อนเวลา—Jobs เก่ง แต่ยังไม่ได้จดสิทธิบัตรเครื่องย้อนเวลา
- noncooperative worker อาจจบด้วย `ShutdownTimeout`; runtime คืน terminal ก่อน
  รอ grace และไม่เปิด session ใหม่จน ownership ปลอดภัย

`Jobs` รุ่นนี้มี TUI เป็น owner ยังไม่ใช่ headless general-purpose scheduler API
