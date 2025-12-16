const express = require('express')
const router = express.Router()
const verifyToken = require('../../lib/middleware/jwt.middleware')
const upload = require('../../lib/middleware/uploads.middleware')

router.get('/example', require('../../lib/controller/public/example.controller'))
// auth
router.post('/register', require('../../lib/controller/auth/register.controller'))
router.post('/login', require('../../lib/controller/auth/login.controller'))
router.get('/me', verifyToken, require('../../lib/controller/auth/me.controller'))
router.put('/update', verifyToken, require('../../lib/controller/auth/updateme.controller'))

// lesson
router.get('/lesson', verifyToken, require('../../lib/controller/lesson/lesson.controller'))
router.post('/add-lesson', verifyToken, upload, require('../../lib/controller/lesson/add-lesson.controller'))

module.exports = router