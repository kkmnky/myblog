type RehypeNode = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: RehypeNode[];
};

type PreviewMeta = {
  title: string;
  description?: string;
  image?: string;
  host: string;
};

type Candidate = {
  container: RehypeNode[];
  index: number;
  url: string;
};

const PREVIEW_TIMEOUT_MS = 5000;
const PREVIEW_TITLE_MAX_LENGTH = 64;
const PREVIEW_DESCRIPTION_MAX_LENGTH = 96;
const previewCache = new Map<string, PreviewMeta | null>();

const decodeHtmlEntities = (value: string): string =>
  value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, key: string) => {
    const named: Record<string, string> = {
      amp: "&",
      lt: "<",
      gt: ">",
      quot: '"',
      apos: "'",
    };

    const lowerKey = key.toLowerCase();
    if (named[lowerKey]) return named[lowerKey];

    if (lowerKey.startsWith("#x")) {
      const codePoint = Number.parseInt(lowerKey.slice(2), 16);
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint);
    }

    if (lowerKey.startsWith("#")) {
      const codePoint = Number.parseInt(lowerKey.slice(1), 10);
      return Number.isNaN(codePoint) ? entity : String.fromCodePoint(codePoint);
    }

    return entity;
  });

const normalizeText = (value: string): string =>
  decodeHtmlEntities(value.replace(/\s+/g, " ").trim());

const truncate = (value: string, maxLength: number): string =>
  value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;

const parseAttributes = (tag: string): Record<string, string> => {
  const attributes: Record<string, string> = {};
  const attrRegex = /([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;

  for (const match of tag.matchAll(attrRegex)) {
    const key = match[1]?.toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? "";
    if (key) attributes[key] = value;
  }

  return attributes;
};

const parseMetaTags = (html: string): Map<string, string> => {
  const metaMap = new Map<string, string>();
  const metaTagRegex = /<meta\s+[^>]*>/gi;

  for (const tag of html.match(metaTagRegex) ?? []) {
    const attrs = parseAttributes(tag);
    const content = attrs.content ? normalizeText(attrs.content) : "";
    if (!content) continue;

    const property = attrs.property?.toLowerCase();
    const name = attrs.name?.toLowerCase();

    if (property) metaMap.set(`property:${property}`, content);
    if (name) metaMap.set(`name:${name}`, content);
  }

  return metaMap;
};

const extractTitle = (html: string): string | undefined => {
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (!titleMatch?.[1]) return undefined;
  return normalizeText(titleMatch[1]);
};

const isTextNode = (node: RehypeNode): boolean => node.type === "text";

const isWhitespaceText = (node: RehypeNode): boolean =>
  isTextNode(node) && /^\s*$/.test(node.value ?? "");

const isElementNode = (node: RehypeNode, tagName?: string): boolean =>
  node.type === "element" && (!tagName || node.tagName === tagName);

const toAbsoluteUrl = (url: string, baseUrl: string): string => {
  try {
    return new URL(url, baseUrl).toString();
  } catch {
    return url;
  }
};

const fetchPreview = async (url: string): Promise<PreviewMeta | null> => {
  if (previewCache.has(url)) return previewCache.get(url) ?? null;

  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  try {
    const controller = new AbortController();
    timeoutId = setTimeout(() => controller.abort(), PREVIEW_TIMEOUT_MS);

    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent":
          "Mozilla/5.0 (compatible; MyBlogLinkPreview/1.0; +https://example.com)",
        accept: "text/html,application/xhtml+xml",
      },
    });

    if (!response.ok) {
      previewCache.set(url, null);
      return null;
    }

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.toLowerCase().includes("text/html")) {
      previewCache.set(url, null);
      return null;
    }

    const html = await response.text();
    const meta = parseMetaTags(html);
    const finalUrl = response.url || url;
    const host = new URL(finalUrl).hostname;

    const title = [
      meta.get("property:og:title"),
      meta.get("name:twitter:title"),
      extractTitle(html),
    ].find((value): value is string => Boolean(value));

    if (!title) {
      previewCache.set(url, null);
      return null;
    }

    const description = [
      meta.get("property:og:description"),
      meta.get("name:description"),
      meta.get("name:twitter:description"),
    ].find((value): value is string => Boolean(value));

    const image = [
      meta.get("property:og:image"),
      meta.get("name:twitter:image"),
    ].find((value): value is string => Boolean(value));

    const preview: PreviewMeta = {
      title: truncate(title, PREVIEW_TITLE_MAX_LENGTH),
      description: description
        ? truncate(description, PREVIEW_DESCRIPTION_MAX_LENGTH)
        : undefined,
      image: image ? toAbsoluteUrl(image, finalUrl) : undefined,
      host,
    };

    previewCache.set(url, preview);
    return preview;
  } catch {
    previewCache.set(url, null);
    return null;
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
};

const createTextNode = (value: string): RehypeNode => ({
  type: "text",
  value,
});

const createElementNode = (
  tagName: string,
  properties: Record<string, unknown>,
  children: RehypeNode[] = []
): RehypeNode => ({
  type: "element",
  tagName,
  properties,
  children,
});

const createPreviewCardNode = (url: string, preview: PreviewMeta): RehypeNode => {
  const textContent: RehypeNode[] = [
    createElementNode(
      "p",
      { className: ["link-preview-title"] },
      [createTextNode(preview.title)]
    ),
  ];

  if (preview.description) {
    textContent.push(
      createElementNode(
        "p",
        { className: ["link-preview-description"] },
        [createTextNode(preview.description)]
      )
    );
  }

  textContent.push(
    createElementNode("p", { className: ["link-preview-host"] }, [
      createTextNode(preview.host),
    ])
  );

  const cardChildren: RehypeNode[] = [
    createElementNode("div", { className: ["link-preview-content"] }, textContent),
  ];

  if (preview.image) {
    cardChildren.push(
      createElementNode(
        "div",
        { className: ["link-preview-image"] },
        [
          createElementNode("img", {
            src: preview.image,
            alt: `${preview.title} のプレビュー画像`,
            loading: "lazy",
            decoding: "async",
          }),
        ]
      )
    );
  }

  return createElementNode("div", { className: ["link-preview-card"] }, [
    createElementNode(
      "a",
      {
        href: url,
        target: "_blank",
        rel: ["noopener", "noreferrer"],
        className: ["link-preview-anchor"],
      },
      cardChildren
    ),
  ]);
};

const extractStandaloneExternalUrl = (node: RehypeNode): string | null => {
  if (!isElementNode(node, "p")) return null;
  const children = node.children ?? [];
  const meaningfulChildren = children.filter((child) => !isWhitespaceText(child));

  if (meaningfulChildren.length !== 1) return null;
  const onlyChild = meaningfulChildren[0];
  if (!isElementNode(onlyChild, "a")) return null;

  const href = onlyChild.properties?.href;
  if (typeof href !== "string") return null;
  if (!/^https?:\/\//i.test(href)) return null;
  return href;
};

const collectCandidates = (node: RehypeNode, candidates: Candidate[]): void => {
  const children = node.children;
  if (!Array.isArray(children)) return;

  children.forEach((child, index) => {
    const url = extractStandaloneExternalUrl(child);
    if (url) {
      candidates.push({ container: children, index, url });
      return;
    }

    collectCandidates(child, candidates);
  });
};

export default function rehypeLinkPreview() {
  return async (tree: RehypeNode) => {
    const candidates: Candidate[] = [];
    collectCandidates(tree, candidates);

    if (!candidates.length) return;

    const urls = [...new Set(candidates.map((candidate) => candidate.url))];
    const previews = await Promise.all(
      urls.map(async (url) => [url, await fetchPreview(url)] as const)
    );
    const previewMap = new Map(previews);

    candidates.forEach((candidate) => {
      const preview = previewMap.get(candidate.url);
      if (!preview) return;
      candidate.container[candidate.index] = createPreviewCardNode(
        candidate.url,
        preview
      );
    });
  };
}
