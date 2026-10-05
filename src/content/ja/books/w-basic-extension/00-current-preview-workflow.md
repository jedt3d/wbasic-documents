---
title: "0 · 対応する 0.1.0 パッケージを選ぶ"
description: "実験的な非公開 ARM64 プレリリースと、対応する VS Code 拡張機能 0.2.1 をインストールする"
weight: 0
---

**実験的な非公開 v0.1.0 プレリリースです。** [非公開リリース](https://github.com/jedt3d/wbasic-language/releases/tag/v0.1.0) には、固定済みのソース `3901cf17ce971dd0c7f591b424d73b086610fc46` から作成したコンパイラ／ランタイム `0.1.0`、任意で利用できる VS Code 拡張機能 `wbasic-dev.wbasic@0.2.1`、プロトコルパッケージ `0.0.2` が含まれます。公開前に、リリース素材八点をダウンロードしてハッシュを再確認しました。アクセスには非公開リポジトリの権限が必要です。Marketplace 向けや本番向けのリリースではありません。

## ZIP を選んで検証する

ホストに合わせて、非公開リリースから `wbasic-0.1.0-windows-arm64.zip` または `wbasic-0.1.0-macos-arm64.zip` をダウンロードします。展開前に ZIP の SHA-256 を `.sha256` ファイルとリリース記録に照合してください。検証済みの Windows ZIP のハッシュは `85c135ce9ad6ccf2edadd3c892ea677110f1ca0f15d012ec348a924213d93a74`、macOS ZIP は `50abba3266fd1209666865e1351a68a899aabed95f5a486522d996bc1a93bad6` です。パッケージ最上位の `wb-package.json` で、コンパイラのバージョン、ソースのリビジョン、ターゲット、ファイル一覧、`vscodeVsix.path` と `sha256` を確認します。記録された VSIX は `editors/vscode/wbasic-0.2.1.vsix`、SHA-256 は `d2aa385b5ec035b278aadfcfea500093e23e98797d91b307902cf14413f6158f` です。パスとハッシュの両方を確認してください。コンパイラ、対応するランタイム素材、リンカー、プローブは、同じ ZIP の組み合わせを保ちます。同梱ランタイムは、単独の静的ランタイムファイルではなく、プラットフォーム用のライブラリを使います。

Windows の `Install-And-Test.ps1`、macOS の `Install-And-Test.sh` は、ネイティブのサンプルを確認してレポートを生成します。基本の `wb check`、`wb run`、`wb test`、`wb build` に VS Code は不要です。展開済みパッケージは、同梱のコンパイラ、ランタイム素材、リンカーで、ホスト SDK を使わず debug/release の実行とビルドに成功しています。ソースからのビルドにはネイティブ開発ツールが必要です。この実験的パッケージは、本番配布とは別です。SDK のない新規ホストでの受け入れ、再配布通知、署名・公証、本番利用の権限は未完了です。

## VS Code に接続する

拡張機能画面で **Install from VSIX…** を選び、`wb-package.json` に記録された VSIX を指定します。ウィンドウを再読み込みし、`WBasic` 拡張機能のバージョンが `0.2.1` であることを確認します。信頼済みワークスペースでは、`wbasic.compilerPath` に展開した最上位の `wb.exe` または `wb` の絶対パスを設定します。`wbasic.probePath` は、独立したネイティブプローブのコマンドを使う場合にだけ設定します。**WBasic: Show Toolchain Status** を実行し、コンパイラが `0.1.0` と期待する ARM64 ターゲットを報告することを確認してください。拡張機能は、管理下の開発ツールチェーン、リポジトリの debug ビルド、`PATH` も検索します。明示的なパスを指定すると、古いインストールを選ぶのを避けられます。

オフラインで読める仕様書は、パッケージの `docs/` にあります。コンパイラ、ビルド、実行、テストには Workspace Trust が必要です。色分け、Outline、ローカルのドキュメントは Restricted Mode でも使えます。

## プロジェクトを始める

空のフォルダーで **WBasic: New Project** を使います。生成される `App.wproj` は、選択したコンパイラの報告するバージョンを固定するので、Check Project の前に `toolchain = "0.1.0"` を確認してください。モジュールの `module.toml` も同じツールチェーンのバージョンを使います。明示的にレビューした更新を行わずに、v0.0.2 のマニフェストやコンパイラ／ランタイムを混在させないようにします。**WBasic: Check Project** は保存済みのインポートと直接依存を検証します。**Check Active Source** は未保存の単独ファイルを確認する機能で、プロジェクト確認の代わりにはなりません。

次は [VS Code、拡張機能、コンパイラを準備する]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}}) へ進み、2〜12 章で Projects、診断、補完、ナビゲーション、Test Explorer、サンプル、Development Build を学びます。古い非公開 v0.0.2 パッケージには拡張機能 0.1.0 が含まれ、これらの編集機能はありません。その版を使う場合は、そのリリースの記録とパッケージのドキュメントを参照してください。
