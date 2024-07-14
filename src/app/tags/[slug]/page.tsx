import PostListLayout from '@/components/layouts/PostListLayout'
import { slug } from 'github-slugger'
import { allPosts } from 'contentlayer/generated'
import tagData from 'src/tagList.json'
import { compareDesc } from 'date-fns'
import siteMetadata from '@/siteMetadata'


const tagCounts = tagData as Record<string, number>
const tagKeys = Object.keys(tagCounts)

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const tag = tagKeys.filter(tag => slug(tag) === decodeURI(params.slug))[0]
  return {
    title: `${tag} | ${siteMetadata.title}`,
    description: `List of posts on ${siteMetadata.title} tagged ${tag}`,
  }
}

export const generateStaticParams = async () => {
  const paths = tagKeys.map((tag) => ({
    slug: encodeURI(slug(tag)),
  }))
  return paths
}

export default function TagPage({ params }: { params: { slug: string } }) {
  const tag = tagKeys.filter(tag => slug(tag) === decodeURI(params.slug))[0]
  const filteredPosts = allPosts
    .filter((post) => post.tags && post.tags.includes(tag))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <PostListLayout title={tag} posts={filteredPosts}/>
  )
}
