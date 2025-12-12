const express = require('express')
const router = express.Router()

router.get('/example', require('../../controller/public/example.controller'))
// auth
router.post('/register', require('../../controller/auth/register.controller'))
router.post('/login', require('../../controller/auth/login.controller'))
module.exports = router