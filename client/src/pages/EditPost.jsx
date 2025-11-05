import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'  // ← FIXED: Added useEffect import
import { postService, categoryService } from '../services/api'

export default function EditPost() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({})

  useEffect(() => {
    Promise.all([
      postService.getPost(id),
      categoryService.getAllCategories()
    ]).then(([postRes, catRes]) => {
      const p = postRes.data
      setPost(p)
      setForm({
        title: p.title,
        content: p.content,
        excerpt: p.excerpt || '',
        category: p.category._id,
        tags: p.tags?.join(', ') || '',
        isPublished: p.isPublished,
        featuredImage: null
      })
      setCategories(catRes.data)
    })
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    Object.keys(form).forEach(key => {
      if (key === 'featuredImage' && form[key]) {
        formData.append(key, form[key])
      } else if (form[key] !== null && form[key] !== undefined) {
        formData.append(key, form[key])
      }
    })

    await postService.updatePost(id, formData)
    navigate(`/post/${post.slug}`)
  }

  if (!post) return <p className="text-center">Loading...</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
        className="w-full p-3 border rounded mb-4"
        required
      />

      <textarea
        placeholder="Content (HTML allowed)"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
        className="w-full p-3 border rounded mb-4 h-40"
        required
      />

      <textarea
        placeholder="Excerpt (optional, max 200 chars)"
        value={form.excerpt}
        onChange={e => setForm({ ...form, excerpt: e.target.value })}
        className="w-full p-3 border rounded mb-4"
        maxLength={200}
      />

      <select
        value={form.category}
        onChange={e => setForm({ ...form, category: e.target.value })}
        className="w-full p-3 border rounded mb-4"
        required
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={form.tags}
        onChange={e => setForm({ ...form, tags: e.target.value })}
        className="w-full p-3 border rounded mb-4"
      />

      <input
        type="file"
        accept="image/*"
        onChange={e => setForm({ ...form, featuredImage: e.target.files[0] })}
        className="w-full p-3 border rounded mb-4"
      />

      <label className="flex items-center mb-6">
        <input
          type="checkbox"
          checked={form.isPublished}
          onChange={e => setForm({ ...form, isPublished: e.target.checked })}
          className="mr-2"
        />
        <span>Publish immediately</span>
      </label>

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Update Post
        </button>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}