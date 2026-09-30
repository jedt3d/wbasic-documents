---
title: "TUI model loop และ effects"
weight: 10
---

สถานะ: **R6 foundation ผ่าน; R7 ใช้ model loop เดียวกัน**

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

`M` ต้องเป็น `Structure` ที่ถ่ายโอนได้และไม่มี resource handles หรือ escaped
contexts callbacks เป็น named module-level procedures และ `Run` คืน model
สุดท้ายหลังคืน terminal แล้ว

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

`Tui.Context Of M` ยืมใช้ได้เฉพาะ callback ปัจจุบันและ synchronous helper:

- `Focus(id)`, `Consume()`, `Quit()`
- `SetTimer(key, delayMs, repeat := False) As Tui.TimerId`
- `CancelTimer(id)`, `CancelJob(id)`
- `Apply(actions)`, `Log(level, text)`
- `SetMode(mode)`, `RunTerminalProcess(key, request)`

effects queue ตามลำดับและ submit เมื่อ callback สำเร็จ หาก callback throw
effects ที่ยังไม่เริ่มถูกทิ้ง การเรียก File/Http/Sqlite แบบ blocking จาก callback
รายงาน `Tui.BlockingOperation`

## Events และ views

`Tui.Event` มี nullable typed payload เช่น `Key`, `TextInput`, `Paste`, `Mouse`,
`Resize`, `Focus`, `Activate`, `Timer`, `Clipboard`, `ProcessExited`, `Terminal`
และ events ของ widget รุ่น R7 แต่ละ event มี active payload เดียว ไม่ต้อง cast
จาก JSON ลึกลับ

`View` เป็น immutable frame description สร้างจาก `Tui.View.Create(root)`;
`Tui.Text`, `Row`, `Column`, `Stack`, `Panel`, `Button`, `Modal` คืน `Tui.Node`
IDs ของ interactive nodes ต้องไม่ว่างและไม่ซ้ำใน rendered tree
