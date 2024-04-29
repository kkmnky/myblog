import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from "contentlayer/source-files";
import rehypeSlug from "rehype-slug";
import remarkDirective from "remark-directive";
import remarkDirectiveRehype from "remark-directive-rehype";
import rehypePrettyCode from "rehype-pretty-code";

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
});
