---
title: "3 · 言語をひと巡り"
description: "手続き、値、型、条件分岐、引数、出力を読みます。"
weight: 3
---

`Module BillingTime` は最初の宣言で、このソースファイルに名前を付けます。`Procedure` は呼び出せる処理を宣言します。`Main` はコマンドライン引数を受け取り、プロセスの終了コードを返します。

```basic
Procedure Main(args As Array Of String) As Integer
```

`Let` は型を持つローカル値を導入します。

```basic
Let designMinutes As Integer = 120
Let projectName As String = "Website refresh"
```

この例では金額を整数の cents で保持し、`Div` で整数除算します。選んだ数値は 60 で割り切れます。実際の請求処理には、丸め、オーバーフロー、通貨、税について明確な方針が必要です。

配列の最初の要素を読む前に長さを確認します。

```basic
If args.Length > 0 Then
  projectName = args[0]
EndIf
```

`PrintLn` は標準出力に1行書きます。`ToString()` は整数を文字列に変え、`+` でラベルと連結できるようにします。

次へ: [検査、コンパイル、実行]({{< relref "/books/getting-started/04-command-line-workflow.md" >}})。
