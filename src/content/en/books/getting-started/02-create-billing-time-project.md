---
title: "2 · Create the Billing Time project"
description: "Create the manifest, source tree, and a runnable first program."
weight: 2
---

Create this structure:

```text
billing-time/
|-- BillingTime.wproj
`-- src/
    `-- Main.wbas
```

`BillingTime.wproj` describes the project and its entry source:

```toml
[project]
name = "BillingTime"
module = "BillingTime"
entry = "src/Main.wbas"
toolchain = "0.0.1"

[dependencies]
```

Put this runnable baseline in `src/Main.wbas`:

```basic
Module BillingTime

Procedure ExactAmountCents(minutes As Integer, rateCentsPerHour As Integer) As Integer
  Return (minutes * rateCentsPerHour) Div 60
EndProcedure

Procedure Main(args As Array Of String) As Integer
  Let projectName As String = "Website refresh"
  If args.Length > 0 Then
    projectName = args[0]
  EndIf
  Let totalMinutes As Integer = 120 + 90
  Let totalCents As Integer = ExactAmountCents(120, 6000) + ExactAmountCents(90, 4000)
  PrintLn("Billing Time")
  PrintLn("project: " + projectName)
  PrintLn("time logged: " + totalMinutes.ToString() + " minutes")
  PrintLn("draft total: " + totalCents.ToString() + " cents")
  Return 0
EndProcedure
```

The book repository also includes the complete project at
`examples/billing-time-cli`.

Next: [Tour the language in this program]({{< relref "/books/getting-started/03-billing-time-language-tour.md" >}}).
