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
  },
});
