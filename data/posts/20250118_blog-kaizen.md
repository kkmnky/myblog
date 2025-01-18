---
title: 2025年の目標とブログの改善
date: 2025-01-18
summary: 2025年の初投稿。2025年にブログに書きたいことと年を跨いただのでブログにページネーションをつける。
tags:
  - label: ブログ作成
    link: myblog
  - label: Next.js
---

## はじめに

あけましておめでとうございます。2025年の初投稿です。

今年も毎月1投稿を目指して勉強したいと思います。拙いブログで恐縮ですがどうぞよろしくお願いします。

## 今年の目標

今年私が自己学習で取り組もうと思っているのは下記です。

- 引き続き読書週間をつける
- 業務で導入を提案できるようRustでサンプルアプリを作りながら以下を学ぶ
  - OpenTelemetry（SREでオブザーバビリティを実践したい）
  - アプリケーションアーキテクチャ（本で読むだけでなく実践する）
- TypeScript,Rustの基礎学習
  - サンプルアプリだけだと文法など基礎が疎かになる
  - コードを早く書くにはやっぱり手に馴染ませる必要がある

家庭を優先して無理のない範囲で投稿します。あらためて今年もよろしくお願いします。

## 新年に合わせてブログを改善

投稿数が増え、年を跨いだこともあり、以下の改善を行いました。

- ページネーションをつける
- ブログに年をつける

### ページネーションをつける

[ブログを作成した記事](20240301_blog-start)で書いた通り、本ブログは[tailwind-nextjs-starter-blog](https://github.com/timlrx/tailwind-nextjs-starter-blog/tree/main)を参考にしています。
デザインとしても問題ないため、こちらのページネーションをそのまま導入させていただきました。やったこととしては、

- 前へや次へのリンクデザインは[Layout.tsx](https://github.com/timlrx/tailwind-nextjs-starter-blog/blob/main/layouts/ListLayout.tsx)のPaginationを使用する
- postsをsliceして表示する記事数を絞る

参考があるので短時間で導入できました！

### ブログに年をつける

トップページやブログ一覧のデザインを考慮して今まで年をつけていませんでしたが、これだと分かりづらいのでブログに年をつけることにしました。
全部に年をつけると今までのスタイルが崩れるため、年ごとにグルーピングする方法を取りました。

まずはグルーピングする関数を作ります。

```typescript
export const groupPostsByYear = (posts: Post[]): Record<string, Post[]> => {
  return posts.reduce((groups, post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(post)
    return groups
  }, {} as Record<string, Post[]>)
}
```

そして、グルーピングした関数を年ごとに区切り線を入れて表示するだけです。
```typescript
{Object.keys(groupedDisplayPosts)
.sort((a, b) => Number(b) - Number(a)) // 年を降順にソート
.map((year) => (
  <div key={year}>
    {/* 年の区切り線とヘッダー */}
    <h2>Year {year}</h2>
    <div className="border-t border-gray-200 my-2 mb-8"></div>

    {/* 年ごとの記事一覧 */}
    {groupedDisplayPosts[year].map((post, index) => (
      <PostCard key={index} post={post} />
    ))}
  </div>
))}
```

## おわりに

以上簡単ですが、新年の挨拶とブログを改善した記事でした。ブログのコードを久々に弄りましたが、アーキテクチャを色々考えて自分で書いたこともありすぐに思い出して改善することができました。
あと、ChatGPTにもちょっと頼っていまして、こちらも大きな補助になっています。とてもありがたい分、頼りすぎると自分の手に馴染まない気がするので程々にします...

目標に沿ってRust言語でTodoアプリを書いているので次はその記事を投稿しようと思います。最後まで読んでいただきありがとうございました。