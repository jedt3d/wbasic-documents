---
title: "Streams and Text"
weight: 20
---

Status: **Passed R5**, including short reads, EOF, COW, encoding, and cleanup errors.

## Stream

```basic
stream.Read(maxBytes As Integer) As Array Of Byte
stream.ReadInto(ByRef buffer As Array Of Byte, offset As Integer, count As Integer) As Integer
stream.Write(data As Array Of Byte)
stream.Flush()
stream.CopyTo(destination As Stream, bufferSize As Integer = 65536) As Integer
stream.Seek(offset As Integer, origin As SeekOrigin = SeekOrigin.Begin) As Integer
stream.Close()
```

Properties: `CanRead`, `CanWrite`, `CanSeek`, `IsClosed`, `IsTerminal`, `Position`, and `Length`. The last two require an open, seekable stream.

- `Read` may return fewer bytes than requested; only an empty array means EOF.
- `Read(0)` and `ReadInto(..., count := 0)` return immediately.
- `ReadInto` modifies only the buffer passed `ByRef`; existing snapshot aliases do not change.
- `CopyTo` uses a bounded reusable buffer, does not flush or close the destination, and forbids copying a stream onto its own underlying stream.
- `Flush` passes buffered bytes to the next layer, but does not guarantee durability through power loss.

```basic
Using source As Stream = Memory.FromBytes([65, 66, 67])
  Using target As Stream = Memory.Create()
    Let copied As Integer = source.CopyTo(target)
    PrintLn(copied.ToString())
  EndUsing
EndUsing
```

## TextReader and TextWriter

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

`Utf8`, `Utf16LE`, `Utf16BE`, and `Ascii` are supported with strict checking. Malformed or incomplete sequences report `Conversion`; as its name implies, ASCII cannot write Thai letters. No magic hides behind the curtain.

With `leaveOpen := True`, an adapter does not close the underlying stream. If a buffered reader still holds unread bytes, accessing the raw stream before closing the reader reports `IO.StreamInUse` to prevent silent data loss. If close/flush fails in multiple layers, the primary error remains and secondary errors appear in `Suppressed`.
