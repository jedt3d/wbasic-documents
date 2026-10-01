---
title: "CSV"
weight: 70
---

Status: **Writer passed R5; exclusive creation passed the WORM M5 native gates**

```basic
Import Csv

Csv.Create(path As String, delimiter As String = ",",
           newline As String = "\r\n", overwrite As Boolean = True) As Csv.Writer
writer.WriteRow(values As Array Of String)
writer.Close()
```

The writer uses UTF-8 and quotes values correctly when they contain a delimiter, quote, or newline.

```basic
Using output As Csv.Writer = Csv.Create("people.csv")
  output.WriteRow(["id", "name", "note"])
  output.WriteRow(["1", "ไทย, \"Alice\"", "บรรทัดหนึ่ง\nบรรทัดสอง"])
EndUsing
```

`overwrite := False` atomically refuses an existing path without truncating its bytes. This is useful for a sibling `.partial` file. It does not lock the final destination: cancellation can leave partial bytes, and a later `File.Move` does not by itself supply idempotency or power-loss durability.

Close/flush errors retain primary and suppressed ordering as in text streams. The R7 showcase tests large exports and cancellation; M5 additionally tested exclusive partial creation with two processes.

The current API is a **writer**. Do not suggest that a public `Csv.Reader` exists while the source has none. Tests can read results with a harness to prove a round trip, but that does not turn the harness into a language API.
