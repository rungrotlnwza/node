const express = require('express')
const router = express.Router()
const verifyToken = require('../../lib/middleware/jwt.middleware')
const upload = require('../../lib/middleware/uploads.middleware')

router.get('/example', require('../../lib/controller/public/example.controller'))

// --- auth ---
router.post('/register', require('../../lib/controller/auth/register.controller'))
router.post('/login', require('../../lib/controller/auth/login.controller'))
router.get('/me', verifyToken, require('../../lib/controller/auth/me.controller'))
router.put('/update', verifyToken, require('../../lib/controller/auth/updateme.controller'))



// --- อื่นๆ ---
router.post('/add-lesson', verifyToken, upload, require('../../lib/controller/lesson/add-lesson.controller'))
router.delete('/delete-lesson/:id', verifyToken, require('../../lib/controller/lesson/delete-lesson.controller'))
router.put('/update-lesson/:id', verifyToken, upload, require('../../lib/controller/lesson/update-lesson.controller'))

module.exports = router