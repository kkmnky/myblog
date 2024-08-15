// app/posts/[slug]/page.tsx
import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import "zenn-content-css";
import { Toc } from "@/components/ui-parts/Toc";
import Tag from "@/features/tags/components/Tag";
import { slug } from "github-slugger";
import { genPageMetadata } from "@/components/functional/seo";

export const generateStaticParams = async () => (
    allPosts.map((post) => ({ slug: post.slug }))
)

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) return notFound();

  return genPageMetadata({
    title: post.title,
    description: post.summary,
    isArticle: true,
  })
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug);
  if (!post) return notFound();

  return (
    <article className="py-8">
      <div className="flex flex-row gap-2 px-8">
        <div className="w-full">
          <div className="mb-10 text-center space-y-2">
            <time dateTime={post.date} className="text-sm text-gray-600">
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </time>
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="flex flex-wrap justify-center">
              {post.tags.map((tag) => (
                <Tag key={tag.label} label={tag.label} link={tag.link || slug(tag.label)} />
              ))}
            </div>
          </div>
          <div
            className="markdown lg:px-8 znc"
            dangerouslySetInnerHTML={{ __html: post.body.html }}
          />
        </div>
        <div className="hidden w-80 text-sm lg:block">
          <Toc />
        </div>
      </div>
    </article>
  );
};

export default PostLayout;
