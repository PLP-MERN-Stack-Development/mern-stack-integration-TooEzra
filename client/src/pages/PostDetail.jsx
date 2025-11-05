import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { postService, authService } from '../services/api'

export default function PostDetail() {
  const { idOrSlug } = useParams()
  const [post, setPost] = useState(null)
  const [comment, setComment] = useState('')
  const user = authService.getCurrentUser()

  useEffect(() => {
    postService.getPost(idOrSlug).then(res => setPost(res.data))
  }, [idOrSlug])

  const handleComment = async (e) => {
    e.preventDefault()
    await postService.addComment(post._id, { content: comment })
    setComment('')
    const updated = await postService.getPost(idOrSlug)
    setPost(updated.data)
  }

  if (!post) return <p className="text-center">Loading...</p>

  return (
    <article className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      {post.featuredImage && (
        <img
          src={`/uploads/${post.featuredImage}`}
          alt={post.title}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-600 mb-6">
        By {post.author?.name} • {post.viewCount} views • {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div
        className="prose max-w-none mb-10"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <section>
        <h2 className="text-2xl font-semibold mb-4">Comments ({post.comments.length})</h2>
        {post.comments.map(c => (
          <div key={c._id} className="border-b pb-4 mb-4">
            <div className="flex justify-between">
              <strong>{c.user?.name || 'Guest'}</strong>
              <span className="text-sm text-gray-500">
                {new Date(c.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="mt-1">{c.content}</p>
          </div>
        ))}

        {user ? (
          <form onSubmit={handleComment} className="mt-6">
            <textarea
              value={comment}
              onChange={e => setComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 border rounded-lg"
              rows="3"
              required
            />
            <button
              type="submit"
              className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Post Comment
            </button>
          </form>
        ) : (
          <p className="mt-6 text-gray-600">
            <Link to="/login" className="text-blue-600 underline">Log in</Link> to comment.
          </p>
        )}
      </section>
    </article>
  )
}