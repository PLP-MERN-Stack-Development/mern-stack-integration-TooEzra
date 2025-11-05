// server/routes/auth.js
const express = require('express')
const router = express.Router()
const { register, login } = require('../controllers/authController')

// WRAP WITH TRY-CATCH
router.post('/register', async (req, res) => {
  try {
    await register(req, res)
  } catch (err) {
    console.error('REGISTER ROUTE ERROR:', err)
    res.status(500).json({ message: 'Server Error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    await login(req, res)
  } catch (err) {
    console.error('LOGIN ROUTE ERROR:', err)
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router