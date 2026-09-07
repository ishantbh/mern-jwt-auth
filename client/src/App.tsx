import { BrowserRouter, Routes, Route } from 'react-router'
import Login from './pages/login'
import Register from './pages/register'
import Dashboard from './pages/dashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>Chat App</div>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
