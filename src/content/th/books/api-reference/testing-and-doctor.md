---
title: "Tui.Test และ doctor"
weight: 50
---

สถานะ: **virtual session ผ่าน R6/R7; doctor transport และ visual checkpoint ผ่านในขอบเขตที่บันทึก**

T40 ยังเป็น Planned ใน behavior catalog เพราะผลรายกลุ่มและ visual checkpoint สอง
configuration ไม่ใช่ acceptance ของ interactive/non-TTY/SSH และ terminal/font matrix
ทุกแบบ

## Virtual session

```basic
Tui.Test.Create(Of M)(initial, init, update, view, options)
  As Tui.TestSession Of M
```

สมาชิกหลัก:

- `Send(event)`, `Step()`, `Advance(milliseconds)`, `Resize(width, height)`
- `Model()`, `SnapshotText()`, `SnapshotCells()`, `Metrics()`
- `PendingJobs()`, `PendingClipboard()`
- `FailJob(id, error)`, `ReportJob(id, progress)`
- `Tui.Test.Complete(Of M, O)(session, id, output)`

event factories มี `Key`, `Text`, `TextInput`, `Paste`, `Mouse` ใช้ clock และ
terminal เสมือนที่ deterministic จึงไม่ต้อง `Sleep` แล้วภาวนา

```basic
Using session As Tui.TestSession Of Model =
    Tui.Test.Create(Of Model)(Model(), Init, Update, View,
                              Tui.Options().WithViewport(20, 4))
  session.Send(Tui.Test.Key("enter"))
  session.Step()
  PrintLn(session.SnapshotText())
EndUsing
```

Snapshots ตรวจ cells/styles/focus/tree counts และ mask password อย่าใช้ snapshot
แทน semantic assertion ทุกเรื่อง—ข้อความสวยไม่ได้พิสูจน์ว่า job ถูก cancel จริง

## Doctor

```text
wb tui doctor --font <ชื่อฟอนต์> --format json --output <report.json>
```

doctor ตรวจ capability/transport/resize/cursor/selection และแสดงตัวอย่าง
Regular/Bold/Italic/BoldItalic รายงานแยก detected, manual และ visual ไม่เดา
font fallback หรือ remote glyph quality และไม่เปลี่ยน terminal settings

visual checkpoint ที่ยอมรับใน R7:

- Windows Terminal 1.24.11911.0 + Cascadia Mono 12px, scale 100%
- iTerm2 3.7.3 + JetBrainsMonoNL Nerd Font Mono 16px, scale 100%

ทั้งคู่ผ่าน appearance, styles, cursor, selection, resize และ fallback ตามการ
ตรวจของผู้ใช้ TlwgMono วางสระ/วรรณยุกต์ไทยผิดบนทั้งสอง platform แม้ตารางตรง;
Apple Terminal แสดงความกว้าง/ตารางผิด ทั้งสองรายการเป็น known limitations
ไม่ถูกเขียนใหม่ให้กลายเป็น pass
