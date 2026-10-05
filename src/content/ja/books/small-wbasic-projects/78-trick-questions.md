---
title: "78 · ひっかけ問題と解答の確認"
description: "問題・正答・決められた回答を同じ添字で対応させる"
weight: 78
---

{{< project-download "78-trick-questions" >}}

## 目的と範囲

ひっかけ問題は思い込みを試します。この章には新しい問題を2つ用意しました。箱からラベルを外してもペンは減りません。また、毎回テスト用の状態を初期化するテスト同士は、実行間で状態を共有しません。プログラムは問題、正答、決められた回答を3つの配列に保存します。最初の回答はわざと間違え、2つ目を正しくし、答えの表示と得点の両経路を試します。回答を固定して教材の出力を再現可能にします。

## 準備と実行

`main.wbas`をダウンロードし、そのフォルダーで端末を開きます。対応するネイティブSDKとランタイムを備えた`wb`を使ってください。

```console
wb check main.wbas --json
wb run main.wbas
```

`run`はコンパイル、リンク、実行を行います。製品ソースからWBasicをビルドする場合、まずルートで`cargo build --workspace --locked`を実行します。記録済みの例はコンパイラ`2614b37`を使いました。統合済みのコンパイラ0.0.2には、デバッグ・リリースのプロファイルを備えた`.wproj`プロジェクト用の`wb build`がありますが、単独の`.wbas`ファイル用ではありません。実験的なパッケージにはリンク用ツールが含まれます。SDKのない新しいマシンでの受け入れ検証は未完了です。2問の結果は次のとおりです。

```text
Q1: A box holds five pens. Remove its label: how many pens remain?
scripted guess: 3
Answer: 5
Q2: Two tests reset their fixtures. How many runs share state?
scripted guess: 0
Correct
Score: 1/2
```

{{< project-source "78-trick-questions" >}}

## 3つの配列をそろえる

`index`は0から始まり、`questions.Length`の手前で止まります。3つの配列の同じ位置が1問を表します。`index + 1`により、配列の添字を変えずに、見慣れた1始まりの問題番号を表示します。回答を小文字にした後、一致すれば`score`を1増やして`Correct`を表示し、違えば正答を示します。最後の得点には決め打ちの2ではなく、実際の問題数を使います。

並行する配列は壊れやすく、問題だけを足して正答や回答を忘れると範囲外を読むおそれがあります。規模を広げるなら各問題を`Structure`（構造体）にまとめ、遊ぶ前に個数を確かめます。文字列を厳密に比較するので、指定した形だけが正答です。人には同じ意味でも`five`と`5`は異なります。部分一致を広く認めると、期待する語を含む誤答まで受け入れかねません。

## 次に試すこと

1. 最初の回答を`5`に変え、得点を予想します。
2. 3問目とその正答・回答を3つの配列すべてに加え、番号と得点の分母を確認します。
3. 問題と正答をまとめた`Structure Question`を設計し、配列の食い違いを減らします。

[原著の課題78：Trick Questions](https://inventwithpython.com/bigbookpython/project78.html)（Al Sweigart）に着想を得ました。2問の内容、採点、WBasicソースは新たに書きました。\n