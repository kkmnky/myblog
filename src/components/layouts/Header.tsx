import siteMetadata from "@/siteMetadata";
import { HEADER_NAV_LINKS } from "@/constants";
import Link from "@/components/ui-elements/Link";
import ThemeSwitch from "@/components/ui-parts/ThemeSwitch";
import MobileNav from "@/components/ui-parts/MobileNav";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.siteName}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <img src="/static/logo.png" alt="logo" width={48} height={48} />
            </div>
            {typeof siteMetadata.siteName === "string" ? (
              <div className="text-2xl font-semibold sm:block ml-2">
                {siteMetadata.siteName}
              </div>
            ) : (
              siteMetadata.siteName
            )}
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        {HEADER_NAV_LINKS.filter((link) => link.href !== "/").map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="hidden font-medium text-gray-900 dark:text-gray-100 sm:block"
          >
            {link.title}
          </Link>
        ))}
        {/* <SearchButton /> */}
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
}
