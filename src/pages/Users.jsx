import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const fetchUsers = async () => {
  const { data } = await api.get('/api/users')
  return data
}

export default function Users() {
  const { token } = useAuth()

  const { data: users = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    enabled: !!token, // تا وقتی لاگین نیستیم فراخوانی نشود
  })

  useEffect(() => {
    if (token) refetch() // بعد از لاگین، یک بار دیگر بگیر
  }, [token])

  if (!token) return <div className="card"><p className="error">اول وارد شوید</p></div>
  if (isLoading) return <div className="card"><p>در حال بارگذاری…</p></div>
  if (isError)   return <div className="card"><p className="error">{error?.message || 'خطا در دریافت کاربران'}</p></div>

  return (
    <div className="card">
      <h2>کاربران</h2>
      {users.length === 0 ? (
        <p>هنوز کاربری ثبت نشده است.</p>
      ) : (
        <table className="table">
          <thead><tr><th>ID</th><th>نام کاربری</th><th>ایمیل</th><th>تاریخ</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.userName}</td>
                <td>{u.email}</td>
                <td>{new Date(u.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
