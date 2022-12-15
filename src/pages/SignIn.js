import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { SignInUser } from '../services/Auth'
import { GetUser } from '../services/UserServices'

const SignIn = ({ setUser }) => {
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
      const user = await GetUser(payload.id)
      user && setUser(user)
      setFormState(startState)
      navigate('/')
    } else {
      window.alert('Incorrect Email or Password')
      setFormState({ email: formState.email, password: '' })
    }
  }

  return (
    <div>
      <form className="flex-col singin-form" onSubmit={handleSubmit}>
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
        <button>Sign In</button>
      </form>
      <div>
        <p>New user?</p>
        <button onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  )
}

export default SignIn
