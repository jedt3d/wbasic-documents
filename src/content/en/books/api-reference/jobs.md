---
title: "Jobs"
weight: 40
---

Status: **R6 Jobs foundation passed; progress values and showcase passed R7**

## Start a job

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

Inputs and outputs are snapshotted with value/COW semantics before crossing threads. The compiler rejects nontransferable resource handles and opaque TUI values, identifying the field path.

```basic
Procedure Work(input As Integer, job As Jobs.Context) As String
  job.CheckCancelled()
  job.Report(Jobs.Progress(Completed := 1, Total := 1,
                           Message := "เสร็จแล้ว"))
  Return input.ToString()
EndProcedure
```

`Jobs.Context` provides `IsCancellationRequested`, `CheckCancelled()`, `Delay(...)`, and `Report(progress)`. `Jobs.Progress` exposes `Completed`, nullable `Total`, and `Message`.

## Queue, generation, and cancellation

- Queue and payload sizes are bounded; full queues report `Jobs.QueueFull`/`PayloadLimit`.
- Progress storms are coalesced and bounded, but terminal outcomes are not lost.
- Keys and generations prevent stale results from replacing newer requests; callbacks do not fire after session close.
- `context.CancelJob(id)` requests cooperative cancellation.
- File/HTTP/SQLite waits have finite cancellation bridges, but committed side effects cannot be rewound. Jobs is capable, but it has not patented a time machine.
- A noncooperative worker may end in `ShutdownTimeout`; the runtime restores the terminal before waiting through a grace period and does not open another session until ownership is safe.

In this version, TUI owns `Jobs`; it is not a general-purpose headless scheduler API.
