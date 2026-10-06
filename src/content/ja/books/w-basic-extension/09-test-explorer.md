---
title: "9 · Test Explorer でテストする"
description: "コンパイラの識別情報を保ち、ネイティブ WBasic テストを検出、実行、選択、中止する"
weight: 9
---

> **バージョンの範囲 — ローカル検証済み拡張機能 0.2.3。** 0.2.3 VSIX は、対応する開発用コンパイラ／ランタイムと組み合わせてローカルで検証しました。公開済みの実験的な非公開コンパイラ／ランタイムは `0.1.0`、プロトコルパッケージは `0.0.2` です。公開済み ARM64 ZIP に同梱された拡張機能 `0.2.1` は変更されておらず、拡張機能 `0.2.3` に公開リリースや Marketplace 掲載はありません。[パッケージのガイド]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) から始めてください。古い非公開コンパイラ `0.0.2` は拡張機能 `0.1.0` を同梱し、これらのプロジェクト編集機能を持ちません。

アクティビティバーの **Testing** を開きます。プロジェクトにテストカタログがあると、拡張機能は `wb test MANIFEST --list --json` を呼び、コンパイラが返したケースの識別情報でツリーを作ります。

## 最初のテストを書く

`tests/main_spec.wbas` の生成済みひな形に従うか、次のようなケースを加えます。

```basic
Module MyFirstWBasic
Import Test

Public Procedure Test_GivenNameWhenGreetingThenUnicode()
  ' Given: ชื่อผู้ใช้ที่เป็น Unicode
  Let name As String = "นักพัฒนา"

  ' When: สร้างข้อความต้อนรับ
  Let actual As String = Greeting(name)

  ' Then: ข้อความต้องรักษา Unicode ทุกตัว
  Test.Equal(actual, "สวัสดี นักพัฒนา จาก WBasic 🙂", "greeting")
EndProcedure
```

`Given`、`When`、`Then` は整理用のコメントであって、WBasic のキーワードではありません。実際のアサーションは `Test.Equal` です。コンパイラのリビジョンに対応するひな形と [テスト API]({{< relref "/books/api-reference/testing-and-doctor.md" >}}) に従ってください。

## 検出と識別

Test Explorer は、コンパイラのケース ID、グループのパス、型付きデータ行 ID、Unicode ラベルを保ちます。一つのケースの実行には、完全な識別情報をフィルターに使います。フィルターが曖昧なら、黙って別のケースも実行するのではなく、拒否します。

## 状態を正確に読む

| 状態 | 意味 |
|---|---|
| Passed | アサーションと後始末が、それぞれの契約どおりに完了した |
| Failed | アサーションが一致しなかった |
| Error | テストのプログラムが型付きランタイムエラーを発生させた |
| Crash | プロセスが異常終了した |
| Timeout | ランナーの期限を超えた |
| Infrastructure | コンパイラ、リンカー、ハーネスが完了できなかった |

カタログ内の失敗を期待する例は、指定した失敗の種類を返したときに教材としての目標を達成します。ただし Test Explorer では、アサーション失敗は失敗のままです。励ますために緑色に塗り替えたりはしません。

## 実行と中止

ルートを実行すると全体を実行し、個別のケースやデータ行も選べます。Stop は実行を中止し、コンパイラのプロセスツリーを終了して、実行を明示的に閉じます。テストがゼロ件ならエラーであり、空の成功スイートではありません。

{{< guide-screenshot name="09-test-explorer.png" alt="WBasic のテストグループ、成功ケース、アサーション失敗、型付きデータ行を別々の状態で示す VS Code Testing" caption="撮影する画面：複数種類の結果を検出・実行した後の Test Explorer" >}}

## 練習

`Given/When/Then` スニペットを使い、成功ケース、アサーション失敗、型付きデータ行を作ります。Test Explorer で、それぞれのラベルと状態を確認してください。

次は [サンプルと TUI テンプレートから学ぶ]({{< relref "/books/w-basic-extension/10-examples-and-tui.md" >}}) へ進みます。
