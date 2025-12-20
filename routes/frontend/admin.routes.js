const express = require('express')
const router = express.Router()
const path = require('path');
// admin
router.get('/private/admin', (req, res) => [
    res.render(path.join(__dirname, '../../views/page/admin/admin.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/admin.layout.ejs')
    })
])
router.get('/admin/addlesson', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/admin/add-lesson.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/admin.layout.ejs')
    })
})


module.exports = router