import { Link } from 'react-router'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  return (
    <header className='border-b border-border'>
      <div className='w-full max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between gap-2'>
          <Link
            to='/'
            className='text-lg sm:text-xl tracking-wide font-semibold'
          >
            MERN JWT Auth
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
