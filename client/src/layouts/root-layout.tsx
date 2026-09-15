import { Outlet } from 'react-router'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/header'

export default function RootLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />

      <main className='flex-1 flex'>
        <Outlet />
      </main>
      <Toaster />
    </div>
  )
}
