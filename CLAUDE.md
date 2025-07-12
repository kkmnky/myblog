# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 言語とコミュニケーション

このリポジトリで作業する際は、すべてのやり取りを**日本語**で行ってください。コメント、エラーメッセージ、説明、会話はすべて日本語で行います。

## プロジェクト概要

Next.js 15、Contentlayer（コンテンツ管理）、TypeScriptで構築された個人ブログです。タグ分類、ダークモードサポート、自動サイトマップ生成機能を持つMarkdownベースの記事投稿システムです。静的サイトとしてデプロイされ、包括的なSEO最適化が含まれています。

## 開発コマンド

### パッケージ管理
- `pnpm install` - 依存関係をインストール
- `pnpm dev` - 開発サーバーを起動（http://localhost:3000）

### ビルド・コンテンツ処理
- `pnpm build-content` - Contentlayerでmarkdownコンテンツを処理（型生成とmarkdown処理）
- `pnpm build` - 本番用サイトをビルドしてサイトマップを生成
- `pnpm start` - 本番サーバーを起動

### コード品質
- `pnpm lint` - ESLintチェックを実行

### テスト
- `npx playwright test` - E2Eテストを実行（playwright.config.tsで設定）
- `npx playwright test --ui` - UIモードでテストを実行
- テストは `tests/e2e/` ディレクトリに配置

## アーキテクチャ

### コンテンツ管理
- **Contentlayer**がコア的なコンテンツ処理システム
- ブログ記事は `data/posts/YYYY/` ディレクトリにmarkdown形式で記述
- 著者情報は `data/authors/` に保存
- Contentlayer設定（`contentlayer.config.ts`）でPostとAuthorのドキュメントタイプを定義
- タグ集約は自動的に生成され、コンテンツ処理中に `src/tagList.json` に保存

### ディレクトリ構成
```
src/
├── app/                    # Next.js App Routerページ
├── components/
│   ├── functional/         # Provider コンポーネント、SEO
│   ├── layouts/           # レイアウトコンポーネント（Header、Footer等）
│   ├── ui-elements/       # 基本UIコンポーネント
│   └── ui-parts/          # 複雑なUIパーツ
├── features/              # 機能ベース構成
│   ├── posts/            # 記事関連コンポーネントと関数
│   └── tags/             # タグ関連コンポーネントと型
├── constants/            # アプリケーション定数
└── styles/              # グローバルCSSとカスタムスタイル
```

### 主要技術
- **Next.js 15** with App Router
- **TypeScript** による型安全性
- **Contentlayer** によるコンテンツ処理と型生成
- **Tailwind CSS** によるスタイリング（ダークモードサポート）
- **Playwright** によるE2Eテスト
- **next-themes** によるテーマ切り替え
- **Pliny** によるブログ専用ユーティリティ

### コンテンツ処理フロー
1. `data/posts/` 内のMarkdownファイルがContentlayerで処理される
2. タグ集約がビルド時に自動実行され、`src/tagList.json` を生成
3. Contentlayerで生成された型が `contentlayer/generated` として利用可能
4. 静的サイト生成に自動サイトマップ作成が含まれる

### スタイリングとテーマ
- カスタム設定のTailwind CSS
- `next-themes` によるダークモードサポート
- `src/styles/wave.css` のカスタムwave アニメーションCSS
- `src/siteMetadata.js` に集約されたサイトメタデータ