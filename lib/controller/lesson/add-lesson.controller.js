const path = require('path');
const fs = require('fs');
const mysqli = require('../../config/mysqli.config'); // mysql2/promise connection

module.exports = async (req, res) => {
    try {
        // 1) ดึงข้อมูลหลักจาก req.body
        const lessonName = req.body.lesson_name?.trim();
        const lessonCategory = req.body.lesson_category?.trim();
        const lessonLevel = req.body.lesson_level || 'A1';
        const lessonStatus = req.body.status || 'close';
        const createdBy = req.user.id;

        if (!lessonName || !lessonCategory) {
            return res.status(400).json({ message: 'กรุณากรอกชื่อบทเรียนและหมวดหมู่' });
        }

        // 2) สร้าง lesson_content
        // Multer จะเก็บไฟล์ใน req.files
        // รูปแบบ lesson_content: [{ type: 'text', value: '...' }, { type: 'image', file: 'uploads/filename' }, ...]
        const lessonContent = [];

        if (Array.isArray(req.body.lesson_content)) {
            // ถ้ามี text-only content (FormData text fields)
            req.body.lesson_content.forEach((c, i) => {
                if (c.type === 'text' && c.value?.trim()) {
                    lessonContent.push({ type: 'text', value: c.value.trim() });
                }
            });
        }

        if (req.files && req.files.length > 0) {
            // ไฟล์ที่ Multer upload
            req.files.forEach(file => {
                // คุณอาจจะ map fieldname กับ type ได้
                // ตัวอย่าง: fieldname = lesson_content[0][file]
                lessonContent.push({
                    type: 'file',
                    file_type: path.extname(file.originalname).slice(1), // 'jpg', 'pdf', etc
                    file_name: file.filename,
                    original_name: file.originalname,
                    path: file.path
                });
            });
        }

        // 3) Insert ลง DB
        const [result] = await mysqli.query(
            `INSERT INTO lesson 
        (lesson_name, lesson_category, lesson_level, lesson_status, lesson_content, created_by, updated_by) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                lessonName,
                lessonCategory,
                lessonLevel,
                lessonStatus,
                JSON.stringify(lessonContent),
                createdBy,
                createdBy
            ]
        );

        // 4) ตอบกลับ client
        res.status(201).json({
            message: 'สร้างบทเรียนสำเร็จ',
            lesson_id: result.insertId,
            lesson_content: lessonContent
        });

    } catch (err) {
        console.error('add-lesson.controller error:', err);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดภายใน server' });
    }
};
