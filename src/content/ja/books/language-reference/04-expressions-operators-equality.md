---
title: "式、演算子、等価性"
description: "算術演算、Boolean演算、Null許容値の代替、値の等価性の優先順位"
weight: 4
---

WBasicの式は自然に読めることを目指しながら、明確な優先順位に従います。計算機にさえ規則は必要です。さもないと`2 + 3 * 4`の解釈をめぐって、無駄に長い会議が始まりかねません。

## 演算子の優先順位

結び付きが強い順に、後置の`()`、`[]`、`.`、`?.`、単項の`+`と`-`、`*`、`/`、`Div`、`Mod`、加減算の`+`と`-`、ビット演算の`&`、`^`、`|`、比較、`Not`、`And`、`Or`、Null許容値の代替演算子`??`です。

```basic
Procedure Main()
  PrintLn((2 + 3 * 4).ToString())
  PrintLn((5 / 2).ToString())
  PrintLn((-5 Div 2).ToString())
  PrintLn((-5 Mod 2).ToString())
EndProcedure
```

`/`は浮動小数点の商を返します。`Div`は整数除算の結果を0方向に切り捨て、`Mod`は対応する余りを返します。例は順に`14`、`2.5`、`-2`、`-1`を印刷します。算術演算のオーバーフローはデバッグでもリリースでもエラーです。

`And`と`Or`は短絡評価します。`??`は左辺が`Null`のときだけ右辺を評価します。式がクロスワードのように見えてきたら括弧を足しましょう。後で読む人が助かります。

```basic
Let name As String? = Null
Let printable As Boolean = (name ?? "") = ""
```

`a < b < c`のような比較の連鎖は禁止です。`a < b And b < c`と書きます。

## 代入は式ではない

`=`には文脈で区別される2つの役割があります。文では代入し、式では比較します。

```basic
Let count As Integer = 1
count = count + 1
If count = 2 Then
  PrintLn("two")
EndIf
```

WBasicには代入式がないため、`count = 2`を引数内に隠すことはできません。複合代入`+=`、`-=`、`*=`、`/=`は対象を1回だけ評価し、結果は元の型に代入できなければなりません。

## 等価性は値を比較する

基本型と文字列は、型が一致する値を比較します。文字列はUnicodeスカラー値を大文字・小文字を区別して比較し、内容を自動的には正規化しません。配列と構造体は要素を順に比較し、マップは挿入順によらずキーと値の組を比較します。

```basic
Structure Person
  Id As Integer
  Name As String
EndStructure

Procedure Person.SameIdentity(other As Person) As Boolean
  Return Self.Id = other.Id
EndProcedure

Procedure Main()
  Let a As Person = Person(Id := 1, Name := "Alice")
  Let b As Person = Person(Id := 1, Name := "Alicia")
  PrintLn((a = b).ToString())
  PrintLn(a.Equals(b).ToString())
  PrintLn(a.SameIdentity(b).ToString())
EndProcedure
```

最初の2行は名前が違うため`False`を印刷します。最後の行は、自分で書いた業務規則`SameIdentity`により`True`を印刷します。組み込みの`.Equals()`は同じ2つのオペランドに対して常に`=`と一致します。`Equals`という名前は予約済みで、利用者はこの名前のフィールドや付属手続きを宣言できません。

同じ型のNull許容値は、両方が`Null`か、中身の値が等しいときに等しくなります。浮動小数点数はIEEEの規則に従います。NaNは自分自身を含むすべての値と等しくなく、`+0`と`-0`は等しい値です。

現在のWBasicには利用者定義の演算子オーバーロードがありません。名前は大文字・小文字を区別するため、`.equal()`は`.Equals()`の別名ではありません。業務上の等価性には`=`の意味を変えず、`SameIdentity`のような意味の分かる手続きを使います。
