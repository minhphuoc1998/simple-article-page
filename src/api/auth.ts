import { httpClient } from './client'

export const login = async (username: string, password: string): Promise<{ token: string }> => {
  const { data } = await httpClient.post('/login', { username, password })
  return data
}
