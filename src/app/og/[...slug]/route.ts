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

const resolveSlugSegments = async (paramsPromise: RouteContext["params"]) => {
  const resolvedParams = await paramsPromise
  const slugValue = resolvedParams?.slug
  return Array.isArray(slugValue)
    ? slugValue
    : slugValue
      ? [slugValue]
      : []
}

const generateImageBuffer = async (slugSegments: string[]) => {
  const targetSlug = slugSegments.join("/")
  const post = allPosts.find((entry) => entry.slug === targetSlug)
  const title = post?.title ?? siteMetadata.siteName

  return generateOgImage({
    title,
    siteName: siteMetadata.siteName,
  })
}

const createResponseHeaders = (contentLength?: number) => ({
  "Content-Type": "image/png",
  "Cache-Control": "public, max-age=86400",
  ...(typeof contentLength === "number"
    ? { "Content-Length": contentLength.toString() }
    : {}),
})

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const slugSegments = await resolveSlugSegments(params)
  const imageBuffer = await generateImageBuffer(slugSegments)

  const baseBuffer = imageBuffer.buffer
  const arrayBuffer =
    baseBuffer instanceof ArrayBuffer
      ? baseBuffer.slice(
          imageBuffer.byteOffset,
          imageBuffer.byteOffset + imageBuffer.byteLength,
        )
      : Uint8Array.from(imageBuffer).buffer

  return new NextResponse(arrayBuffer, {
    headers: createResponseHeaders(imageBuffer.length),
  })
}

export async function HEAD(_request: NextRequest, { params }: RouteContext) {
  const slugSegments = await resolveSlugSegments(params)
  const imageBuffer = await generateImageBuffer(slugSegments)

  return new NextResponse(null, {
    headers: createResponseHeaders(imageBuffer.length),
  })
}
