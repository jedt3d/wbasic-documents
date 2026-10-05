---
title: "7 · モジュールと依存パス"
description: "Include や隠れた検索パスを使わず、マニフェストでローカルモジュールを追加する"
weight: 7
---

> **バージョンの範囲 — 非公開 v0.1.0 プレリリース。** この手順は、固定済みソース `3901cf17` の公開済み実験的コンパイラ／ランタイム `0.1.0`、同梱の拡張機能 `wbasic-dev.wbasic@0.2.1`、プロトコルパッケージ `0.0.2` を使います。[対応するパッケージのガイド]({{< relref "/books/w-basic-extension/00-current-preview-workflow.md" >}}) から始めてください。古い非公開コンパイラ `0.0.2` は拡張機能 `0.1.0` を同梱し、これらのプロジェクト編集機能を持ちません。

WBasic は Module、Import、マニフェストの直接依存でコードを整理します。テキストを取り込む `Include` はなく、拡張機能にもグローバルな include path 設定はありません。ソースの出所は、各開発者のマシン設定に隠れず、プロジェクト内で見える状態を保ちます。

## ローカルモジュールの構成

ここでは `Acme` モジュールを追加します。

```text
MyFirstWBasic/
|-- App.wproj
|-- src/
`-- modules/
    `-- Acme.wmod/
        |-- module.toml
        `-- src/
            `-- Math/
                `-- Total.wbas
```

`module.toml` は次の形です。

```toml
[module]
name = "Acme"
toolchain = "0.1.0"
```

## 拡張機能から追加する

1. ワークスペース内にモジュールを作るか、コピーします。
2. **WBasic Projects** でプロジェクトを選びます。
3. **WBasic: Add Local Module Dependency** を実行します。
4. 名前が `.wmod` で終わるフォルダーを選びます。
5. プレビューを確認して Apply を選びます。

拡張機能はプロジェクトとモジュールの両方のマニフェストを検証します。ワークスペース外のパス、シンボリックリンク、名前やパスの重複は拒否します。その後、関係のないコメント、順序、改行を保ちながら、スラッシュを使う相対パスを書き込みます。

{{< guide-screenshot name="07-module-dependency.png" alt="modules/Acme.wmod の Acme を追加する dependencies のプレビューと、直接依存モジュールを示す WBasic Projects" caption="撮影する画面：ローカルモジュールの追加プレビューと更新後のマニフェスト" >}}

`App.wproj` の結果は、次のようになります。

```toml
[dependencies]
Acme = { path = "modules/Acme.wmod" }
```

**Show Project Modules and Dependencies** でコンパイラが同じ依存を認識することを確認します。削除には **Remove Local Module Dependency** を使います。編集するのはマニフェストだけで、ディスク上のモジュールフォルダーは削除しません。

## ソースからインポートする

```basic
Module MyFirstWBasic
Import Acme.Math As Numbers

Procedure Main()
  PrintLn(Numbers.Total(5).ToString())
EndProcedure
```

Public の宣言は依存の境界を越えて使えます。Internal は定義されたパッケージやモジュールの境界内で共有し、Private は仕様書のモジュール規則に従います。補完とナビゲーションはコンパイラの可視性に従います。

## 確認項目

- [ ] `[dependencies]` の下に依存が一度だけ現れる。
- [ ] Projects にモジュールのパスが表示される。
- [ ] Go to Definition でモジュールのソースが開く。
- [ ] Import 後に Check Project が通る。

次は [実行、ビルド、タスク]({{< relref "/books/w-basic-extension/08-run-build-and-tasks.md" >}}) へ進みます。
