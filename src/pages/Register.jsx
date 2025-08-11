import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { setToken, setUser } = useAuth()
  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const qc = useQueryClient()
  const registerMutation = useMutation({
    mutationFn: (payload) => api.post('/api/auth/register', payload).then(r => r.data),
    onSuccess: (data) => {
      setToken(data.token)
      setUser(data.user)
      qc.invalidateQueries({ queryKey: ['users'] })
      window.location.href = '/users'
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()
    registerMutation.mutate({ userName, email, password })
  }

  return (
    <div className="card">
      <h2>ثبت‌نام</h2>
      <form onSubmit={onSubmit} className="form">
        <label>نام کاربری
          <input value={userName} onChange={e => setUserName(e.target.value)} required />
        </label>
        <label>ایمیل
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>رمز عبور
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>

        {registerMutation.isError && (
          <p className="error">{registerMutation.error?.response?.data?.message || 'ثبت‌نام ناموفق بود'}</p>
        )}

        <button type="submit" disabled={registerMutation.isLoading}>
          {registerMutation.isLoading ? '...' : 'ساخت حساب'}
        </button>
      </form>
    </div>
  )
}
