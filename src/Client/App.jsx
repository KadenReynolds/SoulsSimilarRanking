import { useState, useEffect } from 'react'
import {Routes, Route} from 'react-router-dom'
import Games_Catalog from './pages/Games_Catalog'
import BossForm from './pages/BossForm'
import GameBosses from './pages/GameBosses'
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
        <Route path='/bosses/newboss' element={<BossForm token={token}/>}/>
        <Route path='/catalog_games' element={<Games_Catalog token={token}/>}/>
        <Route path='/bosses/:gameID' element={<GameBosses token={token}/>}/>
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
