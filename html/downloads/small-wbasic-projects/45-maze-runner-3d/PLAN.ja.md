# 課題45の計画：文字で一人称視点の迷路を描く

状態：実装と検証待ち。まだmain.wbasはありません。

目的：文字で一人称視点の迷路を描く。
データ：迷路の地図、向いている方向、視界。
方法：正面と左右の壁を文字の絵に投影し、方向転換と前進を処理する。
受け入れ条件：右に4回曲がると、元の向きに戻る。
残る課題：実際の端末で視界の描画とTUIのキー入力を検証する。

出典：『The Big Book of Small Python Projects』の著者Al Sweigart。このWBasic向け計画は、原案を基に新しい言葉で書きました。

原案：https://inventwithpython.com/bigbookpython/project45.html

この文書は計画であり、実行可能なコードではありません。