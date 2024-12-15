import axios from 'axios';

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
  const serverUrl = process.env.NEXT_PUBLIC_ENDPOINT + "/article"
  console.log('serverUrl', serverUrl)
  const res = await axios.get(process.env.NEXT_PUBLIC_ENDPOINT + "/article", { params })
  const { data } = res
  return data
}
