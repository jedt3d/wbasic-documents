---
title: "型、宣言、変換"
description: "基本型、ローカル値、定数、Null許容性、明示的な数値変換"
weight: 3
---

## 基本型

WBasicの主な型は次のとおりです。

| 型 | 意味 |
|---|---|
| `Integer` | 符号付き64ビット整数 |
| `Float` | IEEE 754のbinary64値 |
| `Byte` | 0～255の整数 |
| `Boolean` | `True`または`False` |
| `String` | Unicodeスカラー値からなる不変の列。内部ではUTF-8で保存される |
| `T?` | 型`T`のNull許容形式 |
| `Array Of T` | 1種類の型の値を順序付きで集めたもの |
| `Map Of K To V` | キーから値への対応を保持するコレクション |
| `Procedure(...) As T` | 呼び出せる手続きの型 |

引数一覧の後に`As`がない手続きは値を返しません。この場合に使う`Void`型はWBasicにはありません。

## ローカル宣言

`Let`は変更可能なローカル値を、`Const`はコンパイル時定数を宣言します。どちらにも型と初期値が必要です。

```basic
Let attempts As Integer = 0
Const ProductName As String = "WBasic"

attempts = attempts + 1
```

ローカル値にはブロックスコープがあります。0、空文字列、Nullで暗黙に初期化されることはありません。`Dim`と`Var`は同義語ではありません。モジュールスコープには定数と宣言を置けますが、変更可能なグローバル変数は置けません。

定数に使えるのは、コンパイル時に計算できる基本型、`Enum`型、`Flags`型の値に限ります。変更可能なコレクションや実行時I/Oの結果は保持できません。

## Null許容性

通常の値に`Null`は入りません。値がないことに意味があるなら`?`を付けます。

```basic
Let nickname As String? = Null

If Let name As String = nickname Then
  PrintLn(name)
EndIf
```

Null許容性は型の一部であり、真偽値への暗黙変換は生じません。条件には引き続き`Boolean`が必要です。

## 変換は明示する

WBasicは数値から文字列、文字列から数値、数値から`Boolean`への暗黙変換を行いません。`Byte`だけは自動的に`Integer`へ拡張されます。それ以外の数値変換には名前付きの変換を使います。

```basic
Let small As Byte = 12
Let count As Integer = small
Let ratio As Float = Float.FromInteger(count)
Let restoredCount As Integer = Integer.FromFloat(ratio)
Let checkedByte As Byte = Byte.FromInteger(count)
```

`Integer.FromFloat`は有限で、整数であり、範囲内の値だけを受け入れます。`Byte.FromInteger`は0～255の範囲を確認します。これらの条件に違反する整数演算や変換は、デバッグでもリリースでもエラーとなり、黙って折り返しません。`Float.FromInteger`はbinary64の規則に従って丸められることがあります。

`/`は浮動小数点除算、`Div`は整数除算を行い、`Mod`は整数の余りを返します。0による除算はエラーです。

## テキストの解析

解析は明示的なライブラリ操作です。`Integer.Parse`は`Integer`を返し、不正なテキストでは例外を投げます。`Integer.TryParse`は`Integer?`を返し、解析に失敗すると`Null`になります。どちらも空白を自動的に取り除きません。各入力は1種類の10進数字を受け入れ、呼び出すソースファイルの数字の種類とは独立です。

```basic
Let value As Integer = Integer.Parse("125")
```

アプリケーションで前後の空白を許すなら、解析前に明示的なテキスト操作を呼びます。

## 暗黙の真偽判定や書式設定はない

条件は`Boolean`でなければなりません。コンパイラは整数、文字列、コレクション、Null許容値から条件を推測しません。出力は補間または適切な書式設定APIで整えます。これにより、オーバーロードの解決とデータ変換がソースに見えるようになります。
