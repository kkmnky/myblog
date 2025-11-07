import { NextResponse, type NextRequest } from "next/server"
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

type RouteContext = { params: Promise<{ slug: string | string[] }> }

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const resolvedParams = await params
  const slugValue = resolvedParams?.slug
  const slugSegments = Array.isArray(slugValue)
    ? slugValue
    : slugValue
      ? [slugValue]
      : []
  const targetSlug = slugSegments.join("/")
  const post = allPosts.find((entry) => entry.slug === targetSlug)
  const title = post?.title ?? siteMetadata.siteName

  const imageBuffer = await generateOgImage({
    title,
    siteName: siteMetadata.siteName,
  })

  const baseBuffer = imageBuffer.buffer
  const arrayBuffer =
    baseBuffer instanceof ArrayBuffer
      ? baseBuffer.slice(
          imageBuffer.byteOffset,
          imageBuffer.byteOffset + imageBuffer.byteLength,
        )
      : Uint8Array.from(imageBuffer).buffer

  return new NextResponse(arrayBuffer, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
