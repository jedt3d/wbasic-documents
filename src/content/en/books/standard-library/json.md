---
title: "Json.Value and Codecs"
weight: 30
---

Status: **Passed R5** for dynamic values, generated codecs, and reader/writer APIs.

## Dynamic JSON

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

Use `value["key"]` for an object and `value[index]` for an array; compare `Kind` with values such as `Json.Kind.Null`. `Get` returns `Null` for a missing key. JSON `null` remains a `Json.Value`, which is a different case.

```basic
Import Json

Procedure Main()
  Let value As Json.Value = Json.Parse("{\"name\":\"ไทย🙂\",\"count\":7}")
  PrintLn(value["name"].AsString())
  PrintLn((value.Get("missing") ?? Json.Parse("\"fallback\"")).AsString())
EndProcedure
```

Integers retain exact 64-bit values. Overflow or an invalid type conversion reports `Conversion`. Duplicate object keys after escape decoding report `Parse`; a depth limit also applies.

## Concrete codecs

```basic
Json.Decode(Of T)(text, strictFields := False) As T
Json.Encode(Of T)(value As T) As String
Json.FromValue(Of T)(value As Json.Value, strictFields := False) As T
Json.ToValue(Of T)(value As T) As Json.Value
Json.Read(Of T)(reader As TextReader, strictFields := False) As T
Json.Write(Of T)(writer As TextWriter, value As T)
```

`T` must be a concrete supported type; this does not enable user-defined generic codecs. Nested `Structure`, `Array`, `Map`, nullable values, and field defaults are supported, along with compiler-checked `SerializedName`/`SerializeIgnore` metadata. `strictFields := True` rejects unknown fields with a path.

`Read` does not close the reader and rejects trailing data. `Write` neither flushes nor closes the writer; the resource owner must do that. The rule may seem fussy, but it lets pipelines compose without a library unexpectedly closing the tap.
