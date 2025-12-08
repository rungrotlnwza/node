const express = require('express')
const router = express.Router()

router.use('/', require('./frontend/frontend.routes'))

router.use('/api', require('./api/api.routes'))

module.exports = router