// client/src/pages/Home.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axiosInstance.get('/api/posts')  // PROXY: → http://localhost:5000/api/posts
        setPosts(res.data)
      } catch (err) {
        console.error('Posts error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  if (loading) return <p className="text-center mt-10">Loading posts...</p>

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Blog</h1>
      <Link to="/create" className="block mb-6 text-center text-green-600 underline">Create New Post</Link>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet. Create one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post._id} className="border p-4 rounded shadow">
              {post.image && <img src={`http://localhost:5000/${post.image}`} alt="" className="w-full h-48 object-cover mb-3 rounded" />}
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-sm text-gray-600">{post.category?.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}