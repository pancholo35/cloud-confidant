import './App.css'
import NavBar from './components/NavBar'
import Home from './pages/Home'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import { Routes, Route } from 'react-router-dom'
import { CheckSession } from './services/Auth'
import { useState, useEffect } from 'react'

function App() {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
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
            path={`/${user.username}/journal/:journal_id`}
            element={<Journal user={user} />}
          />
          <Route
            path={`/${user.username}/profile`}
            element={<Profile user={user} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
