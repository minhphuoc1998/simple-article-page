export interface Pagination<T> {
  currentPage: number
  totalPages: number
  pageSize: number
  totalCount: number
  items: T[]
}
