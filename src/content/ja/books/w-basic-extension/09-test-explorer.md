---
title: "9 · Test Explorer でテストする"
description: "コンパイラの識別情報を保ち、ネイティブ WBasic テストを検出、実行、選択、中止する"
weight: 9
---

> **対象バージョン — 対応する private experimental 0.2.0 一式。** このガイドは Windows/macOS ARM64 の compiler/runtime `0.2.0`、protocol `0.1.0`、VS Code extension `0.3.0` を対象とします。旧 `0.1.0`/extension `0.2.1` とローカル修正版 `0.2.3` は別の履歴です。extension の更新だけで E01–E10 は利用可能になりません。最初に **WBasic: Show Toolchain Status** でバージョンと capability を確認してください。

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

コンパイラが検出したテスト手続きの宣言の上には **Run Test** が表示されます。完全なテスト識別情報をネイティブランナーに送り、似た名前の別ケースではなく一件だけを実行します。変更したプロジェクトのソースを先に保存してください。未保存または古いソースは拒否されます。インライン操作は表示する 100 ケース、ソースファイル 1 MiB までです。全体には Test Explorer または `wb test App.wproj --json` を使います。

ネイティブテスト実行を中止しても、完了済みケースの結果は残り、未開始または中断されたケースは別の状態で示されます。全体を成功扱いにはしません。Windows の実際の VS Code での中止確認では、先に完了した三件の Timeout が残り、次の中断ケースは中止のメッセージとともに skipped になりました。一件のインライン Run Test の正常系は別に確認しています。

{{< guide-screenshot name="09-test-explorer.png" alt="WBasic のテストグループ、成功ケース、アサーション失敗、型付きデータ行を別々の状態で示す VS Code Testing" caption="撮影する画面：複数種類の結果を検出・実行した後の Test Explorer" >}}

## 練習

`Given/When/Then` スニペットを使い、成功ケース、アサーション失敗、型付きデータ行を作ります。Test Explorer で、それぞれのラベルと状態を確認してください。

次は [サンプルと TUI テンプレートから学ぶ]({{< relref "/books/w-basic-extension/10-examples-and-tui.md" >}}) へ進みます。
