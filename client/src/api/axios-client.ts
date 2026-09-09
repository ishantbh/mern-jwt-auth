import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { useBoundStore } from '../store'

const axiosClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

axiosClient.interceptors.request.use((config) => {
  const token = useBoundStore.getState().accessToken
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Track retry status
interface RetriableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const noRetryEndpoints = ['/auth/login', '/auth/register', '/auth/refresh']

let isRefreshing = false
let refreshQueue: Array<(token: string) => void> = []

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined

    if (!originalRequest) {
      return Promise.reject(error)
    }

    const shouldSkipRetry = noRetryEndpoints.some((path) =>
      originalRequest.url?.includes(path),
    )

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !shouldSkipRetry
    ) {
      if (isRefreshing) {
        // a refresh is already in flight, queue this request
        return new Promise((resolve) => {
          refreshQueue.push((newToken: string) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            resolve(axiosClient(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const { data } = await axios.post<{ accessToken: string }>(
          '/api/auth/refresh',
          {},
          { withCredentials: true },
        )

        useBoundStore.getState().setAccessToken(data.accessToken)
        refreshQueue.forEach((resolveQueued) => resolveQueued(data.accessToken))
        refreshQueue = []

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return axiosClient(originalRequest)
      } catch (refreshError) {
        useBoundStore.getState().clearAuth()
        refreshQueue = []
        window.location.href = '/login'
        return Promise.reject(refreshError)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  },
)

export default axiosClient
