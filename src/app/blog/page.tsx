import PostListLayout from '@/components/layouts/PostListLayout'
import { allPosts } from 'contentlayer/generated'
import siteMetadata from '@/siteMetadata'
import { compareDesc } from 'date-fns';

export async function generateMetadata() {
  return {
    title: `All Posts | ${siteMetadata.title}`,
    description: `List of all posts on ${siteMetadata.title}`,
  }
}

export default function Page() {
  const sortedPosts = allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <PostListLayout title='All Posts' posts={sortedPosts}/>
  )
}
