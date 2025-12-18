const path = require('path');
const fs = require('fs');
const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
    try {
        const { id } = req.params; // รับ lesson id จาก URL
        const updatedBy = req.user.id;

        // 1) ตรวจสอบว่ามีบทเรียนนี้อยู่จริงไหม และดึงข้อมูลเดิมมาดูเรื่องไฟล์
        const [oldData] = await mysqli.query('SELECT * FROM lesson WHERE id = ?', [id]);
        if (oldData.length === 0) {
            return res.status(404).json({ message: 'ไม่พบข้อมูลบทเรียนที่ต้องการแก้ไข' });
        }

        const oldContent = JSON.parse(oldData[0].lesson_content || '[]');

        // 2) ดึงข้อมูลใหม่จาก req.body
        const lessonName = req.body.lesson_name?.trim() || oldData[0].lesson_name;
        const lessonCategory = req.body.lesson_category?.trim() || oldData[0].lesson_category;
        const lessonLevel = req.body.lesson_level || oldData[0].lesson_level;
        const lessonStatus = req.body.status || oldData[0].lesson_status;

        const newLessonContent = [];

        // 3) จัดการ Lesson Content (Text + Files)
        if (req.body.lesson_content && Array.isArray(req.body.lesson_content)) {

            for (let index = 0; index < req.body.lesson_content.length; index++) {
                const item = req.body.lesson_content[index];

                if (item.type === 'text') {
                    newLessonContent.push({
                        type: 'text',
                        value: item.value || ''
                    });
                } else if (item.type === 'image' || item.type === 'pdf') {
                    // ตรวจสอบว่ามีการส่งไฟล์ใหม่มาในลำดับนี้หรือไม่
                    const targetFieldName = `lesson_content[${index}][file]`;
                    const newFile = req.files ? req.files.find(f => f.fieldname === targetFieldName) : null;

                    if (newFile) {
                        // กรณีมีไฟล์ใหม่: เก็บข้อมูลไฟล์ใหม่
                        newLessonContent.push({
                            type: 'file',
                            file_type: path.extname(newFile.originalname).slice(1),
                            file_name: newFile.filename,
                            original_name: newFile.originalname,
                            path: newFile.path,
                            content_type: item.type
                        });

                        // (Optional) ลบไฟล์เก่าทิ้งจาก Server เพื่อไม่ให้หนักเครื่อง
                        // คุณต้องหา logic ตรวจสอบไฟล์เก่าที่โดนแทนที่ตรงนี้ครับ
                    } else if (item.existing_file) {
                        // กรณีไม่มีไฟล์ใหม่ แต่ใช้ไฟล์เดิม (ส่งชื่อไฟล์เดิมกลับมา)
                        // ตรวจสอบจาก data เก่าใน DB
                        const oldFile = oldContent.find(oc => oc.file_name === item.existing_file);
                        if (oldFile) {
                            newLessonContent.push(oldFile);
                        }
                    }
                }
            }
        }

        // 4) Update ลง DB
        await mysqli.query(
            `UPDATE lesson 
             SET lesson_name = ?, 
                 lesson_category = ?, 
                 lesson_level = ?, 
                 lesson_status = ?, 
                 lesson_content = ?, 
                 updated_by = ?, 
                 updated_at = CURRENT_TIMESTAMP
             WHERE id = ?`,
            [
                lessonName,
                lessonCategory,
                lessonLevel,
                lessonStatus,
                JSON.stringify(newLessonContent),
                updatedBy,
                id
            ]
        );

        res.status(200).json({
            message: 'อัปเดตบทเรียนสำเร็จ',
            lesson_id: id,
            lesson_content: newLessonContent
        });

    } catch (err) {
        console.error('update-lesson.controller error:', err);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดภายใน server' });
    }
};