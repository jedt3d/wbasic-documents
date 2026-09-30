---
title: "Control Flow"
description: "If, Select, While, For, For Each, and explicit loop exits"
weight: 5
---

WBasic uses blocks with explicit closing keywords. Indentation helps readers; `EndIf`, `Next`, and `EndWhile` tell readers and the compiler where blocks end.

## If and Select

`If` and `ElseIf` conditions must be Boolean. Numbers and strings have no truthy or falsy interpretation:

```basic
If count = 0 Then
  PrintLn("ไม่มีรายการ")
ElseIf count < 10 Then
  PrintLn("รายการไม่มาก")
Else
  PrintLn("เตรียมกาแฟก่อนอ่าน")
EndIf
```

`Select` evaluates its subject once. Each `Case` is a compile-time constant of the same type. There is no fallthrough, so a `Case` needs no trailing `Break`:

```basic
Select command
Case "start"
  PrintLn("starting")
Case "stop"
  PrintLn("stopping")
Else
  PrintLn("unknown")
EndSelect
```

## While and For

`While` checks its Boolean condition before every execution of the body:

```basic
While count > 0
  PrintLn(count.ToString())
  count -= 1
EndWhile
```

`For ... To ... Step ...` uses integers and includes the endpoint. Start, end, and step are evaluated once, in that order, on entering the loop. The default `Step` is 1:

```basic
For i As Integer = 1 To 5 Step 2
  PrintLn(i.ToString())
Next

For i As Integer = 3 To 1 Step -1
  PrintLn(i.ToString())
Next
```

A zero step is a validation error. If the step points away from the endpoint, the body executes zero times. The loop variable belongs to the loop's scope and cannot be modified directly. The compiler checks for completion before incrementing, avoiding a spurious overflow near `Integer.MaxValue`.

`Break` leaves the innermost loop, and `Continue` starts its next iteration. Both are valid only inside loops.

## For Each and snapshots

`For Each` evaluates its collection once. Arrays and maps use snapshots under value semantics, so changing the original collection during iteration does not confuse the iterator:

```basic
Let names As Array Of String = ["Ada", "Grace"]
For Each name As String In names
  PrintLn(name)
  names.Append(name + "!")
Next
```

This loop visits only the two values in the original snapshot. `name` is a local copy; changing it does not change the source member. A map iterates keys in insertion order. A string iterates Unicode scalars, each represented as a `String`.

## Return on every path

`Return` immediately ends a procedure. A procedure declaring a return type must return a value of that type on every normal path. The compiler does not accept a promise that “this branch will probably always run”; computers have a habit of finding branches we overlooked.

This version has no `Goto`, line numbers, `GoSub`, `Do/Loop`, or pattern matching. Use the structures above and extract a procedure when a block grows hard to read.
