const express = require('express')
const router = express.Router()
const verifyToken = require('../../lib/middleware/jwt.middleware')
const upload = require('../../lib/middleware/uploads.middleware')

router.get('/example', require('../../lib/controller/public/example.controller'))

// --- auth ---
router.post('/register', require('../../lib/controller/auth/register.controller'))
router.post('/login', require('../../lib/controller/auth/login.controller'))
router.get('/me', verifyToken, require('../../lib/controller/auth/me.controller'))
router.put('/update', verifyToken, require('../../lib/controller/auth/updateme.controller'))

// 1. ดึงข้อมูลทั้งหมดแบบ Pagination (ไม่มี parameter)
router.get('/lessonAll', verifyToken, require('../../lib/controller/lesson/getAllLessons'))
// 2. ดึงข้อมูลทั้งหมดของหมวดหมู่ (1 parameter พร้อม prefix)
router.get('/lesson/category/:category', verifyToken, require('../../lib/controller/lesson/getLessonsByCategory'))
// 3. ดึงแบบกรองคู่ หมวดหมู่ + ระดับ (2 parameters)
router.get('/lesson/filter/:category/:level', verifyToken, require('../../lib/controller/lesson/getLessonsByFilter'))
// 4. ดึงข้อมูลแบบ Step สำหรับเรียน (เจาะจงที่สุด: 3 parameters)
router.get('/lesson/detail/:category/:level/:step', verifyToken, require('../../lib/controller/lesson/getLessonByStep'))
// 5. ดึงด้วย ID (1 parameter - ต้องวางล่างสุดเพื่อไม่ให้ตีกับ /all หรือ /category)
router.get('/lesson/:id', verifyToken, require('../../lib/controller/lesson/getLessonById'))

// --- อื่นๆ ---
router.post('/add-lesson', verifyToken, upload, require('../../lib/controller/lesson/add-lesson.controller'))
router.delete('/delete-lesson/:id', verifyToken, require('../../lib/controller/lesson/delete-lesson.controller'))
router.put('/update-lesson/:id', verifyToken, upload, require('../../lib/controller/lesson/update-lesson.controller'))

module.exports = router