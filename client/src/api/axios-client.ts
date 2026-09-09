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

axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetriableConfig | undefined

    if (!originalRequest) {
      return Promise.reject(error)
    }

    const isAuthEndpoint = originalRequest?.url?.includes('/auth')

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthEndpoint
    ) {
      originalRequest._retry = true

      try {
        const { data } = await axios.post<{ accessToken: string }>(
          '/api/auth/refresh',
          {},
          { withCredentials: true },
        )

        useBoundStore.getState().setAccessToken(data.accessToken)
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`

        return axiosClient(originalRequest)
      } catch (refreshError) {
        useBoundStore.getState().clearAuth()
        window.location.href = '/login'
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

export default axiosClient
