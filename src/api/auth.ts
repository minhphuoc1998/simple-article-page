import { httpClient } from './client'

export const login = async (username: string, password: string): Promise<{ token: string }> => {
  const { data } = await httpClient.post('/auth/login', { username, password })
  return data
}
