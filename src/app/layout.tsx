import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.css";
import "@/styles/wave.css";
import { Providers } from "@/components/functional/providers";
import Header from "@/components/layouts/Header";
import SectionContainer from "@/components/layouts/SectionContainer";
import Footer from "@/components/layouts/Footer";
import siteMetadata from "@/siteMetadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "kmnky blog",
  description:
    "しがないSREのブログです。アプリ・インフラ問わず興味があって学習したことや読んだ本の内容を備忘録として不定期に記事にします。ブログサイトも鋭意作成中。",
};

// export const metadata: Metadata = {
//   metadataBase: new URL(siteMetadata.siteUrl),
//   title: {
//     default: siteMetadata.title,
//     template: `%s | ${siteMetadata.title}`,
//   },
//   description: siteMetadata.description,
//   openGraph: {
//     title: siteMetadata.title,
//     description: siteMetadata.description,
//     url: "./",
//     siteName: siteMetadata.title,
//     images: [siteMetadata.socialBanner],
//     locale: "ja_JP",
//     type: "website",
//   },
//   alternates: {
//     canonical: "./",
//     types: {
//       "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
//     },
//   },
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   twitter: {
//     title: siteMetadata.title,
//     card: "summary_large_image",
//     images: [siteMetadata.socialBanner],
//   },
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang={siteMetadata.language} suppressHydrationWarning>
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#fff"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#000"
      />
      <body
        className={
          (inter.className,
          "bg-gray-50 text-gray-600 antialiased dark:bg-gray-800 dark:text-gray-200")
        }
      >
        <SectionContainer>
          <Providers>
            <div className="flex h-screen flex-col justify-between">
              <Header />
              <main className="mb-auto">{children}</main>
              <Footer />
            </div>
          </Providers>
        </SectionContainer>
      </body>
    </html>
  );
}
