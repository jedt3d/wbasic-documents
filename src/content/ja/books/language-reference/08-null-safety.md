---
title: "Null安全性"
description: "既定で非Null、Null許容型、If Let、安全な呼び出し、遅延評価する代替値"
weight: 8
---

WBasicの型は既定で`Null`を拒否します。したがって`String`には常に文字列が入り、`String?`には文字列か`Null`が入ります。疑問符1つで、本番環境で生じる思わぬ疑問をいくつも減らせます。

```basic
Let nickname As String? = Null
Let title As String = nickname?.Trim() ?? "Guest"
PrintLn(title)
```

`T?`は`T`または`Null`を受け入れます。`T??`のような入れ子のNull許容型はありません。括弧で対象の位置を区別します。`Array Of String?`はNull許容の要素を持つ配列で、`(Array Of String)?`は配列自体がNull許容です。

## If Letによる取り出し

```basic
If Let name As String = nickname Then
  PrintLn(name.ToUpper())
Else
  PrintLn("No nickname")
EndIf
```

右側の式は1回だけ評価されます。値がある場合、`If Let`はthenブロック内だけで使える非Nullのローカル`name`を作ります。`If nickname <> Null`から暗黙のスマートキャストは起きません。値を取り出す経路を明示するには`If Let`を使います。

## 安全な呼び出しと代替値

`?.`はプロパティへの安全なアクセス、または値を返すメソッドの安全な呼び出しを行います。レシーバーがNullなら引数は評価されず、結果はNull許容です。メソッド自体がNull許容値を返す場合、さらに層は増えません。

`left ?? right`は左に値があればそれを使い、なければ右の式を評価します。この遅延評価が重要です。

```basic
Procedure ExpensiveDefault() As String
  PrintLn("computing default")
  Return "Guest"
EndProcedure

Procedure Main()
  Let present As String? = "Ada"
  PrintLn(present?.Trim() ?? ExpensiveDefault())
EndProcedure
```

この例では左側に値があるため、`computing default`は印刷されません。

安全な呼び出しを代入先にしたり、変更を加える操作を呼んだりはできません。`.Equals()`を呼ぶ前にNull許容のレシーバーから値を取り出すか、等価性の規則に従って`=`でNullを比較します。

## 値の不在と失敗

Mapの`Get`でキーがない場合や`TextReader.ReadLine()`がEOFに達した場合のように、通常の不在にはNull許容値が適します。ファイルの読み取り失敗、不正なJSON、範囲外の添字はErrorです。`Null`を返して原因を隠してはいけません。

この言語には`!!`、暗黙の取り出し、検査しないキャストがありません。「絶対に大丈夫」というボタンで責任を実行時へ押し付けることはできません。値が必須なら`If Let`で調べるか、最初から引数を非Nullにします。
