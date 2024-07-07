// import Link from '@/components/Link'
// import Tag from '@/components/Tag'
// import { slug } from 'github-slugger'
import tagData from 'src/app/tag-data.json'

import Tag from "@/components/ui-parts/Tag";
import Link from "next/link";

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  return { title: 'Tags', description: 'List of tags attached to my posts' };
};

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  console.log(sortedTags)
  return (
    <div className='flex flex-col mx-auto max-w-xl'>
      <h1 className="mt-8 mb-16 text-center text-3xl font-black">Tags</h1>
      <div className="flex flex-wrap items-start justify-start">
        {tagKeys.length === 0 && 'No tags found.'}
        {sortedTags.map((tag) => {
          return (
            <div key={tag} className="mb-2 mr-5 mt-2">
              <Tag text={tag} />
              <Link
                href={`/tags/${tag}`}
                className="-ml-2 text-sm font-semibold uppercase text-gray-600 dark:text-gray-300"
                aria-label={`View posts tagged ${tag}`}
              >
                {` (${tagCounts[tag]})`}
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}