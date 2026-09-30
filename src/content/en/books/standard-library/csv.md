---
title: "CSV"
weight: 70
---

Status: **Writer passed R5; used in the R7 SQLite showcase**

```basic
Import Csv

Csv.Create(path As String, delimiter As String = ",",
           newline As String = "\r\n") As Csv.Writer
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

Close/flush errors retain primary and suppressed ordering as in text streams. The R7 showcase tests large exports, cancellation, and preservation of an existing destination with a temporary file plus `File.Move`.

The current API is a **writer**. Do not suggest that a public `Csv.Reader` exists while the source has none. Tests can read results with a harness to prove a round trip, but that does not turn the harness into a language API.
