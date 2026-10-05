---
title: "小さなWBasicプロジェクトのロードマップ"
description: "81の課題と、教材を完成させる前に検証すべき境界"
weight: -1
---

# 小さなWBasicプロジェクト：章の一覧

本書はAl Sweigartの[『The Big Book of Small Python Projects』](https://inventwithpython.com/bigbookpython/)にある81課題すべての**着想**を基に、新たに書いた説明とコードでWBasicを練習します。各項目には出典と比較のため、原著の章へのリンクを付けています。表ではソースのある教材と検証待ちの計画を区別します。ある課題の証拠で別の課題を検証したことにはなりません。

**言語の基本機能**（29）は、利用可能な整数、文字列、Array、行入力、表示を使う教材です。**検証待ち**（47）は、教材固有の疑似乱数生成器、補助データ、TUIイベントや描画の検証が必要な課題です。**不足しているAPI**（5）は、原案の形式に必要な主要機能が公開v0.3 APIにない課題です。範囲を明示した翻案なら可能な場合もあります。29の基本教材には、検証ページに記録したWindows ARM64でのソース検査と実行結果があります。残る52件は、それぞれの課題計画であり、ダウンロード可能なWBasicソースはまだありません。

乱数生成、暦・壁時計、`Math.Sin/Cos`、音声、TTSは、ここで確認した仕様・コンパイラの版では公開v0.3の機能ではありません。手書きの疑似乱数生成器なら再現可能な結果を作れますが、システムの乱数APIではありません。TUIタイマーはセッション中の時間間隔を測るもので、日付や現在時刻は示しません。

| 番号 | 課題とWBasicの概念 | 状態 | 教材で説明・検証すべきこと |
|---:|---|---|---|
| 1 | [バゲル]({{< relref "01-bagels.md" >}}) — 位置ごとの手がかりから3桁の番号を当てる（[原著](https://inventwithpython.com/bigbookpython/project1.html)） | 検証待ち | 教材内でシード付き生成器を書き、整数の範囲を確認する。公開された乱数APIはない。 |
| 2 | [誕生日のパラドックス]({{< relref "02-birthday-paradox.md" >}}) — 集団内で誕生日が一致する確率を模擬する（[原著](https://inventwithpython.com/bigbookpython/project2.html)） | 検証待ち | 検証済みの疑似乱数生成器で誕生日を作る。公開された乱数APIはない。 |
| 3 | [ビットマップのメッセージ]({{< relref "03-bitmap-message.md" >}}) — 文字の絵に文章を埋め込む（[原著](https://inventwithpython.com/bigbookpython/project3.html)） | 言語の基本機能 | 画像の各行をArray Of Stringの要素に保存し、空白を保って塗られたマスを文章の文字に替える。 |
| 4 | [ブラックジャック]({{< relref "04-blackjack.md" >}}) — 親と21点勝負をする（[原著](https://inventwithpython.com/bigbookpython/project4.html)） | 検証待ち | 山札を作り、検証済みの疑似乱数生成器で混ぜる。公開された乱数APIはない。 |
| 5 | [跳ね返るDVDロゴ]({{< relref "05-bouncing-dvd-logo.md" >}}) — 画面内を跳ねるロゴと角への到達回数を示す（[原著](https://inventwithpython.com/bigbookpython/project5.html)） | 検証待ち | 実際のホストでTUIタイマー、表示領域の寸法、繰り返す描画を検証する。 |
| 6 | [シーザー暗号]({{< relref "06-caesar-cipher.md" >}}) — 文字をずらして暗号化・復号する（[原著](https://inventwithpython.com/bigbookpython/project6.html)） | 言語の基本機能 | ラテン文字の範囲を決め、それ以外の文字を保つ。 |
| 7 | [シーザー暗号の解読]({{< relref "07-caesar-hacker.md" >}}) — すべてのずらし幅を試して暗号文を調べる（[原著](https://inventwithpython.com/bigbookpython/project7.html)） | 言語の基本機能 | 26個の鍵をすべて試し、候補を表示する。 |
| 8 | [カレンダー作成]({{< relref "08-calendar-maker.md" >}}) — 指定された年と月から月間カレンダーを表示する（[原著](https://inventwithpython.com/bigbookpython/project8.html)） | 検証待ち | 曜日と閏年の計算を書いて検証する。DateTime/Calendarは使えない。 |
| 9 | [箱の中のニンジン]({{< relref "09-carrot-in-a-box.md" >}}) — 主張とはったりを頼りに2つの箱から選ぶ（[原著](https://inventwithpython.com/bigbookpython/project9.html)） | 検証待ち | 疑似乱数生成器で箱を選ぶ。端末で各プレイヤーの情報を非公開にする方法も試す。 |
| 10 | [丁半]({{< relref "10-cho-han.md" >}}) — 2個のサイコロの合計が奇数か偶数かに賭ける（[原著](https://inventwithpython.com/bigbookpython/project10.html)） | 検証待ち | シード付きのサイコロ生成を検証する。公開された乱数APIはない。 |
| 11 | [釣り見出し生成器]({{< relref "11-clickbait-headline-generator.md" >}}) — ひな形と語の一覧から見出しを組み立てる（[原著](https://inventwithpython.com/bigbookpython/project11.html)） | 検証待ち | 検証済みの疑似乱数生成器でひな形と語を選ぶ。 |
| 12 | [コラッツ数列]({{< relref "12-collatz.md" >}}) — 半分にするか3倍して1を足す操作を繰り返す（[原著](https://inventwithpython.com/bigbookpython/project12.html)） | 言語の基本機能 | Integerのオーバーフローを防ぎ、1で止める。 |
| 13 | [ライフゲーム]({{< relref "13-conway-s-game-of-life.md" >}}) — マス目の次の世代を計算する（[原著](https://inventwithpython.com/bigbookpython/project13.html)） | 検証待ち | マスの規則はArrayで表せる。動くゲームにはTUIタイマーとキーの検証が必要。 |
| 14 | [カウントダウン]({{< relref "14-countdown.md" >}}) — 時間に合わせて減る数字を示す（[原著](https://inventwithpython.com/bigbookpython/project14.html)） | 検証待ち | セッション内のTUIタイマーを使い、数え方と端末の復元を検証する。壁時計は不要。 |
| 15 | [深い洞窟]({{< relref "15-deep-cave.md" >}}) — 壁が変化する深い洞窟を生成する（[原著](https://inventwithpython.com/bigbookpython/project15.html)） | 検証待ち | 疑似乱数生成器を定め、TUIタイマーによる画面更新を検証する。 |
| 16 | [ひし形]({{< relref "16-diamonds.md" >}}) — 各行の幅からひし形を表示する（[原著](https://inventwithpython.com/bigbookpython/project16.html)） | 言語の基本機能 | 奇数幅と偶数幅、空白の配置を確認する。 |
| 17 | [サイコロ算数]({{< relref "17-dice-math.md" >}}) — サイコロの目で足し算を練習する（[原著](https://inventwithpython.com/bigbookpython/project17.html)） | 検証待ち | 乱数による問題には検証済みの疑似乱数生成器が必要。 |
| 18 | [サイコロ式]({{< relref "18-dice-roller.md" >}}) — サイコロ式を解析して出目を合計する（[原著](https://inventwithpython.com/bigbookpython/project18.html)） | 検証待ち | 任意の+K/-K修飾子を伴うNdM解析器と疑似乱数生成器を書き、範囲とオーバーフローを確認する。 |
| 19 | [デジタル時計]({{< relref "19-digital-clock.md" >}}) — 現在時刻を数字で表示する（[原著](https://inventwithpython.com/bigbookpython/project19.html)） | 不足しているAPI | 壁時計/DateTime APIがない。TUIタイマーだけでは現在時刻を示せない。 |
| 20 | [数字の流れ]({{< relref "20-digital-stream.md" >}}) — 落ちる文字列を表示する（[原著](https://inventwithpython.com/bigbookpython/project20.html)） | 検証待ち | TUIタイマー、表示範囲、文字を選ぶ疑似乱数生成器を検証する。 |
| 21 | [DNAの可視化]({{< relref "21-dna-visualization.md" >}}) — 文字の位置でDNAのらせんを描く（[原著](https://inventwithpython.com/bigbookpython/project21.html)） | 検証待ち | 静止画は作れる。スクロールにはTUIタイマーの検証が必要。 |
| 22 | [アヒルの子]({{< relref "22-ducklings.md" >}}) — 複数のアヒルの子を画面上で動かす（[原著](https://inventwithpython.com/bigbookpython/project22.html)） | 検証待ち | TUIタイマー、表示領域、間隔の生成を検証する。 |
| 23 | [線画の道具]({{< relref "23-etching-drawer.md" >}}) — 方向キーで格子に線を描く（[原著](https://inventwithpython.com/bigbookpython/project23.html)） | 検証待ち | TUIキーイベントと、画面の寸法変更後も格子が保たれることを検証する。 |
| 24 | [約数探し]({{< relref "24-factors.md" >}}) — 整数の約数をすべて探す（[原著](https://inventwithpython.com/bigbookpython/project24.html)） | 言語の基本機能 | 0と負数に対する挙動を定める。 |
| 25 | [早押し]({{< relref "25-fast-draw.md" >}}) — 合図が出たらすぐにキーを押す（[原著](https://inventwithpython.com/bigbookpython/project25.html)） | 検証待ち | TUIタイマー、イベントの時刻または経過時間、実際の入力を検証する。 |
| 26 | [フィボナッチ数列]({{< relref "26-fibonacci.md" >}}) — 直前の2つを足して数列を作る（[原著](https://inventwithpython.com/bigbookpython/project26.html)） | 言語の基本機能 | Integerがオーバーフローする前の上限を示す。 |
| 27 | [水槽]({{< relref "27-fish-tank.md" >}}) — 文字の風景の中で魚を動かす（[原著](https://inventwithpython.com/bigbookpython/project27.html)） | 検証待ち | TUIタイマー、表示領域、移動量の生成を検証する。 |
| 28 | [色を広げるパズル]({{< relref "28-flooder.md" >}}) — つながったマスを塗り替えて単色にする（[原著](https://inventwithpython.com/bigbookpython/project28.html)） | 検証待ち | 塗りつぶしは表現できる。TUIのキーと色を検証する。 |
| 29 | [森林火災の模擬]({{< relref "29-forest-fire-sim.md" >}}) — 格子上の木の間で火が広がる様子を模擬する（[原著](https://inventwithpython.com/bigbookpython/project29.html)） | 検証待ち | 疑似乱数生成器、TUIタイマー、格子の境界を検証する。 |
| 30 | [四目並べ]({{< relref "30-four-in-a-row.md" >}}) — 列に駒を落とし、4つ並んだか判定する（[原著](https://inventwithpython.com/bigbookpython/project30.html)） | 言語の基本機能 | ArrayとReadLineでプレイヤーの手番を扱う。 |
| 31 | [数当て]({{< relref "31-guess-the-number.md" >}}) — 大小のヒントで数を当てる（[原著](https://inventwithpython.com/bigbookpython/project31.html)） | 検証待ち | 検証済みの疑似乱数生成器で秘密の数を選ぶ。数を事前に決める形式も可能。 |
| 32 | [信じやすさ]({{< relref "32-gullible.md" >}}) — 指定した答えが入力されるまで問いを繰り返す（[原著](https://inventwithpython.com/bigbookpython/project32.html)） | 言語の基本機能 | 終了条件とEOFでの挙動を明示する。 |
| 33 | [ハッキングのミニゲーム]({{< relref "33-hacking-minigame.md" >}}) — 文字の位置が一致する手がかりからパスワードを選ぶ（[原著](https://inventwithpython.com/bigbookpython/project33.html)） | 検証待ち | 疑似乱数生成器で正解を選ぶ。比較の規則は表現できる。 |
| 34 | [ハングマンとギロチン]({{< relref "34-hangman-guillotine.md" >}}) — 限られた回数で文字を当て、失敗を絵で示す（[原著](https://inventwithpython.com/bigbookpython/project34.html)） | 検証待ち | 単語集から選び、Unicodeスカラー値と複数行の絵を確認する。 |
| 35 | [六角形の格子]({{< relref "35-hex-grid.md" >}}) — つながった六角形の格子を表示する（[原著](https://inventwithpython.com/bigbookpython/project35.html)） | 言語の基本機能 | 空白とASCII文字の幅を管理する。 |
| 36 | [砂時計]({{< relref "36-hourglass.md" >}}) — 文字の行で砂時計を描く（[原著](https://inventwithpython.com/bigbookpython/project36.html)） | 言語の基本機能 | 対称性と幅を確認する。 |
| 37 | [空腹のロボット]({{< relref "37-hungry-robots.md" >}}) — プレイヤーに近づくロボットから逃げる（[原著](https://inventwithpython.com/bigbookpython/project37.html)） | 検証待ち | TUIイベント・タイマーと格子上の衝突規則を検証する。 |
| 38 | [容疑者を告発する]({{< relref "38-j-accuse.md" >}}) — 手がかりから容疑者を特定する（[原著](https://inventwithpython.com/bigbookpython/project38.html)） | 検証待ち | 手がかりのデータ構造とシード付き事件生成を検証する。 |
| 39 | [ラングトンのアリ]({{< relref "39-langton-s-ant.md" >}}) — 格子上でアリの向きを変え、マスを反転する（[原著](https://inventwithpython.com/bigbookpython/project39.html)） | 検証待ち | 論理はArrayで表せる。連続した動作にはTUIタイマーの検証が必要。 |
| 40 | [リート表記]({{< relref "40-leetspeak.md" >}}) — 文字を数字や記号に置き換える（[原著](https://inventwithpython.com/bigbookpython/project40.html)） | 言語の基本機能 | 置換表と大文字・小文字の扱いを定める。 |
| 41 | [幸運の星]({{< relref "41-lucky-stars.md" >}}) — 運任せのゲームで星を選ぶ（[原著](https://inventwithpython.com/bigbookpython/project41.html)） | 検証待ち | 得点規則を定め、疑似乱数生成器を検証する。 |
| 42 | [占いの玉]({{< relref "42-magic-fortune-ball.md" >}}) — 質問に答えを返す（[原著](https://inventwithpython.com/bigbookpython/project42.html)） | 検証待ち | 疑似乱数生成器で答えを選ぶか、再現用にシードを使う。 |
| 43 | [マンカラ]({{< relref "43-mancala.md" >}}) — 盤上に種をまいて点数を集める（[原著](https://inventwithpython.com/bigbookpython/project43.html)） | 言語の基本機能 | Arrayで手番と特別な穴の規則を確認する。 |
| 44 | [2次元迷路]({{< relref "44-maze-runner-2d.md" >}}) — 2次元の迷路を進む（[原著](https://inventwithpython.com/bigbookpython/project44.html)） | 検証待ち | TUIキーと表示領域を検証する。固定の迷路なら実現できる。 |
| 45 | [3次元迷路]({{< relref "45-maze-runner-3d.md" >}}) — 迷路の通路を立体的な文字の眺めとして描く（[原著](https://inventwithpython.com/bigbookpython/project45.html)） | 検証待ち | 実際のホストで視界の描画とTUIキーを検証する。 |
| 46 | [100万回のサイコロ統計]({{< relref "46-million-dice-statistics.md" >}}) — 多数のサイコロの出目の度数を数える（[原著](https://inventwithpython.com/bigbookpython/project46.html)） | 検証待ち | 疑似乱数生成器、Integerの境界、100万回反復したときの実行時間を検証する。 |
| 47 | [モンドリアン風の絵]({{< relref "47-mondrian-art-generator.md" >}}) — 色付きの長方形をモンドリアン風に生成する（[原著](https://inventwithpython.com/bigbookpython/project47.html)） | 検証待ち | TUIの色、表示領域の寸法、位置の生成を検証する。 |
| 48 | [モンティ・ホール問題]({{< relref "48-monty-hall.md" >}}) — 選択を維持・変更する試行を比較する（[原著](https://inventwithpython.com/bigbookpython/project48.html)） | 検証待ち | 疑似乱数生成器と、司会者が外れの扉を開く規則を検証する。 |
| 49 | [掛け算表]({{< relref "49-multiplication.md" >}}) — 列をそろえて掛け算表を表示する（[原著](https://inventwithpython.com/bigbookpython/project49.html)） | 言語の基本機能 | 表の大きさと列の幅を定める。 |
| 50 | [99本の瓶]({{< relref "50-ninety-nine-bottles.md" >}}) — 瓶の数を減らす詩を作る（[原著](https://inventwithpython.com/bigbookpython/project50.html)） | 言語の基本機能 | ループと単数・複数の形を使う。 |
| 51 | [大小を変えた瓶の詩]({{< relref "51-ninety-nniine-boottels.md" >}}) — 瓶を数える詩の大文字・小文字を変える（[原著](https://inventwithpython.com/bigbookpython/project51.html)） | 検証待ち | 変化用の疑似乱数生成器を定め、Unicodeの大小文字変換を調べる。 |
| 52 | [基数]({{< relref "52-numeral-systems.md" >}}) — 異なる基数の間で数値を変換する（[原著](https://inventwithpython.com/bigbookpython/project52.html)） | 言語の基本機能 | 2〜36進数を定め、オーバーフローを確認する。 |
| 53 | [元素周期表]({{< relref "53-periodic-table-of-the-elements.md" >}}) — 表から元素を検索する（[原著](https://inventwithpython.com/bigbookpython/project53.html)） | 検証待ち | 再利用できる権利を確認した元素データを用意し、埋め込みまたはファイル読み込みを検証する。 |
| 54 | [ピッグ・ラテン]({{< relref "54-pig-latin.md" >}}) — 英単語の先頭の子音を動かして接尾辞を付ける（[原著](https://inventwithpython.com/bigbookpython/project54.html)） | 言語の基本機能 | 規則をラテン文字の単語に限り、句読点を保つ。 |
| 55 | [宝くじ]({{< relref "55-powerball-lottery.md" >}}) — 券を多くの抽選結果と比較する（[原著](https://inventwithpython.com/bigbookpython/project55.html)） | 検証待ち | 疑似乱数生成器、番号の重複禁止、大規模な試行の上限を検証する。 |
| 56 | [素数]({{< relref "56-primes.md" >}}) — 素数を判定または列挙する（[原著](https://inventwithpython.com/bigbookpython/project56.html)） | 言語の基本機能 | 0、1、負数、ループの境界を確認する。 |
| 57 | [進捗バー]({{< relref "57-progress-bar.md" >}}) — 作業の進み具合をバーで示す（[原著](https://inventwithpython.com/bigbookpython/project57.html)） | 検証待ち | 割合に基づくバーは作れる。随時更新にはTUIタイマーの検証が必要。 |
| 58 | [虹]({{< relref "58-rainbow.md" >}}) — 色の付いた文字の虹を画面上で動かす（[原著](https://inventwithpython.com/bigbookpython/project58.html)） | 検証待ち | 端末の色表示能力とTUIタイマーを検証する。 |
| 59 | [じゃんけん]({{< relref "59-rock-paper-scissors.md" >}}) — コンピューターとじゃんけんをする（[原著](https://inventwithpython.com/bigbookpython/project59.html)） | 検証待ち | コンピューターの手を選ぶ疑似乱数生成器を検証する。 |
| 60 | [必勝じゃんけん]({{< relref "60-rock-paper-scissors-always-win.md" >}}) — 相手の手を見てから勝つ手を選ぶ例を示す（[原著](https://inventwithpython.com/bigbookpython/project60.html)） | 言語の基本機能 | その規則を率直に説明する。 |
| 61 | [ROT13暗号]({{< relref "61-rot13.md" >}}) — ラテン文字を13文字ずらす（[原著](https://inventwithpython.com/bigbookpython/project61.html)） | 言語の基本機能 | A〜Zとa〜z以外の文字を保つ。 |
| 62 | [回転する立方体]({{< relref "62-rotating-cube.md" >}}) — 文字で回転する立方体を描く（[原著](https://inventwithpython.com/bigbookpython/project62.html)） | 不足しているAPI | 正弦・余弦が必要。あるいは、Float計算とTUIフレームを検証した角度表を使う。 |
| 63 | [ウル王朝のゲーム]({{< relref "63-royal-game-of-ur.md" >}}) — 古代の盤上ゲームでマスの経路を進む（[原著](https://inventwithpython.com/bigbookpython/project63.html)） | 検証待ち | サイコロの規則を定め、疑似乱数生成器とコマンド入力を検証する。 |
| 64 | [7セグメント表示]({{< relref "64-seven-segment-display-module.md" >}}) — 文字による7セグメントの数字を描く（[原著](https://inventwithpython.com/bigbookpython/project64.html)） | 言語の基本機能 | 各数字の型を定め、複数桁に対応する。 |
| 65 | [輝くじゅうたん]({{< relref "65-shining-carpet.md" >}}) — 長方形のマスで繰り返し模様を描く（[原著](https://inventwithpython.com/bigbookpython/project65.html)） | 言語の基本機能 | 画面に収まるよう、模様と寸法を定める。 |
| 66 | [単純換字式暗号]({{< relref "66-simple-substitution-cipher.md" >}}) — 置換鍵に従って文字を替える（[原著](https://inventwithpython.com/bigbookpython/project66.html)） | 言語の基本機能 | 鍵にA〜Zが各1回ずつ含まれることを確かめる。 |
| 67 | [正弦波のメッセージ]({{< relref "67-sine-message.md" >}}) — 文章を正弦波に沿って動かす（[原著](https://inventwithpython.com/bigbookpython/project67.html)） | 不足しているAPI | Math.Sinは使えない。固定の波形表を書くかAPIを追加し、動かす場合はTUIも検証する。 |
| 68 | [スライドパズル]({{< relref "68-sliding-tile-puzzle.md" >}}) — 数字のタイルを空白に滑らせる（[原著](https://inventwithpython.com/bigbookpython/project68.html)） | 検証待ち | 解ける盤面の生成と混ぜる疑似乱数生成器を検証する。文字コマンドも使える。 |
| 69 | [カタツムリ競走]({{< relref "69-snail-race.md" >}}) — 少しずつ進むカタツムリを競走させる（[原著](https://inventwithpython.com/bigbookpython/project69.html)） | 検証待ち | 速さの生成、TUIタイマー、複数マスの描画を検証する。 |
| 70 | [そろばん]({{< relref "70-soroban-japanese-abacus.md" >}}) — 日本のそろばんを表示して動かす（[原著](https://inventwithpython.com/bigbookpython/project70.html)） | 検証待ち | 静止画は作れる。キーと状態にはTUIの検証が必要。 |
| 71 | [音のまね]({{< relref "71-sound-mimic.md" >}}) — 音の並びを聞いて繰り返す（[原著](https://inventwithpython.com/bigbookpython/project71.html)） | 不足しているAPI | 音生成・再生APIがない。音声と回答のタイミングを検証可能にする必要がある。 |
| 72 | [大小文字を交互にする]({{< relref "72-spongecase.md" >}}) — 大文字と小文字を交互にする（[原著](https://inventwithpython.com/bigbookpython/project72.html)） | 言語の基本機能 | Unicodeの変換でスカラー値の個数が増える場合を説明する。 |
| 73 | [数独]({{< relref "73-sudoku-puzzle.md" >}}) — 数独の盤面を検査または解く（[原著](https://inventwithpython.com/bigbookpython/project73.html)） | 検証待ち | 検査器は作れる。問題生成には一意性と疑似乱数生成器の検証が必要。 |
| 74 | [文章の読み上げ]({{< relref "74-text-to-speech-talker.md" >}}) — 入力された文章を声に出して読む（[原著](https://inventwithpython.com/bigbookpython/project74.html)） | 不足しているAPI | v0.3にTTS、音声、OS読み上げAPIはない。 |
| 75 | [3枚カードのモンテ]({{< relref "75-three-card-monte.md" >}}) — 位置が変わった当たりカードを追う（[原著](https://inventwithpython.com/bigbookpython/project75.html)） | 検証待ち | 混ぜる疑似乱数生成器と、動きを見せるならTUIタイマーを検証する。 |
| 76 | [三目並べ]({{< relref "76-tic-tac-toe.md" >}}) — XとOを交互に置き、勝敗か引き分けを判定する（[原著](https://inventwithpython.com/bigbookpython/project76.html)） | 言語の基本機能 | 3×3の盤面と8通りの勝利列を調べる。 |
| 77 | [ハノイの塔]({{< relref "77-tower-of-hanoi-puzzle.md" >}}) — 大きな円盤を小さい円盤の上に置かずに棒の間で動かす（[原著](https://inventwithpython.com/bigbookpython/project77.html)） | 言語の基本機能 | Arrayで移動を検証し、回数を数える。 |
| 78 | [ひっかけ問題]({{< relref "78-trick-questions.md" >}}) — 思い込みを誘うなぞなぞを出し、答えを示す（[原著](https://inventwithpython.com/bigbookpython/project78.html)） | 言語の基本機能 | 問題と答えを保存し、EOFを扱う。 |
| 79 | [2048]({{< relref "79-twenty-forty-eight.md" >}}) — 盤面で2048のタイルを滑らせて結合する（[原著](https://inventwithpython.com/bigbookpython/project79.html)） | 検証待ち | 新しいタイルの生成とTUIのキー入力を検証する。 |
| 80 | [ヴィジュネル暗号]({{< relref "80-vigenere-cipher.md" >}}) — 繰り返す鍵でラテン文字を暗号化する（[原著](https://inventwithpython.com/bigbookpython/project80.html)） | 言語の基本機能 | 他の文字をどう飛ばすか定め、空の鍵を退ける。 |
| 81 | [水桶問題]({{< relref "81-water-bucket-puzzle.md" >}}) — 容量が決まった桶で水量を測る（[原著](https://inventwithpython.com/bigbookpython/project81.html)） | 言語の基本機能 | 整数の状態を使い、注ぐ・満たす・空にする操作を調べる。 |

## 計画段階の章を読む

各行からその課題の章へ移動できます。実装済みの教材ではソースと結果を読んでください。ほかの52ページには、データ要件、手順、受け入れ例を記した日本語の`PLAN.ja.md`のダウンロードがありますが、WBasicのソースはまだありません。「検証待ち」「不足しているAPI」の項目では、原案の形式に対する制限を明示します。
