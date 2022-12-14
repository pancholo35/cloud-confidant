import JournalCard from '../components/JournalCard'

const Home = ({ user }) => {
  return user ? (
    <div>
      {user.journals.map((journal) => (
        <JournalCard key={journal.id} user={user} journal={journal} />
      ))}
    </div>
  ) : (
    <h1>Please Sign In</h1>
  )
}

export default Home
