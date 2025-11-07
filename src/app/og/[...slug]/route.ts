import { NextResponse } from "next/server"
import { allPosts } from "contentlayer/generated"
import siteMetadata from "@/siteMetadata"
import { generateOgImage } from "@/lib/generateOgImage"

export const runtime = "nodejs"
export const dynamic = "force-static"
export const revalidate = false
export const dynamicParams = false

export const generateStaticParams = () =>
  allPosts.map((post) => ({
    slug: post.slug.split("/"),
  }))

export async function GET(
  _request: Request,
  { params }: { params: { slug?: string[] } },
) {
  const slugSegments = params.slug ?? []
  const targetSlug = slugSegments.join("/")
  const post = allPosts.find((entry) => entry.slug === targetSlug)
  const title = post?.title ?? siteMetadata.siteName

  const imageBuffer = await generateOgImage({
    title,
    siteName: siteMetadata.siteName,
  })

  return new NextResponse(imageBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
