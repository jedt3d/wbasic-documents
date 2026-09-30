---
title: "Data Controls and Rich Output"
weight: 30
---

Status: **R7 groups 4–6 passed native/source gates; the showcase passed R7 groups 7–8**

These results support the specified APIs and workloads. They do not promote all composite clauses T13–T17 and T21–T22, or the full visual/font matrix, to Passed.

## List, Table, and Tree

Data controls receive immutable bounded pages and application-owned state. Here is a Table used in practice:

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

`TableRow.Create(id, cells)` uses a stable row ID. Sorting, filtering, and page loading are event proposals for the application to perform; heavy work belongs in Jobs. Frame painting traverses only visible rows plus overscan. In the recorded workload with 100,000 logical rows, the page held at most 40 rows and painted at most 24 body rows.

Tree uses `TreeIndex` to detect duplicate IDs, missing parents, and cycles during construction. Expansion computes visible IDs outside `View`; snapshots report counts rather than serializing the entire index.

## Rich output

The current implementation has structured hyperlinks, bounded logs, charts, notifications, progress, spinners, a Markdown subset, and Canvas.

- Hyperlinks validate URLs and control sequences before rendering.
- Markdown supports headings, unordered bullets, and fenced code; inline emphasis and links remain literal.
- Animation ticks only while animated content exists and stops under ReducedMotion.
- Canvas is a local mutable resource. Bounded writes are transactional, and immutable snapshots survive close; Canvas/Node cannot be Jobs payloads.
- Cancellation composition uses a Button calling `Context.CancelJob`.

```basic
Tui.Progress("export", completed, total)
Tui.StatusBar(["กำลังส่งออก"])
```

## TextMetrics

```basic
Tui.TextMetrics.GraphemeCount(text)
Tui.TextMetrics.CellWidth(text, profile)
Tui.TextMetrics.Measure(text, width, profile)
Tui.TextMetrics.Truncate(text, cells, profile)
Tui.TextMetrics.ScalarOffset(text, graphemeIndex)
```

Profiles are Unicode17Narrow/Wide. Input is limited to 1 MiB; Measure is limited to 16,384 lines or 4 MiB of output. Controls and multiline input unsuitable for an API report errors rather than pretending to occupy one cell. This version has no Thai dictionary line breaking. An orphan combining mark is displayed with a dotted circle without altering the source/model string.
