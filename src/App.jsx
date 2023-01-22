import { BrowserRouter, Route, Routes } from 'react-router-dom'

import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Login from './components/Login'
import Register from './components/Register'
import Chat from './components/Chat'

import './scss/style.scss'

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='chat' element={<Chat />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App