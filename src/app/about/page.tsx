import { Author, allAuthors } from "contentlayer/generated";
import AuthorLayout from "@/components/layouts/AuthorLayout";
import "zenn-content-css";
import { genPageMetadata } from "@/components/functional/seo";

export const metadata = genPageMetadata({
    title: "About kmnky",
    description: "本ブログの執筆者であるkmnkyの自己紹介です。"
  })

export default function Page() {
  const author = allAuthors.find(
    (author) => author.slug === "default"
  ) as Author;

  return (
    <>
      <AuthorLayout author={author}>
        <div
          className="markdown lg:px-8 znc"
          dangerouslySetInnerHTML={{ __html: author.body.html }}
        />
      </AuthorLayout>
    </>
  );
}
