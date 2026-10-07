---
title: "12 · 日常の作業手順と限界"
description: "編集・確認・テスト・ビルドの循環を整理し、利用できる機能と計画段階の機能を分ける"
weight: 12
---

一つずつ試すには、[How can I…?]({{< relref "/books/w-basic-extension/13-how-can-i.md" >}}) を開き、知りたい項目を選んでください。各項目に手順、確認点、期待どおりに動かないときの対処法、必要なバージョンを示しています。

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

## compiler 0.2.0 と Extension 0.4.0 開発候補

上記の Extension 0.3.0 と protocol 0.1.0 が公開済みの版です。ソースの 0.4.0 は未公開の DX01–DX10 候補です。protocol は Windows/macOS ARM64 で各 98/98、editor は Windows で 154 件成功と Mac-alias の skip 1 件、Mac で 155/155 件成功し、修正後の Windows isolated host は 16/16 件成功しました。

インストールした Windows 候補版では、移動と code の確認として Shortcut Guide、Actions at Caret、Refactor This、rename preview、cold Workspace Symbols、project に属さない Template を開いた状態の F12、解決済み semantic function token が通りました。編集では file／linked template と Undo、Surround With と Check／Undo が通りました。Run／Test の作業では named Run、Run Again、テスト移動、意図的に失敗する scaffold、native failed-case rerun が通り、同じウィンドウで Toolchain Doctor と Release Build も通りました。

修正後の Windows VSIX では Insert Template の statement command も通りました。Vim Insert mode に入ってから呼ぶと `Let value As Integer = 0` が入り、Tab は次の placeholder に進み、Ctrl+Z は infrastructure 通知なしで空の文書に戻しました。Mac/Linux の実ウィンドウ操作は主張しません。候補版には対応する compiler/runtime 0.2.0 と protocol 0.2.0 を使います。Extension の版番号は言語やパッケージの版番号とは別です。

`wbasic.shortcutProfile = intellij` を選ぶと、WBasic editor 限定で Shift+F6 Rename、Windows の Ctrl+B Definition、Alt+Enter Actions at Caret、Ctrl+Alt+Shift+T Refactor This、Shift+F10 Run Again が有効になります。既定の `standard` はこれらのキーを追加しません。**Shortcut Guide** に一覧がありますが、OS や Vim のキーと競合する場合があります。**Insert Template** には連動する入力欄があり、**Insert File Template** は空の WBasic editor に挿入します。**Surround With** は選択範囲を明示的な If または Try/Finally で囲みます。テンプレートは意味の同一性を証明しないため、条件と後始末を補って Check Project で確認してください。

Named Run configuration は manifest・profile・引数を記憶し、**Run Again** は通常の副作用も繰り返します。テスト移動は候補を探し、テストの雛形には意図的に失敗する TODO assertion が入るため、coverage は保証しません。Cold Workspace Symbols は受理された compiler report を使い、workspace root 8、manifest 16、directory 512、entry 8192、深さ 16、結果 256 の上限を守ります。freshness を再確認し、ほかの project を表示できる場合も拒否された project を明示します。完全な index ではありません。Semantic color は compiler が解決した identity のみに適用され、不完全なコードでは lexical color も有用です。**WBasic: Toolchain Doctor** は compiler capability と、未発見または設定不正時の対処を示し、一回の capability query の時間を表示します。この時間は editor 全体の latency、runtime の対応、fresh no-SDK 配布の証明ではありません。compiler project inventory にない未保存 Template は project overlay に入れず、standalone diagnostic を使います。project 所属 source は引き続き project analysis を使い、protocol 修正後は Template を開いたままでも F12 が宣言に移動しました。artifact pin と詳細な結果は言語 repository の DX 報告に記録します。

### 候補版ウィンドウでの Vim

確認した Windows VS Code ウィンドウでは、Vim Normal mode が Ctrl+T、Visual Line mode が Ctrl+B を受け取りました。競合時は Command Palette から Workspace Symbol／Definition を選びます。Insert Template を呼ぶ前に Vim Insert mode に入ると Tab で placeholder を進められます。確認したウィンドウでは Visual mode が Tab を受け取りました。paste 後は二か所の名前を確認してください。確認した例では既定値が選択されていましたが、paste は後ろに追加され、二か所とも更新されました。この Vim の観察は確認した key mapping に限られ、すべての Vim 設定を保証しません。
