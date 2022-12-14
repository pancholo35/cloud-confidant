import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  let authenticatedOptions

  if (user) {
    authenticatedOptions = (
      <div id="nav-link">
        <Link to="/">Home</Link>
        <Link to={`/profile/${user.username}`}>Profile</Link>
        <Link onClick={handleLogout} to="/">
          Sign Out
        </Link>
      </div>
    )
  }

  const publicOptions = (
    <div id="nav-link">
      <Link to="/register">Register</Link>
      <Link to="/signin">Sign In</Link>
    </div>
  )

  return (
    <header>
      <nav className="flex-row nav">
        <div>
          <h1>Cloud Confidant</h1>
        </div>
        {user ? authenticatedOptions : publicOptions}
      </nav>
    </header>
  )
}

export default NavBar
