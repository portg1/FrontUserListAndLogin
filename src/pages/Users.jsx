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
    enabled: !!token, 
  })

  

  if (isLoading) return <div className="card"><p>loading ...</p></div>
  if (isError)   return <div className="card"><p className="error">{error?.message || 'error'}</p></div>

  return (
    <div className="card">
      <h2>users</h2>
      {users.length === 0 ? (
        <p>not found</p>
      ) : (
        <table className="table">
          <thead><tr><th>ID</th><th>user name </th><th>email</th><th>time creation</th></tr></thead>
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
