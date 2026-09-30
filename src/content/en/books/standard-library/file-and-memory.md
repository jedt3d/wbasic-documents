---
title: "File and Memory"
weight: 40
---

Status: **Passed R5; `File.Move` added and passed in the R7 showcase**

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

`File.ReadText`, `WriteText`, and `OpenText` use UTF-8 under the R5 contract. Filesystem failures report typed `Error` values rather than misleading results such as an empty string.

R7 export uses `File.Move` to rename a temporary file to its final name within the same directory after closing its writer. Atomic name replacement was tested within that scope. This **does not** promise durability through power loss or moves across directories.

```basic
Memory.Create() As Stream
Memory.FromBytes(data As Array Of Byte) As Stream
Memory.ToBytes(stream As Stream) As Array Of Byte
```

`FromBytes` and `ToBytes` provide value snapshots, with no mutable alias to the caller's array. Memory streams can read, write, and seek; writing past EOF fills the gap with zeros.

```basic
Using stream As Stream = Memory.FromBytes([1, 2, 3])
  stream.Seek(0)
  PrintLn(stream.Read(2).Length.ToString())
EndUsing
```

Always use `Using` for owned resources. Standard handles are process-owned as described on the preceding page.
