// app/posts/[slug]/page.tsx
import { format, parseISO } from "date-fns";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";
import "zenn-content-css";
import { Toc } from "@/components/ui-parts/Toc";

export const generateStaticParams = async () =>
  allPosts.map((post) => ({ slug: post._raw.flattenedPath }));

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) return notFound();
  return { title: post.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug);
  if (!post) return notFound();

  return (
    // <article className="mx-auto max-w-xl py-8">
    //   <div className="mb-8 text-center">
    //     <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
    //       {format(parseISO(post.date), "LLLL d, yyyy")}
    //     </time>
    //     <h1 className="text-3xl font-bold">{post.title}</h1>
    //   </div>
    //   <div
    //     className="[&>*]:mb-3 [&>*:last-child]:mb-0"
    //     dangerouslySetInnerHTML={{ __html: post.body.html }}
    //   />
    // </article>
    <article className="py-8">
      <div className="flex flex-row gap-2 px-8">
        <div className="w-full">
          {/* <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
            {format(parseISO(post.date), "LLLL d, yyyy")}
          </time>
          <h1 className="mb-6 border-b-2 border-secondary text-4xl font-extrabold text-on-secondary-50">
            {post.title}
          </h1> */}
          <div className="mb-10 text-center space-y-2">
            <time dateTime={post.date} className="text-sm text-gray-600">
              {format(parseISO(post.date), "LLLL d, yyyy")}
            </time>
            <h1 className="text-4xl font-bold">{post.title}</h1>
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
