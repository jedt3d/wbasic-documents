---
title: "構造体と値セマンティクス"
description: "名前付きレコード、既定値、付属手続き、隠れた別名を生まないコピー"
weight: 7
---

`Structure`は、顧客、設定、ジョブの結果のような、スキーマを持つデータの名前付きレコードです。クラスではなく、継承もなく、複雑なオブジェクト初期化の儀式も要りません。

## 値の宣言と構築

```basic
Structure ExportOptions
  Destination As String
  IncludeHeader As Boolean = True
EndStructure

Procedure Main()
  Let options As ExportOptions = ExportOptions(Destination := "out.csv")
  Let copy As ExportOptions = options
  copy.Destination = "backup.csv"
  PrintLn(options.Destination)
  PrintLn(copy.Destination)
EndProcedure
```

すべてのフィールドに型が必要です。既定値はコンパイル時定数でなければなりません。既定値のないフィールドは構築時に指定します。コンパイラが生成するコンストラクターは名前付きフィールドだけを受け入れます。位置指定による構築、独自コンストラクター、継承、プロパティのgetter/setterはありません。

変更可能な値のフィールドには直接代入できます。したがって例は`out.csv`、続いて`backup.csv`を印刷します。構造体は値セマンティクスなので、`copy`を変更しても`options`は変わりません。

## 付属手続き

```basic
Procedure ExportOptions.Describe() As String
  Return $"Export to {Self.Destination}"
EndProcedure
```

付属手続きはそのStructureのモジュール内で宣言し、静的に解決されます。`Self`は読みやすいレシーバーですが、直接変更できません。連鎖できる変換なら新しいStructureを返します。元の変数を変更するには、ByRefを使う独立した手続きを使います。

付属手続きの名前はフィールド名や組み込みの`Equals`と衝突できません。仮想ディスパッチ、デストラクター、利用者定義のライフサイクルフックはありません。

## 意味上のディープコピー

基本型、文字列、構造体、配列、マップはいずれも値セマンティクスを持ちます。

```basic
Let a As Array Of (Array Of Integer) = [[1, 2], [3]]
Let b As Array Of (Array Of Integer) = a
b[0][1] = 9
b[1].Append(4)
PrintLn(a[0][1].ToString())
PrintLn(a[1].Length.ToString())
```

入れ子のコレクションがあっても、結果は`2`と`1`です。実装は物理的なコピーを避けるためARCやコピーオンライトを使うことがありますが、その詳細によって利用者に見える別名が生じてはなりません。呼び出し側の値を変更する明示的な方法がByRefです。

StructureはほかのStructureやコレクションをフィールドに持てます。自己参照は直接埋め込まず、ArrayかMapを経由する必要があります。資源ハンドルのフィールドは例外です。Structureをコピーすると同じ資源へのハンドルがコピーされ、新しい資源が開かれるわけではありません。「エラーと資源の寿命」を参照してください。

## 構造体と外部データ

Structureは対応済みのJSONマッパーにおける主なモデルです。`SerializedName`と`SerializeIgnore`のメタデータでフィールド名を変更したり省略したりできます。これによってStructureがORMになるわけではなく、データベース、YAML、XMLのマッパーがあることも意味しません。
