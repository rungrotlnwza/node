const express = require('express')
const router = express.Router()
const verifyToken = require('../../middleware/jwt.middleware')

router.get('/example', require('../../controller/public/example.controller'))
// auth
router.post('/register', require('../../controller/auth/register.controller'))
router.post('/login', require('../../controller/auth/login.controller'))
router.get('/me', verifyToken, require('../../controller/auth/me.controller'))
module.exports = router