const Profile = ({ user }) => {
  return (
    <div>
      <h1>Profile page</h1>
      <h2>{user.username}</h2>
      <h2>{user.email}</h2>
    </div>
  )
}

export default Profile
