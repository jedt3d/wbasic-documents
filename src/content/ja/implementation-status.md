---
title: "このリファレンスが扱うコンパイラとツールのバージョン"
description: "private experimental compiler/runtime 0.2.0、protocol 0.1.0、Extension 0.3.0"
---

**2026 年 10 月 6 日**更新。このガイドは Windows/macOS ARM64 向けの[実験的な非公開 v0.2.0 リリース](https://github.com/jedt3d/wbasic-language/releases/tag/v0.2.0)、compiler/runtime **0.2.0**、protocol **0.1.0**、VS Code Extension **0.3.0** を扱います。固定したソースは `8d740dabe72bdf27f978f979d64725dc26c84be0` です。インストール前に ZIP/VSIX の SHA-256 をリリース記録と[コンパイラのリリースマニフェスト](https://jedt3d.github.io/wbasic-documents/compiler-release.json)に照合してください。旧 `0.1.0` リリースと VSIX `0.2.1` は変更されない履歴です。Extension `0.2.3` はローカルで検証した修正版であり、新しいパッケージには含まれません。

コンパイラのリリース番号、言語設計の **draft v0.3**、サイトの公開バージョンは別です。CLI、ポータブル ZIP、VS Code が選ぶコンパイラは、対応するランタイム／リンカーとともに `0.2.0` を使います。マニフェストを更新する前に `wb --version` と **WBasic: Show Toolchain Status** で実際の版を確認してください。

## 現在のツールチェーン

| 構成要素 | 現在の範囲 |
|---|---|
| コンパイラ／ランタイム | ネイティブ Windows ARM64 / macOS ARM64 の対応する 0.2.0 一式 |
| CLI | `check`、`run`、`build`、`emit-object`、`test`、`project-info`、`symbols`、`references`、`tui doctor`、`editor-project`、`editor-manifest` |
| ビルド | プロジェクトマニフェスト、debug/release。本番利用の権限は false のまま |
| WORM | 実験的 SQLite：型付きマッピング、変更、クエリ、トランザクション、楽観的バージョン検査 |
| VS Code Extension | `wbasic-dev.wbasic@0.3.0`。E01–E10 の通常操作を実際の Windows VS Code で確認。Marketplace は対象外 |
| LSP/MCP | Protocol package 0.1.0。コンパイラ管理のプロジェクトスナップショットと semantic graph |
| プロジェクト／モジュールの固定 | `toolchain = "0.2.0"`。New Project は選択したコンパイラを自動的に固定 |
| ガイド | 入門、リファレンス、拡張機能ガイドは対応する一式を扱う |

Extension は Check/Run/Development Build をコマンドパレットに表示しますが、実行時には Workspace Trust と現在の capability を確認します。Run/Build は完了後も出力を読めるプロセスタスクを使います。`wbasic.compilerPath` はコンパイラの絶対パスです。パッケージを変える場合、ランタイム／リンカーも同じパッケージに保ち、異なるランタイムで作った出力は作り直します。旧ファイルを上書きして組み合わせ不一致のエラーを回避してはいけません。

## エディター機能とその境界

E01–E10 の通常操作は Windows ARM64 の VS Code 1.140.0 で通りました。Hover、Definition、Rename、補完／引数のヒント、References/Peek、ハイライト、Quick Fix、Format Document/Selection、一件のインライン Run Test、直接呼び出し階層です。Testing／コマンドパレットからの別のネイティブテスト実行の中止も通りました。完了済み結果は残り、中断された仕事は Passed になりません。テストソースを扱う操作は、検出した文脈を別々に解析し、アプリからの名前変更でテスト呼び出しを取り残さないようにします。

エディター／プロトコルテストは Windows/macOS ARM64 の両方で **131/131** と **90/90**、独立した Windows Extension Host は **12 checks** 通りました。Rust ワークスペーステストは **Windows 544**（5 ignored）、**Mac 532**（3 ignored）で、ignored は Passed ではありません。現在のサンプルカタログは **32 項目 / 10 カテゴリ / 66 教材ファイル**です。`editor-daily-workflow` は両ネイティブホストで check、test 2/2、run 出力 `24` に通りました。BillingTime は実際の SQLite で debug/release に通り、新しい二行の請求書は合計 18000 cents、再実行すると次の請求書が作られます。

現在の extension／protocol 共通フォーマッターはトークン、コメント、文字列、改行形式を保ち、字下げを控えめに変えます。コンパイラ自身がレイアウトを設計する機能ではありません。Hover は宣言の前のコメントを説明文として取り出しません。Call Hierarchy はコンパイラが解決した直接呼び出しだけを扱います。Go to Implementation と間接的な手続き値の呼び出し先は対象外です。任意の式の連鎖と組み込み String/Array メンバーの補完は未完成です。カタログの識別情報を変える test-entry 手続きの名前変更には対応しません。テスト文脈を完全に扱えない場合は、不完全な編集を返さず拒否します。

## パッケージのインストールと確認

展開前に ZIP/VSIX の SHA-256 を対応ファイルとリリース記録に照合します。`Install-And-Test.ps1` または `Install-And-Test.sh` とセッション用 PATH ヘルパーを使います。基本のコンパイルに Node は不要です。Node は任意のプロトコルアダプター用、VS Code はエディター利用時に使います。[入門]({{< relref "/books/getting-started/_index.md" >}})、[WORM SQLite]({{< relref "/books/standard-library/worm-sqlite.md" >}})、[拡張機能ガイド]({{< relref "/books/w-basic-extension/_index.md" >}}) を参照してください。

上記のネイティブ証拠は開発用ホストでの結果です。SDK のない新規ホストでの受け入れや本番配布を証明しません。本番利用の権限、再配布通知、署名・公証、Linux ARM64／ネイティブ x86_64 の受け入れは未完了で、`noSdkDistribution` は false のままです。

## 受け入れと過去のサンプル

公開済みの **v0.1.0** 時点で、規範的な draft v0.3 のカタログは **72 Passed / 23 Planned / 0 Deferred** で、独立した WORM マイルストーンは含みません。これは旧リリースの境界であり、現在の状態ではありません。別に追跡する現在のソースカタログは **93 Passed / 2 Planned** のままで、このエディター／サイト作業によって昇格しません。R6 D1–D5 は記録された範囲で通りました。Windows OSC52 の成功確認には固定した非公開 Microsoft ConPTY 接続先を使い、一部の OS 同梱ホストでは依然としてタイムアウトします。NativeLocal と OSC52 は別経路です。旧リリースの証拠は Linux ARM64 とネイティブ x86_64 を含みません。

小さな WBasic プロジェクトの本は、記録されたリビジョンで **ネイティブ検証済み 29 例 / 計画段階 52 教材**を保ちます。ドキュメントの変更で計画中の教材が検証済みになることも、人間・AI のコストに関する主張を証明することもありません。過去の証拠は元のバージョンとハッシュを保ち、現在の一式はリリース記録とサイトのマニフェストが示します。
