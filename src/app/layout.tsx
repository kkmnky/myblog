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
    "学習した技術・本を備忘録として不定期に記事にします。鋭意ページ作成中。",
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
