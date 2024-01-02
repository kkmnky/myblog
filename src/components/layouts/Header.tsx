import siteMetadata from "@/siteMetadata";
import { HEADER_NAV_LINKS } from "@/constants";
import Link from "../ui-elements/Link";
import ThemeSwitch from "../ui-parts/ThemeSwitch";
import MobileNav from "../ui-parts/MobileNav";
import Image from "../ui-elements/Image";

export default function Header() {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label={siteMetadata.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg> */}
              <Image src="/static/logo.jpg" alt="logo" width={48} height={48} />
            </div>
            {typeof siteMetadata.headerTitle === "string" ? (
              <div className="text-2xl font-semibold sm:block">
                {siteMetadata.headerTitle}
              </div>
            ) : (
              siteMetadata.headerTitle
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
