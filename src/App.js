import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import Journal from './pages/Journal'
import Profile from './pages/Profile'
import { Routes, Route } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import { useState, useEffect } from 'react'
import { GetUser } from './services/UserServices'

function App() {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const userData = await CheckSession()
    const user = await GetUser(userData.id)
    user && setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkToken()
    }
  }, [])

  const handleLogout = () => {
    setUser(null)
    localStorage.clear()
  }

  return (
    <div className="App">
      <NavBar user={user} handleLogout={handleLogout} />
      <main>
        <Routes>
          <Route path="/" element={<Home user={user} setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route
            path="/journal/:journal_id/:username"
            element={<Journal user={user} />}
          />
          <Route path="/profile/:username" element={<Profile user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
