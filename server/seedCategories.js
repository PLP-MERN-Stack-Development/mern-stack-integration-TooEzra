// server/seedCategories.js
const mongoose = require('mongoose')
const Category = require('./models/Category')
require('dotenv').config()

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Clear old data
    await Category.deleteMany({})
    console.log('Old categories cleared')

    // Insert new
    const cats = await Category.insertMany([
      { name: 'Technology' },
      { name: 'Lifestyle' },
      { name: 'Education' },
      { name: 'Business' }
    ])
    console.log('Seeded:', cats.map(c => c.name))
    process.exit(0)
  } catch (err) {
    console.error('SEED FAILED:', err)
    process.exit(1)
  }
}

seed()