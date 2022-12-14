import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { RegisterUser } from '../services/Auth'

const Register = () => {
  let navigate = useNavigate()

  const startState = {
    username: '',
    email: '',
    password: ''
  }

  const [formState, setFormState] = useState(startState)

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      username: formState.username,
      email: formState.email,
      password: formState.password
    })
    setFormState(startState)
    navigate('/signin')
  }

  return (
    <div>
      <form className="col" onSubmit={handleSubmit}>
        <label htmlFor="username">Username </label>
        <input
          onChange={handleChange}
          name="username"
          type="text"
          placeholder="username"
          value={formState.username}
          required
        />
        <label htmlFor="email">Email </label>
        <input
          onChange={handleChange}
          name="email"
          type="text"
          placeholder="email"
          value={formState.email}
          required
        />
        <label htmlFor="password">Password </label>
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="password"
          value={formState.password}
          required
        />
        <button id="register-button">Register</button>
      </form>
    </div>
  )
}

export default Register
