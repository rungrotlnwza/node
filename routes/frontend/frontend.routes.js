const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/index.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/auth/login', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/auth/login.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/auth/register', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/auth/register.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/admin/admin', (req, res) => [
    res.render(path.join(__dirname, '../../views/page/admin/admin.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/admin.layout.ejs')
    })
])
router.get('/admin/addlesson', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/admin/add-lesson.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/admin.layout.ejs')
    })
})

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

router.get('/user/me', (req, res) => [
    res.render(path.join(__dirname, '../../views/page/user/me.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/user.layout.ejs')
    })
])
router.get('/user/editme', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/user/editme.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/user.layout.ejs')
    })
})

router.get('/eol', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol/home.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
module.exports = router;