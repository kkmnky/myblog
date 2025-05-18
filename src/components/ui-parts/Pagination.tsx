import Link from "next/link"
import { usePathname } from "next/navigation"

export type PaginationProps = {
  totalPages: number
  currentPage: number
}

export default function Pagination({
  totalPages,
  currentPage,
}: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, "") // Remove leading slash
    .replace(/\/page\/\d+$/, "") // Remove any trailing /page
  const prevPage = Number(currentPage) - 1
  const nextPage = Number(currentPage) + 1
  const hasPrevPage = prevPage > 0
  const hasNextPage = nextPage <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!hasPrevPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!hasPrevPage}
          >
            Previous
          </button>
        )}
        {hasPrevPage && (
          <Link
            href={
              prevPage === 1
                ? `/${basePath}/`
                : `/${basePath}/page/${prevPage}`
            }
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!hasNextPage && (
          <button
            className="cursor-auto disabled:opacity-50"
            disabled={!hasNextPage}
          >
            Next
          </button>
        )}
        {hasNextPage && (
          <Link href={`/${basePath}/page/${nextPage}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}
