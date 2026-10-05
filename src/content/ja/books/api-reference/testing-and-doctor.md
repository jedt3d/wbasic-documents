---
title: "Tui.Test と診断ツール"
weight: 50
---

状態: **仮想セッションは R6/R7 で検証済み。診断ツールの通信経路と目視確認は、記録された範囲で合格**

振る舞いの一覧では T40 は 計画段階 のままです。二つの構成での項目別結果と目視確認は、あらゆる対話・非 TTY・SSH・端末・フォントの組み合わせの受け入れを意味しません。

## 仮想セッション

```basic
Tui.Test.Create(Of M)(initial, init, update, view, options)
  As Tui.TestSession Of M
```

主なメンバーは次のとおりです。

- `Send(event)`、`Step()`、`Advance(milliseconds)`、`Resize(width, height)`
- `Model()`、`SnapshotText()`、`SnapshotCells()`、`Metrics()`
- `PendingJobs()`、`PendingClipboard()`
- `FailJob(id, error)`、`ReportJob(id, progress)`
- `Tui.Test.Complete(Of M, O)(session, id, output)`

イベントを作る関数には `Key`、`Text`、`TextInput`、`Paste`、`Mouse` があります。決定的な時計と仮想端末を使えるので、`Sleep` して結果を運に任せる必要はありません。

```basic
Using session As Tui.TestSession Of Model =
    Tui.Test.Create(Of Model)(Model(), Init, Update, View,
                              Tui.Options().WithViewport(20, 4))
  session.Send(Tui.Test.Key("enter"))
  session.Step()
  PrintLn(session.SnapshotText())
EndUsing
```

スナップショットはセル、スタイル、フォーカス、ツリーの件数を調べ、パスワードを隠します。すべての意味を検査する 表明をスナップショットに置き換えないでください。画面が正しく見えても、ジョブが実際にキャンセルされた証明にはなりません。

## 診断ツール

```text
wb tui doctor --font <ชื่อฟอนต์> --format json --output <report.json>
```

診断ツールは機能、通信経路、画面サイズの変更、カーソル、選択範囲を調べ、Regular/Bold/Italic/BoldItalic の見本を表示します。報告書は自動検出、手動確認、目視結果を分けます。フォントの代替表示や遠隔端末の字形品質を推測せず、端末設定も変更しません。

R7 で受け入れた目視確認の構成は次のとおりです。

- Windows Terminal 1.24.11911.0 + Cascadia Mono 12px、拡大率 100%
- iTerm2 3.7.3 + JetBrainsMonoNL Nerd Font Mono 16px、拡大率 100%

どちらもユーザーの目視検査で外観、スタイル、カーソル、選択範囲、画面サイズの変更、代替表示に合格しました。TlwgMono は表が揃っていても、両プラットフォームでタイ語の母音と声調記号をずらして表示しました。Apple Terminal では文字幅と表の表示が不正でした。これらは既知の制限であり、合格ではありません。
