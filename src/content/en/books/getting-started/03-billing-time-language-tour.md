---
title: "3 · A short language tour"
description: "Read procedures, values, types, control flow, arguments, and output"
weight: 3
---

`Module BillingTime` is the first declaration and names this source file. `Procedure` declares a callable unit. `Main` receives command-line arguments and returns the process exit code:

```basic
Procedure Main(args As Array Of String) As Integer
```

`Let` introduces typed local values:

```basic
Let designMinutes As Integer = 120
Let projectName As String = "Website refresh"
```

The example stores money in integer cents and uses `Div` for integer division. Its chosen numbers divide exactly by 60. Real billing still needs explicit rounding, overflow, currency, and tax policies.

A guard checks the array before reading its first element:

```basic
If args.Length > 0 Then
  projectName = args[0]
EndIf
```

`PrintLn` writes a line to standard output. `ToString()` converts an integer to text before joining it with a label using `+`.

Next: [Check, compile, and run]({{< relref "/books/getting-started/04-command-line-workflow.md" >}}).
