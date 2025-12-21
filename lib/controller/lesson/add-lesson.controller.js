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
        // ... โค้ดส่วนดึงข้อมูลหลักด้านบนเหมือนเดิม ...

        const lessonContent = [];

        // normalize lesson_content ให้เป็น array เสมอ
        const rawContent = req.body.lesson_content ? Array.isArray(req.body.lesson_content) ? req.body.lesson_content : Object.values(req.body.lesson_content) : [];

        rawContent.forEach((item, index) => {

            // ---------- TEXT ----------
            if (item.type === 'text') {
                lessonContent.push({
                    type: 'text',
                    value: item.value || ''
                });
            }

            // ---------- HTML ----------
            else if (item.type === 'html') {
                lessonContent.push({
                    type: 'html',
                    value: item.value || ''
                });
            }

            // ---------- FILE (IMAGE / PDF) ----------
            else if (item.type === 'image' || item.type === 'pdf') {
                const fieldName = `lesson_content[${index}][file]`;
                const file = req.files?.find(f => f.fieldname === fieldName);

                if (file) {
                    lessonContent.push({
                        type: 'file',
                        content_type: item.type,           // image | pdf
                        file_type: path.extname(file.originalname).slice(1),
                        file_name: file.filename,
                        original_name: file.originalname,
                        path: file.path,
                        size: file.size
                    });
                }
            }
        });

        // ... นำ lessonContent ไป stringify และ insert ลง DB ตามปกติ ...

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
