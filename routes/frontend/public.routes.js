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
router.get('/eol-system/eol-member-club', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-system/eol-member-club.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-system/eol-personal', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-system/eol-personal.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-system/eol-oneyear', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-system/eol-oneyear.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-system/eol-intelligence', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-system/eol-intelligence.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-system/eol-corporate', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-system/eol-corporate.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-system/eol-platform', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-system/eol-platform.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/products/product-eol-member-club', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/products/product-eol-member-club.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/products/product-eol-personal', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/products/product-eol-personal.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/products/product-eol-oneyear', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/products/product-eol-oneyear.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/products/product-eol-intelligence', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/products/product-eol-intelligence.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/products/product-eol-corporate', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/products/product-eol-corporate.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/products/how-to-pay', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/products/how-to-pay.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/products/policy-change-product', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/products/policy-change-product.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/products/products', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/products/product-eol-oneyear.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-columns/one-day-one-sentence', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-columns/one-day-one-sentence.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-columns/english-from-news', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-columns/english-from-news.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-columns/easy-english', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-columns/easy-english.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-columns/comprehensive-listening', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-columns/comprehensive-listening.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-columns/grammar-writing', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-columns/grammar-writing.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-columns/communicative-english', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-columns/communicative-english.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-columns/pronunciation-phonetic', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-columns/pronunciation-phonetic.ejs'), {
        layout: (path.join(__dirname, '../../views/layouts/default.layout.ejs'))
    })
})
router.get('/eol-columns/song-of-souls', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-columns/song-of-souls.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/eol-columns/movie-world', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/eol-columns/movie-world.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/standard-test/gepot', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/standard-test/gepot.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/standard-test/admission', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/standard-test/admission.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/standard-test/cu-tep', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/standard-test/cu-tep.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/standard-test/cefr', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/standard-test/cefr.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/standard-test/toefl', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/standard-test/toefl.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/standard-test/toeic', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/standard-test/toeic.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/standard-test/ielts', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/standard-test/ielts.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})
router.get('/contact/contact', (req, res) => [
    res.render(path.join(__dirname, '../../views/page/contact/contact.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
])
router.get('/contact/work', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/contact/work.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/default.layout.ejs')
    })
})

// user
router.get('/private/user/profile', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/private/user/profile.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/user.layout.ejs')
    })
})
router.get('/private/user/edit-profile', (req, res) => {
    res.render(path.join(__dirname, '../../views/page/private/user/edit-profile.ejs'), {
        layout: path.join(__dirname, '../../views/layouts/user.layout.ejs')
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