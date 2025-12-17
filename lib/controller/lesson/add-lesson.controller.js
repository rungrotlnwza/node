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

        // ดึงโครงสร้างลำดับจาก req.body.lesson_content
        // หมายเหตุ: ถึงแม้จะเป็นไฟล์ Multer ก็จะส่งชื่อ field มาใน req.body ด้วย
        if (req.body.lesson_content && Array.isArray(req.body.lesson_content)) {

            req.body.lesson_content.forEach((item, index) => {
                if (item.type === 'text') {
                    // กรณีเป็น Text
                    lessonContent.push({
                        type: 'text',
                        value: item.value || ''
                    });
                } else if (item.type === 'image' || item.type === 'pdf') {
                    // กรณีเป็นไฟล์: ต้องไปหาไฟล์ใน req.files ที่มี fieldname ตรงกับลำดับนี้
                    // fieldname จะส่งมาเป็น "lesson_content[0][file]"
                    const targetFieldName = `lesson_content[${index}][file]`;
                    const file = req.files.find(f => f.fieldname === targetFieldName);

                    if (file) {
                        lessonContent.push({
                            type: 'file',
                            file_type: path.extname(file.originalname).slice(1),
                            file_name: file.filename,
                            original_name: file.originalname,
                            path: file.path,
                            // แถมประเภทเดิมไปด้วยเพื่อให้ตอนแสดงผลง่ายขึ้น
                            content_type: item.type
                        });
                    }
                }
            });
        }

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
