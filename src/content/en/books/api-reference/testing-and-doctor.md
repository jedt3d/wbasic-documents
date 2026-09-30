---
title: "Tui.Test and Doctor"
weight: 50
---

Status: **Virtual sessions passed R6/R7; doctor transport and visual checkpoints passed within the recorded scope**

T40 remains Planned in the behavior catalog. Group results and visual checkpoints for two configurations do not constitute acceptance for every interactive, non-TTY, SSH, terminal, and font combination.

## Virtual sessions

```basic
Tui.Test.Create(Of M)(initial, init, update, view, options)
  As Tui.TestSession Of M
```

Key members:

- `Send(event)`, `Step()`, `Advance(milliseconds)`, `Resize(width, height)`
- `Model()`, `SnapshotText()`, `SnapshotCells()`, `Metrics()`
- `PendingJobs()`, `PendingClipboard()`
- `FailJob(id, error)`, `ReportJob(id, progress)`
- `Tui.Test.Complete(Of M, O)(session, id, output)`

Event factories include `Key`, `Text`, `TextInput`, `Paste`, and `Mouse`. A deterministic clock and virtual terminal remove the need to `Sleep` and hope.

```basic
Using session As Tui.TestSession Of Model =
    Tui.Test.Create(Of Model)(Model(), Init, Update, View,
                              Tui.Options().WithViewport(20, 4))
  session.Send(Tui.Test.Key("enter"))
  session.Step()
  PrintLn(session.SnapshotText())
EndUsing
```

Snapshots inspect cells, styles, focus, and tree counts, and mask passwords. Do not replace every semantic assertion with a snapshot: attractive text does not prove a job was actually cancelled.

## Doctor

```text
wb tui doctor --font <ชื่อฟอนต์> --format json --output <report.json>
```

Doctor checks capabilities, transport, resize, cursor, and selection, and displays Regular/Bold/Italic/BoldItalic samples. Its report separates detected, manual, and visual findings. It does not guess font fallback or remote glyph quality, and it does not change terminal settings.

Visual checkpoints accepted in R7:

- Windows Terminal 1.24.11911.0 + Cascadia Mono 12px, scale 100%
- iTerm2 3.7.3 + JetBrainsMonoNL Nerd Font Mono 16px, scale 100%

Both passed appearance, styles, cursor, selection, resize, and fallback in user inspection. TlwgMono misplaced Thai vowels/tone marks on both platforms despite aligned tables; Apple Terminal showed incorrect width/tables. These are known limitations, not passes.
