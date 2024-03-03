import siteMetadata from "@/siteMetadata";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import PostCard from "@/features/posts/components/PostCard";

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="mx-auto max-w-xl">
      <div className="text-center space-y-2 pb-8 pt-6 md:space-y-5">
        <img
          src="/static/logo.jpg"
          alt="logo"
          width={64}
          height={64}
          className="mx-auto"
        />
        <h1 className="mb-8 text-center text-3xl font-black">kmnky blog</h1>
        <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
          {siteMetadata.description}
        </p>
      </div>
      {posts.map((post, idx) => (
        <PostCard key={idx} {...post} />
      ))}
    </div>
  );
}
