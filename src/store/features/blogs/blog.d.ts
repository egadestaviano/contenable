import type { Meta, ResSuccess } from '@/types/api'

export interface Category {
  id: number
  name: string
  slug: string
}

export interface Tag {
  id: number
  name: string
  slug: string
}

export interface Author {
  id: number
  name: string
  username: string | null
  avatar: string | null
}

export interface Blog {
  id: number
  title: string
  description: string
  slug: string
  thumbnail: string
  created_at: string
  updated_at: string
  category: Category
  author: Author
  tags: Tag[]
  bookmark_count: number
  is_bookmarked?: boolean
}

export interface BlogDetail extends Blog {
  content: string
  featured_image: string
  special_role: string
  status: string
  published_at: string
}

export type BlogListResponse = ResSuccess<Blog[]>

export interface BlogState {
  blogs: Blog[]
  newBlogs: Blog[]
  topBlogs: Blog[]
  featuredBlogs: Blog[]
  searchBlogs: Blog[]
  blogDetail: BlogDetail | null
  meta: Meta | null
  loading: boolean
  error: string | null
}

export interface SearchBlogParams {
  q?: string;
  per_page?: number;
  page?: number;
  category?: string;
  tags?: string[];
  author?: string;
  date_from?: string;
  date_to?: string;
  sort?: string;
}

