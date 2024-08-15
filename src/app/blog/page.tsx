import PostListLayout from '@/components/layouts/PostListLayout'
import { allPosts } from 'contentlayer/generated'
import siteMetadata from '@/siteMetadata'
import { compareDesc } from 'date-fns';
import { genPageMetadata } from '@/components/functional/seo';

export const metadata = genPageMetadata({
    title: "All Posts",
    description: `${siteMetadata.siteName}の投稿記事一覧です。職務に限らず学習した技術・本などを備忘録として不定期に投稿します。`
  })

export default function Page() {
  const sortedPosts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <PostListLayout title='All Posts' posts={sortedPosts}/>
  )
}
