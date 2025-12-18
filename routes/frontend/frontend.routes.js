const express = require('express');
const router = express.Router();
const path = require('path');

// public
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
router.get('/news/eol-contest', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/news/eol-contest.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/news/teoc11-timeline', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/news/teoc11-timeline.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/news/20th-anniversary', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/news/20th-anniversary.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/about/about', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/about/about.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/about/whatiseol', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/about/whatiseol.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/about/eol-history', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/about/eol-history.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/about/security', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/about/security.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/about/privacy', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/about/privacy.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/about/complaint', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/about/complaint.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
// admin
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

// user
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