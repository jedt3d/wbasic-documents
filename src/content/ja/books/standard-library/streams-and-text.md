---
title: "ストリームとテキスト"
weight: 20
---

状態: **R5 の検証に合格**。短い読み取り、EOF、コピーオンライト、文字エンコーディング、終了時のエラーを含みます。

## Stream：バイトストリーム

```basic
stream.Read(maxBytes As Integer) As Array Of Byte
stream.ReadInto(ByRef buffer As Array Of Byte, offset As Integer, count As Integer) As Integer
stream.Write(data As Array Of Byte)
stream.Flush()
stream.CopyTo(destination As Stream, bufferSize As Integer = 65536) As Integer
stream.Seek(offset As Integer, origin As SeekOrigin = SeekOrigin.Begin) As Integer
stream.Close()
```

プロパティは `CanRead`、`CanWrite`、`CanSeek`、`IsClosed`、`IsTerminal`、`Position`、`Length` です。最後の二つには、開いていて位置を移動できるストリームが必要です。

- `Read` は要求したバイト数より少なく返すことがあります。空の配列だけが EOF を意味します。
- `Read(0)` と `ReadInto(..., count := 0)` は直ちに返ります。
- `ReadInto` は `ByRef` で渡したバッファだけを変更します。既存のスナップショットを持つ別名は変わりません。
- `CopyTo` は上限付きの再利用可能なバッファを使います。転送先のフラッシュやクローズは行わず、同じ基底ストリーム自身へのコピーを禁止します。
- `Flush` はバッファ内のバイトを次の層に渡しますが、停電を越える永続性は保証しません。

```basic
Using source As Stream = Memory.FromBytes([65, 66, 67])
  Using target As Stream = Memory.Create()
    Let copied As Integer = source.CopyTo(target)
    PrintLn(copied.ToString())
  EndUsing
EndUsing
```

## TextReader と TextWriter：テキストの読み書き

```basic
TextReader.Create(stream, encoding := TextEncoding.Utf8, leaveOpen := False) As TextReader
reader.Read(maxChars As Integer) As String
reader.ReadLine() As String?
reader.ReadToEnd() As String
reader.Close()

TextWriter.Create(stream, encoding := TextEncoding.Utf8, leaveOpen := False,
                  newline := "\n", emitBom := False) As TextWriter
writer.Write(text As String)
writer.WriteLine(text As String)
writer.Flush()
writer.Close()
```

`Utf8`、`Utf16LE`、`Utf16BE`、`Ascii` を厳密な検査付きでサポートします。不正な文字列や途中で終わるバイト列は `Conversion` を報告します。名前のとおり、ASCII ではタイ文字を書けません。

`leaveOpen := True` のアダプターは基底ストリームを閉じません。読み取りバッファに未読のバイトが残っているとき、リーダーを閉じる前に基底ストリームへ直接アクセスすると、データ損失を防ぐため `IO.StreamInUse` を報告します。複数の層でクローズやフラッシュが失敗しても主たるエラーを保持し、二次的なエラーは `Suppressed` に示します。
