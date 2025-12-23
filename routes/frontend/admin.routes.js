const express = require('express')
const router = express.Router()
const path = require('path');
// admin
router.get('/private/admin', (req, res) => [
    res.render(path.join(__dirname, '../../views/page/private/admin/admin.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/admin.layout.ejs')
    })
])
router.get('/private/addlesson', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/private/admin/addlesson.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/admin.layout.ejs')
    })
})
router.get('/private/update-lesson', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/private/admin/update-lesson.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/admin.layout.ejs')
    })
})

module.exports = router