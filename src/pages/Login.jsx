import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth()            
  const [emailOrUserName, setEmailOrUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const loginMutation = useMutation({
    mutationFn: ({ emailOrUserName, password }) =>
      login(emailOrUserName, password), 
    onSuccess: () => {
      navigate('/users')
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate({ emailOrUserName, password })
  }

  return (
    <div className="card">
      <h2>login</h2>
      <form onSubmit={onSubmit} className="form">
        <label>user name or email
          <input value={emailOrUserName} onChange={e => setEmailOrUserName(e.target.value)} required />
        </label>
        <label>password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>

        {loginMutation.isError && (
          <p className="error">
            {loginMutation.error?.response?.status === 401
              ? 'user name or password wrong'
              : 'not login'}
          </p>
        )}

        <button type="submit" disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? '...' : 'login'}
        </button>
      </form>
    </div>
  )
}
