import JournalCard from '../components/JournalCard'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CreateJournal } from '../services/JournalServices'

const Home = ({ user }) => {
  const navigate = useNavigate()
  const initialState = {
    title: '',
    author: '',
    userId: ''
  }
  let [formToggle, setFormToggle] = useState(false)
  let [formState, setFormState] = useState(initialState)

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
      author: user.username,
      userId: user.id
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const journal = await CreateJournal(formState)
    user.journals.push(journal)
    setFormToggle(false)
    setFormState(initialState)
  }

  useEffect(() => {
    if (!user) {
      navigate('/register')
    }
  }, [user])

  return (
    user && (
      <div className="flex-row journal-card">
        {user.journals.map((journal) => (
          <JournalCard key={journal.id} user={user} journal={journal} />
        ))}
        <div
          className="flex-col card grey"
          onClick={() => setFormToggle((current) => !current)}
        >
          Add a Journal +
        </div>
        {formToggle && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={formState.title}
              onChange={handleChange}
            />
          </form>
        )}
      </div>
    )
  )
}

export default Home
