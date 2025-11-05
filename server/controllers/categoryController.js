// server/controllers/categoryController.js
const Category = require('../models/Category')

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (err) {
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = { getCategories }