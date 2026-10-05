---
title: "制御フロー"
description: "If、Select、While、For、For Eachと明示的なループの終了"
weight: 5
---

WBasicは明示的な終了キーワードを持つブロックを使います。インデントは読み手を助け、`EndIf`、`Next`、`EndWhile`は読み手とコンパイラにブロックの終わりを示します。

## IfとSelect

`If`と`ElseIf`の条件はBooleanでなければなりません。数値や文字列を真偽値として解釈することはありません。

```basic
If count = 0 Then
  PrintLn("ไม่มีรายการ")
ElseIf count < 10 Then
  PrintLn("รายการไม่มาก")
Else
  PrintLn("เตรียมกาแฟก่อนอ่าน")
EndIf
```

`Select`は対象を1回だけ評価します。各`Case`は同じ型のコンパイル時定数です。次のCaseへ処理が流れないため、`Case`の末尾に`Break`は不要です。

```basic
Select command
Case "start"
  PrintLn("starting")
Case "stop"
  PrintLn("stopping")
Else
  PrintLn("unknown")
EndSelect
```

## WhileとFor

`While`は本体を実行する前に毎回Boolean条件を調べます。

```basic
While count > 0
  PrintLn(count.ToString())
  count -= 1
EndWhile
```

`For ... To ... Step ...`は整数を使い、終点を含みます。開始値、終了値、刻み幅は、ループに入るときにその順で1回ずつ評価されます。既定の`Step`は1です。

```basic
For i As Integer = 1 To 5 Step 2
  PrintLn(i.ToString())
Next

For i As Integer = 3 To 1 Step -1
  PrintLn(i.ToString())
Next
```

刻み幅0は検証エラーです。刻む方向が終点から離れる場合、本体は一度も実行されません。ループ変数はそのループのスコープに属し、直接変更できません。コンパイラは加算前に終了を確認し、`Integer.MaxValue`付近で不要なオーバーフローを避けます。

`Break`は最も内側のループを抜け、`Continue`はその次の反復を始めます。どちらもループ内でのみ有効です。

## For Eachとスナップショット

`For Each`はコレクションを1回だけ評価します。配列とマップは値セマンティクスに基づくスナップショットを使うため、反復中に元のコレクションを変更しても反復子は混乱しません。

```basic
Let names As Array Of String = ["Ada", "Grace"]
For Each name As String In names
  PrintLn(name)
  names.Append(name + "!")
Next
```

このループが訪れるのは元のスナップショットにある2つの値だけです。`name`はローカルコピーで、変更しても元の要素は変わりません。マップはキーを挿入順に反復します。文字列はUnicodeスカラー値を反復し、それぞれを`String`で表します。

## すべての経路で戻る

`Return`は手続きを直ちに終えます。戻り値の型を宣言した手続きは、正常に進むすべての経路でその型の値を返さなければなりません。「この分岐はたぶん必ず通る」という約束はコンパイラには通用しません。コンピューターは見落とした経路を見つけるのが得意です。

この版には`Goto`、行番号、`GoSub`、`Do/Loop`、パターンマッチングはありません。上の構造を使い、ブロックが読みにくくなったら手続きを切り出します。
