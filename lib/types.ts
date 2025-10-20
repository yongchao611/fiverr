export interface Article {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  coverImage?: string
  published: boolean
  createdAt: string
  updatedAt: string
}

export interface ArticleFormData {
  title: string
  excerpt: string
  content: string
  coverImage?: string
  published: boolean
}


