import { Link } from 'react-router'
import { Button } from '@/components/ui/button'
import LogoutBtn from '@/components/logout-btn'

export default function Home() {
  return (
    <div className='flex-1 flex'>
      <div className='flex-1 flex w-full max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8'>
        <div className='max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center text-center px-4 gap-8'>
          <div className='flex flex-col gap-4 items-center justify-center'>
            <h1 className='text-3xl font-bold'>Welcome to your dashboard</h1>
            <h2 className='text-xl font-semibold text-foreground/80'>
              You are logged in! 🎉
            </h2>
          </div>

          <p className='max-w-2xl text-muted-foreground text-lg'>
            Check out the code on: <br />
            <Button
              variant='link'
              className='text-base text-muted-foreground focus:text-foreground hover:text-foreground transition-colors duration-200'
              asChild
            >
              <a href='https://github.com/ishantbh/mern-jwt-auth'>
                https://github.com/ishantbh/mern-jwt-auth
              </a>
            </Button>
          </p>

          <LogoutBtn />

          {/* <Button size='lg' className='px-4' asChild>
            <Link to='/dashboard'>Get Started</Link>
          </Button> */}
        </div>
      </div>
    </div>
  )
}
