const express = require('express')
const router = express.Router()

router.get('/example', (req, res) => {
    res.status(200).json([{
        "title": "เทคนิคการเรียนภาษาอังกฤษ",
        "description": "อัพเดทบทความใหม่! 10 เคล็ดลับ...",
        "date": "2025-12-06",
        "link": "https://example.com/article/1",
        "background": "./assets/img/earth.webp",
        "images": [
            "./assets/img/earth.webp",
            "./assets/img/earth.webp",
            "./assets/img/earth.webp"
        ]
    },
    {
        "title": "วิธีเพิ่มความเร็วการอ่านภาษาอังกฤษ",
        "description": "เทคนิคสุดง่ายที่ใครก็ทำได้...",
        "date": "2025-12-06",
        "link": "https://example.com/article/2",
        "background": "./assets/img/cards.webp",
        "images": [
            "./assets/img/earth.webp",
            "./assets/img/earth.webp",
            "./assets/img/earth.webp",
            "./assets/img/earth.webp"
        ]
    },
    {
        "title": "วิธีเพิ่มความเร็วการอ่านภาษาอังกฤษ",
        "description": "เทคนิคสุดง่ายที่ใครก็ทำได้...",
        "date": "2025-12-06",
        "link": "https://example.com/article/2",
        "background": "./assets/img/cards.webp",
        "images": [
            "./assets/img/earth.webp",
            "./assets/img/earth.webp",
            "./assets/img/earth.webp",
            "./assets/img/earth.webp"
        ]
    }
    ])
})
// auth
router.post('/register', require('../../controller/auth/register.controller'))
router.post('/login', require('../../controller/auth/login.controller'))
router.get('/me', require('../../controller/auth/profile.controller'))
module.exports = router