// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import Register from './pages/Register'
import Users from './pages/Users'
import PostsPage from './pages/Posts'
import SignIn from '../sign-in/SignIn'
import SignUp from '../sign-up/SignUp'

import NavBar from './components/NavBar'
import './styles.css'

export default function App() {
  return (
    
      <BrowserRouter>
        <Routes>
          {/* public app routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={<Users />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />

        </Routes>
      </BrowserRouter>
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
