---
title: "基本 I/O と標準ハンドル"
weight: 10
---

状態: **Windows 11 ARM64 と macOS ARM64 で R5 の検証に合格**

## 行の出力と入力

```basic
Print(text As String)
PrintLn(text As String)
ReadLine() As String?
Console.ErrorLn(text As String)
```

`Print` と `PrintLn` は `Console.Output` に書き込みます。`ReadLine` は `Console.Input` から読み、EOF で `Null` を返すため、入力の終わりと空行を区別できます。API 名は大文字と小文字を区別します。`println` は `PrintLn` ではありません。採点に赤ペンを使う教師のように、コンピューターは細部に厳格です。

```basic
Procedure Main()
  Print("ชื่อ: ")
  If Let name As String = ReadLine() Then
    PrintLn("สวัสดี " + name)
  Else
    Console.ErrorLn("ไม่มีข้อมูลเข้า")
  EndIf
EndProcedure
```

## テキストとバイトのハンドル

| メンバー | 型 | 所有者 |
|---|---|---|
| `Console.Input` | `TextReader` | プロセス所有、再利用可能 |
| `Console.Output` | `TextWriter` | プロセス所有、再利用可能 |
| `Console.Error` | `TextWriter` | プロセス所有、再利用可能 |
| `IO.Stdin` | `Stream` | プロセス所有 |
| `IO.Stdout` | `Stream` | プロセス所有 |
| `IO.Stderr` | `Stream` | プロセス所有 |

標準ハンドルの `Close()` はプログラム側の別名だけを解放し、プロセスが所有する OS ハンドルは閉じません。他の別名は使い続けられます。プログラム所有のファイルやメモリのストリームを閉じると、すべての別名で使用できなくなり、その後の操作は `ErrorKind.ResourceClosed` を報告します。

## エラーと制限

- リダイレクトされた標準入力・標準出力・標準エラー出力は、NUL を含むバイトデータでも動作します。
- パイプに対する `Seek` は `UnsupportedOperation` を報告します。
- TUI は別名をまたいで端末の所有権を確認するため、基本 I/O から画面を上書きできません。
- この I/O は同期式です。`Init`、`Update`、`View` では `Jobs` を使ってください。
