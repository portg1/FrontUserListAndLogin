import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const { register } = useAuth() 
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const navigate = useNavigate()

  const registerMutation = useMutation({
    mutationFn: ({ userName, email, password }) =>
      register(userName, email, password), 
    onSuccess: () => {
      navigate('/users')
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()
    registerMutation.mutate({ userName, email, password })
  }

  return (
    <div className="card">
      <h2>singup</h2>
      <form onSubmit={onSubmit} className="form">
        <label>UserName
          <input value={userName} onChange={e => setUserName(e.target.value)} required />
        </label>
        <label>email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>

        {registerMutation.isError && (
          <p className="error">register unsuccess</p>
        )}

        <button type="submit" disabled={registerMutation.isLoading}>
          {registerMutation.isLoading ? '...' : 'signup'}
        </button>
      </form>
    </div>
  )
}
