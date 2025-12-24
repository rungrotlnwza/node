const mysqli = require('../../config/mysqli.config')
const fs = require('fs');
const path = require('path');
module.exports = {
    addLesson: async (req, res) => {
        try {
            // console.log("--- เริ่มกระบวนการ Add Lesson ---");

            // 1. ดึง user_id จาก req.user ที่ได้มาจาก Middleware verifyToken
            // ตรวจสอบว่าใน JWT คุณใช้ชื่อฟิลด์ว่า id หรือ user_id นะครับ
            const user_id = req.user.id || req.user.user_id;
            console.log('กระบวนการที่ 1')
            if (!user_id) {
                return res.status(401).json({ message: "ไม่พบข้อมูลผู้ใช้งานจาก Token ครับ" });
            }

            // 2. ดึงข้อมูล Text จาก req.body
            let { lesson_name, lesson_category, lesson_level, lesson_status, lesson_content } = req.body;
            const files = req.files;

            // 3. จัดการ Path โฟลเดอร์เก็บไฟล์
            // console.log('กระบวนการที่ 2')
            const uploadDir = path.resolve(__dirname, '../../../assets/uploads/');
            if (!fs.existsSync(uploadDir)) {
                fs.mkdirSync(uploadDir, { recursive: true });
            }
            // console.log('การบวนการที่ 3')
            // console.log(lesson_name)
            // console.log(lesson_category)
            // console.log(lesson_level)
            // console.log(lesson_status)
            // console.log(lesson_content)
            if (!lesson_name || !lesson_category || !lesson_level || !lesson_status || !lesson_content) {
                return res.status(400).json({ // ใช้ 400 Bad Request จะเหมาะสมกว่าครับ
                    status: "error",
                    message: "ข้อมูลไม่ครบถ้วน กรุณากรอกข้อมูลให้ครบทุกช่องครับ"
                });
                // ใส่ return เพื่อให้จบฟังก์ชันตรงนี้ ไม่ไปทำขั้นตอนบันทึกต่อ
            }
            // console.log('การบวนการที่ 4')
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
            // console.log('การบวนการที่ 5')
            // 5. บันทึกลง Database
            // 1. แก้ SQL: ใส่คอมม่าระหว่างฟิลด์ และแก้ชื่อตาราง/เงื่อนไขให้ถูก (สมมติว่าตารางชื่อ lesson)
            const [check] = await mysqli.query('SELECT id, lesson_name FROM lesson WHERE lesson_name = ?', [lesson_name]);

            // 2. เช็คความยาวของ Array ที่คืนกลับมา
            if (check.length > 0) {
                // ดึง id จากแถวแรก (index 0)
                const existing_id = check[0].id;

                // 3. ต้องใส่ return เพื่อไม่ให้มันไปรันคำสั่ง Insert ด้านล่างต่อ
                return res.status(400).json({
                    message: `ชื่อบทเรียน "${lesson_name}" ถูกใช้งานไปแล้ว (บทเรียน ID ที่ ${existing_id})`
                });
            }
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
            console.log('จบกระบวนการ')
        } catch (error) {
            console.error("❌ ERROR:", error);
            res.status(500).json({
                status: "error",
                message: "พังสนิท! เกิดข้อผิดพลาดในการจัดการข้อมูลครับ",
                detail: error.message
            });
        }
        // สิ่งที่ได้รู้ในวันนี้ database จะส่งค่ากลับเป็น array ครอบ json ไม่ไช่ json ธรรมดา แม้จะออกมาแถวเดียว จำเป็นต้อง [0] เพื่อดึงค่าแบบ array 
    },
}