const mysqli = require('../../config/mysqli.config')
const fs = require('fs');
const path = require('path');
module.exports = {
    addLesson: async (req, res) => {
        try {
            console.log("--- เริ่มกระบวนการ Add Lesson ---");

            // 1. ดึง user_id จาก req.user ที่ได้มาจาก Middleware verifyToken
            // ตรวจสอบว่าใน JWT คุณใช้ชื่อฟิลด์ว่า id หรือ user_id นะครับ
            const user_id = req.user.id || req.user.user_id;

            if (!user_id) {
                return res.status(401).json({ message: "ไม่พบข้อมูลผู้ใช้งานจาก Token ครับ" });
            }

            // 2. ดึงข้อมูล Text จาก req.body
            let { lesson_name, lesson_category, lesson_level, lesson_status, lesson_content } = req.body;
            const files = req.files;

            // 3. จัดการ Path โฟลเดอร์เก็บไฟล์
            const uploadDir = path.resolve(__dirname, '../../../assets/uploads/');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }

            // 4. วนลูปจัดการไฟล์มัลติมีเดีย
            if (files && files.length > 0) {
                for (const file of files) {
                    const uniqueFileName = `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`;
                    const uploadPath = path.join(uploadDir, uniqueFileName);
                    const publicUrl = `/uploads/lessons/${uniqueFileName}`;

                    // บันทึกไฟล์ลง Disk
                    fs.writeFileSync(uploadPath, file.buffer);

                    // แทนที่ Path ใน HTML (รองรับ Image, Video, Audio)
                    const escapedFileName = file.originalname.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`src="[^"]+"([^>]*data-filename="${escapedFileName}")`, 'g');

                    if (lesson_content.match(regex)) {
                        lesson_content = lesson_content.replace(regex, `src="${publicUrl}"$1`);
                    }
                }
            }

            // 5. บันทึกลง Database
            const sql = `INSERT INTO lesson 
                (lesson_name, lesson_category, lesson_level, lesson_status, lesson_content, created_by, updated_by) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const [result] = await mysqli.query(sql, [
                lesson_name,
                lesson_category,
                lesson_level,
                lesson_status,
                lesson_content,
                user_id,
                user_id
            ]);

            res.status(200).json({
                status: "success",
                message: `บันทึกบทเรียน ${lesson_name} สำเร็จเรียบร้อยครับ`,
                lesson_id: result.insertId
            });

        } catch (error) {
            console.error("❌ ERROR:", error);
            res.status(500).json({
                status: "error",
                message: "พังสนิท! เกิดข้อผิดพลาดในการจัดการข้อมูลครับ",
                detail: error.message
            });
        }
    }
}