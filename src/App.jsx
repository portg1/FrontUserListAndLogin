// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import useAuthStore from './store/useAuthStore'

import Login from './pages/Login'
import Register from './pages/Register'
import Users from './pages/Users'
import PostsPage from './pages/Posts'
import ProtectedRoute from './components/ProtectedRoute' // ✅ مسیر صحیح برای روت محافظت‌شده
import './styles.css'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* مسیرهای عمومی */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* مسیر محافظت‌شده */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />

        {/* سایر صفحات */}
        <Route path="/posts" element={<PostsPage />} />
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
