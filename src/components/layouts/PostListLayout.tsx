/* eslint-disable jsx-a11y/anchor-is-valid */
"use client"

import { usePathname } from "next/navigation"
import type { Post } from "contentlayer/generated"
import tagList from "src/tagList.json"
import Link from "@/components/ui-elements/Link"
import PostCard from "@/features/posts/components/PostCard"
import { CountedTag } from "@/features/tags/types"
import Pagination, { PaginationProps } from "@/components/ui-parts/Pagination"

type PostListLayoutProps = {
  posts: Post[]
  title: string
  pagination?: PaginationProps
}

export default function PostListLayout({
  posts,
  title,
  pagination,
}: PostListLayoutProps) {
  const pathname = usePathname()
  const countedTags = tagList as CountedTag[]
  const sortedTags = countedTags.sort((a, b) => b.count - a.count)

  return (
    <>
      <div className="max-sm:divide-y divide-gray-200 dark:divide-gray-700">
        {/* タイトル （画面が小さい時表示） */}
        <div className="space-y-2 pb-2 pt-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:hidden sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            {title === "All Posts" ? title : `Tag: ${title}`}
          </h1>
        </div>

        {/* サイドのタグ一覧 */}
        <div className="flex">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded pt-5 sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith("/blog") ? (
                <h3 className="font-bold text-indigo-500">All Posts</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold text-gray-700 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-500"
                >
                  All Posts
                </Link>
              )}
              <ul>
                {sortedTags.map((tag) => {
                  return (
                    <li key={tag.label} className="my-3">
                      {pathname.split("/tags/")[1] === tag.link ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold text-indigo-500">
                          {`${tag.label} (${tag.count})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${tag.link}`}
                          className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-500"
                          aria-label={`View posts tagged ${tag}`}
                        >
                          {`${tag.label} (${tag.count})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* 記事一覧 */}
          <div className="mt-6">
            <ul>
              {posts.map((post, index) => (
                <li key={index}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>

            {/* ページネーション */}
            {pagination && pagination.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
