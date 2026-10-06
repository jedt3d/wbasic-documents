---
title: "6 · ナビゲーションとリファクタリング"
description: "コンパイラの定義、参照、ハイライト、名前変更、直接呼び出し階層を使う"
weight: 6
---

> **対象バージョン — 対応する private experimental 0.2.0 一式。** このガイドは Windows/macOS ARM64 の compiler/runtime `0.2.0`、protocol `0.1.0`、VS Code extension `0.3.0` を対象とします。旧 `0.1.0`/extension `0.2.1` とローカル修正版 `0.2.3` は別の履歴です。extension の更新だけで E01–E10 は利用可能になりません。最初に **WBasic: Show Toolchain Status** でバージョンと capability を確認してください。

プロジェクトが大きくなると、目で宣言を探す方法は、ツールに静かに道を譲ります。拡張機能は、コンパイラの識別情報とソース範囲を使ってファイル間を移動します。

## 基本のコマンド

- **Go to Definition** は手続きやシンボルの宣言を開きます。
- **Find All References** はアプリ、モジュール、検出されたテスト内の使用箇所を一覧にします。
- **Peek Definition** は呼び出し位置から離れずに宣言を表示します。
- **Usage highlights** は現在の文書で同じ識別情報の使用箇所だけを示します。
- **Go to Symbol in Workspace** は公開シンボルとプロジェクトのシンボルを検索します。
- **Rename Symbol** は複数ファイルの編集を準備し、全体のスナップショットをコンパイラで検証します。
- **Show Call Hierarchy** はコンパイラが解決した直接の呼び出し元と呼び出し先を示します。

`Main` の `Greeting` を右クリックし、Go to Definition、続いて Find All References を選びます。コメントや文字列に同じテキストがあっても、結果に含まれないはずです。**F12** は宣言、**Alt+F12** は Peek、**Shift+F12** は参照を開きます。別の二つの手続きに同じ表記のタイ語ローカル変数があっても、ハイライトと参照はコンパイラが選んだ変数だけを追います。

## 推測せずに名前を変える

Rename Symbol を選び、`Greeting` を `WelcomeMessage` に変えます。拡張機能はコンパイラの識別情報で宣言と参照を結び付け、WorkspaceEdit を返す前に、編集後のソース全体を検証します。検証に失敗した場合、半分だけ名前を変えたプロジェクトを残すことはありません。

{{< guide-screenshot name="06-navigation-rename.png" alt="二つのソースファイル内の WelcomeMessage の宣言と参照を示す VS Code の Rename プレビュー。コメントと文字列は対象外" caption="撮影する画面：適用前にコンパイラが検証したファイル間の名前変更" >}}

名前変更にはコンパイラの `rename` 機能と、対応範囲内のオーバーレイが必要です。現在のプロジェクトオーバーレイの上限は、開いた文書 32 個、1 ファイル 1 MiB、合計 4 MiB です。超えた場合は推測せず、安全側に失敗します。

0.2.0 のコンパイラのグラフは、解決できる手続き、ローカル変数、パラメーター、定数、名目的な型、フィールド／Enum メンバーを扱います。名前付き引数のラベルも、実際のパラメーターに結び付きます。パラメーターの名前変更は宣言、手続き本体、アプリとテストの呼び出しラベルを編集し、別メソッドの同名パラメーターには触れません。参照と incoming calls は検出した各テストファイルを別の文脈として確認し、アプリから始めた名前変更でテスト呼び出しを取り残しません。保存済みテストファイルに検出可能なケースがない場合や、検証中にスナップショットが変わった場合は、不完全な編集を返さず利用不可を報告します。カタログの識別情報を変え得る test-entry 手続きの名前変更には対応しません。

Call Hierarchy は、コンパイラが呼び出し元・先と呼び出し位置を確定できる直接呼び出しだけを示します。再帰と検出済みテストからの呼び出しも含みます。手続き値を通す間接呼び出しの対象は推測しません。Go to Implementation は今回の対象外です。

## まだ期待できないこと

- コンパイラの完全な識別情報と参照がないトークンを、文字列検索で編集すること。
- 依存関係のない別プロジェクトまで名前変更すること。
- 文字列を使ったリフレクションを参照と見なすこと。
- テキストを取り込む Include や、グローバルな include path を使うこと。

モジュールと可視性は [モジュール、パッケージ、可視性]({{< relref "/books/language-reference/12-modules-packages-visibility.md" >}}) を参照してください。

## 練習

1. `src/Messages.wbas` を作ります。
2. `Module MyFirstWBasic` を保ったまま、`Greeting` をそのファイルへ移します。
3. `Main.wbas` から Go to Definition を使います。
4. 拡張機能で名前を変えます。
5. 保存して Check Project を実行します。

次は [モジュールと依存パスを管理する]({{< relref "/books/w-basic-extension/07-modules-and-dependency-paths.md" >}}) へ進みます。

## 0.4.0 候補版の操作メニュー

**WBasic: Actions at Caret** と **WBasic: Refactor This** は、カーソル位置と現在の capability に応じて使える操作をまとめます。未対応の構造変更を、証明済みのリファクタリングとして提示しません。**WBasic: Surround With** は選択範囲を明示的な If または Try/Finally で囲みます。条件と後始末を確認して Check Project を実行してください。[候補版の範囲]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}})を参照してください。Actions at Caret、Refactor This、rename preview、Surround With と Check／Undo は、インストールした Windows 候補版で通りました。

### Vim がキーを受け取る場合

確認した Windows ウィンドウでは、Vim Visual Line mode が **Ctrl+B** を Definition より先に受け取りました。Command Palette の **Go to Definition** または **F12** を使ってください。binding が利用可能な場合、**Alt+Enter** は **WBasic: Actions at Caret** を開きます。protocol 修正後、project に属さない Template を開いたままでも、F12 は project source から Amount の宣言に移動しました。
