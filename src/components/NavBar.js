import { Link } from 'react-router-dom'

const NavBar = () => {
  let authenticatedOptions

  if (user) {
    authenticatedOptions = (
      <nav className="flex-row nav-links">
        <Link to="/">Home</Link>
        <Link to={`${user.username}/profile`}>Profile</Link>
        <Link onClick={handleLogout} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }

  const publicOptions = (
    <nav className="flex-row nav-links">
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </nav>
  )

  return (
    <header>
      <nav>
        <div>
          <h1>Cloud Confidant</h1>
        </div>
        <div>{user ? authenticatedOptions : publicOptions}</div>
      </nav>
    </header>
  )
}

export default NavBar
