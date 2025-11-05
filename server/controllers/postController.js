const Post = require('../models/Post')

const getPosts = async (req, res) => {
  try {
    console.log('Fetching posts...')
    const posts = await Post.find()
      .populate('category', 'name')
      .populate('author', 'name')
      .lean()

    console.log('Posts fetched:', posts.length)
    return res.json(posts)
  } catch (err) {
    console.error('GET POSTS ERROR:', err)
    return res.status(500).json({ message: 'Server Error', error: err.message })
  }
}

const createPost = async (req, res) => {
  try {
    const { title, content, category } = req.body
    const image = req.file ? req.file.path : null

    const post = await Post.create({
      title,
      content,
      category,
      image,
      author: req.user.id
    })

    return res.status(201).json(post)
  } catch (err) {
    console.error('CREATE POST ERROR:', err)
    return res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = { getPosts, createPost }