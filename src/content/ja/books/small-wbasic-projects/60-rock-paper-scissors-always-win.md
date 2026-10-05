---
title: "60 · 必ずプレイヤーが勝つじゃんけん"
description: "プレイヤーに負ける手を選び、3通りをすべて試す"
weight: 60
---

{{< project-download "60-rock-paper-scissors-always-win" >}}

## 目的と範囲

普通のじゃんけんでは、コンピューターはプレイヤーの手を知らずに選びます。この版では意図的に毎回プレイヤーが勝ちます。プレイヤーの手を**先に**見てから、負ける手を選びます。グーはチョキに、パーはグーに、チョキはパーに勝ちます。決められた3回の対戦で、乱数やその場の入力を使わずに規則の全分岐を試します。

## 準備と実行

`main.wbas`をダウンロードし、そのフォルダーで端末を開きます。対応するネイティブSDKとランタイムを備えた`wb`を使ってください。

```console
wb check main.wbas --json
wb run main.wbas
```

`run`はコンパイル、リンク、実行を行います。製品ソースから`wb`をビルドする場合は、まずルートで`cargo build --workspace --locked`を実行します。記録済みの例はコンパイラ`2614b37`を使いました。統合済みのコンパイラ0.0.2には、デバッグ・リリースのプロファイルを備えた`.wproj`プロジェクト用の`wb build`がありますが、単独の`.wbas`ファイル用ではありません。実験的なパッケージにはリンク用ツールが含まれます。SDKのない新しいマシンでの受け入れ検証は未完了です。3回の結果は次のとおりです。

```text
rock beats scissors
paper beats rock
scissors beats paper
Wins: 3
```

{{< project-source "60-rock-paper-scissors-always-win" >}}

## 規則と得点を一致させる

`LosingMove`はプレイヤーの手を受け取ります。`rock`には`scissors`、`paper`には`rock`を返し、残る分岐では、決められた`scissors`に`paper`を返します。`Main`は3つの手を順に調べ、各組を表示し、毎回`wins`を1増やします。プログラムは補助関数が正しいと仮定しているため、誤った組でも得点が3になり得ます。最後の得点と各手の組の両方を検証してください。

これはすべての文字列に対する勝利の証明ではありません。`LosingMove("lizard")`は`paper`を返しますが、このゲームにトカゲの手はありません。入力を受け付ける版では、許される3つの手を検証し、必要なら大文字・小文字を統一します。相手の手を見てから選ぶので公平なゲームでもありません。乱数で戦う相手ではなく、規則を示す例として提示します。

## 次に試すこと

1. 手の配列の順を変え、勝ちの組と得点が正しいことを確かめます。
2. `Wins(player, computer)`を書き、得点を足すときに`LosingMove`を信用するだけでなく、勝敗関係を調べます。
3. グー・パー・チョキ以外の入力を検証し、明確な結果を返します。

[原著の課題60：Rock Paper Scissors (Always-Win Version)](https://inventwithpython.com/bigbookpython/project60.html)（Al Sweigart）に着想を得ました。このWBasic教材とソースは新たに書きました。\n