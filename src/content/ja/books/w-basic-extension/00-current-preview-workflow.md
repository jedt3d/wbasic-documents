---
title: "0 · 対応する 0.2.0 ツールチェーンを選ぶ"
description: "ARM64 パッケージ、VSIX 0.3.0、VS Code が選んだコンパイラを確認する"
weight: 0
---

このガイドは、Windows/macOS ARM64 向けの **private experimental** な一式、compiler/runtime `0.2.0`、protocol `0.1.0`、VS Code extension `wbasic-dev.wbasic@0.3.0` を対象とします。[WBasic の非公開リリース](https://github.com/jedt3d/wbasic-language/releases/tag/v0.2.0)から入手します。リポジトリへのアクセス権が必要です。旧 `0.1.0` と extension `0.2.1` は別のリリース履歴です。extension `0.2.3` はローカルで検証した修正版であり、新しいパッケージの VSIX ではありません。異なる版のバイナリ、ランタイム、マニフェストの固定値、試験結果を混ぜないでください。

## パッケージを選び、検証する

ホストに合う compiler `0.2.0` の Windows ARM64 または macOS ARM64 ZIP を選びます。展開前に SHA-256 を `.sha256` とリリース記録に照合します。パッケージ内の `wb-package.json` で `sourceRevision`、ターゲット、コンパイラの版、ファイル一覧、`vscodeVsix.path`/`sha256` を確認してください。`wb`、ランタイム素材、リンカー、ネイティブプローブは同じパッケージの組み合わせを保ちます。別のランタイムで作った build フォルダーは拒否される場合があります。古い出力を別に保管してから作り直してください。

これは実験的な非公開の開発ツールです。ソースに対応するエディター例と BillingTime の debug/release 実行を含め、Windows/macOS ARM64 のネイティブ確認は開発用ホストで通りました。本番利用の権限、SDK のない新規ホストでの受け入れ、署名・公証、他のプラットフォームは本番配布の受け入れ範囲外です。

## VS Code に接続する

Extensions で **Install from VSIX…** を選び、`wb-package.json` に記録された `0.3.0` VSIX のハッシュを確認してインストールし、**Developer: Reload Window** を実行します。信頼済みワークスペースでプロジェクトを開き、**WBasic: Show Toolchain Status** で compiler `0.2.0` とホストのネイティブターゲットを確認します。自動検出できない場合は、選んだパッケージの `wb.exe` または `wb` の絶対パスを `wbasic.compilerPath` に設定します。`wbasic.probePath` はプローブを別の場所に置いた場合だけ使います。これらの設定は実行ファイルのパスを受け取り、シェルコマンドは受け取りません。

Check、Run、Build、Test には Workspace Trust とコンパイラが公開する capability が必要です。色分け、Outline、About and Credits、同梱仕様書は Restricted Mode でも使えます。プロジェクト編集機能には `editorProject` と `editorSemanticGraph` が必要で、テストソースを扱う場合は `editorProjectTests` も必要です。新しい VSIX を入れるだけでは、古いコンパイラにこれらの機能は加わりません。

## プロジェクトを始め、結果を確認する

空のフォルダーで **WBasic: New Project** を使います。生成されるマニフェストは選択したコンパイラの版を固定します。この一式では `App.wproj` と関連する `module.toml` の `toolchain = "0.2.0"` を確認してください。保存済みのプロジェクトには **WBasic: Check Project** を使います。ライブ診断は上限内の未保存プロジェクトオーバーレイを解析できますが、**Check Active Source** は単独ソースの確認であり、Import を含むプロジェクトの確認には代わりません。

[v0.2.0 タグの daily editor workflow](https://github.com/jedt3d/wbasic-language/tree/v0.2.0/examples/editor-daily-workflow) はリリースソースに固定され、パッケージにも含まれます。モジュールをまたぐこのプロジェクトは `wb check` に通り、`wb test` の二件が成功し、`wb run` は `24` を表示します。[拡張機能とコンパイラをインストールする]({{< relref "/books/w-basic-extension/01-install-extension-and-compiler.md" >}}) に進み、2〜12 章で VS Code の編集、移動、整形、インラインテスト、直接呼び出しの階層を学びます。
