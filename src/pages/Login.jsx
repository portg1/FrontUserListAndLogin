import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { setToken, setUser } = useAuth()  // در AuthContext این دو را export کن یا از login قبلی استفاده کن
  const [emailOrUserName, setEmailOrUserName] = useState('')
  const [password, setPassword] = useState('')

  const qc = useQueryClient()
  const loginMutation = useMutation({
    mutationFn: (payload) => api.post('/api/auth/login', payload).then(r => r.data),
    onSuccess: (data) => {
      setToken(data.token)
      setUser(data.user)
      qc.invalidateQueries({ queryKey: ['users'] }) // بعد از لاگین، لیست را تازه کن
      window.location.href = '/users'
    }
  })

  const onSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate({ emailOrUserName, password })
  }

  return (
    <div className="card">
      <h2>ورود</h2>
      <form onSubmit={onSubmit} className="form">
        <label>ایمیل یا نام کاربری
          <input value={emailOrUserName} onChange={e => setEmailOrUserName(e.target.value)} required />
        </label>
        <label>رمز عبور
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>

        {loginMutation.isError && (
          <p className="error">{loginMutation.error?.response?.status === 401 ? 'نام کاربری/رمز اشتباه است' : 'ورود ناموفق'}</p>
        )}

        <button type="submit" disabled={loginMutation.isLoading}>
          {loginMutation.isLoading ? '...' : 'ورود'}
        </button>
      </form>
    </div>
  )
}
