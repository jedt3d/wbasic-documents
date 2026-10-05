---
title: "File と Memory：ファイルとメモリ"
weight: 40
---

状態: **R5 の検証に合格。`File.Move` は R7 の実例で追加され、検証に合格**

```basic
File.OpenRead(path As String) As Stream
File.OpenWrite(path As String, overwrite As Boolean = True) As Stream
File.OpenAppend(path As String) As Stream
File.OpenReadWrite(path As String, create As Boolean = False) As Stream
File.ReadBytes(path As String) As Array Of Byte
File.WriteBytes(path As String, data As Array Of Byte)
File.ReadText(path As String) As String
File.WriteText(path As String, text As String)
File.OpenText(path As String) As TextReader
File.Exists(path As String) As Boolean
File.Move(source As String, destination As String)
```

`File.ReadText`、`WriteText`、`OpenText` は R5 の契約で UTF-8 を使います。ファイルシステムの失敗は、空文字列のような誤解を招く値ではなく、型付きの `Error` を報告します。

R7 の出力処理では、一時ファイルの書き手を閉じてから `File.Move` で同じディレクトリ内の最終名へ変更します。この範囲で名前の原子的な置換を検査しました。ただし、**停電を越える永続性や、ディレクトリをまたぐ移動は保証しません**。

```basic
Memory.Create() As Stream
Memory.FromBytes(data As Array Of Byte) As Stream
Memory.ToBytes(stream As Stream) As Array Of Byte
```

`FromBytes` と `ToBytes` は値のスナップショットを返します。呼び出し元の配列を変更できる別名は作りません。メモリストリームは読み取り、書き込み、位置移動が可能です。EOF より先に書くと、その間はゼロで埋まります。

```basic
Using stream As Stream = Memory.FromBytes([1, 2, 3])
  stream.Seek(0)
  PrintLn(stream.Read(2).Length.ToString())
EndUsing
```

所有するリソースには常に `Using` を使ってください。標準ハンドルは前ページで述べたとおりプロセス所有です。
