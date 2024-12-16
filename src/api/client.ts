import axios from 'axios'

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
  timeout: 60000
})

httpClient.interceptors.request.use(async (config) => {
  const { token } = JSON.parse(localStorage.getItem('auth') || '{}')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
