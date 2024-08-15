import { Metadata } from "next";
import siteMetadata from "@/siteMetadata";

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  isArticle?: boolean;
  [key: string]: any;
}

export function genPageMetadata({
  title,
  description,
  image,
  isArticle = false,
  ...rest
}: PageSEOProps): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(siteMetadata.siteUrl),
    openGraph: {
      title: `${title} | ${siteMetadata.siteName}`,
      description: description || siteMetadata.description,
      url: "./",
      siteName: siteMetadata.siteName,
      images: image ? [image] : [siteMetadata.ogImage],
      locale: "ja_jp",
      type: isArticle ? "article" : "website",
    },
    twitter: {
      card: "summary_large_image",
      creator: siteMetadata.twitterUser,
      title: `${title} | ${siteMetadata.siteName}`,
      images: image ? [image] : [siteMetadata.ogImage],
    },
    ...rest,
  };
}
