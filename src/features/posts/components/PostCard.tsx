import Link from "@/components/ui-elements/Link";
import { Post } from "contentlayer/generated";
import { format, getDate, parseISO } from "date-fns";

export default function PostCard(post: Post) {
  const { date, title, summary, tags } = post;
  // const { slug, date, title, summary, tags } = post;
  return (
    <article>
      <div className="h-full flex items-start mb-8">
        <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
          <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
            <time dateTime={date}>{format(parseISO(post.date), "MMM")}</time>
          </span>
          <span className="font-medium text-lg text-gray-500 title-font leading-none">
            <time dateTime={date}>{getDate(parseISO(post.date))}</time>
          </span>
        </div>
        <div className="flex-grow pl-6">
          <div className="flex flex-wrap">
            {/* {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))} */}
            <h2 className="tracking-widest text-xs title-font font-medium text-indigo-500 mb-1">
              CATEGORY
            </h2>
          </div>
          <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
            <Link
              href={post.url}
              className="text-gray-700 hover:text-blue-500 dark:text-gray-400"
              // className="text-gray-900 dark:text-gray-100"
            >
              {title}
            </Link>
          </h1>
          <p className="leading-relaxed mb-5">{summary}</p>
        </div>
      </div>
    </article>
  );
}
