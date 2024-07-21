import PostListLayout from '@/components/layouts/PostListLayout'
import { allPosts } from 'contentlayer/generated'
import tagList from 'src/tagList.json'
import { compareDesc } from 'date-fns'
import siteMetadata from '@/siteMetadata'
import { CountedTag } from '@/features/tags/types'

const countedTags = tagList as CountedTag[]

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tag = countedTags.filter(tag => tag.link === params.slug)[0]
  return {
    title: `${tag.label} | ${siteMetadata.title}`,
    description: `List of posts on ${siteMetadata.title} tagged ${tag.label}`,
  }
}

export const generateStaticParams = async () => {
  const paths = tagList.map(tag => ({slug: tag.link}))
  return paths
}

export default function TagPage({ params }: { params: { slug: string } }) {
  const targetTag = countedTags.filter(tag => tag.link === params.slug)[0]
  const filteredPosts = allPosts
    .filter(post => post.tags.some(tag => tag.label === targetTag.label))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <PostListLayout title={targetTag.label} posts={filteredPosts}/>
  )
}
