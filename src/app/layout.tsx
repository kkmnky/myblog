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
  title: {
    default: siteMetadata.siteName,
    template: `%s | ${siteMetadata.siteName}`,
  },
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.siteUrl),
  openGraph: {
    title: siteMetadata.siteName,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.siteName,
    images: [siteMetadata.ogImage],
    locale: "ja_JP",
    type: "website",
  },
  // TODO: RSSを有効化したときに有効化する
  // alternates: {
  //   canonical: "./",
  //   types: {
  //     "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
  //   },
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    creator: siteMetadata.twitterUser,
    title: siteMetadata.siteName,
    images: [siteMetadata.ogImage],
  },
};

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
