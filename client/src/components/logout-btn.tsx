import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import axiosClient from '@/api/axios-client'
import { useBoundStore } from '@/store'
import { Button } from '@/components/ui/button'

export default function LogoutBtn() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const navigate = useNavigate()

  const clearAuth = useBoundStore((s) => s.clearAuth)

  async function handleLogout() {
    setIsLoggingOut(true)

    try {
      await axiosClient.post('/auth/logout')
      clearAuth()
      navigate('/login')
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Something went wrong')
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <Button onClick={handleLogout} disabled={isLoggingOut}>
      {isLoggingOut ? 'Logging out...' : 'Log out'}
    </Button>
  )
}
