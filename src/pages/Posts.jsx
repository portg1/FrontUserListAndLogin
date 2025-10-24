// src/pages/PostsPage.jsx
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
//const axios = require(axios)
async function getPostsAxios(){
const response = axios.get('https://jsonplaceholder.typicode.com/posts')
console.log((await response).data);

}
//getPostsAxios();

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/posts'
})

const post =async  () => {

  const {data} =await api.get();
  return data;
}

(async () =>{

  console.log(await post());
})()



async function getPosts() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) throw new Error('Failed to fetch posts')
  return res.json()
}

export default function PostsPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  })

  if (isLoading) return <div>isLoading</div>
  if (isError) return <div>error {error.message}</div>

  return (
    <div style={{ maxWidth: 800, margin: '24px auto', padding: 16 }}>
      <h1 style={{ marginBottom: 16 }}>posts</h1>
      <ul style={{ display: 'grid', gap: 12, listStyle: 'none', padding: 0 }}>
        {data.map(p => (
          <li key={p.id} style={{ border: '1px solid #e5e7eb', borderRadius: 12, padding: 12 }}>
            <h3 style={{ margin: '0 0 8px' }}>{p.id}. {p.title}</h3>
            <p style={{ margin: 0, lineHeight: 1.7 }}>{p.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
