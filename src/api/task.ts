import axios from 'axios';
import { Pagination } from './base';

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
  const res = await axios.get(process.env.NEXT_PUBLIC_ENDPOINT + "/task", { params })
  const { data } = res
  return data
}
