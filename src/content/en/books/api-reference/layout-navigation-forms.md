---
title: "Layout, Navigation, and Forms"
weight: 20
---

Status: **R7 groups 1–3 passed native examples on both ARM64 hosts**

This status certifies the APIs and examples in the group gates. It does not promote composite requirements such as T06 and T09–T13 from Planned to Passed.

## Layout, style, and theme

```basic
Tui.Layout.Create()
  .WithWidth(Tui.Size.Cells(20))
  .WithHeight(Tui.Size.Percent(50))

Tui.Style.Create().WithBold(True)
  .WithForeground(Tui.Color.Token(Tui.ColorToken.Accent))

Tui.Theme.Dark().WithToken(Tui.ColorToken.Accent,
                           Tui.Color.Rgb(10, 20, 30))
```

Nodes use `.WithLayout(layout)` and `.WithStyle(style)`, returning new values rather than modifying originals. Size and padding use terminal cells/rows. Auto, Cells, Percent, min/max, grow/shrink, gap, align, justify, wrap, and overflow are supported.

`Tui.Options()` configures viewport, theme, and mode, and `.WithMaxFps(1..120)`; the default fps is 60.

## Navigation

Constructors verified in group gates:

- `TabItem.Create`, `Tabs`
- `KeyBinding.Create`, `MenuItem.Create`, `Menu`, `Help`
- `CommandPaletteState.Create`, `CommandPalette.Update/View`
- `SplitPane`, `Scroll`, `Stack`
- `Modal`, `Dialog`

`KeyBinding.Matches(key)` supports primary and alternate bindings. Focus is runtime routing state; a modal confines focus to its scope, and removed nodes should not remain as stale targets.

## Form state

```basic
Tui.TextInput.Create(text)
Tui.TextInput.Update(state, event) As Tui.TextInputChange
Tui.TextInput.View(id, state) As Tui.Node
```

`PasswordInput` and `TextArea` follow the same pattern. State modifiers include `WithText`, `WithReadOnly`, `WithDisabled`, `WithValidation`, and `WithSelection`; TextArea adds `WithScroll`.

A change returns `State`, `Consumed`, `Changed`, `Submitted`, and `RequestedActions`. Store the new state in the model and call `context.Apply(actions)` for effects such as clipboard access.

The API also has `Label`, `Checkbox`, `Choice.Create`, `RadioGroup`, `Select`, `MultiSelect`, `ValidationIssue.Create`, and `ValidationSummary`. Selection uses stable IDs, not array positions.

The editor moves caret and selection by grapheme cluster, supports undo/redo and paste, and masks passwords in public snapshots. Original model text is not silently normalized.

> Evidence boundary: Widgets passed group-native gates and the showcase, but the behavior catalog still marks some composite acceptance requirements Planned. Do not conclude that every widget × terminal × input combination has passed.
