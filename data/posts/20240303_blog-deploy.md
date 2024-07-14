---
title: ブログをデプロイする
date: 2024-03-03
summary: ローカルで開発したブログをCloudflareへデプロイする
tags:
  - ブログ作成
  - Next.js
  - Cloudflare
---

## はじめに

- 今までローカルで開発してたブログをホスティングサービスにデプロイします。
- [前回](20240301_blog-start)の記事の続きになります。

## デプロイ先の検討

技術の選定方針は[前回](20240301_blog-start)と同じです。

> 技術は手段でしかなく、流行り廃りもあるので選定にはこだわってはいません。強いていうなら
>
> - 自分の仕事に活かせそうなもの
> - コストをかけずにできる
> - 参考記事があるもの
>   - ブログ自体の作成に時間をかけるといつまで経っても始められないため
>   - 自分の開発力がそこまでないため
>     です。

結論から言うと今回は[Cloudflare Pages](https://pages.cloudflare.com/)を使うことにしました。
理由としては、

- 商用、無料で利用できるため
- Cloudflare を触って機能を把握してみたかったため
  - CDN で有名である Cloudflare を把握しておくことは今後に活かせる可能性が高いと考えた
  - Pages ではないが、業務で Cloudflare を使う可能性があった
- 消去法
  - [Vercel](https://vercel.com/)
    - Next.js の学習の時に使い、ある程度慣れていた。今回は慣れていないものを使いたいと思い除外
  - [Github Pages](https://pages.github.com/)
    - 業務でちょこっと使ったことがあった。
    - 静的エクスポート後のリポジトリを参照する必要があり、リポジトリが複数になりそうだった。
  - [Netlify](https://www.netlify.com/)
    - Netlify から Cloudflare へ移行している記事が多かった
    - おそらく東京にエッジサーバがなく遅いのだろう（と推測）
  - [Firebase Hosting](https://firebase.google.com/docs/hosting?hl=ja)
    - 悩んだ。。
    - 今度モバイルの勉強をするので firebase はそれで慣れることにした

## 静的エクスポートの設定

### エクスポート

今回使っている Next.js の ver.14 では`next export`コマンドが使えなくなっています。代わりに[ドキュメント](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports)にも記載されている通りに設定する必要があります。

```javascript
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export", // outputを追加
};
```

この設定を加えるだけで、`next build`した際に`out`ディレクトリに静的ファイルが出力されるようになります。この out ディレクトリを Cloudflare で公開するようにします。

### その他

細々したことですが、エクスポートする際に引っかかった 2 点紹介します。

- 画像が出力されない
  - 当初 Next/Image を使っていましたが、デフォルトでは出力されません。
  - ドキュメントにも対応方法が書いてあるっぽいのですが、私の技術力では足りず、、今回は img タグに切り替えました。
- HTML ファイルにあるアポストロフィーで Lint エラーが出た
  - `react/no-unescaped-entities": "off"`で Lint エラーをオフにしました。

## Cloudflare にデプロイする

[【Cloudflare Pages】ブログを公開したい？...5 分もあれば十分だ](https://zenn.dev/rivine/articles/2023-06-23-deploy-hugo-to-cloudflare-pages)の記事の通りに実施しました。タイトルは大げさかもですが、この記事の通り確かに簡単にできたので手順は割愛します。

事前に準備しておくことは以下です。

- フロントエンドリポジトリ(Github)
  - 発行されるドメインはリポジトリ名に 3 桁のランダム値が付与される名前になるようなのでリポジトリ名は事前に良いものにしたほうがいいかもしれません。
- ビルド
  - ビルドコマンドと出力先を入力するので事前に把握しておく。

## おわりに

今回は Cloudflare にブログをデプロイしました。やっていく中で感じたことをまとめると、

- Cloudflare の良い点
  - パイプラインの構築は不要で、リポジトリとビルドコマンドを設定するだけで簡単にデプロイされる
  - Cloudflare のセキュリティ対策の恩恵を受けることができる
  - リクエストのメトリクスを取得できる
- Cloudflare で苦労した点
  - 色々な比較サイトに書いてあるとおり、サーバサイドレンダリング(SSR)に関しては Vercel が楽だなと感じました。Nextjs の静的エクスポートをしましたが、Image で怒られて今回は諦めて img を使うことにしました。何かの記事で Next.js は Vercel をホスティングすることが前提になっているかも？という議論を見て、今回その一端を少し感じてしまいました。

Cloudflare は\_headers でヘッダを設定できるようなので、ブログの改善に飽きたらこちらを試してみたいと思っています。

最後まで読んでいただきありがとうございました。
