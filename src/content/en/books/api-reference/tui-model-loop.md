---
title: "TUI Model Loop and Effects"
weight: 10
---

Status: **R6 foundation passed; R7 uses the same model loop**

## Application signature

```basic
Tui.Run(Of M)(
  initial As M,
  init As Procedure(ByRef model As M, context As Tui.Context Of M),
  update As Procedure(ByRef model As M, event As Tui.Event,
                      context As Tui.Context Of M),
  view As Procedure(model As M, viewport As Tui.Viewport) As Tui.View,
  options As Tui.Options
) As M
```

`M` must be a transferable `Structure` without resource handles or escaped contexts. Callbacks are named module-level procedures. `Run` returns the final model after restoring the terminal.

```basic
Import Tui

Structure Model
  Count As Integer = 0
EndStructure

Procedure Init(ByRef model As Model, context As Tui.Context Of Model)
  context.Focus("add")
EndProcedure

Procedure Update(ByRef model As Model, event As Tui.Event,
                 context As Tui.Context Of Model)
  If Let action As Tui.ActivateEvent = event.Activate Then
    If action.Id = "add" Then
      model.Count += 1
    EndIf
  EndIf
EndProcedure

Procedure View(model As Model, viewport As Tui.Viewport) As Tui.View
  Return Tui.View.Create(Tui.Button("add", model.Count.ToString()))
EndProcedure
```

## Context effects

`Tui.Context Of M` is borrowed only for the current callback and synchronous helpers:

- `Focus(id)`, `Consume()`, `Quit()`
- `SetTimer(key, delayMs, repeat := False) As Tui.TimerId`
- `CancelTimer(id)`, `CancelJob(id)`
- `Apply(actions)`, `Log(level, text)`
- `SetMode(mode)`, `RunTerminalProcess(key, request)`

Effects are queued in order and submitted when the callback succeeds. If it throws, effects that have not started are discarded. Blocking File/Http/Sqlite calls from a callback report `Tui.BlockingOperation`.

## Events and views

`Tui.Event` has nullable typed payloads such as `Key`, `TextInput`, `Paste`, `Mouse`, `Resize`, `Focus`, `Activate`, `Timer`, `Clipboard`, `ProcessExited`, `Terminal`, and R7 widget events. Each event has one active payload; there is no need to cast from mysterious JSON.

A `View` is an immutable frame description made with `Tui.View.Create(root)`. `Tui.Text`, `Row`, `Column`, `Stack`, `Panel`, `Button`, and `Modal` return `Tui.Node`. Interactive node IDs must be nonempty and unique within the rendered tree.
