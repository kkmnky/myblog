import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import rehypePrettyCode from "rehype-pretty-code";
import { slug } from 'github-slugger'
import { writeFileSync } from "fs";
import { Post as PostType } from "contentlayer/generated";

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

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.md`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    tags: { type: "list", of: { type: "string" }, default: [] },
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
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allPosts: PostType[]) {
  const tagCount: Record<string, number> = {}
  allPosts.forEach((post) => {
    if (post.tags) {
      post.tags.forEach((tag) => {
        const formattedTag = tag
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./src/tagList.json', JSON.stringify(tagCount))
}

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post, Author],
  markdown: {
    remarkPlugins: [
      remarkDirective, // 追加
      //@ts-expect-error
      remarkDirectiveRehype, // 追加
    ],
    rehypePlugins: [
      rehypeSlug,
      //@ts-expect-error
      [rehypePrettyCode, { theme: "catppuccin-macchiato" }],
    ],
  },
  onSuccess: async (importData) => {
    const { allPosts } = await importData()
    createTagCount(allPosts)
  },
});