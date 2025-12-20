const router = require('express').Router()
const path = require('path')
router.get('/eol/lesson', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol/lesson.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/admin/lesson/update', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/admin/update-lesson.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/admin.layout.ejs')
    })
})
module.exports = router