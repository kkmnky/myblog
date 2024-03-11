import { ReactNode } from "react";
import type { Author } from "contentlayer/generated";
import SocialIcon from "@/components/ui-elements/SocialIcon";

interface Props {
  children: ReactNode;
  author: Author;
}

export default function AuthorLayout({ children, author }: Props) {
  const { name, avatar, occupation, twitter, github } = author;

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-2 pt-2 md:space-y-5">
          <h2 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-600 dark:text-gray-400 sm:text-4xl sm:leading-10 md:text-4xl md:leading-14">
            About
          </h2>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            {avatar && (
              <img
                src={avatar}
                alt="avatar"
                width={192}
                height={192}
                className="h-48 w-48 rounded-full"
              />
            )}
            <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
              {name}
            </h3>
            <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
            <div className="flex space-x-3 pt-6">
              <SocialIcon kind="github" href={github} size={6} />
              <SocialIcon kind="twitter" href={twitter} size={6} />
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
