---
title: "2 · Billing Time プロジェクトを作る"
description: "マニフェストとソースを用意し、最初のプログラムを実行します。"
weight: 2
---

次の構成を作ります。

```text
billing-time/
|-- BillingTime.wproj
`-- src/
    `-- Main.wbas
```

`BillingTime.wproj` はプロジェクトと入口になるソースを指定します。

```toml
[project]
name = "BillingTime"
module = "BillingTime"
entry = "src/Main.wbas"
toolchain = "0.1.0"

[dependencies]
```

`src/Main.wbas` に次の実行可能な基本形を書きます。

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

  Let designMinutes As Integer = 120
  Let designRate As Integer = 6000
  Let developmentMinutes As Integer = 90
  Let developmentRate As Integer = 4000
  Let totalMinutes As Integer = designMinutes + developmentMinutes
  Let totalCents As Integer = ExactAmountCents(designMinutes, designRate) + ExactAmountCents(developmentMinutes, developmentRate)

  PrintLn("Billing Time")
  PrintLn("project: " + projectName)
  PrintLn("time logged: " + totalMinutes.ToString() + " minutes")
  PrintLn("draft total: " + totalCents.ToString() + " cents")
  Return 0
EndProcedure
```

この小さなプロジェクトは読者が作るものです。言語リポジトリのソースツリーに `examples/billing-time-cli` というパスはありません。別の完成したデータベースの例は第5章から始まります。

次へ: [このプログラムで言語を見てみる]({{< relref "/books/getting-started/03-billing-time-language-tour.md" >}})。
