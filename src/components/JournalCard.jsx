import { useNavigate } from 'react-router-dom'

const JournalCard = ({ user, journal }) => {
  const navigate = useNavigate()

  return (
    <div
      className="flex-col card"
      onClick={() => navigate(`/journal/${journal.id}/${user.username}`)}
    >
      <h1>{journal.title}</h1>
      <h2>{journal.author}</h2>
    </div>
  )
}

export default JournalCard
