/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
// import { formatDate } from 'pliny/utils/formatDate'
// import { CoreContent } from 'pliny/utils/contentlayer'
import type { Post } from 'contentlayer/generated'
// import Tag from '@/components/Tag'
// import siteMetadata from '@/data/siteMetadata'
import tagData from 'src/tagList.json'
import Link from '@/components/ui-elements/Link'
import PostCard from '@/features/posts/components/PostCard'

type PostListLayoutProps = {
  posts: Post[]
  title: string
  // initialDisplayPosts?: CoreContent<Blog>[]
}

export default function PostListLayout({
  posts,
  title,
}: PostListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  return (
    <>
      <div>
        {/* タイトル （画面が小さい時表示） */}
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>

        {/* サイドのタグ一覧 */}
        <div className="flex">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded pt-5 sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
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
                    <li key={tag} className="my-3">
                      {pathname.split('/tags/')[1] === encodeURI(slug(tag)) ? (
                        <h3 className="inline px-3 py-2 text-sm font-bold text-indigo-500">
                          {`${tag} (${tagCounts[tag]})`}
                        </h3>
                      ) : (
                        <Link
                          href={`/tags/${slug(tag)}`}
                          className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-500"
                          aria-label={`View posts tagged ${tag}`}
                        >
                          {`${tag} (${tagCounts[tag]})`}
                        </Link>
                      )}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* 記事一覧 */}
          <div>
            <ul>
              {posts.map((post, index) => (
                <li key={index}>
                  <PostCard post={post} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
