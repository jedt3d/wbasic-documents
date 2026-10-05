---
title: "50 · 棚の瓶を数え下げる詩"
description: "数が0になるところまで、降順のループで繰り返す詩を作る"
weight: 50
---

{{< project-download "50-ninety-nine-bottles" >}}

## 目的と範囲

節ごとに数だけが変わる歌は、ループの自然な練習になります。この章は「99本の瓶」の数え下げる構造を借り、棚から3つの瓶を取り去る新しい詩を書きます。99ではなく3から始めれば結果を1ページで読み通せます。取り去る前後の数が、3節の決め打ちではなくループから生まれることも確認できます。

## 準備と実行

`main.wbas`をダウンロードし、そのフォルダーで端末を開きます。対応するネイティブSDKとランタイムがある開発用マシンで`wb`を使ってください。

```console
wb check main.wbas --json
wb run main.wbas
```

`run`はコンパイル、リンク、実行を行います。製品ソースからWBasicをビルドする場合は、まずそのルートで`cargo build --workspace --locked`を実行します。記録済みの例はコンパイラ`2614b37`を使いました。統合済みのコンパイラ0.0.2には、デバッグ・リリースのプロファイルを備えた`.wproj`プロジェクト用の`wb build`がありますが、単独の`.wbas`ファイル用ではありません。実験的なパッケージにはリンク用ツールが含まれます。SDKのない新しいマシンでの受け入れ検証は未完了です。3回の反復による出力は次のとおりです。

```text
Three jars: a short counting verse
3 jars on the shelf
Move one away; 2 remain
2 jars on the shelf
Move one away; 1 remain
1 jar on the shelf
Move one away; 0 remain
The shelf is empty.
```

{{< project-source "50-ninety-nine-bottles" >}}

## 数え下げるループを読む

`For jars = 3 To 1 Step -1`は3、2、1を生成します。WBasicの`For`は終点を含むためです。各回で`jars`は瓶を取り去る前の棚を、`jars - 1`は取り去った後を表します。同じループ値から両方を計算すれば、早く減らしすぎることを防げます。最後の行はループの外にあるので、棚が空になった後に一度だけ表示されます。

数が正しくても文法は別に確認します。`JarLabel`は1なら`jar`、それ以外なら`jars`を選び、主な詩の式からこの判断を切り離します。瓶が0個の行を足すなら、表現と単複の両方を見直してください。

## 次に試すこと

1. 最後から2節目の取り去った後の行を`1 jar remains`に変えます。`JarLabel(jars - 1)`を使ってください。
2. 5から始め、全出力を数えずに、節の行の組がいくつ現れるか考えます。
3. 節の間に区切りを入れ、最後の後ろに意図しない空行を残さないようにします。

[原著の課題50：Ninety-Nine Bottles](https://inventwithpython.com/bigbookpython/project50.html)（Al Sweigart）に着想を得ました。瓶の詩とWBasicのソースは新たに書きました。\n