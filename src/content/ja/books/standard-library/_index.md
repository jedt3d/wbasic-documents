---
title: "標準ライブラリ"
description: "WBasic プログラムで利用できる標準モジュール、型、手続き"
weight: 2
---

この部はモジュール別にシグネチャ、結果、エラー、短い例を示します。R5 のライブラリと、Windows と macOS の ARM64 環境で M5 まで検証された、範囲限定の実験的 WORM SQLite API を扱います。

ここでの「合格」は、記録された二つのホストとソースリビジョンで合格したことを意味します。Linux ARM64 やネイティブ x86_64 の認定ではなく、R8 の SDK 不要配布の受け入れ試験に代わるものでもありません。

計画段階 の項目を、API がすでに使えるかのようには書きません。リファレンスは驚きを減らすためのものです。

## 目次

1. [基本 I/O と標準ハンドル](core-io.md)
2. [ストリームとテキスト](streams-and-text.md)
3. [Json.Value とコーデック](json.md)
4. [File と Memory：ファイルとメモリ](file-and-memory.md)
5. [HTTP](http.md)
6. [SQLite](sqlite.md)
7. [CSV](csv.md)
8. [実験的 WORM SQLite](worm-sqlite.md)

この部の API はすべて同期式です。TUI のコールバックから直接呼ぶと、ランタイムは `Tui.BlockingOperation` を報告します。I/O は `Jobs` で実行してください。
