---
title: "66 · 単純換字式暗号"
weight: 66
---

{{< project-download "66-simple-substitution-cipher" >}}

単純換字式暗号ではA〜Zを並べ替えたアルファベットと対応させます。元の文字はいつも同じ置換先になります。このプログラムは固定された大文字の1行を暗号化して復号し、変換元と変換先の表を交換すると同じ対応が逆向きにも働くことを示します。

## 実行してみる

```powershell
wb check main.wbas --json
wb run main.wbas
```

```text
DTTZ QZ FGGF!
MEET AT NOON!
```

## 対応は一対一でなければならない

{{< project-source "66-simple-substitution-cipher" >}}

`alphabet`は基準の順序、`key`は同じ位置に置換文字を持ちます。例えばAはQ、BはWに対応します。`Translate`は各文字を`fromAlphabet`で探し、`toAlphabet`の対応する位置を取ります。空白や`!`のように一致しない文字は変えません。復号では`Main`が`key`を変換元、`alphabet`を変換先として渡します。

使用前に、プログラムは`key`が26文字で、すべてA〜Zに属し、重複がないことを確かめます。置換先が重複すると、複数の元の文字が同じ文字になり、復号が曖昧になります。対応表の検証もアルゴリズムの一部です。

## 実験

鍵にQを2つ入れると`duplicate key letter`、数字を入れると`key must be A-Z`になります。`ABC XYZ`では各文字の対応位置を手で確かめます。小文字にも対応するなら、別の鍵を使うか、大小文字を変換してから元に戻すかを決めます。この版では小文字はそのままです。

この暗号は文字の繰り返しパターンが見えるため、秘密の保存ではなく対応の学習に使います。

## 範囲と出典

[原著の課題66：Simple Substitution Cipher](https://inventwithpython.com/bigbookpython/project66.html)（Al Sweigart）に着想を得ました。WBasicのコードは固定された大文字の文章用に新たに書き、乱数による鍵や対話モードは含めません。\n