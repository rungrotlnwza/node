const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
    try {
        const protocol = req.protocol;
        const host = req.get('host');
        const baseUrl = `${protocol}://${host}`;

        // 1. รับ ID จาก URL Parameter
        const { id } = req.params;

        // --- Helper ฟังก์ชันสำหรับจัดการเนื้อหาบทเรียน ---
        const formatContent = (contentJson) => {
            if (!contentJson) return [];

            // แปลง String เป็น Object/Array (ถ้ายังไม่ได้แปลง)
            let content = (typeof contentJson === 'string') ? JSON.parse(contentJson) : contentJson;

            // [ซ่อมข้อมูล] ถ้ามาเป็น Object ตัวเดียวที่มี key ชื่อ html (เช่นจากการ Migration)
            // ให้ยัดใส่ Array และเปลี่ยน key เป็น 'value' เพื่อให้ตรงกับหน้าบ้านครับ
            if (!Array.isArray(content) && content.html) {
                content = [{
                    type: 'html',
                    value: content.html
                }];
            }

            // ตรวจสอบและจัดการข้อมูลกรณีเป็น Array
            if (Array.isArray(content)) {
                return content.map(item => {
                    // จัดการไฟล์ (Image, PDF) ให้มี URL สมบูรณ์
                    if ((item.type === 'file' || item.type === 'image' || item.type === 'pdf') && item.path) {
                        return {
                            ...item,
                            url: `${baseUrl}/${item.path.replace(/\\/g, '/')}`
                        };
                    }

                    // ถ้าเป็น html หรือ text มั่นใจว่ามี key ชื่อ value ส่งไปครับ
                    return item;
                });
            }

            return [];
        };

        // 2. Query ดึงข้อมูล
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

        // 3. ตรวจสอบข้อมูล
        if (rows.length === 0) {
            return res.status(404).json({ message: 'ไม่พบบทเรียนที่คุณค้นหาครับ' });
        }

        // 4. จัดรูปแบบก่อนส่ง (แม็พชื่อตัวแปรให้ตรงกับหน้าบ้านที่รอรับ)
        const lesson = {
            ...rows[0],
            lesson_id: rows[0].lesson_id.toString(),
            created_by: rows[0].created_by_name || 'System Migration', // แก้ชื่อให้ตรงกับหน้าบ้าน
            lesson_content: formatContent(rows[0].lesson_content)
        };

        // 5. ส่งข้อมูลกลับ
        return res.status(200).json({ lesson });

    } catch (err) {
        console.error('getLessonById error:', err);
        res.status(500).json({ message: 'Internal server error ครับ' });
    }
};