'use client'

import { useEffect } from 'react'
import { Flame, Star, Sparkles } from 'lucide-react'
import Hero from '@/components/Landing/Hero'
import ArticleSection from '@/components/Landing/ArticleSection'

import { useAppDispatch, useAppSelector } from '@/store/hooks'
import {
  fetchNewBlogs,
  fetchTopBlogs,
  fetchFeaturedBlogs,
} from '@/store/features/blogs/blogSlice'
import { fetchTags } from '@/store/features/tags/tagSlice'

export default function Home() {
  const dispatch = useAppDispatch()

  const { newBlogs, topBlogs, featuredBlogs, loading } = useAppSelector(
    (state) => state.blogs
  )

  useEffect(() => {
    dispatch(fetchTags())
    dispatch(fetchNewBlogs())
    dispatch(fetchTopBlogs())
    dispatch(fetchFeaturedBlogs())
  }, [dispatch])

  return (
    <main
      className="
        font-sans flex flex-col items-center 
        min-h-screen 
        px-2 sm:px-8 lg:px-16 xl:px-24 
        pb-16 
        gap-y-10 sm:gap-14 lg:gap-20
      "
    >
      {/* Hero Section */}
      <section className="w-full max-w-7xl">
        <Hero />
      </section>

      <section className="w-full max-w-7xl">
        <ArticleSection
          articles={newBlogs}
          loading={loading}
          title={
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              <h2 className="text-2xl sm:text-3xl font-bold">New Articles</h2>
            </div>
          }
        />
      </section>

      <section className="w-full max-w-7xl">
        <ArticleSection
          articles={topBlogs}
          loading={loading}
          title={
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-red-500" />
              <h2 className="text-2xl sm:text-3xl font-bold">Top Articles</h2>
            </div>
          }
        />
      </section>

      <section className="w-full max-w-7xl">
        <ArticleSection
          articles={featuredBlogs}
          loading={loading}
          title={
            <div className="flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500" />
              <h2 className="text-2xl sm:text-3xl font-bold">Featured Articles</h2>
            </div>
          }
        />
      </section>
    </main>
  )
}
