import { Pagination } from './base'
import { httpClient } from './client'

export interface TaskSearchParams {
  root?: boolean
  page?: number
  pageSize?: number
  sortBy?: string
  ascending?: boolean
  parentTaskId?: string
}

export interface TaskDetail {
  id: string
  url: string
  status: string
  totalDescendant: number
  totalDescendantSuccess: number
  totalDescendantPending: number
  totalDescendantRunning: number
  totalDescendantError: number
  createdAt: string
}

export const getTaskList = async (params?: TaskSearchParams): Promise<Pagination<TaskDetail>> => {
  const { data } = await httpClient.get("/task", { params })
  return data
}
