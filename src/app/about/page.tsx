import { Author, allAuthors } from "contentlayer/generated";
import AuthorLayout from "@/components/layouts/AuthorLayout";
import "zenn-content-css";

export const generateMetadata = () => {
  return { title: "About - kmnky" };
};

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
