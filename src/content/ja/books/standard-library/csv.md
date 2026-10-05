---
title: "CSV：表形式データの出力"
weight: 70
---

状態: **書き手は R5 で検証済み。排他的な作成は WORM M5 のネイティブ検証に合格**

```basic
Import Csv

Csv.Create(path As String, delimiter As String = ",",
           newline As String = "\r\n", overwrite As Boolean = True) As Csv.Writer
writer.WriteRow(values As Array Of String)
writer.Close()
```

書き手は UTF-8 を使います。値に区切り文字、引用符、改行が含まれる場合は、正しく引用符で囲みます。

```basic
Using output As Csv.Writer = Csv.Create("people.csv")
  output.WriteRow(["id", "name", "note"])
  output.WriteRow(["1", "ไทย, \"Alice\"", "บรรทัดหนึ่ง\nบรรทัดสอง"])
EndUsing
```

`overwrite := False` は既存のパスを原子的に拒否し、そのファイルの内容を切り詰めません。隣接する `.partial` ファイルを作る場合に便利です。ただし最終的な保存先をロックするわけではありません。キャンセル時に一部のバイトが残ることがあり、その後の `File.Move` だけで冪等性や停電を越える永続性は得られません。

クローズやフラッシュのエラーは、テキストストリームと同じく、主たるエラーと後続のエラーの順序を保ちます。R7 の実例では大きな出力とキャンセルを検査し、M5 では二つのプロセスによる排他的な部分ファイルの作成も検査しました。

現在の公開 API は **書き手** だけです。ソースに公開 `Csv.Reader` は存在しません。テスト用の仕組みが結果を読み取り、往復変換を確認しても、その仕組みが言語 API になるわけではありません。
