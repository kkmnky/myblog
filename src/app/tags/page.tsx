import tagData from 'src/tagList.json'
import Tag from "@/components/ui-parts/Tag";
import Link from "next/link";
import siteMetadata from '@/siteMetadata';

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  return { title: 'Tags', description: `List of tags attached to ${siteMetadata.title}` };
};

export default async function Page() {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])
  return (
    <div className='divide-y divide-gray-200 dark:divide-gray-700"'>
      <div className="space-y-2 pb-2 pt-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Tags
        </h1>
      </div>
      <div className='flex flex-col pt-6'>
        <div className="flex flex-wrap items-start justify-start">
          {tagKeys.length === 0 && 'No tags found.'}
          {sortedTags.map((tag) => {
            return (
              <div key={tag} className="mb-2 mr-5 mt-2">
                <Tag text={tag} />
                <Link
                  href={`/tags/${tag}`}
                  className="-ml-2 font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${tag}`}
                >
                  {` (${tagCounts[tag]})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}