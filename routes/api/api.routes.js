const express = require('express')
const router = express.Router()
const verifyToken = require('../../lib/middleware/jwt.middleware')
const upload = require('../../lib/config/muler.config')

router.get('/example', require('../../lib/controller/public/example.controller'))

// --- auth ---
const auth = require('../../lib/controller/auth/auth.controller')
router.post('/login', auth.login)
router.post('/register', auth.register)

const userController = require('../../lib/controller/user/user.controller')
router.get('/profile', verifyToken, userController.getProfile)
router.put('/profile', verifyToken, userController.updateProfile)

const lesson = require('../../lib/controller/lesson/lesson.controller')
router.post('/lesson', verifyToken, upload.any(), lesson.addLesson)
module.exports = router