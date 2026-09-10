import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { bootstrapAuth } from './lib/bootstrap-auth'
import RootLayout from './layouts/root-layout'
import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'

export default function App() {
  const [isBootstrapping, setIsBootstrapping] = useState(true)

  useEffect(() => {
    // get access token on app load
    bootstrapAuth().finally(() => setIsBootstrapping(false))
  }, [])

  if (isBootstrapping) {
    return (
      <div className='flex min-h-screen items-center justify-center text-muted-foreground'>
        Loading...
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
