import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SignInUser } from '../services/Auth'

const SignIn = () => {
  let navigate = useNavigate()

  const startState = {
    email: '',
    password: ''
  }

  const [formState, setFormState] = useState(startState)

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formState)
    if (payload) {
      await setUser(payload)
      setFormState(startState)
      navigate('/')
    } else {
      window.alert('Incorrect Email or Password')
      setFormState({ email: formState.email, password: '' })
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="email"
          value={formState.email}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="password"
          value={formState.password}
          required
        />
        <button id="login-btn">Sign in!</button>
      </form>
      <div>
        <p>New user?</p>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  )
}

export default SignIn
