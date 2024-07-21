import Link from "@/components/ui-elements/Link";
import Tag from "@/features/tags/components/Tag";
import { Post } from "contentlayer/generated";
import { format, getDate, parseISO } from "date-fns";
import { slug } from "github-slugger";

type PostCardProps = {
  post: Post
}

export default function PostCard({post}: PostCardProps) {
  const { date, title, summary, tags } = post;

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
            {tags.map((tag) => (
              <Tag key={tag.label} label={tag.label} link={tag.link || slug(tag.label)} />
            ))}
          </div>
          <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
            <Link
              href={post.url}
              className="text-gray-700 hover:text-blue-500 dark:text-gray-400"
            >
              {title}
            </Link>
          </h1>
          <p className="leading-relaxed mb-5 text-gray-500">{summary}</p>
        </div>
      </div>
    </article>
  );
}
