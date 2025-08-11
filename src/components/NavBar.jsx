import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavBar() {
  const { user, logout } = useAuth()
  return (
    <nav style={{ display: 'flex', gap: 12, padding: 12, borderBottom: '1px solid #ddd' }}>
      <Link to="/">Home</Link>
      {!user && <Link to="/register">Register</Link>}
      {!user && <Link to="/login">Login</Link>}
      <Link to="/users">Users</Link>
      <div style={{ marginLeft: 'auto' }}>
        {user ? (
          <>
            <span style={{ marginRight: 8 }}>Hello, {user.userName}</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <span>Not signed in</span>
        )}
      </div>
    </nav>
  )
}
