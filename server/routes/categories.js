// server/routes/categories.js
const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

router.get('/', async (req, res) => {
  try {
    console.log('Fetching categories...')  // DEBUG
    const categories = await Category.find()
    console.log('Categories found:', categories)  // DEBUG
    res.json(categories)
  } catch (err) {
    console.error('CATEGORY FETCH ERROR:', err)  // SHOW IN TERMINAL
    res.status(500).json({ message: 'Failed to load categories', error: err.message })
  }
})

module.exports = router