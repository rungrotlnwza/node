const express = require('express')
const router = express.Router()
const verifyToken = require('../../lib/middleware/jwt.middleware')

router.get('/example', require('../../lib/controller/public/example.controller'))
// auth
router.post('/register', require('../../lib/controller/auth/register.controller'))
router.post('/login', require('../../lib/controller/auth/login.controller'))
router.get('/me', verifyToken, require('../../lib/controller/auth/me.controller'))
module.exports = router