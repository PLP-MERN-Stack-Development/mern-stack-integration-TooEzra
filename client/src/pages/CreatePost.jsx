// client/src/pages/CreatePost.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../utils/axiosInstance'

export default function CreatePost() {
  const [formData, setFormData] = useState({ title: '', content: '', category: '', image: null })
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axiosInstance.get('/api/categories')
        setCategories(res.data)
      } catch (err) {
        console.error('CATEGORIES ERROR:', err)
      }
    }
    fetchCats()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const data = new FormData()
    data.append('title', formData.title)
    data.append('content', formData.content)
    data.append('category', formData.category)
    if (formData.image) data.append('image', formData.image)

    try {
      await axiosInstance.post('/api/posts', data)
      navigate('/')
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem('token')
        navigate('/login')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Title" onChange={e => setFormData({ ...formData, title: e.target.value })} required className="w-full p-3 border rounded" />
        <textarea placeholder="Content" onChange={e => setFormData({ ...formData, content: e.target.value })} required className="w-full p-3 border rounded h-32" />
        <select onChange={e => setFormData({ ...formData, category: e.target.value })} required className="w-full p-3 border rounded">
          <option value="">Select Category</option>
          {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
        </select>
        <input type="file" accept="image/*" onChange={e => setFormData({ ...formData, image: e.target.files[0] })} className="w-full p-3 border rounded" />
        <button type="submit" disabled={loading} className="w-full bg-green-600 text-white py-3 rounded">
          {loading ? 'Publishing...' : 'Publish'}
        </button>
      </form>
    </div>
  )
}