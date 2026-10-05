---
title: "08 · 1か月分のカレンダーを印刷する"
description: "指定した年と月から曜日を計算し、カレンダーを配置する"
weight: 8
---

{{< project-download "08-calendar-maker" "PLAN.md" >}}
{{< project-download "08-calendar-maker" "draft.wbas.txt" >}}

> **状態：章の草稿。ソース検査は合格。** `draft.wbas.txt`は固定されたコンパイラによる`wb check --json`で診断なしで合格しました。ネイティブ実行とプロジェクトの受け入れは検証待ちです。これは`main.wbas`ではありません。

## 目的と範囲

`Main`で指定した年と月について、月曜から日曜までの1か月分のカレンダーを印刷します。例は2000年2月から始まります。別の年と月を試すには、その2つの値を変えます。マシンの時計を読まず、`DateTime`も使いません。この章は先発グレゴリオ暦を用い、年は1～9999、月は1～12とします。国によってはグレゴリオ暦の採用前に別の暦を使っていました。計算の意味を明確にするため、一つの規則を選びます。

## 計算を段階的に組み立てる

うるう年は400で割り切れる年、または4で割り切れて100では割り切れない年です。したがって2000年2月は29日、1900年2月は28日です。4月、6月、9月、11月は30日、それ以外の月は31日です。プログラムは計算前に年と月の範囲を調べます。

月曜を列0、日曜を列6とします。年`y`の1月1日より前の日数は`(y−1)×365 + (y−1) Div 4 − (y−1) Div 100 + (y−1) Div 400`です。それ以前の月の日数を足し、0001-01-01を月曜日として`Mod 7`を取ります。2000年2月なら、その年より前に`730119`日、1月にさらに31日あるので、`730150 Mod 7 = 1`となり、月の初日は火曜日です。

1日より前の列には列ごとに空白を3つ印刷し、各日付は3文字幅のセルに印刷します。7列の後で改行します。月末では残りの行を1回だけ印刷します。曜日の式と配置は分けて考えましょう。1日が違う列に出るなら、空白を調整する前に日数を確認します。

## 一緒に読む草稿プログラム

このコードブロックはダウンロードできる草稿とまったく同じ内容を表示します。ソース検査は合格していますが、実際の出力はネイティブ実行での確認が必要です。

```basic
' Draft for discussion; not verified or accepted as a runnable example.
' Change these two values to supply a year and month.
Procedure IsLeap(year As Integer) As Boolean
  Return year Mod 400 = 0 Or (year Mod 4 = 0 And year Mod 100 <> 0)
EndProcedure

Procedure DaysInMonth(year As Integer, month As Integer) As Integer
  If month = 2 Then
    If IsLeap(year) Then
      Return 29
    EndIf
    Return 28
  EndIf
  If month = 4 Or month = 6 Or month = 9 Or month = 11 Then
    Return 30
  EndIf
  Return 31
EndProcedure

' Monday is column 0. Gregorian 0001-01-01 is Monday.
Procedure FirstWeekday(year As Integer, month As Integer) As Integer
  Let previous As Integer = year - 1
  Let days As Integer = previous * 365 + previous Div 4 - previous Div 100 + previous Div 400
  For m As Integer = 1 To month - 1
    days += DaysInMonth(year, m)
  Next
  Return days Mod 7
EndProcedure

Procedure Cell(day As Integer) As String
  If day < 10 Then
    Return " " + day.ToString() + " "
  EndIf
  Return day.ToString() + " "
EndProcedure

Procedure PrintCalendar(year As Integer, month As Integer)
  If year < 1 Or year > 9999 Or month < 1 Or month > 12 Then
    PrintLn("year must be 1..9999; month must be 1..12")
    Return
  EndIf
  PrintLn(year.ToString() + "-" + month.ToString())
  PrintLn("Mo Tu We Th Fr Sa Su")
  Let column As Integer = FirstWeekday(year, month)
  Let line As String = ""
  For blank As Integer = 1 To column
    line += "   "
  Next
  For day As Integer = 1 To DaysInMonth(year, month)
    line += Cell(day)
    column += 1
    If column = 7 Then
      PrintLn(line)
      line = ""
      column = 0
    EndIf
  Next
  If column > 0 Then
    PrintLn(line)
  EndIf
EndProcedure

Procedure Main()
  Let year As Integer = 2000
  Let month As Integer = 2
  PrintCalendar(year, month)
EndProcedure
```

## これから検証する受け入れシナリオ

- **前提** 2000年2月 **操作** カレンダーを印刷する **結果** 1日は火曜日の列にあり、29日は表示され、30日は表示されない。
- **前提** 1900年2月 **操作** カレンダーを印刷する **結果** 28日は表示され、29日は表示されない。
- **前提** 2024年9月 **操作** カレンダーを印刷する **結果** 1日は日曜日の列にある。
- **前提** 月が0または13、あるいは年が0 **操作** `PrintCalendar`を呼ぶ **結果** 日付を計算せず、許容範囲を報告する。

## 試して残る作業を見つける

2000年2月を手で確認しましょう。7日は月曜日、29日は火曜日です。その後`ReadLine()`と`Integer.Parse`による入力を追加し、EOF、不正な文字列、範囲外の値を別々に扱います。マシンの時計から現在の月を得ることはライブラリ要求**SWP-FR-02**です。この草稿は`DateTime/Calendar` APIがあるとは想定しません。実行可能な例に昇格させる前に、実際の出力と境界の年1および9999を検証する必要があります。

着想は[Al Sweigartの原著の章](https://inventwithpython.com/bigbookpython/project8.html)から得ました。WBasic向けの説明と草稿は新たに執筆しました。
