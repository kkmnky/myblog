import siteMetadata from "@/siteMetadata"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import PostCard from "@/features/posts/components/PostCard"
import Link from "next/link"

const MAX_DISPLAY = 15

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )
  const displayPosts = posts.slice(0, MAX_DISPLAY)

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
        <h1 className="mb-8 text-center text-3xl font-black">
          {siteMetadata.siteName}
        </h1>
        <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
          {siteMetadata.shortDescription}
        </p>
      </div>
      {displayPosts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-blue-500 hover:text-blue-800 dark:hover:text-blue-200"
            aria-label="All posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </div>
  )
}
