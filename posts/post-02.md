---
title: ブログの構築
date: 2023-12-01
emoji: 📝
summary: Next.js + Tailwind CSS + Contentlayer で自分だけのMarkdownブログを作る
tags:
  - ブログ
  - Next.js
  - Tailwind CSS
  - Contentlayer
---

## Next.js でブログを構築する

- [Qiita](https://qiita.com/kedama-t) で色々記事を書き始めたのですが、技術と関係ないものも書くことができるブログが欲しいなと思って、自分のブログを作ることにしました。
- 技術書やビジネス書の読書メモと、考えをまとめた思考メモ、Qiita でまとめる以前の技術メモをとりあえずの用途としています。
- 私は趣味でパンを焼くので、ブログにも絵文字を散りばめてみました。
  - パンくずリストにめっちゃパンが出てるのがお気に入りです。

## 何で組むか

- 私は初手[StackBlitz](https://stackblitz.com/)でざっくり組みたいので、必然的に使えるツールは決まってきます。
- [テーマ切り替え用のコンポーネントを作った](https://qiita.com/kedama-t/items/508a19ee81ab72ee787f)記事で作ったプロジェクトがあったので、これを fork して使いました。

## 使ったものたち

### [Next.js](https://nextjs.org/)

- 言わずと知れた [React](https://ja.react.dev/) のメタフレームワーク。
- 今回は`App Router`で作っています。

### [Contentlayer](https://contentlayer.dev/)

- Markdown 形式のドキュメントを型つきの JSON として扱えるようにしてくれるツールです。

### [Tailwind CSS](https://tailwindcss.com/)

- Next.js のスターターに最初から入ってるやつ。
  - `@apply`は結構積極的に使っていくタイプ。
    - これを使うと Tailwind らしさが多少損なわれるものの、似たようなスタイルが何度も出てくるようなら、DRY の精神で`@apply`したほうがいいと思ってます。
- なお、Markdown ブログを作る記事でよく出てくる[`tailwindcss/typography`](https://tailwindcss.com/docs/typography-plugin)ですが、今回は使わずにコードブロック以外は自力でスタイルを当てました。

### UI ライブラリ

- UI ライブラリは使いませんでした。
  - あんまりリッチな UI という感じはないですが、Tailwind CSS でスタイリングしたらまあ十分じゃないかなと思っています。
    - `App Router`使ってると、なるべく Client Component を使わないようにしたくなりませんか？
  - この意味では、[daisyUI](https://daisyui.com/)などの CSS フレームワークは検討の価値ありです。

## トップページ

- [Qiita API](https://qiita.com/api/v2/docs)を叩いて Qiita の記事を直近 4 件表示しています。

- ナビゲーションは最初`primary`のベタだったのですが、そこはかとなくダサかったので着色は`border`だけで我慢しました。

  - デザインって難しいですね。

- テーマはライトとダークの 2 種類ですが、Qiita に書いた通り、キーカラーを 3 色(`primary`、`secondary`、`tertiary`)決めたら生成するようになっています。
  - 季節とかで変えても楽しいかもしれません。

### コードブロック

- [rehype-pretty-code](https://github.com/atomiks/rehype-pretty-code)の`rose-pine-moon`を当てました。
  - こんな感じ

```typescript
// tailwind.config.ts
import generateColorScales from "./generateColorScales";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      ...generateColorScales({
        primary: "#8ec07c",
        secondary: "#458588",
        tertiary: "#d79921",
      }),
    },
  },
};
```

### カスタムエレメント

- あまりお行儀がいいとは言えないかもしれませんが、[`remark-directive-rehype`](https://github.com/IGassmann/remark-directive-rehype)を使って、`tag-[color]`と`note-[color]`の 2 種のカスタムエレメントを追加しています。
  - これらのカラーもテーマに定義してあるので、モードを切り替えると追従します。
  - オレオレ記法が増えるのはどうかというのはありますが、ブログとしての表現力は上がりますね。

```markdown
#### tag

- :tag-primary[primary / 第一色]
- :tag-secondary[secondary / 第二色]
- :tag-tertiary[tertiary / 第三色]
- :tag-notice[notice / 注意]
- :tag-warning[warning / 警告]
- :tag-error[error / エラー]

#### note

:::note-blue-500
primary / 第一色
:::

:::note-secondary
secondary / 第二色
:::

:::note-tertiary
tertiary / 第三色
:::

:::note-notice
notice / 注意
:::

:::note-warning
warning / 警告
:::

:::note-error
error / エラー
:::
```

#### tag

- :tag-primary[primary / 第一色]
- :tag-secondary[secondary / 第二色]
- :tag-tertiary[tertiary / 第三色]
- :tag-notice[notice / 注意]
- :tag-warning[warning / 警告]
- :tag-error[error / エラー]

#### note

:::note-primary
primary / 第一色
:::

:::note-secondary
secondary / 第二色
:::

:::note-tertiary
tertiary / 第三色
:::

:::note-notice
notice / 注意
:::

:::note-warning
warning / 警告
:::

:::note-error
error / エラー
:::

#### 定義

- 定義しなくてもブラウザ側がよし何やってくれますが、ブラウザの解釈に甘えるのもアレなので、カスタムエレメントとして定義しています。
  - スタイルは Tailwind でやるので、単に`span`や`div`でラップしているだけですが。

```js
// タグ
class TagPrimary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("span");
    wrapper.innerHTML = "<slot></slot>";
    wrapper.setAttribute("class", "tag-primary");
    this.shadowRoot.append(wrapper);
  }
}

// ノート
class NotePrimary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("div");
    wrapper.innerHTML = "<slot></slot>";
    wrapper.setAttribute("class", "note-primary");
    this.shadowRoot.append(wrapper);
  }
}
```

## 終わりに

- 結構いい感じですが、まだまだやることがあります。

  - 少なくとも RSS 配信の対応と OGP イメージの対応はなんとかしたい。
