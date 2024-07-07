import { slug } from 'github-slugger'
import Link from 'next/link'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="tracking-widest mr-3 mb-1 text-sm title-font font-medium text-indigo-500 hover:text-indigo-800 dark:hover:text-indigo-200"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag