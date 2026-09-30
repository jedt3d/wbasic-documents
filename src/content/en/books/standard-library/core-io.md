---
title: "Core I/O and Standard Handles"
weight: 10
---

Status: **Passed R5 on Windows 11 ARM64 and macOS ARM64**

## Printing and reading lines

```basic
Print(text As String)
PrintLn(text As String)
ReadLine() As String?
Console.ErrorLn(text As String)
```

`Print` and `PrintLn` write through `Console.Output`; `ReadLine` reads through `Console.Input` and returns `Null` at EOF, distinguishing EOF from an empty line. API names are case-sensitive: `println` is not `PrintLn`. Computers can be as particular as a teacher marking an exam in red ink.

```basic
Procedure Main()
  Print("ชื่อ: ")
  If Let name As String = ReadLine() Then
    PrintLn("สวัสดี " + name)
  Else
    Console.ErrorLn("ไม่มีข้อมูลเข้า")
  EndIf
EndProcedure
```

## Text and byte handles

| Member | Type | Ownership |
|---|---|---|
| `Console.Input` | `TextReader` | Process-owned, reusable |
| `Console.Output` | `TextWriter` | Process-owned, reusable |
| `Console.Error` | `TextWriter` | Process-owned, reusable |
| `IO.Stdin` | `Stream` | Process-owned |
| `IO.Stdout` | `Stream` | Process-owned |
| `IO.Stderr` | `Stream` | Process-owned |

`Close()` on a standard handle releases the program's alias, not the process's OS handle; other aliases remain usable. Program-owned file and memory streams close for all aliases, and further use reports `ErrorKind.ResourceClosed`.

## Errors and limits

- Redirected stdin/stdout/stderr work, including byte data containing NUL.
- `Seek` on a pipe reports `UnsupportedOperation`.
- TUI checks terminal ownership across aliases so Core I/O cannot overwrite a frame.
- This I/O is synchronous; use `Jobs` in `Init`, `Update`, or `View`.
