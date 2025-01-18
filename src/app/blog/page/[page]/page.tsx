import PostListLayout from "@/components/layouts/PostListLayout"
import { allPosts } from "contentlayer/generated"
import siteMetadata from "@/siteMetadata"
import { compareDesc } from "date-fns"
import { genPageMetadata } from "@/components/functional/seo"
import { POSTS_PER_PAGE } from "@/constants"
import { notFound } from "next/navigation"

export const metadata = genPageMetadata({
  title: "All Posts",
  description: `${siteMetadata.siteName}の投稿記事一覧です。職務に限らず学習した技術・本などを備忘録として不定期に投稿します。`,
})

export default function Page({ params }: { params: { page: number } }) {
  const sortedPosts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  )
  const pageNumber = params.page
  const totalPages = Math.ceil(sortedPosts.length / POSTS_PER_PAGE)

  // Return 404 for invalid page numbers or empty pages
  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }

  const displayPosts = sortedPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
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

export const generateStaticParams = async () => {
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    page: (i + 1).toString(),
  }))

  return paths
}
