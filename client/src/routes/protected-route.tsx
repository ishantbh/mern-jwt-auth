import { Navigate, Outlet, useLocation } from 'react-router'
import { useBoundStore } from '@/store'

export default function ProtectedRoute() {
  const isAuthenticated = useBoundStore((s) => s.isAuthenticated)
  const location = useLocation()

  console.log({ isAuthenticated })

  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return <Outlet />
}
