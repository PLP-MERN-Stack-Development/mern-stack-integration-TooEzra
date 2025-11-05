// server/routes/posts.js
const express = require('express')
const router = express.Router()
const Post = require('../models/Post')
const auth = require('../middleware/auth')
const multer = require('multer')
const path = require('path')

// DEFINE MULTER FIRST
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
})
const upload = multer({ storage })

// CREATE POST — MULTER FIRST
router.post('/', upload.single('image'), auth, async (req, res) => {
  try {
    const { title, content, category } = req.body
    if (!title || !content || !category) {
      return res.status(400).json({ message: 'All fields required' })
    }

    const post = await Post.create({
      title,
      content,
      category,
      author: req.user.id,
      image: req.file ? req.file.filename : null
    })

    const populated = await Post.findById(post._id)
      .populate('category', 'name')
      .populate('author', 'name')
      .lean()

    res.status(201).json(populated)
  } catch (err) {
    console.error('CREATE POST ERROR:', err)
    res.status(500).json({ message: 'Server Error', error: err.message })
  }
})

// GET POSTS
router.get('/', auth, async (req, res) => {
  try {
    console.log('Fetching posts...')
    const posts = await Post.find()
      .populate({ path: 'category', select: 'name' })
      .populate({ path: 'author', select: 'name' })
      .sort({ createdAt: -1 })
      .lean()

    const validPosts = posts.filter(p => p.category && p.author)
    console.log('Valid posts:', validPosts.length)
    res.json(validPosts)
  } catch (err) {
    console.error('FETCH ERROR:', err)
    res.status(500).json({ message: 'Server Error', error: err.message })
  }
})

module.exports = router