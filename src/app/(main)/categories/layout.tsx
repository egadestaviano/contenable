import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Browse articles by category to find exactly what you are looking for.',
}

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
