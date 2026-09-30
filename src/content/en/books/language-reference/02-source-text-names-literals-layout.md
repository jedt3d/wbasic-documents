---
title: "Source Text, Names, Literals, and Line Layout"
description: "How WBasic reads UTF-8, identifiers, comments, numbers, strings, and logical lines"
weight: 2
---

## Encoding and case

WBasic files use UTF-8, with or without a byte-order mark. LF and CRLF have the same meaning. Diagnostics retain the original file, line, column, and source span.

Keywords and identifiers are case-sensitive. Write keywords in their specified form, such as `Procedure`, `Let`, and `EndProcedure`. `total`, `Total`, and `TOTAL` are three different names.

## Unicode identifiers

Names can use Thai letters and other scripts:

```basic
Procedure ทักทาย(ชื่อ As String) As String
  Return $"สวัสดี {ชื่อ}"
EndProcedure
```

The first character must be `_` or a Unicode `XID_Start` character. Later characters must be `_` or Unicode `XID_Continue` characters.

WBasic normalizes names to NFC before comparison and rejects control characters, bidirectional controls, and default-ignorable characters. Keywords remain English. A name mixing unrelated scripts may produce a warning to help spot visually similar names.

## Logical lines and blocks

One logical line contains one statement. WBasic has no semicolon or colon statement separator. A statement can continue onto another line only while inside `()`, `[]`, or `{}`:

```basic
Let message As String = BuildMessage(
  "WBasic",
  "ภาษาไทย"
)
```

Procedure calls always need parentheses. Indentation helps readers but does not create blocks; the compiler relies on matching `EndProcedure`, `EndIf`, and other closing keywords. The formatter uses two spaces per level.

## Comments and documentation

Outside a string, `'` starts an ordinary comment that runs to the end of the line. `///` is a documentation comment for the next declaration only when it appears at the start of a logical line after whitespace:

```basic
/// คืนคำทักทายสำหรับชื่อที่รับมา
Procedure Greeting(name As String) As String
  Return $"Hello, {name}"
EndProcedure
```

## Decimal and other numerals

Each file chooses one set of Unicode decimal digits. ASCII and Thai digits are both supported, but they cannot be mixed in one file, even in inactive conditional source or an expression inside string interpolation.

```basic
' ไฟล์ที่ใช้เลข ASCII
Let total As Integer = 10 + 25
```

```basic
' ไฟล์ที่ใช้เลขไทย
Let ผลรวม As Integer = ๑๐ + ๒๕
```

`Let total As Integer = ๑๐ + 25` is rejected. Hexadecimal and binary literals are exceptions: their prefixes and digits are ASCII. Floats use ASCII `.` and `e` or `E`, but their decimal digits must still match the file's digit set. An underscore is permitted only between digits.

A decimal integer literal has type `Integer`; a literal with a decimal point or exponent has type `Float`. An integer literal may also take an expected type of `Byte` or `Float` when its value can be represented exactly.

## String forms

Ordinary strings recognize escapes such as `\n`, `\t`, `\"`, and `\\`. A raw string has the form `r"..."` and does not interpret backslashes; write `""` for one double quote inside it. An interpolated string starts with `$`; expressions go in braces, and doubled braces represent literal braces:

```basic
Let escaped As String = "C:\\work\\main.wbas"
Let raw As String = r"C:\work\main.wbas"
Let report As String = $"{name}: {score} points; {{verified}}"
```

These strings occupy one logical line. WBasic 0.3 does not have multiline strings.
