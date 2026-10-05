---
title: "EnumとFlags"
description: "名前付きの値型、ビットフラグ、変換の制限"
weight: 11
---

値が名前付きの選択肢のいずれかに限られるなら`Enum`を使います。選択肢を組み合わせられるなら`Flags`を使います。どちらも、名前札なしで机に届く謎の数値より多くを語ります。

## Enum型

```basic
Enum ExportMode
  Csv
  Text
EndEnum

Procedure Main()
  Let mode As ExportMode = ExportMode.Csv
  Select mode
  Case ExportMode.Csv
    PrintLn("CSV")
  Case ExportMode.Text
    PrintLn("Text")
  EndSelect
EndProcedure
```

メンバーはEnumの型名で修飾します。異なるEnum型は交換できず、暗黙にIntegerへ変換されません。各メンバーには宣言順に0から始まる内部の序数があります。その序数は永続的な通信形式やファイル形式ではありません。バージョンをまたいで残すデータには、名前か明示的に定義した対応をシリアライズします。

## Flags型

```basic
Flags FileOptions
  Read
  Write
  Create
EndFlags

Procedure Main()
  Let options As FileOptions = FileOptions.Read | FileOptions.Write
  PrintLn(options.Has(FileOptions.Read).ToString())
EndProcedure
```

Flagsのメンバーには順番に2の累乗の値が自動的に割り当てられ、最大64メンバーまでです。`None`は0として予約されています。`|`、`&`、`^`は同じ型のFlags同士で使えます。`.Has(flag)`は指定したビットがすべてあるかを調べ、`.Has(Type.None)`はTrueを返します。

ビットが同じに見えても、Flagsと単なるIntegerを混ぜてはいけません。数値の偶然の一致は型の契約ではありません。`&`、`^`、`|`は2つのIntegerにも通常どおり使えます。

EnumとFlagsは`=`と`.Equals()`による値の等価性を持ちますが、自動JSONコーデックはまだ直接対応していません。シリアライズ前に独自の明示的な方針で名前か値に変換します。
