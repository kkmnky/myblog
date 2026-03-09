import {
  ComputedFields,
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeLinkPreview from "./src/lib/rehypeLinkPreview";
import { slug } from 'github-slugger'
import { writeFileSync } from "fs";
import { Post as PostType } from "contentlayer/generated";
import { CountedTag } from "./src/features/tags/types"
import siteMetadata from "./src/siteMetadata";

const computedFields: ComputedFields = {
  slug: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ""),
  },
  url: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
};

const Tag = defineNestedType(() => ({
  name: 'Tag',
  fields: {
    label: { type: 'string', required: true },
    link: { type: 'string', required: false }
  }
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.md`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: Tag, default: [] },
    summary: { type: "string" },
  },
  computedFields: {
    ...computedFields,
  },
  contentType: "markdown",
}));

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: "authors/**/*.md",
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string" },
    occupation: { type: "string" },
    twitter: { type: "string" },
    github: { type: "string" },
    layout: { type: "string" },
  },
  computedFields: {
    ...computedFields,
  },
}));

/**
 * 全てのタグを集計してJSONファイルへ
 */

function createTagCount(allPosts: PostType[]) {
  // 全てのタグを取得
  const allTags = allPosts.flatMap(post => post.tags);

  const tagMap: { [key: string]: CountedTag } = {};
  allTags.forEach(tag => {
    const link = tag.link || slug(tag.label)
    if (tagMap[link]) {
      tagMap[link].count++;
    } else {
      tagMap[link] = { label: tag.label, link: link, count: 1 };
    }
  });

  writeFileSync('./src/tagList.json', JSON.stringify(Object.values(tagMap)))
}

/**
 * RSSフィードの作成
 */
function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function createRssFeed(allPosts: PostType[]) {
  const sortedPosts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const items = sortedPosts
    .map((post) => {
      const postUrl = `${siteMetadata.siteUrl}${post.url}`;
      const categories = post.tags
        .map((tag) => `<category>${escapeXml(tag.label)}</category>`)
        .join("");

      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${postUrl}</link>
  <guid>${postUrl}</guid>
  <pubDate>${new Date(post.date).toUTCString()}</pubDate>
  <description>${escapeXml(post.summary ?? "")}</description>
  ${categories}
</item>`;
    })
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(siteMetadata.siteName)}</title>
  <link>${siteMetadata.siteUrl}</link>
  <description>${escapeXml(siteMetadata.description)}</description>
  <language>${siteMetadata.language}</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${siteMetadata.siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>
`;

  writeFileSync("./public/feed.xml", rss);
}

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post, Author],
  markdown: {
    remarkPlugins: [
      remarkDirective, // 追加
      remarkDirectiveRehype as any, // Contentlayer 側の型と不一致のためキャスト
    ],
    rehypePlugins: [
      rehypeLinkPreview,
      rehypeSlug,
      [rehypePrettyCode as any, { theme: "catppuccin-macchiato" }],
    ],
  },
  onSuccess: async (importData) => {
    const { allPosts } = await importData()
    createTagCount(allPosts)
    createRssFeed(allPosts)
  },
});
