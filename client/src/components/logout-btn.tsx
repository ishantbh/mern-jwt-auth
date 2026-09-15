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
    <Button
      onClick={handleLogout}
      disabled={isLoggingOut}
      variant='destructive'
      size='lg'
      className='px-4 flex items-center gap-2 border border-destructive/20'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        stroke-width='2'
        stroke-linecap='round'
        stroke-linejoin='round'
        className='lucide lucide-log-out preview-icon'
      >
        <path d='m16 17 5-5-5-5' />
        <path d='M21 12H9' />
        <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
      </svg>
      <span>{isLoggingOut ? 'Logging out...' : 'Log out'}</span>
    </Button>
  )
}
