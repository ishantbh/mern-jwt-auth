import { Outlet } from 'react-router'
import { ThemeToggle } from '@/components/theme-toggle'
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout() {
  return (
    <div className='min-h-screen flex flex-col'>
      <header className='flex justify-end p-4'>
        <ThemeToggle />
      </header>
      <main className='flex-1'>
        <Outlet />
      </main>
      <Toaster />
    </div>
  )
}
