import { create } from 'zustand'
import { createAuthSlice, type AuthSlice } from './auth-slice'

export type BoundState = AuthSlice

export const useBoundStore = create<BoundState>()((...a) => ({
  ...createAuthSlice(...a),
}))
