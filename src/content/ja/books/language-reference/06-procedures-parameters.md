---
title: "手続きと引数"
description: "宣言、呼び出し、省略可能な引数と名前付き引数、ByRef、手続き値"
weight: 6
---

WBasicはすべてのルーチンに`Procedure`を使います。値を返す手続きは関数、型に付属する手続きはメソッドと呼ぶこともありますが、追加で覚える`Function`や`Method`というキーワードはありません。

## 宣言と呼び出し

```basic
Procedure Repeat(text As String, times As Integer = 1) As String
  Let output As String = ""
  For i As Integer = 1 To times
    output = output + text
  Next
  Return output
EndProcedure

Procedure Main()
  PrintLn(Repeat("Hi", times := 2))
EndProcedure
```

引数と戻り値には明示的な型が必要です。省略可能な引数は必須の引数の後に置き、その既定値は互換性のあるコンパイル時定数でなければなりません。呼び出しでは位置引数を先に置き、その後に`name := value`形式の名前付き引数を置けます。引数は重複できず、名前付き引数の後に位置引数は置けません。

WBasicにはまだ利用者定義のオーバーロードや可変長引数はありません。異なる名前か省略可能な引数を使います。モジュールレベルの手続きは本体の検査前から見えるため、前方参照と再帰ができます。

## ByRefは副作用を明示する

通常の引数はローカルコピーを受け取ります。呼び出し側の変数を変更するには、両側に`ByRef`を書きます。

```basic
Procedure AddOne(ByRef value As Integer)
  value += 1
EndProcedure

Procedure Main()
  Let count As Integer = 0
  AddOne(ByRef count)
  PrintLn(count.ToString())
EndProcedure
```

ByRefが受け入れるのは、変更可能なローカル変数または引数を丸ごと渡す場合だけです。フィールド、添字付き要素、一時値、プロパティは渡せません。既定値もありません。1回の呼び出しで同じ変数を複数のByRef位置に渡すことはできません。値引数は本体が始まる前にスナップショットが作られます。

```basic
Procedure Change(ByRef value As Integer, before As Integer)
  value += 1
  PrintLn(before.ToString())
EndProcedure

Procedure Main()
  Let n As Integer = 4
  Change(ByRef n, n)  ' before ยังคงเป็น 4
EndProcedure
```

ByRefが値を借りるのは呼び出し中だけです。構造体に保存したり、返したり、保持するコールバックへ渡したりできません。

## 値としての手続き

名前のあるモジュールレベルの手続きは、シグネチャが一致すれば手続き値として保存できます。

```basic
Procedure IsPositive(value As Integer) As Boolean
  Return value > 0
EndProcedure

Procedure Main()
  Let predicate As Procedure(value As Integer) As Boolean = IsPositive
  PrintLn(predicate(7).ToString())
EndProcedure
```

引数名はシグネチャに含まれません。型、順序、ByRef指定、戻り値の型は含まれます。この版には匿名手続き、入れ子の手続き、クロージャによる捕捉、束縛されたインスタンスメソッドがありません。TUIとJobsのコールバックも、この規則に従う名前付き手続きを使います。ランタイムは状態を保持し、呼び出し中だけコンテキストを貸します。

JSON、TUI、Jobsなどの決められた呼び出しで使う`Of T`は、利用者がジェネリックな手続きを宣言できるという意味ではありません。コンパイラが対応するのは定義済みのAPIだけで、具体的な型が見えている必要があります。
