---
title: "レイアウト、画面遷移、フォーム"
weight: 20
---

状態: **R7 の第1～3群に属するネイティブ実例は、両 ARM64 ホストで合格**

この結果が保証するのは、各群の検証条件に含まれる API と実例です。T06 や T09–T13 のような複合条件を 計画段階 から 合格 に変更するものではありません。

## レイアウト、スタイル、テーマ

```basic
Tui.Layout.Create()
  .WithWidth(Tui.Size.Cells(20))
  .WithHeight(Tui.Size.Percent(50))

Tui.Style.Create().WithBold(True)
  .WithForeground(Tui.Color.Token(Tui.ColorToken.Accent))

Tui.Theme.Dark().WithToken(Tui.ColorToken.Accent,
                           Tui.Color.Rgb(10, 20, 30))
```

ノードの `.WithLayout(layout)` と `.WithStyle(style)` は元の値を変更せず、新しい値を返します。サイズと余白は端末のセル・行単位です。Auto、Cells、Percent、最小・最大値、伸長・縮小、間隔、整列、配置、折り返し、はみ出しに対応します。

`Tui.Options()` では表示領域、テーマ、モードを設定し、`.WithMaxFps(1..120)` で描画速度の上限を指定できます。既定値は 60 fps です。

## 画面遷移

各群の検証で確認したコンストラクターは次のとおりです。

- `TabItem.Create`、`Tabs`
- `KeyBinding.Create`、`MenuItem.Create`、`Menu`、`Help`
- `CommandPaletteState.Create`、`CommandPalette.Update/View`
- `SplitPane`、`Scroll`、`Stack`
- `Modal`、`Dialog`

`KeyBinding.Matches(key)` は主キーと代替キーの両方に対応します。フォーカスはランタイムが管理する入力先です。モーダル画面ではフォーカスがその範囲に限られ、削除されたノードが古い入力先として残らないようにします。

## フォームの状態

```basic
Tui.TextInput.Create(text)
Tui.TextInput.Update(state, event) As Tui.TextInputChange
Tui.TextInput.View(id, state) As Tui.Node
```

`PasswordInput` と `TextArea` も同じ形式を使います。状態の変更には `WithText`、`WithReadOnly`、`WithDisabled`、`WithValidation`、`WithSelection` があり、TextArea には `WithScroll` もあります。

変更結果には `State`、`Consumed`、`Changed`、`Submitted`、`RequestedActions` が含まれます。新しい状態をモデルに保存し、クリップボードへのアクセスなどの効果には `context.Apply(actions)` を呼びます。

ほかに `Label`、`Checkbox`、`Choice.Create`、`RadioGroup`、`Select`、`MultiSelect`、`ValidationIssue.Create`、`ValidationSummary` があります。選択には配列内の位置ではなく、安定した ID を使います。

エディターは書記素クラスタ単位でカーソルと選択範囲を動かし、元に戻す・やり直す操作と貼り付けに対応します。公開スナップショットではパスワードを隠します。元のモデルの文字列を暗黙に正規化しません。

> 証拠の境界: ウィジェットは各群のネイティブ検証と実例に合格しましたが、振る舞いの一覧には 計画段階 の複合条件が残ります。すべてのウィジェット、端末、入力の組み合わせに合格したとは結論できません。
