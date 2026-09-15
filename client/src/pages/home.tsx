import { Link } from 'react-router'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className='flex-1 flex'>
      <div className='flex-1 flex w-full max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center text-center px-4 gap-8'>
          <h1 className='text-3xl font-bold'>MERN JWT Auth Demo</h1>

          <p className='max-w-2xl text-muted-foreground text-lg'>
            A simple MERN JWT authentication demo app with{' '}
            <span className='font-semibold text-foreground/70'>
              access and refresh tokens, axios interceptors, refresh queue
            </span>
            , and more.
          </p>

          <Button size='lg' className='px-4' asChild>
            <Link to='/dashboard'>Get Started</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
