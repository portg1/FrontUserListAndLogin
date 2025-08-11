import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Users from './pages/Users'
import NavBar from './components/NavBar'
import './styles.css'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

function Home() {
  return (
    <div className="card">
      <h2>Welcome</h2>
      <p>This demo shows Register → Login → fetch protected Users list.</p>
      <p>
        Try <Link to="/register">Register</Link> or <Link to="/login">Login</Link> first.
      </p>
    </div>
  )
}
