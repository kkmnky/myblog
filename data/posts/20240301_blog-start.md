---
title: 初めてのブログの構築
date: 2024-03-01
summary: Next.js + Tailwind CSS + Contentlayer で自分だけのMarkdownブログを作る
tags:
  - ブログ
  - Next.js
  - Tailwind CSS
  - Contentlayer
---

## ブログを作ったきっかけ

- 自分の転職を機に勉強するモチベーションとして自作のブログを運用してみたく作成しました。
- あるあるですが、読書メモなど技術以外の記事を書きたかったので自分でよしなにできるブログが欲しいと思い作りました。
- 技術系の記事でうまくまとめられたものは Qiita や Zenn などに投稿したいと思っています。
- 開発力をあげるために自分で作成・運用ができるようにはてなブログなどには頼りませんでした。

## 使った技術

技術は手段でしかなく、流行り廃りもあるので選定にはこだわってはいません。強いていうなら

- 自分の仕事に活かせそうなもの
- コストをかけずにできる
- 参考記事があるもの
  - ブログ自体の作成に時間をかけるといつまで経っても始められないため
  - 自分の開発力がそこまでないため

です。

### [Next.js](https://nextjs.org/)

- [React](https://ja.react.dev/) のメタフレームワーク。
- 他にも Gatsby, Astro がありますが、業務で使う可能性が高いものが Next.js でした。
  - 時間があれば勉強したい...
- 推奨になった`App Router`を使いました。
  - 以前触ったのが`Pages Router`であったため、リハビリのため[Learn Nextjs](https://nextjs.org/learn)をやりました。
- ディレクトリ構成はやりながら自分の方法を見つければいいと思ったのでとりあえず[この方の記事](https://zenn.dev/brachio_takumi/articles/5af43549cdc4e0)を参考にしました。

### [Tailwind CSS](https://tailwindcss.com/)

- 以前触ったことがあり、Next.js のスターターに最初から入っているので tailwind を採用しています。

### [Contentlayer](https://contentlayer.dev/)

- 書きやすさと他サービスへの移植性の観点から投稿記事を Markdown 形式で書きたく、いろいろな参考記事があり、採用しました。
- 利用するにあたり、[Getting Started](https://contentlayer.dev/docs/getting-started-cddd76b7)で勉強しました。
  - 色々参考記事がありましたが、結局これが一番よかったです。
  - 段階的に学ぶことで初期セットアップに必要なもの、設定ファイルに書くべきもの、実装の仕方がわかるようになるため。
- 後から Zenn の CSS が用意されていることに気がつき、[これ](https://zenn.dev/team_zenn/articles/intro-zenn-markdown)にすればよかったとも少し後悔している

## ブログを実装する

### とりあえずサンプルで起動してみる

自分にデザインの素養がないのとゼロから考えるのは大変だったためフリーで参考になりそうなものを探しました。最終的には[このサイト](https://github.com/timlrx/tailwind-nextjs-starter-blog)のが自分の実現したいブログに一番近く、MIT ライセンスであったため採用しました。

README に書いてある Quick Start Guide を参照すれば苦労することなく起動することができます。同じように参考にしている記事がいくつかありました。

- [ブログをリニューアルしました](https://oikawa.dev/blog/20220508_blog-setup)
- [そろそろ自分のブログを作ってみることに...　序章](https://zenn.dev/melodyclue/scraps/fe11992773f65b)

しかし、一部修正をしようにも、本サイトでは自作パッケージが使われていて、依存パッケージのバージョンを変えたり使われている技術を理解するのが大変でした。結局このパッケージを使うことを諦め、ゼロから自分で作りました。サンプルページをそのまま使う分には立ち上げも簡単なため非常に良いですし、ヘッダやダークモードの切り替えなど各コンポーネントで参考になるところはあるのでサンプルとしては非常によかったと思います。

### トップページを作る

ということでゼロから自分で作ることにしました。

前述の通りサンプルの構成は気に入っていたので、[ヘッダ](https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/main/components/Header.tsx)と[フッタ](https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/main/components/Footer.tsx)はサンプルのコンポーネントを持ってきて加工しました。

トップページのコンポーネントは以前[本記事](https://qiita.com/kmnky/items/614a22d6724a85dee0da#tailwindcss)にて学習した際に tailwind のコンポーネントの参考になりそうなサイトを備忘として残しておいたのでこちらから探しました(よろしければ Qiita 記事にいいねください)。最終的には[TAILBLOCKS](https://tailblocks.cc/)のブログコンポーネントを参考にさせていただきました。

### 投稿ページを作る

前述のサンプルで Contentlayer を使っていたのでそのまま Contentlayer を採用しています。私のように Contentlayer の記事を色々みても config ファイルの修正などどれをどうすればいいのかわからない方は[Getting Started](https://contentlayer.dev/docs/getting-started-cddd76b7) をやって理解を深めてやると良いと思います。本ページは Getting Started の結果をほぼそのまま使っています。

Contentlayer を使ってブログを作っている参考サイトで kedama-t さんの[ブログ](https://kedama-t.netlify.app/posts/tech/01.create_own_blog)や[Qiita 記事](https://qiita.com/kedama-t)がとても参考になりました。こちらのブログは自分で CSS を定義したり、独自色があって素敵でした。ただ、私には CSS を自分で作るセンスがなかったので、[こちらの記事](https://zenn.dev/team_zenn/articles/intro-zenn-markdown)の CSS のみ適用するというサボりをしました。（Contentlayer を使わず html パッケージを使うというのもありだなと思いました。）

ついでに[こちらの記事](https://inari-tech.net/posts/zenn-toc-tocbot)によると簡単に目次が作れそうだったので、ほぼそのまま適用しました。INARI TECH さんは他にも参考になりそうな記事やコンポーネントを公開していました。

## おわりに

自分なりにシンプルでいいブログが作れたと満足していますが、まだ一部のページしか作れていないのでやることばかりです。

- About ページを作る
- タグをつける
- ブログ一覧ページをつける
- 埋め込みリンクができるようにする
- SEO や広告など

記事も投稿しつつ、改良もしていきたいと思います。引き続き温かい目で本ブログをご参考ください。

## 参考文献

- 使用技術の学習
  - [Learn Nextjs](https://nextjs.org/learn)
  - [Content Layer Getting Started](https://contentlayer.dev/docs/getting-started-cddd76b7)
- デザインの参考
  - [Nextjs のサンプル集](https://github.com/vercel/next.js/tree/deprecated-main/examples)
  - [このサイト](https://github.com/timlrx/tailwind-nextjs-starter-blog)
  - [ブログの構築](https://kedama-t.netlify.app/posts/tech/01.create_own_blog)
  - [TAILBLOCKS](https://tailblocks.cc/)
  - [Next.js 製 個人ブログに zenn-markdown-html と zenn-content-css を導入する](https://zenn.dev/team_zenn/articles/intro-zenn-markdown)
  - [tocbot で Zenn とか Qiita みたいな目次を作る](https://inari-tech.net/posts/zenn-toc-tocbot)
- その他
  - [Next.js+Go でクイズアプリを作ってみる](https://qiita.com/kmnky/items/614a22d6724a85dee0da)
