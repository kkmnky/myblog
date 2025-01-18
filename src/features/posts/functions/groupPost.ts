import { Post } from "contentlayer/generated"

export const groupPostsByYear = (posts: Post[]): Record<string, Post[]> => {
  return posts.reduce((groups, post) => {
    const year = new Date(post.date).getFullYear().toString()
    if (!groups[year]) {
      groups[year] = []
    }
    groups[year].push(post)
    return groups
  }, {} as Record<string, Post[]>)
}
