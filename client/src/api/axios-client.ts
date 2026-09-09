import axios from 'axios'
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

export default axiosClient
