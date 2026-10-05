---
title: "TUI のモデルループと効果"
weight: 10
---

状態: **R6 の基盤は検証済み。R7 も同じモデルループを使用**

## アプリケーションのシグネチャ

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

`M` は、リソースのハンドルやコールバックの外へ持ち出したコンテキストを含まない、転送可能な `Structure` でなければなりません。コールバックにはモジュール直下の名前付き手続きを使います。`Run` は端末を復元した後、最終モデルを返します。

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

## コンテキストの効果

`Tui.Context Of M` を借用できるのは、現在のコールバックとその同期的な補助手続きの間だけです。

- `Focus(id)`、`Consume()`、`Quit()`
- `SetTimer(key, delayMs, repeat := False) As Tui.TimerId`
- `CancelTimer(id)`、`CancelJob(id)`
- `Apply(actions)`、`Log(level, text)`
- `SetMode(mode)`、`RunTerminalProcess(key, request)`

効果は順序を保ってキューに積まれ、コールバックが成功すると送信されます。例外が発生した場合、まだ開始していない効果は破棄されます。コールバック内で File、Http、Sqlite の同期 I/O を呼ぶと `Tui.BlockingOperation` を報告します。

## イベントとビュー

`Tui.Event` は、`Key`、`TextInput`、`Paste`、`Mouse`、`Resize`、`Focus`、`Activate`、`Timer`、`Clipboard`、`ProcessExited`、`Terminal`、R7 のウィジェットイベントなど、型付きで Null を許容するペイロードを持ちます。一つのイベントで有効なペイロードは一つだけです。JSON から推測して型変換する必要はありません。

`View` は `Tui.View.Create(root)` で作る不変の画面構成です。`Tui.Text`、`Row`、`Column`、`Stack`、`Panel`、`Button`、`Modal` は `Tui.Node` を返します。操作可能なノードの ID は空でなく、描画されるツリー内で一意でなければなりません。
