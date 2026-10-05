---
title: "Json.Value とコーデック"
weight: 30
---

状態: 動的な値、生成されたコーデック、読み書きの API は **R5 の検証に合格**。

## 動的 JSON

```basic
Json.Parse(text As String) As Json.Value
Json.Stringify(value As Json.Value) As String
value.Get(key As String) As Json.Value?
value.AsString() As String
value.AsInteger() As Integer
value.AsFloat() As Float
value.AsBoolean() As Boolean
value.AsStringOrNull() As String?
```

オブジェクトには `value["key"]`、配列には `value[index]` を使います。`Kind` は `Json.Kind.Null` などと比較します。`Get` はキーがなければ `Null` を返します。一方、JSON の `null` は `Json.Value` のままで、別の場合です。

```basic
Import Json

Procedure Main()
  Let value As Json.Value = Json.Parse("{\"name\":\"ไทย🙂\",\"count\":7}")
  PrintLn(value["name"].AsString())
  PrintLn((value.Get("missing") ?? Json.Parse("\"fallback\"")).AsString())
EndProcedure
```

整数は正確な 64 ビット値を保ちます。オーバーフローや無効な型変換は `Conversion` を報告します。エスケープを解釈した後にオブジェクトのキーが重複すると `Parse` を報告します。深さにも上限があります。

## 具体型のコーデック

```basic
Json.Decode(Of T)(text, strictFields := False) As T
Json.Encode(Of T)(value As T) As String
Json.FromValue(Of T)(value As Json.Value, strictFields := False) As T
Json.ToValue(Of T)(value As T) As Json.Value
Json.Read(Of T)(reader As TextReader, strictFields := False) As T
Json.Write(Of T)(writer As TextWriter, value As T)
```

`T` はサポートされる具体的な型でなければなりません。ユーザー定義の汎用コーデックを使えるようにするものではありません。入れ子の `Structure`、`Array`、`Map`、Null 許容値、フィールドの既定値に加え、コンパイラが検査する `SerializedName` と `SerializeIgnore` のメタデータをサポートします。`strictFields := True` は未知のフィールドをパスとともに拒否します。

`Read` は読み手を閉じず、後続の余分なデータを拒否します。`Write` は書き手を フラッシュもクローズもしません。リソースの所有者が行ってください。これにより処理をつないでも、ライブラリが予期せず流れを止めません。
