---
title: "13 · コンウェイのライフゲームを進める"
description: "次世代を作る前に、古い格子全体を読み取る"
weight: 13
---

{{< project-download "13-conway-s-game-of-life" "PLAN.md" >}}
{{< project-download "13-conway-s-game-of-life" "draft.wbas.txt" >}}

> **状態：章の草稿。ソース検査は合格。** `draft.wbas.txt`は固定されたコンパイラによる`wb check --json`で診断なしで合格しました。ネイティブ実行とプロジェクトの受け入れは検証待ちです。これは`main.wbas`ではありません。

## 目的とデータ

ライフゲームの規則は、お茶が冷める前に仕上げられそうなほど短いものです。落とし穴は「同時に」という言葉です。この章では5×5のBoolean格子から始め、第0世代を印刷し、第1世代を1回計算して印刷します。`False`は死、`True`は生を表します。端の外側のセルは死んでおり、格子は反対側につながりません。中央に生きたセル3つの横線を置いて始めます。動く表示、タイマー、キーボード入力はありません。

## 規則と手計算

対象セル自体を除く、周囲8か所を数えます。生きたセルは生きた隣接セルが2つか3つなら生き残り、死んだセルはちょうど3つなら誕生します。したがって次の状態は`neighbors = 3 Or (alive And neighbors = 2)`と書けます。

第0世代の生きたセルは`(2,1)`、`(2,2)`、`(2,3)`です。左右の端はそれぞれ隣接セルが1つなので死にます。中央は2つなので生き残ります。`(1,2)`と`(3,2)`はそれぞれ3つ見えるので生まれます。第1世代は縦線です。走査中に元の格子を書き換えると、後で調べるセルが先の変更を見てしまいます。そこで`NextGeneration`は古い`grid`だけを読み、別の`next`格子を行ごとに組み立てます。

`AliveAt`は隅も含め、添字を使う前に境界を調べます。草稿はすべての行が同じ長さだと仮定しています。不正な格子の検証は、外部入力を受け入れる前に残る作業です。

## 一緒に読む草稿プログラム

このコードブロックはダウンロードできる草稿とまったく同じ内容を表示します。ソース検査は合格していますが、計算結果はネイティブ実行での確認が必要です。

```basic
' Draft for discussion; not verified or accepted as a runnable example.
' A false border outside the array is permanently dead.
Procedure AliveAt(grid As Array Of (Array Of Boolean), row As Integer, col As Integer) As Integer
  If row < 0 Or row >= grid.Length Then
    Return 0
  EndIf
  If col < 0 Or col >= grid[row].Length Then
    Return 0
  EndIf
  If grid[row][col] Then
    Return 1
  EndIf
  Return 0
EndProcedure

Procedure NeighborCount(grid As Array Of (Array Of Boolean), row As Integer, col As Integer) As Integer
  Let count As Integer = 0
  For dr As Integer = -1 To 1
    For dc As Integer = -1 To 1
      If dr <> 0 Or dc <> 0 Then
        count += AliveAt(grid, row + dr, col + dc)
      EndIf
    Next
  Next
  Return count
EndProcedure

Procedure NextGeneration(grid As Array Of (Array Of Boolean)) As Array Of (Array Of Boolean)
  Let next As Array Of (Array Of Boolean) = []
  For row As Integer = 0 To grid.Length - 1
    Let nextRow As Array Of Boolean = []
    For col As Integer = 0 To grid[row].Length - 1
      Let neighbors As Integer = NeighborCount(grid, row, col)
      Let lives As Boolean = neighbors = 3 Or (grid[row][col] And neighbors = 2)
      nextRow.Append(lives)
    Next
    next.Append(nextRow)
  Next
  Return next
EndProcedure

Procedure PrintGrid(grid As Array Of (Array Of Boolean))
  For row As Integer = 0 To grid.Length - 1
    Let line As String = ""
    For col As Integer = 0 To grid[row].Length - 1
      If grid[row][col] Then
        line += "#"
      Else
        line += "."
      EndIf
    Next
    PrintLn(line)
  Next
EndProcedure

Procedure Main()
  Let current As Array Of (Array Of Boolean) = [
    [False, False, False, False, False],
    [False, False, False, False, False],
    [False, True, True, True, False],
    [False, False, False, False, False],
    [False, False, False, False, False]
  ]
  PrintLn("generation 0")
  PrintGrid(current)
  Let next As Array Of (Array Of Boolean) = NextGeneration(current)
  PrintLn("generation 1")
  PrintGrid(next)
EndProcedure
```

## これから検証する受け入れシナリオ

- **前提** 例の横線 **操作** 1世代計算する **結果** `(1,2)`、`(2,2)`、`(3,2)`だけが生きている。
- **前提** 全セルが死んだ格子 **操作** 1世代計算する **結果** すべて死んだままである。
- **前提** 中央の2×2の塊 **操作** 1世代計算する **結果** 塊は変わらない。
- **前提** 隅に生きたセルが1つ **操作** 1世代計算する **結果** そのセルは死に、新しいセルは生まれない。

## 試して残る作業を見つける

まず第2世代を手で計算しましょう。縦線はまた横線に戻るはずです。各行の長さを確認する手続きを追加し、格子そのものを試せるように印刷と計算を分けます。動作を続けるモードには、停止規則、速度、TUI/Jobsの検証済みの境界を使うイベントループの定義が必要です。この草稿では、その統合を試していません。状態を昇格させる前には、1世代と複数世代のネイティブ実行、境界、不正な格子の確認が残ります。

着想は[Al Sweigartの原著の章](https://inventwithpython.com/bigbookpython/project13.html)から得ました。WBasic向けの説明と草稿は新たに執筆しました。
