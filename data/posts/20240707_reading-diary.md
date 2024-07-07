---
title: ざっくりつかむCSS設計
date: 2024-07-07
summary: ざっくりつかむCSS設計に関する読書日記
tags:
  - 読書日記
  - frontend
  - CSS
---

## はじめに

前回Qiitaで書いた[Flutterの勉強記事](https://qiita.com/kmnky/items/77d4379dddbba53b3009)が週間トレンドになりました。
読んでくださった方々ありがとうございます。

業務・プライベートで忙しく、なかなか投稿できませんでした。
落ち着いてきたので、プライベートでまとめ直してまた記事にしていこうと思います。

その一つとして、CSS設計を勉強するべくマイナビ出版の "ざっくりつかむCSS設計" を読みました。今回はその本の紹介です。

![ざっくりつかむCSS設計](https://m.media-amazon.com/images/I/813wACepOaL._SY522_.jpg)
_[高津戸壮　 ざっくりつかむCSS設計　 2022/1/18](https://www.amazon.co.jp/%E3%81%96%E3%81%A3%E3%81%8F%E3%82%8A%E3%81%A4%E3%81%8B%E3%82%80-CSS%E8%A8%AD%E8%A8%88-%E3%83%AA%E3%83%95%E3%83%AD%E3%83%BC%E7%89%88-%E9%AB%98%E6%B4%A5%E6%88%B8-%E5%A3%AE-ebook/dp/B09NKTJL73/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dib=eyJ2IjoiMSJ9.LPARDk_pe73m3xT1YwtHjYUC7ZntRMcKjhLhFZ3kN0TzgLm5JE1hzQaeBfE-Y0MJ.V5TS7vAkWdvMQiK4G0em6gxf0t38CSfiQHmeRWXgOK4&dib_tag=se&keywords=%E3%81%96%E3%81%A3%E3%81%8F%E3%82%8A%E3%81%A4%E3%81%8B%E3%82%80+css%E8%A8%AD%E8%A8%88&qid=1720322082&sr=8-1)_


## 内容をざっくりかいつまんで

本のタイトルの通りCSS設計について書いてある本です。

### BEM

まずは、有名なBEMについて書かれています。
BEMとは、Block, Element, Modifierごとにルールを決めることで、命名からどこにスタイルが当たっているかわかりやすくなるものです。
この本を読む前から下記サイトで私は勉強していたので割愛します。
- [【命名規則】BEMを使った書き方についてまとめてみた【CSS】](https://qiita.com/takahirocook/items/01fd723b934e3b38cbbc)
- [BEM記法の命名規則をご紹介！筆者が普段使う命名規則をまとめてみた！](https://matsuichi-design.com/coding/bem/)
- [【CSS設計】ゼロからわかるBEM超入門](https://zenn.dev/nagan/articles/dac6fa662f4dab)

### SMACSS

次に、CSSを書く上で助けになるSMACSS(Scalable and Modular Architecture for CSS, スマックス)やユーティリティクラスを紹介しています。

SMACSSは、
- Base: サイトの土台となるCSS群(normalize.css, reset css)
- Lyout: ヘッダやサイドなどページのレイアウトを決めるCSS群
- Module: 再利用するためのパーツ ※この本では説明されていない
- State: レイアウトやモジュールの特定の状態を示す ※この本では説明されていない
- Theme: サイトの見た目（ライトやブラックなどなど）
の5つのルールに分かれています。そのうち3つのルールをこの本では解説しています。

ユーティリティクラスはほぼ単一のスタイルを割り当てられたもので、それぞれのクラスに付け加えることで調整できるクラス。
本サイトもtailwindを使っているので馴染みのあるものでした。

### 余白設計

これは非常に共感するものでした。私も初めてBEMでコードを書き始めた時にいろいろなところに`margin-top`や`margin-bottom`を書いていました。
ぐちゃぐちゃになってよくないなあと途中から思い始め、悩んでいた矢先この本を見つけました。
余白の方向を上か下に絞ることや、デザインから統一性を持たせて決めておくなどなど勉強になりました。

### ビルドしてCSSを作る

CSSを改善するためにビルドして使うツールを紹介しています。

- minify
  - 余白などを削除してCSSをより軽量にするためのもの
- Sass (Syntactically awesome style sheets)
  - 変数を使用したり、mixinというスタイルの宣言群を利用することでよりわかりやすく書きやすいCSSにできる
- Autoprefixer
  - CSSを書いたといっても全ブラウザがサポートできているわけではない
  - サポート状況は[Can I use](https://caniuse.com/)で確認できる
  - ベンダ特有のものは`-webkit-`と言ったようにvendor prefixがついている
  - autoprefixerはサポート状況と照らし合わせ、vendor prefixをつけてくれる
- PostCSS
  - CSSに対して何かしらの変換処理を行い、別のCSSを出力するAPIを提供するソフトウェアと解説している
  - cssnanoやstylelintなどがあり、使うか使わないかはプロジェクトの自由

## 感想

BEMで書くのはもう古く最近のプロジェクトでCSS設計を考えることは少なくなっているかもしれません。
実際、私もtailwindばかりでそんなに考えていませんでした。
しかし、業務やプライベートでBEMで開発をしてみたところ、CSSの理解が深まりました。
なかなか触れない今だからこそ勉強してみると良いかもしれません。

「CSS おすすめ 本」などで調べると、
- [Web制作者のためのCSS設計の教科書 モダンWeb開発に欠かせない「修正しやすいCSS」の設計手法](https://www.amazon.co.jp/Web%E5%88%B6%E4%BD%9C%E8%80%85%E3%81%AE%E3%81%9F%E3%82%81%E3%81%AECSS%E8%A8%AD%E8%A8%88%E3%81%AE%E6%95%99%E7%A7%91%E6%9B%B8-%E3%83%A2%E3%83%80%E3%83%B3Web%E9%96%8B%E7%99%BA%E3%81%AB%E6%AC%A0%E3%81%8B%E3%81%9B%E3%81%AA%E3%81%84%E3%80%8C%E4%BF%AE%E6%AD%A3%E3%81%97%E3%82%84%E3%81%99%E3%81%84CSS%E3%80%8D%E3%81%AE%E8%A8%AD%E8%A8%88%E6%89%8B%E6%B3%95-%E8%B0%B7-%E6%8B%93%E6%A8%B9/dp/4844336355/ref=sr_1_5?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dib=eyJ2IjoiMSJ9.LPARDk_pe73m3xT1YwtHjYUC7ZntRMcKjhLhFZ3kN0TzgLm5JE1hzQaeBfE-Y0MJ.V5TS7vAkWdvMQiK4G0em6gxf0t38CSfiQHmeRWXgOK4&dib_tag=se&keywords=%E3%81%96%E3%81%A3%E3%81%8F%E3%82%8A%E3%81%A4%E3%81%8B%E3%82%80+css%E8%A8%AD%E8%A8%88&qid=1720322082&sr=8-5)
- [CSS設計完全ガイド　～詳細解説＋実践的モジュール集](https://www.amazon.co.jp/CSS%E8%A8%AD%E8%A8%88%E5%AE%8C%E5%85%A8%E3%82%AC%E3%82%A4%E3%83%89-%EF%BD%9E%E8%A9%B3%E7%B4%B0%E8%A7%A3%E8%AA%AC%EF%BC%8B%E5%AE%9F%E8%B7%B5%E7%9A%84%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB%E9%9B%86-%E5%8D%8A%E7%94%B0-%E6%83%87%E5%BF%97-ebook/dp/B0856YMH7L/ref=sr_1_4?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dib=eyJ2IjoiMSJ9.LPARDk_pe73m3xT1YwtHjYUC7ZntRMcKjhLhFZ3kN0TzgLm5JE1hzQaeBfE-Y0MJ.V5TS7vAkWdvMQiK4G0em6gxf0t38CSfiQHmeRWXgOK4&dib_tag=se&keywords=%E3%81%96%E3%81%A3%E3%81%8F%E3%82%8A%E3%81%A4%E3%81%8B%E3%82%80+css%E8%A8%AD%E8%A8%88&qid=1720322082&sr=8-4)
- [ざっくりつかむCSS設計](https://www.amazon.co.jp/%E3%81%96%E3%81%A3%E3%81%8F%E3%82%8A%E3%81%A4%E3%81%8B%E3%82%80-CSS%E8%A8%AD%E8%A8%88-%E3%83%AA%E3%83%95%E3%83%AD%E3%83%BC%E7%89%88-%E9%AB%98%E6%B4%A5%E6%88%B8-%E5%A3%AE-ebook/dp/B09NKTJL73/ref=sr_1_1?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&dib=eyJ2IjoiMSJ9.LPARDk_pe73m3xT1YwtHjYUC7ZntRMcKjhLhFZ3kN0TzgLm5JE1hzQaeBfE-Y0MJ.V5TS7vAkWdvMQiK4G0em6gxf0t38CSfiQHmeRWXgOK4&dib_tag=se&keywords=%E3%81%96%E3%81%A3%E3%81%8F%E3%82%8A%E3%81%A4%E3%81%8B%E3%82%80+css%E8%A8%AD%E8%A8%88&qid=1720322082&sr=8-1)

が出てきます。今回は体型立てて学ぶというよりは、業務で困っているTipsなども知りたいと思い、紹介した本を選びました。
私の目的通り余白設計など現場で知りたいような知識がいっぱい書かれている良い本でした。
おそらくCSSを知らない、初めて勉強するような人は別の本がよく、少し勉強をして困り始めてきた頃に読むと良いと思います。
他のサイトでも読む順番は最後になっていることが多いです。

フロントエンドをやり始めると、この本とは別のCSS設計の本を読みたいですし、デザイン・UX・アクセシビリティなどなどまだまだ勉強しないといけないことだらけです。
ちょっとずつにはなりますが、勉強して、発信していけるよう頑張ります。
最後まで読んでいただきありがとうございました。