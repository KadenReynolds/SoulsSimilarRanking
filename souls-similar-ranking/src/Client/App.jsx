import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import Games_Catalog from './pages/Games_Catalog'
import Home from './pages/Home'
import Login from './pages/Login'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [token, setToken] = useState("")

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)
  },[])

  return (
    <>
      <Routes>
      <Route path='/' element={<Home token={token}/>}/>
        <Route path='/catalog_games' element={<Games_Catalog token={token}/>}/>
        {!token
          ? 
          <Route path='/login' element={<Login setToken={setToken}/>}/>
          :
          <></>
        }
      </Routes>
    </>
  )
}

export default App
