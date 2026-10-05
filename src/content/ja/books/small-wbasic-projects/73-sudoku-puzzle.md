---
title: "73 · 数独の盤面を検査し、解くための計画"
description: "まず矛盾検査を作り、その後で解法と問題生成を計画する"
weight: 73
---

{{< project-download "73-sudoku-puzzle" "PLAN.md" >}}
{{< project-download "73-sudoku-puzzle" "draft.wbas.txt" >}}

> **状態：下書きの章。ソース検査は合格。** `draft.wbas.txt`は固定したコンパイラで`wb check --json`を実行し、診断なしで通りました。ネイティブ実行と課題の受け入れ検証は未完了です。この下書きは矛盾だけを調べ、解法、問題生成器、`main.wbas`ではありません。

## 目的とデータ

まず小さく検証できる問いから始めます。この9×9の盤面は数独の規則に反しているでしょうか。空きマスを`0`、埋まったマスを`1..9`とします。正の数字は、同じ行・列・3×3の箱に2回現れてはいけません。`ValidBoard`は**現時点で矛盾が見つからなければ**`True`を返します。盤面の完成、解の存在、一意性は意味しません。笑顔でこれらの違いを消すことは、数独にも許されません。

## 箱で迷子にならずに調べる

`ValidGroup`は10個の`seen`要素を使い、添字0は印を付けずに残します。`0..9`の範囲外は直ちに不正です。複数のマスが空でもよいので、0は何度現れても構いません。すでに現れた正の数字は矛盾です。`ValidBoard`は添字0..8を読む**前**に、行数と各行の長さを確認します。次に`boxRow*3+dr`と`boxCol*3+dc`を使って各列と各箱を集めます。

最初の行`5,3,0,0,7,0,0,0,0`をたどってみましょう。`seen[5]`、次に`seen[3]`へ印を付け、0は飛ばします。マス`(0,2)`を5に変えると`seen[5]`はすでに真なので、列や箱を調べる前に行の検査は`False`を返します。`(1,1)`を5にしても左上の箱で衝突します。

## 一緒に読む下書きプログラム

次のコードブロックはダウンロードできる下書きと完全に同じです。出力を`legal so far`または`invalid board`と定めています。ソース検査には通りましたが、ネイティブ実行と受け入れ例の検証は未完了です。

```basic
' Draft for discussion; not verified or accepted as a runnable example.
' Zero represents an empty cell. This checks legality, not solvability.
Procedure ValidGroup(values As Array Of Integer) As Boolean
  Let seen As Array Of Boolean = [False, False, False, False, False, False, False, False, False, False]
  For i As Integer = 0 To values.Length - 1
    Let value As Integer = values[i]
    If value < 0 Or value > 9 Then
      Return False
    EndIf
    If value > 0 Then
      If seen[value] Then
        Return False
      EndIf
      seen[value] = True
    EndIf
  Next
  Return True
EndProcedure

Procedure ValidBoard(board As Array Of (Array Of Integer)) As Boolean
  If board.Length <> 9 Then
    Return False
  EndIf
  For row As Integer = 0 To 8
    If board[row].Length <> 9 Then
      Return False
    EndIf
  Next
  For row As Integer = 0 To 8
    If Not ValidGroup(board[row]) Then
      Return False
    EndIf
    Let column As Array Of Integer = []
    For col As Integer = 0 To 8
      column.Append(board[col][row])
    Next
    If Not ValidGroup(column) Then
      Return False
    EndIf
  Next
  For boxRow As Integer = 0 To 2
    For boxCol As Integer = 0 To 2
      Let box As Array Of Integer = []
      For dr As Integer = 0 To 2
        For dc As Integer = 0 To 2
          box.Append(board[boxRow * 3 + dr][boxCol * 3 + dc])
        Next
      Next
      If Not ValidGroup(box) Then
        Return False
      EndIf
    Next
  Next
  Return True
EndProcedure

Procedure Main()
  Let board As Array Of (Array Of Integer) = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ]
  If ValidBoard(board) Then
    PrintLn("legal so far")
  Else
    PrintLn("invalid board")
  EndIf
EndProcedure
```

## これから検証する受け入れ例

- **前提** 例の盤面に0がある。**操作** 検査する。**結果** `True`は矛盾がまだ見つかっていないことだけを意味します。
- **前提** マス`(0,2)`を5に変える。**操作** 検査する。**結果** 最初の行に5が2つあるため`False`です。
- **前提** 列または箱に重複する数字がある。**操作** 検査する。**結果** `False`です。
- **前提** 行が9マスより短い、または値が−1か10である。**操作** 検査する。**結果** 範囲外を読むことなく`False`です。
- **前提** 合法だが未完成の盤面がある。**操作** 検査する。**結果** 完成または一意な解があるとは報告しません。

## 検査器から解法へ

バックトラックによる解法は**後の段階**です。0のマスを1つ選び、1から9までを候補として試し、置く前に行・列・箱を調べ、次の空きマスを再帰的に処理します。その道が行き詰まれば0へ戻して次の候補を試します。空きマスがなくなれば解を1つ見つけたことになります。最初の解で止めるか、さらに数えるかを決めてください。一意性を確かめるなら、2つ目の解を見つけた時点で数えるのを止めます。バックトラックで入力を壊さないよう、元の問題は作業用の盤面と分けます。

問題生成はさらに別の段階です。完成した盤面から数字を1つ消し、そのたびに解の個数を数えます。解がちょうど1つ残る場合にだけ、その削除を採用します。順序を乱数化するには、シードを定義し、疑似乱数生成器の範囲を検証する必要があります。**SWP-FR-01**は乱数に関するライブラリ要求であり、この下書きが使うAPIではありません。

練習：`IsComplete`を追加して、満杯の盤面と、合法だが一部が空の盤面を区別します。行・列・箱の重複も別々に試してください。残る作業は、検査器のネイティブ実行、解なし・複数解を含む解法の検証、一意性を証明する問題生成、入力処理です。

この着想は[Al Sweigartによる原著の章](https://inventwithpython.com/bigbookpython/project73.html)から得ました。WBasic向けの説明と下書きは新たに書きました。
