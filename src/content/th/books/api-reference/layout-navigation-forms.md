---
title: "Layout, navigation และ forms"
weight: 20
---

สถานะ: **R7 groups 1–3 ผ่าน native examples ทั้งสอง ARM64 hosts**

สถานะนี้รับรอง API และตัวอย่างใน gate รายกลุ่ม ไม่ได้เลื่อนข้อกำหนด composite เช่น
T06 และ T09–T13 จาก Planned เป็น Passed

## Layout, style และ theme

```basic
Tui.Layout.Create()
  .WithWidth(Tui.Size.Cells(20))
  .WithHeight(Tui.Size.Percent(50))

Tui.Style.Create().WithBold(True)
  .WithForeground(Tui.Color.Token(Tui.ColorToken.Accent))

Tui.Theme.Dark().WithToken(Tui.ColorToken.Accent,
                           Tui.Color.Rgb(10, 20, 30))
```

node ใช้ `.WithLayout(layout)` และ `.WithStyle(style)` โดยคืนค่าใหม่ ไม่แก้
ต้นฉบับ ขนาดและ padding วัดเป็น terminal cells/rows รองรับ Auto, Cells,
Percent, min/max, grow/shrink, gap, align, justify, wrap และ overflow

`Tui.Options()` ปรับ viewport/theme/mode และ `.WithMaxFps(1..120)`; ค่า fps
เริ่มต้น 60

## Navigation

constructors ที่ผ่านการตรวจรายกลุ่ม:

- `TabItem.Create`, `Tabs`
- `KeyBinding.Create`, `MenuItem.Create`, `Menu`, `Help`
- `CommandPaletteState.Create`, `CommandPalette.Update/View`
- `SplitPane`, `Scroll`, `Stack`
- `Modal`, `Dialog`

`KeyBinding.Matches(key)` รองรับ primary/alternate binding การ focus เป็น runtime
routing state; modal กัก focus ภายใน scope และ removed nodes ไม่ควรถูกเก็บเป็น
เป้าหมายค้าง

## Form state

```basic
Tui.TextInput.Create(text)
Tui.TextInput.Update(state, event) As Tui.TextInputChange
Tui.TextInput.View(id, state) As Tui.Node
```

รูปแบบเดียวกันมี `PasswordInput` และ `TextArea` state modifiers ได้แก่
`WithText`, `WithReadOnly`, `WithDisabled`, `WithValidation`, `WithSelection`;
TextArea เพิ่ม `WithScroll`

change คืน `State`, `Consumed`, `Changed`, `Submitted` และ
`RequestedActions` ผู้ใช้ต้องเก็บ state ใหม่ลง model และเรียก
`context.Apply(actions)` เมื่อต้องการใช้ effects เช่น clipboard

มี `Label`, `Checkbox`, `Choice.Create`, `RadioGroup`, `Select`, `MultiSelect`,
`ValidationIssue.Create` และ `ValidationSummary` selection ใช้ stable IDs
ไม่ใช่ตำแหน่ง array

editor เดิน caret/selection ตาม grapheme cluster รองรับ undo/redo, paste และ
mask password ใน public snapshots ข้อความ model เดิมไม่ถูก normalize เงียบ ๆ

> ขอบเขตหลักฐาน: widgets ผ่าน group-native gates และ showcase แล้ว แต่ behavior
> catalog ยังแยก composite acceptance บางข้อเป็น Planned จึงไม่ควรสรุปว่า
> ทุก widget × ทุก terminal × ทุก input combination ผ่านครบ
