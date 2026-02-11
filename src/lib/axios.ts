import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { getCookie, deleteCookie } from 'cookies-next'

function getToken(): string | null {
  const token = getCookie('TOKEN')
  return typeof token === 'string' ? token : null
}

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://api.example.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})

api.interceptors.request.use(
  (config) => {
    const token = getToken()
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn('⚠️ Unauthorized — token expired or invalid.')

      deleteCookie('TOKEN')
      deleteCookie('REFRESH_TOKEN')
      // window.location.href = '/log-in'
    }

    return Promise.reject(error)
  }
)

export default api

export type ApiResponse<T> = AxiosResponse<T>
export interface ApiError {
  message: string
  statusCode?: number
  errors?: Record<string, string[]>
}
