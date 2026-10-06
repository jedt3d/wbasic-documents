---
title: "11 · 設定、信頼、問題の調べ方"
description: "必要な設定だけを行い、ログを読み、すべてをリセットせずに原因の層を見つける"
weight: 11
---

> **対象バージョン — 対応する private experimental 0.2.0 一式。** このガイドは Windows/macOS ARM64 の compiler/runtime `0.2.0`、protocol `0.1.0`、VS Code extension `0.3.0` を対象とします。旧 `0.1.0`/extension `0.2.1` とローカル修正版 `0.2.3` は別の履歴です。extension の更新だけで E01–E10 は利用可能になりません。最初に **WBasic: Show Toolchain Status** でバージョンと capability を確認してください。

WBasic 拡張機能の設定は、意図的に少数にしています。プロジェクトの動作は、隠れたマシン設定より、マニフェストとコンパイラのメタデータに置くべきだからです。

## 設定項目

| 設定 | 使う場面 |
|---|---|
| `wbasic.compilerPath` | 自動検索で `wb` が見つからない、または特定のコンパイラに固定したい |
| `wbasic.defaultProfile` | Run と既定のビルドを `debug` または `release` にする |
| `wbasic.probePath` | 開発参加者がネイティブ実現性のプローブを使う |
| `wbasic.trace.server` | LSP 通信を `off`、`messages`、`verbose` で調べる |

`verbose` はローカルの Output チャンネルにソースを記録する場合があります。調査中だけ有効にし、終わったら無効に戻してください。

この 0.3.0 ガイドは `wbasic.defaultProfile` を使います。以前の拡張機能 0.1.0 は `wbasic.buildProfile` を使いました。VSIX を変えた後はウィンドウを再読み込みし、Show Toolchain Status がビルド用ランタイムと対応するパッケージのコンパイラ `0.2.0` を示すことを確認します。

## 動作しないときの診断順

1. **Show Toolchain Status** — パス、バージョン、ターゲット、機能は正しいか。
2. **Workspace Trust** — Restricted Mode では実行系コマンドが無効になる。
3. マニフェストを保存し、**Check Project** を実行する。
4. **Show Language Server Output** で起動とプロトコルのエラーを見る。
5. `verbose` の前に `messages` のトレースを試す。
6. VS Code と VSIX のバージョンが対応することを確認する。

## よくある症状

### 色分けは動くが、補完が動かない

TextMate 文法は、コンパイラや LSP の準備前でも動作します。ツールチェーンと、言語サーバーの出力チャンネルを確認します。

### 補完が不完全

受け手の型と現在のコンパイラ機能を確認します。任意の式の連鎖と組み込み String・Array のメンバーメタデータは未完成です。0.2.0 のコンパイラは解決可能なローカル変数、パラメーター、型、メンバーの semantic graph を提供しますが、グラフにないトークンを推測しません。

### コマンドパレットに Check、Run、Build がない

0.3.0 では、**Check Project**、**Run Project**、三つの Development Build コマンドがコマンドパレットに表示されます。インストール後は **Developer: Reload Window** を実行し、Extensions で版を確認します。表示されていても、Workspace Trust または必要なコンパイラ機能がない場合は実行を拒否します。

### コマンドは見えるが、コンパイラが使えない

**Show Toolchain Status** を確認し、設定した実行ファイルがこの VS Code プロセスから見えるか調べます。実測した一台の Windows ホストでは、外部プロセスから見える `%LOCALAPPDATA%/WBasic` 下のコンパイラを、稼働中の VS Code プロセスが見つけられませんでした。対応するコンパイラ／ランタイム／リンカーをそのウィンドウから見える場所に移し、`wbasic.compilerPath` と必要に応じて `wbasic.probePath` を更新すると検出が回復しました。この結果から、Store／MSIX のファイルシステムについて一般的な規則は断定できません。

### Build が拒否される

コンパイラが development-build 機能と対応プロファイルを公開する必要があります。拡張機能は偽物のビルドコマンドを作らず、安全側に制限します。

既存の build 出力が別のランタイムを使っていると通知された場合、古い出力をバックアップに保管し、同じ 0.2.0 パッケージのコンパイラ／ランタイム／リンカーで作り直します。検査を通すために旧 DLL や archive を上書きしてはいけません。

### References、Rename、Call Hierarchy が使えない

操作に必要な `editorProject`、`editorSemanticGraph`、`editorProjectTests` を確認します。コンパイラがケースを検出できるようテストファイルを保存してください。アプリとテストの参照には各テスト文脈が必要です。文脈が古い、または保存済みテストファイルに検出可能なケースがない場合は、不完全な編集の代わりに利用不可を報告します。プロジェクトオーバーレイの上限は 32 文書、1 ファイル 1 MiB、合計 4 MiB です。インライン Run Test は 100 ケースと 1 MiB のソースファイルまでです。

### モジュールのパスは正しいが、Check が失敗する

TOML を推測で書く代わりに Add Local Module Dependency を使います。モジュールがワークスペース内にあり、シンボリックリンクを通らず、`module.toml` の名前が一意であることを確認します。

### TUI の幅が合わない

その端末、プロファイル、フォントで `wb tui doctor` を実行します。フォントの描画と、フレームワークの文字幅の契約は別の問題です。一つの端末だけで、すべての環境の互換・非互換は証明できません。

## 不具合報告に含める情報

- VS Code のバージョンとアーキテクチャ
- 拡張機能のバージョン
- Show Toolchain Status の結果
- 問題を再現する小さなプロジェクトのマニフェスト
- 診断コードか、必要範囲に限定した言語サーバートレース
- ネイティブや TUI の境界に関わる場合だけ、OS、端末、フォント

次は [日常の作業手順と限界]({{< relref "/books/w-basic-extension/12-daily-workflow-and-limits.md" >}}) へ進みます。
