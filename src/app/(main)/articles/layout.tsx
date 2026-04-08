import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Explore our collection of insightful articles on various topics.',
}

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
