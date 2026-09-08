import type { StateCreator } from 'zustand'

export interface User {
  id: string
  username: string
  email: string
}

export interface AuthSlice {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  setAuth: (user: User, accessToken: string) => void
  setAccessToken: (accessToken: string) => void
  clearAuth: () => void
}

const initialAuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set,
) => ({
  ...initialAuthState,
  setAuth: (user, accessToken) =>
    set({ user, accessToken, isAuthenticated: true }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clearAuth: () => set(initialAuthState),
})
