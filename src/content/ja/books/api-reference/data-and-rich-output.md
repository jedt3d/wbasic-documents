---
title: "データコントロールと豊かな表示"
weight: 30
---

状態: **R7 の第4～6群はネイティブ検証とソース検証に合格。実例は第7～8群で合格**

これらの結果は指定された API と処理量を裏付けます。T13–T17、T21–T22 の複合条件すべてや、文字表示とフォントの全組み合わせを 合格 にするものではありません。

## List、Table、Tree：データの表示

データコントロールは、不変で大きさに上限のあるページと、アプリが管理する状態を受け取ります。次は実際に使う Table の例です。

```basic
Import Tui

Procedure PeopleTable() As Tui.Node
  Let columns As Array Of Tui.TableColumn = [
    Tui.TableColumn.Create("id", "ID", Tui.Size.Cells(5)),
    Tui.TableColumn.Create("name", "ชื่อ", Tui.Size.Cells(18))
  ]
  Let rows As Array Of Tui.TableRow = [
    Tui.TableRow.Create("person-1", ["1", "สมชาย"])
  ]
  Let page As Tui.TablePage = Tui.TablePage.Create(0, 1, rows)
  Let state As Tui.TableState = Tui.TableState.Create(0, Null, 1)
  Return Tui.Table.View("people", columns, page, state)
EndProcedure
```

`TableRow.Create(id, cells)` は安定した行 ID を使います。並べ替え、絞り込み、ページの読み込みは、アプリが実行する操作としてイベントに提案されます。重い処理は Jobs に任せます。描画は表示中の行と少し余分に準備する行だけを走査します。記録された 100,000 行の処理例では、ページが保持したのは最大40行、実際に描画した本文行は最大24行でした。

Tree は構築時に `TreeIndex` で重複 ID、存在しない親、循環を検出します。展開時は `View` の外で表示する ID を計算します。スナップショットは索引全体を直列化せず、件数を報告します。

## 豊かな表示

現在の実装には、構造化されたハイパーリンク、件数に上限のあるログ、グラフ、通知、進捗表示、スピナー、Markdown の一部、Canvas があります。

- ハイパーリンクは描画前に URL と制御シーケンスを検証します。
- Markdown は見出し、順序なし箇条書き、コードブロックに対応します。行内の強調とリンクは文字列のまま表示します。
- 動く内容がある間だけアニメーションを進め、ReducedMotion では停止します。
- Canvas はローカルで変更可能なリソースです。上限付きの書き込みは一括処理され、不変のスナップショットは終了後も残ります。Canvas や Node を Jobs のデータとして渡すことはできません。
- キャンセル操作には、`Context.CancelJob` を呼ぶ Button を組み合わせます。

```basic
Tui.Progress("export", completed, total)
Tui.StatusBar(["กำลังส่งออก"])
```

## TextMetrics：文字幅の計測

```basic
Tui.TextMetrics.GraphemeCount(text)
Tui.TextMetrics.CellWidth(text, profile)
Tui.TextMetrics.Measure(text, width, profile)
Tui.TextMetrics.Truncate(text, cells, profile)
Tui.TextMetrics.ScalarOffset(text, graphemeIndex)
```

表示幅のプロファイルは Unicode17Narrow/Wide です。入力は 1 MiB まで、Measure の結果は 16,384 行または 4 MiB までです。この API に適さない制御文字や複数行の入力は、1セル分として扱うふりをせずエラーを報告します。この版にはタイ語辞書による改行処理はありません。孤立した結合記号は、元のソースやモデルの文字列を変えず、点線付きの円とともに表示します。
