---
title: "12 · 日常の作業手順と限界"
description: "編集・確認・テスト・ビルドの循環を整理し、利用できる機能と計画段階の機能を分ける"
weight: 12
---

> **対象バージョン — 対応する private experimental 0.2.0 一式。** このガイドは Windows/macOS ARM64 の compiler/runtime `0.2.0`、protocol `0.1.0`、VS Code extension `0.3.0` を対象とします。旧 `0.1.0`/extension `0.2.1` とローカル修正版 `0.2.3` は別の履歴です。extension の更新だけで E01–E10 は利用可能になりません。最初に **WBasic: Show Toolchain Status** でバージョンと capability を確認してください。

ツールに慣れた後の日常作業は、短く、予測できる手順になるはずです。

## おすすめの循環

1. ワークスペースを開き、WBasic Projects のアクティブなプロジェクトを確認する。
2. 補完、Hover、引数のヒントを使ってコードを書く。
3. 回避策を加える前に、ライブ診断を読む。
4. 名前変更の前に、定義、参照、ハイライト、Call Hierarchy で影響を理解する。
5. マニフェスト、モジュール、Import を変えたら保存し、Check Project を実行する。
6. インライン Run Test または Test Explorer で関連するケースを実行する。
7. Run Project を実行し、完了後も開いたままのタスクターミナルで結果を確認する。
8. 開発中は Build Development Debug を使う。
9. レビュー前には全テストと Build Development Release を実行する。
10. 必要に応じて文書や選択範囲を整形し、再現可能な証拠としてコンパイラと拡張機能のリビジョンを記録する。

## 手早く選ぶ表

| 目的 | ツール |
|---|---|
| 語やシンボルを理解する | Hover |
| 受け付ける引数を見る | Signature Help |
| 宣言を開く | Go to Definition |
| ファイルを離れず宣言を見る | Peek Definition |
| 影響を理解する | Find All References |
| このファイル内の使用箇所を見る | Usage highlights |
| ファイルをまたいで名前を変える | Rename Symbol |
| 呼び出し元と呼び出し先を見る | Show Call Hierarchy → Incoming/Outgoing |
| コンパイラが報告したキーワード表記を直す | Ctrl+. → Quick Fix |
| トークンを保って字下げを整える | コマンドパレットの Format Document/Format Selection |
| 未保存のソース一つを確認する | Check Active Source |
| 実際のプロジェクトとモジュールを確認する | Check Project |
| プロジェクトを実行する | VS Code のターミナルで Run Project |
| 小さな動作を確認する | Test Explorer |
| 宣言位置からテストを実行する | 検出済みテスト手続きの上にある Run Test |
| 有効なコンパイラを確認する | Show Toolchain Status |

## このガイドで利用できる機能

- ソースとマニフェストの色分け、Outline
- コンパイラに基づく診断と、プロジェクトを理解する LSP
- 補完、Hover、入れ子の引数のヒント、ワークスペースのシンボル
- ファイル間の定義・参照、Peek、ハイライト、コンパイラが検証する名前変更
- コンパイラで候補を確認する WB200/WB201 Quick Fix
- トークン、コメント、文字列、改行形式を保つ Format Document/Selection
- 正確な検出済みテスト識別情報によるインライン Run Test と直接呼び出し階層
- New Project、アクティブプロジェクトの選択、Projects 画面
- 直接依存するローカルモジュールの管理
- Check、Run、Development Build の Debug・Release、Tasks
- ネイティブ Test Explorer と同梱サンプル
- オフラインの v0.3 仕様書

この一覧は、検証済みの compiler/runtime 0.2.0、protocol 0.1.0、extension 0.3.0 の一式に限ります。プロジェクトの編集サービスはコンパイラの機能記録に従います。古いコンパイラに `editorProject`、`editorSemanticGraph`、`editorProjectTests` がなければ、新しい拡張機能だけではこれらを得られません。

daily editor の例は Windows/macOS ARM64 で `wb check` に通り、二件のテストに成功し、`wb run` は `24` を表示しました。E01–E10 の通常操作は実際の Windows VS Code ウィンドウで通りました。両ホストのエディター／プロトコルテストはそれぞれ 131/131 と 90/90 です。一件のインライン Run Test の正常系と、Testing／コマンドパレットから始めた別のネイティブテスト実行の中止は区別して確認しました。中止時にも完了済みの結果は残り、中断された仕事は Passed と区別されました。

## 計画段階、またはガイドの範囲外

- Debug Adapter Protocol、ブレークポイント、ステップ実行
- コンパイラ自身がレイアウトを設計するフォーマッター。現在の extension／protocol 共通フォーマッターはトークンを保って字下げを控えめに変える
- キーワード表記の Quick Fix を超える、汎用の Import・マニフェスト修正
- 本番利用の権限と、SDK のない新規ホストでの受け入れ
- 署名、公証、Marketplace 公開
- Linux ARM64 とネイティブ x86_64 の受け入れ
- 検証範囲外の WebView、言語・ライブラリの作業。このカタログの WORM M2/M3 例は対象に含む
- Go to Implementation と、解決できない手続き値経由の呼び出し先

カタログの識別情報を変え得る test-entry 手続きの名前変更には対応しません。保存済みテストファイルに検出できるケースがない場合や、検証中にアプリ／テストのスナップショットが変わる場合、References、Rename、incoming Call Hierarchy は不完全な結果を返さず利用不可になります。インライン Run Test には保存済みプロジェクトソースが必要で、100 ケース、1 MiB のソースファイルまでです。プロジェクトオーバーレイの上限は 32 ファイル、各 1 MiB、合計 4 MiB です。すべての式やトークンに移動先があるという約束ではありません。

デバッガーがないからといって、Run が仮の機能になるわけではありません。Run、Build、Test は、一緒にテストしたコンパイラのパイプラインを使います。ソース単位のステップ実行には、証明できるデバッグの契約が必要です。

## 一つの総合演習で締めくくる

`local-module-project` をコピーし、プロジェクト名を変え、タイ語名の手続きを加え、ファイル間の Rename を使い、テストケースを追加して Test Explorer を実行し、Build Development Release を行います。外部ターミナルなしで全手順が通れば、拡張機能の主な作業手順を体験できたことになります。

続いて [言語リファレンス]({{< relref "/books/language-reference/_index.md" >}})、[標準ライブラリ]({{< relref "/books/standard-library/_index.md" >}})、[API リファレンス]({{< relref "/books/api-reference/_index.md" >}}) を参照してください。
