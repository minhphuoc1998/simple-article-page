import { httpClient } from './client'

export interface ArticleSearchParams {
  origin?: string
  page?: number
  pageSize?: number
  sortBy?: string
  ascending?: boolean
}

export interface Article {
  id: string
  title?: string
  description?: string
  thumbnail?: string
  like?: number,
  url?: string
}

export const getArticleList = async (params?: ArticleSearchParams): Promise<Article[]> => {
  const { data } = await httpClient.get("/article", { params })
  return data
}
