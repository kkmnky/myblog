import tagList from 'src/tagList.json'
import Tag from "@/features/tags/components/Tag";
import Link from "next/link";
import { CountedTag } from '@/features/tags/types';
import { genPageMetadata } from '@/components/functional/seo';

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  return genPageMetadata({
    title: `Tags`,
    description: `投稿記事のタグ一覧になります。投稿数順にソートされています。`,
  })
};

export default async function Page() {
  const countedTags = tagList as CountedTag[]
  const sortedTags = countedTags.sort((a, b) => b.count - a.count)
  return (
    <div className='divide-y divide-gray-200 dark:divide-gray-700"'>
      <div className="space-y-2 pb-2 pt-2 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
          Tags
        </h1>
      </div>
      <div className='flex flex-col pt-6'>
        <div className="flex flex-wrap items-start justify-start">
          {countedTags.length === 0 && 'No tags found.'}
          {sortedTags.map((tag) => {
            return (
              <div key={tag.label} className="mb-2 mr-5 mt-2">
                <Tag label={tag.label} link={tag.link} />
                <Link
                  href={`/tags/${tag.link}`}
                  className="-ml-2 font-semibold uppercase text-gray-600 dark:text-gray-300"
                  aria-label={`View posts tagged ${tag}`}
                >
                  {` (${tag.count})`}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}