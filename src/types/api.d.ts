export interface Meta {
  current_page: number[]
  last_page: number[]
  per_page: number[]
  total: number[]
  from: number[]
  to: number[]
  links: PaginationLink[]
  path: string
}

export interface PaginationLink {
  url: string | null
  label: string
  active: boolean
}

export interface ResSuccess<T> {
  data: T
  meta?: Meta
}

export interface ResError {
  message: string
  errors?: Record<string, string[]>
  status?: number
}
