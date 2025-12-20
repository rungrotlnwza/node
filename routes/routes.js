const express = require('express')
const router = express.Router()
// frontend
router.use('/', require('./frontend/public.routes'))
router.use('/', require('./frontend/admin.routes'))
router.use('/', require('./frontend/user.routes'))

// api
router.use('/api', require('./api/api.routes'))

module.exports = router