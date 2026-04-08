import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search Results',
  description: 'Search for articles, insights, and stories on Contenable.',
}

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
