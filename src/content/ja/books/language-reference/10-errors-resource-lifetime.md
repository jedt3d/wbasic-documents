---
title: "エラーと資源の寿命"
description: "Try/Catch/Finally、Errorモデル、Using、後片付けの順序、抑制されたエラー"
weight: 10
---

WBasicは「値がない」と「操作に失敗した」を区別します。前者にはNull許容型、後者には`Error`を使います。EOFを事故のように扱う必要はなく、事故をNullの下に隠すこともありません。

## Try、Catch、Finallyの使い方

```basic
Procedure Main() As Integer
  Try
    Let content As String = File.ReadText("settings.txt")
    PrintLn(content)
    Return 0
  Catch err As Error
    If err.Kind = ErrorKind.IO Then
      Console.ErrorLn(err.Message)
      Return 1
    EndIf
    Throw
  Finally
    PrintLn("finished")
  EndTry
EndProcedure
```

`Try`には少なくとも`Catch`または`Finally`のブロックが必要で、`Catch`は1つだけ置けます。`Kind`と`Code`の違いは`If`または`Select`で判定します。`Throw err`はErrorを投げ、`Catch`内の引数なし`Throw`は元の発生元を保って再送出します。Catch内で起きたErrorは同じCatchには戻りません。

`Finally`は通常終了、`Return`、`Break`、`Continue`、エラーのどれでも実行されます。`Finally`内では、外へ進む制御フローを分かりにくくする`Return`、`Break`、`Continue`は禁止です。

## プログラムから調べられるエラー

Errorには次の情報があります。

- `Kind`：IO、Network、Parse、Conversion、Bounds、Validationなどの分類
- `Code`：`File.NotFound`のような、安定した名前空間付きの名前
- `Message`：人が読めるテキスト
- `Suppressed`：主なエラーを押しのけてはならない後片付けのエラー

```basic
Throw Error.Create(ErrorKind.Validation, "App.InvalidName", "Name is required")
```

判断にはMessageを解析せず、KindまたはCodeを使います。処理されなかったErrorは、可能ならコード、メッセージ、ソース位置を報告し、終了コード1でプロセスを終えます。

## Usingはどの出口でも資源を閉じる

ファイルストリーム、データベース接続、カーソルは中身を隠した資源ハンドルです。ハンドルをコピーしても同じ資源を指し、その内容がコピーされるわけではありません。

```basic
Procedure Main()
  Using reader As TextReader = File.OpenText("input.txt")
    While True
      If Let line As String = reader.ReadLine() Then
        PrintLn(line.Trim())
      Else
        Break
      EndIf
    EndWhile
  EndUsing
EndProcedure
```

初期化は`Using`のスコープに入る前に成功しなければなりません。`Using`はどの終了経路でもCloseを呼び、入れ子のスコープは開いた順の逆順で閉じます。`.Close()`は何度呼んでも同じ結果です。閉じたハンドルでの操作は`ErrorKind.ResourceClosed`を投げます。Usingで宣言した変数に新しいハンドルを代入することはできません。

本体が成功してCloseに失敗すると、Closeのエラーを投げます。先のエラーがあればそれを主として保ち、Closeのエラーを`Suppressed`へ入れます。ARCはメモリとOSハンドルの安全網ですが、flushやcloseの成功を確認する必要がある場合はUsingの代わりになりません。

プロセスが所有する標準ストリームにはCore独自のclose規則が適用されます。資源型を作れるのはCoreまたは選定済みのモジュールだけです。この版には利用者定義の資源型やデストラクターはありません。
