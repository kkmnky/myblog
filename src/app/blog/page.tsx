import PostListLayout from "@/components/layouts/PostListLayout"
import { allPosts } from "contentlayer/generated"
import siteMetadata from "@/siteMetadata"
import { compareDesc } from "date-fns"
import { genPageMetadata } from "@/components/functional/seo"
import { POSTS_PER_PAGE } from "@/constants"

export const metadata = genPageMetadata({
  title: "All Posts",
  description: `${siteMetadata.siteName}の投稿記事一覧です。職務に限らず学習した技術・本などを備忘録として不定期に投稿します。`,
})

export default function Page() {
  const sortedPosts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )
  const pageNumber = 1
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)
  const displayPosts = sortedPosts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <PostListLayout
      title="All Posts"
      posts={displayPosts}
      pagination={pagination}
    />
  )
}
