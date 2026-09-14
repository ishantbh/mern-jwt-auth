import { Navigate, Outlet } from 'react-router'
import { useBoundStore } from '@/store'

export default function PublicOnlyRoute() {
  const isAuthenticated = useBoundStore((s) => s.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to='/dashboard' replace />
  }

  return <Outlet />
}
