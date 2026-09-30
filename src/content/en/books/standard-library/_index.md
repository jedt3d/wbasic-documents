---
title: "Standard Library"
description: "Standard modules, types, and procedures available to WBasic programs"
weight: 2
---

This part is organized by module, with signatures, results, errors, and short examples tested against the same compiler edition as the guide. Current coverage includes APIs verified in R5 on Windows 11 ARM64 and macOS ARM64.

“Passed” here therefore means passed on those two recorded hosts and revisions. It does not certify Linux ARM64 or native x86_64, nor replace the R8 no-SDK distribution gate.

Planned pages will not be written as though their APIs are ready. A reference manual should reduce surprises, not create them.

## Contents

1. [Core I/O and standard handles](core-io.md)
2. [Streams and text](streams-and-text.md)
3. [Json.Value and codecs](json.md)
4. [File and Memory](file-and-memory.md)
5. [HTTP](http.md)
6. [SQLite](sqlite.md)
7. [CSV](csv.md)

Every API in this part is synchronous. Calling one directly from a TUI callback causes the runtime to report `Tui.BlockingOperation`; do I/O through `Jobs` instead.
