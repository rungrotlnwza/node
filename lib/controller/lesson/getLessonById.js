const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
    try {
        const protocol = req.protocol;
        const host = req.get('host');
        const baseUrl = `${protocol}://${host}`;

        // 1. รับ ID จาก URL Parameter (/api/lesson/:id)
        const { id } = req.params;

        // --- Helper ฟังก์ชันสำหรับจัดการ URL ของไฟล์ใน JSON Content ---
        const formatContent = (contentJson) => {
            let content = contentJson ? JSON.parse(contentJson) : [];
            if (Array.isArray(content)) {
                return content.map(item => {
                    if ((item.type === 'file' || item.type === 'image' || item.type === 'pdf') && item.path) {
                        return {
                            ...item,
                            url: `${baseUrl}/${item.path.replace(/\\/g, '/')}`
                        };
                    }
                    return item;
                });
            }
            return [];
        };

        // 2. Query ดึงข้อมูลโดยใช้ชื่อตารางแบบเต็ม (lesson และ user_detail)
        const [rows] = await mysqli.query(`
      SELECT lesson.id AS lesson_id, 
             lesson.lesson_name, 
             lesson.lesson_category, 
             lesson.lesson_level, 
             lesson.lesson_status AS status, 
             lesson.lesson_content, 
             lesson.created_at, 
             lesson.updated_at, 
             user_detail.name AS created_by_name
      FROM lesson
      LEFT JOIN user_detail ON lesson.created_by = user_detail.auth_id
      WHERE lesson.id = ?
    `, [id]);

        // 3. ตรวจสอบว่าพบบทเรียนหรือไม่
        if (rows.length === 0) {
            return res.status(404).json({ message: 'ไม่พบบทเรียนที่คุณค้นหาครับ' });
        }

        // 4. จัดรูปแบบข้อมูล JSON Content ก่อนส่งออก
        const lesson = {
            ...rows[0],
            lesson_id: rows[0].lesson_id.toString(),
            lesson_content: formatContent(rows[0].lesson_content)
        };

        // 5. ส่งข้อมูลบทเรียนกลับไป
        return res.status(200).json({ lesson });

    } catch (err) {
        console.error('getLessonById error:', err);
        res.status(500).json({ message: 'Internal server error ครับ' });
    }
};