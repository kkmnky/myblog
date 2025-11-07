import path from "path"
import {
  createCanvas,
  loadImage,
  registerFont,
  CanvasRenderingContext2D,
  Image,
} from "canvas"

const OG_WIDTH = 960
const OG_HEIGHT = 540
const PADDING_X = 96
const PADDING_Y = 96
const TITLE_FONT_SIZE = 52
const TITLE_LINE_HEIGHT = 68
const TITLE_COLOR = "#2D2D2D"
const SITE_NAME_COLOR = "#6B6B6B"
const MAX_TITLE_LINES = 3
const SITE_NAME_FONT_SIZE = 28
const LOGO_SIZE = SITE_NAME_FONT_SIZE * 3
const LOGO_GAP = 20
const FONT_FAMILY = "NotoSansJP"
const FONT_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "fonts",
  "NotoSansJP-Bold.ttf",
)
const BACKGROUND_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "og-image-bg.png",
)

const LOGO_PATH = path.join(
  process.cwd(),
  "public",
  "static",
  "logo.jpg",
)

let fontRegistered = false
const ensureFontRegistered = () => {
  if (fontRegistered) return
  registerFont(FONT_PATH, { family: FONT_FAMILY })
  fontRegistered = true
}

let backgroundPromise: Promise<Image> | undefined
const getBackground = async () => {
  if (!backgroundPromise) {
    backgroundPromise = loadImage(BACKGROUND_PATH)
  }
  return backgroundPromise
}

let logoPromise: Promise<Image> | undefined
const getLogo = async () => {
  if (!logoPromise) {
    logoPromise = loadImage(LOGO_PATH)
  }
  return logoPromise
}

const wrapText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
) => {
  if (!text) return [""]

  const lines: string[] = []
  let currentLine = ""

  const pushLine = () => {
    if (currentLine.length > 0) {
      lines.push(currentLine)
      currentLine = ""
    }
  }

  for (const char of Array.from(text)) {
    if (char === "\n") {
      pushLine()
      continue
    }

    const tentative = currentLine + char
    if (ctx.measureText(tentative).width > maxWidth && currentLine !== "") {
      lines.push(currentLine)
      currentLine = char
      continue
    }

    currentLine = tentative
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  if (lines.length === 0) {
    lines.push(text)
  }

  if (lines.length > MAX_TITLE_LINES) {
    const trimmed = lines.slice(0, MAX_TITLE_LINES)
    let lastLine = trimmed[MAX_TITLE_LINES - 1]
    while (
      ctx.measureText(`${lastLine}...`).width > maxWidth &&
      lastLine.length > 0
    ) {
      lastLine = lastLine.slice(0, -1)
    }
    trimmed[MAX_TITLE_LINES - 1] = `${lastLine}...`
    return trimmed
  }

  return lines
}

export interface GenerateOgImageOptions {
  title: string
  siteName: string
}

export const generateOgImage = async ({
  title,
  siteName,
}: GenerateOgImageOptions) => {
  ensureFontRegistered()
  const canvas = createCanvas(OG_WIDTH, OG_HEIGHT)
  const ctx = canvas.getContext("2d")

  const [background, logo] = await Promise.all([getBackground(), getLogo()])
  ctx.drawImage(background, 0, 0, OG_WIDTH, OG_HEIGHT)

  ctx.fillStyle = TITLE_COLOR
  ctx.textBaseline = "top"
  ctx.textAlign = "center"
  ctx.font = `bold ${TITLE_FONT_SIZE}px "${FONT_FAMILY}"`
  const maxLineWidth = OG_WIDTH - PADDING_X * 2
  const lines = wrapText(ctx, title, maxLineWidth)
  const titleCenterX = OG_WIDTH / 2
  const footerY = OG_HEIGHT - PADDING_Y - LOGO_SIZE
  const titleAreaHeight = footerY - PADDING_Y
  const linesHeight = lines.length * TITLE_LINE_HEIGHT
  const titleStartY =
    linesHeight >= titleAreaHeight
      ? PADDING_Y
      : PADDING_Y + (titleAreaHeight - linesHeight) / 2

  lines.forEach((line, index) => {
    const y = titleStartY + index * TITLE_LINE_HEIGHT
    ctx.fillText(line, titleCenterX, y)
  })

  ctx.fillStyle = SITE_NAME_COLOR
  ctx.font = `bold ${SITE_NAME_FONT_SIZE}px "${FONT_FAMILY}"`
  ctx.textBaseline = "alphabetic"
  ctx.textAlign = "left"
  const siteNameMetrics = ctx.measureText(siteName)
  const siteNameWidth = siteNameMetrics.width
  const siteNameHeight =
    siteNameMetrics.actualBoundingBoxAscent +
    siteNameMetrics.actualBoundingBoxDescent
  const totalFooterWidth = LOGO_SIZE + LOGO_GAP + siteNameWidth
  const footerStartX = (OG_WIDTH - totalFooterWidth) / 2

  ctx.drawImage(logo, footerStartX, footerY, LOGO_SIZE, LOGO_SIZE)

  const siteNameY =
    footerY +
    (LOGO_SIZE + siteNameHeight) / 2 -
    siteNameMetrics.actualBoundingBoxDescent +
    4
  const siteNameX = footerStartX + LOGO_SIZE + LOGO_GAP
  ctx.fillText(siteName, siteNameX, siteNameY)

  return canvas.toBuffer("image/png")
}
