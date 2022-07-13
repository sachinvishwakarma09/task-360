import React from 'react'
import Login from './components/login/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
