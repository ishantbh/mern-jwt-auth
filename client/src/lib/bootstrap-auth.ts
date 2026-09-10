import axios from 'axios'
import axiosClient from '../api/axios-client'
import { useBoundStore } from '../store'

export async function bootstrapAuth() {
  try {
    const { data: refreshData } = await axios.post<{ accessToken: string }>(
      '/api/auth/refresh',
      {},
      { withCredentials: true },
    )

    useBoundStore.getState().setAccessToken(refreshData.accessToken)

    const { data } = await axiosClient.get('/auth/me')

    useBoundStore.getState().setAuth(data.user, refreshData.accessToken)
  } catch {
    // invalid or expired refresh token
    useBoundStore.getState().clearAuth()
  }
}
