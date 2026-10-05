---
title: "WBasicプログラム"
description: "最小の完全なプログラム、エントリーポイントの形式、検査と実行のコマンド"
weight: 1
---

## 最小のプログラム

単独のWBasicソースファイルの拡張子は`.wbas`です。実行ファイルとしてビルドするプログラムには、`Main`という名前のエントリー手続きが1つあります。

```basic
Procedure Main()
  PrintLn("Hello, WBasic")
  PrintLn("สวัสดี 😀")
EndProcedure
```

このプログラムを`hello.wbas`として保存します。`Procedure`は手続きの宣言を開始し、`Main()`は引数の一覧を示し、`EndProcedure`は文を閉じます。2つの空白によるインデントは読みやすさのための慣習であり、ブロックを作るものではありません。

`PrintLn`はCoreに属するので、このプログラムに`Import`は不要です。引数のない呼び出しも含め、すべての呼び出しには括弧が必要です。括弧の中は空でも構いませんが、省略はできません。

## 実行前に検査する

`wb check`はプログラムを実行せずに構文解析と型検査を行います。

```console
wb check hello.wbas --json
```

ソースが拒否された場合、報告には安定した診断コード、段階、ファイル、行、列、ソース範囲が含まれます。ツールが報告する警告は、必ずしもプログラムを拒否しません。エディターなどのツールは別の構文解析器を実装せず、同じコンパイラの報告を使います。

開発用ランナーでプログラムを実行します。

```console
wb run hello.wbas
```

出力は次のとおりです。

```text
Hello, WBasic
สวัสดี 😀
```

`wb run`は、この版で検証済みの開発経路です。`wb build`は後の配布ラウンドで仕様化・検証するため、この章ではそのコマンドが使用可能だとは主張しません。

## エントリーポイントの形式

WBasicは`Main`の3つの形式を受け入れます。戻り値の型がない手続きは、正常終了すると終了ステータス0を返します。

```basic
Procedure Main()
  PrintLn("ready")
EndProcedure
```

`Integer`を返す`Main`は、その値をプロセスの終了ステータスに使います。

```basic
Procedure Main() As Integer
  Return 0
EndProcedure
```

コマンドライン引数には`Array Of String`を使います。実行ファイルの名前は含まず、Unicodeの引数を保ちます。

```basic
Procedure Main(args As Array Of String) As Integer
  PrintLn($"Received {args.Length} arguments")
  Return 0
EndProcedure
```

利用者が返す終了ステータスは、対応するOS間で一貫した動作にするため`0`～`255`でなければなりません。範囲外の値は実行時の検証エラーになります。

## ファイルと宣言

ソースファイルにはモジュールスコープの宣言を書きます。実行する文や可変のグローバル変数は置けません。次は無効です。

```basic
PrintLn("runs at module scope")  ' invalid
```

実行する文は手続き内に置きます。`Const`ではモジュールスコープの定数を宣言できます。すべてのファイルで本体を検査する前にモジュールレベルの手続き名を解決するため、後にある宣言の呼び出しや再帰ができます。

```basic
Const Greeting As String = "Hello"

Procedure Greet(name As String) As String
  Return $"{Greeting}, {name}"
EndProcedure

Procedure Main()
  PrintLn(Greet("Ada"))
EndProcedure
```

次の章では、ソーステキストの読み方と、宣言した値への型の指定方法を説明します。
