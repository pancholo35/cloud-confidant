import SignIn from './SignIn'

const Home = ({ user, setUser }) => {
  return user ? (
    <div>
      <div>Home</div>
    </div>
  ) : (
    <SignIn setUser={setUser} />
  )
}

export default Home
