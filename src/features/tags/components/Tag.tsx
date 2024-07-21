import Link from 'next/link'
import { TagType } from '../types'

const Tag = ({ label, link }: TagType) => {
  return (
    <Link
      href={`/tags/${link}`}
      className="tracking-widest mr-3 mb-1 text-sm title-font font-medium text-indigo-500 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-200"
    >
      {label.split(' ').join('-')}
    </Link>
  )
}

export default Tag