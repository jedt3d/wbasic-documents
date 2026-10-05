---
title: "4 · 言語を理解する編集機能で書く"
description: "最初のタイ語プログラムで、補完、Hover、引数のヒント、Outline を練習する"
weight: 4
---

> **バージョンの範囲 — 非公開 v0.1.0 プレリリース。** この手順は、固定済みソース `3901cf17` の公開済み実験的コンパイラ／ランタイム `0.1.0`、同梱の拡張機能 `wbasic-dev.wbasic@0.2.1`、プロトコルパッケージ `0.0.2` を使います。[対応するパッケージのガイド]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) から始めてください。古い非公開コンパイラ `0.0.2` は拡張機能 `0.1.0` を同梱し、これらのプロジェクト編集機能を持ちません。

`src/Main.wbas` を開き、次の内容に置き換えます。

```basic
Module MyFirstWBasic

Procedure Greeting(name As String) As String
  Return "สวัสดี " + name + " จาก WBasic 🙂"
EndProcedure

Procedure Main()
  Let message As String = Greeting("นักพัฒนา")
  PrintLn(message)
EndProcedure
```

## 補完を練習する

`Pro` の後にカーソルを置いて補完を呼び出し、`Procedure` を選びます。次に、このファイルで宣言した手続きの名前を入力し始めてください。拡張機能の補完はコンパイラのシンボルレポートに基づくため、宣言と、コメントや文字列に現れるだけの単語を区別します。

`Greeting(` と入力すると、引数のヒントに `name As String` パラメーターと戻り値の型が表示されます。入れ子の呼び出しでは、コンパイラが呼び出しの文脈を選びます。拡張機能が正規表現で括弧を数えるわけではありません。

{{< guide-screenshot name="04-source-intelligence.png" alt="手続きの補完、Greeting の引数のヒント、Outline を表示した Main.wbas のエディター" caption="撮影する画面：同じソースでの Completion、Signature Help、Outline" >}}

## Hover と Outline を練習する

`Greeting` にマウスを置いてシグネチャと型を見てから、Outline を開きます。モジュールと二つの手続きが表示されるはずです。項目を選ぶと宣言へ直接移動できます。

タイ語や他の言語の識別子は、Unicode NFC のルールの下で使えます。

```basic
Procedure คำทักทาย(name As String) As String
  Return "ยินดีต้อนรับ " + name
EndProcedure
```

`๑๐ + 25` のように、一つの数値式でタイ数字と西洋の数字を混在させません。言語の規則どおり、式の中では一種類の数字表記を一貫して使います。

## 現在の補完の範囲

構造体やインポートした名目的な型を持つ単純な宣言済み変数では、名前の後にピリオドを入力すると、コンパイラが承認した公開可能なフィールドとメソッドが見えます。公開 API には対応するコンパイラの機能メタデータも必要です。private、別モジュールの internal、未インポートのメソッドは表示されません。任意の式の連鎖、インポート別名の完全な型対応、すべての組み込み String・Array メンバー、ローカル変数へのナビゲーションは保証していません。

文法は [WBasic のプログラム]({{< relref "/books/language-reference/01-a-wbasic-program.md" >}}) を参照してください。

## 練習

`Farewell(name As String) As String` を追加し、補完を使って `Main` から呼び出します。Hover にシグネチャが表示され、Check Project が通れば完了です。

次は [診断を読み、クイックフィックスを使う]({{< relref "/books/w-basic-extension/05-diagnostics-and-quick-fixes.md" >}}) へ進みます。
