import PostListLayout from '@/components/layouts/PostListLayout'
import { allPosts } from 'contentlayer/generated'
import tagList from 'src/tagList.json'
import { compareDesc } from 'date-fns'
import { CountedTag } from '@/features/tags/types'
import { genPageMetadata } from '@/components/functional/seo'

const countedTags = tagList as CountedTag[]

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params
  const tag = countedTags.filter(tag => tag.link === slug)[0]
  return genPageMetadata({
    title: `Tag:${tag.label}`,
    description: `${tag.label}タグがついている記事の一覧です。`,
  })
}

export const generateStaticParams = async () => {
  const paths = tagList.map(tag => ({slug: tag.link}))
  return paths
}

export default async function TagPage({ params }: { params: Promise<{ slug: string }> }) {
  const {slug} = await params
  const targetTag = countedTags.filter(tag => tag.link === slug)[0]
  const filteredPosts = allPosts
    .filter(post => post.tags.some(tag => tag.label === targetTag.label))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <PostListLayout title={targetTag.label} posts={filteredPosts}/>
  )
}
