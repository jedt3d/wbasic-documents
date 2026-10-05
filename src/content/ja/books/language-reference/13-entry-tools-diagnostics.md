---
title: "エントリーポイント、ツール、診断"
description: "対応するMainの形式、使用可能な開発コマンド、診断の報告"
weight: 13
---

この最終章では言語と現行実装のツールをつなぎます。検証済みのコマンドと計画を区別し、ロードマップの表を利用者向けガイドに見せかけないようにします。

これらのコマンドのネイティブ証拠は、記録済みのWindows 11 ARM64とmacOS ARM64の環境から得ています。Linux ARM64、ネイティブx86_64、SDKのないエンドユーザーのマシンは、まだ認証していません。

## Mainの3つの形式

実行ファイルには`Main`が1つあり、3つのシグネチャを受け入れます。

```basic
Procedure Main()
EndProcedure
```

```basic
Procedure Main() As Integer
  Return 0
EndProcedure
```

```basic
Procedure Main(args As Array Of String) As Integer
  PrintLn(args.Length.ToString())
  Return 0
EndProcedure
```

戻り値のないMainは正常終了時にステータス0で終了します。`args`に実行ファイル名は含まれず、Unicodeの引数は保たれます。利用者が返すステータスは0～255でなければならず、範囲外は実行時のValidationエラーです。

## 検査と実行

ソースを実行せずに検査します。

```console
wb check hello.wbas --json
```

単独のファイルまたはプロジェクトのマニフェストをネイティブの開発用ランナーで実行します。

```console
wb run hello.wbas
wb run App.wproj -- first "ภาษาไทย"
```

`wb run`はネイティブ実行ファイルをコンパイルしてリンクします。インタープリターではありません。
公開済みの最新コンパイラ／ランタイムは**0.1.0**で、Extension 0.2.1が選ぶ
コンパイラと一致します。プロジェクトとモジュールの`toolchain`指定も一致する必要があります。両ARM64の
ポータブルZIPは展開した開発ホストでの検査に合格しましたが、SDKのない新規ホストでの
受け入れは未完了です。

`wb build`は単独の`.wbas`ファイルではなく、**プロジェクトマニフェスト**を受け入れます。

```console
wb build App.wproj --profile release
```

`check`、`emit-object`、`run`、`build`、`test`は`--profile debug|release`を受け入れ、既定はdebugです。ビルドへの対応は内部開発向けです。`wb --capabilities`は`productionBuildEntitlement: false`と`noSdkDistribution: false`を報告します。

## WBasicをテストする

`wb test`はTestモジュールの規約に従う公開手続きを見つけ、ケースを個別に実行します。

```console
wb test . --list
wb test App.wproj --filter Customer --json
```

ランナーはアサーション失敗、予期しないError、プロセスのクラッシュ、タイムアウトを区別します。発見されたテストが0件でも黙って合格にはせず、`--allow-empty`の明示が必要です。現在のTestスイートは型付きデータ行、グループ化した報告、構造を比較するコレクション／JSONマッチャー、範囲を限定した集計に対応しています。

## 利用可能な解析ツール

`wb symbols FILE --json`と`wb references FILE --json`は、コンパイラが検査したメタデータをエディターとプロトコルへ公開します。`wb project-info MANIFEST --json`はプロジェクトのメタデータを読み、`wb --capabilities`はこのバイナリが提供すると宣言する機能を報告します。これらのコマンドは別の構文解析器を作らず、checkと同じコンパイラを使います。

コンパイラ0.1.0には`wb editor-project --json`と
`wb editor-manifest --json`もあります。標準入力からバージョン付きJSON要求を受け、
保存されていないソースの上書き内容も含め、アプリケーションを実行せずにプロジェクトや
マニフェストのスナップショットを解析します。LSP/Extensionは`editorProject: true`が
宣言された場合、これらの報告を診断、補完、ファイル間の移動に使います。
旧版のコンパイラでは、その能力表示で対応するサービスだけが使えます。詳しくは
[バージョンの境界]({{< relref "/implementation-status.md" >}})を参照してください。

端末では次を使います。

```console
wb tui doctor --font "JetBrainsMonoNL Nerd Font Mono" --format json --output report.json
```

Doctorは自動検査、利用者が入力したフォント情報、目視確認の結果を分けます。フォント設定は変更せず、プロトコルが応答しただけで文字が正しく見えるとは判断しません。

## 診断は赤い文章だけではなくデータである

診断には安定したコード、段階、ソースファイル、行／列、問題のあるソース範囲が含まれ、WBasicの用語を使った対処案が示されます。JSON出力はエディター、MCP/LSP、CIに適します。内部のソース範囲にはバイトオフセットを使うことがありますが、アダプターはエディターの位置エンコーディングへ正しく変換するため、Unicodeの名前やテキストでもカーソルが誤った文字へずれません。

CLIは`wb fmt`を提供すると宣言しません。`wb build`の成功は、本番配布、署名、SDKのない新規ホストでの受け入れを証明しません。
