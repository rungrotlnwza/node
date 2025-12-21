const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
    try {
        const protocol = req.protocol;
        const host = req.get('host');
        const baseUrl = `${protocol}://${host}`;

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // --- Helper ฟังก์ชัน (ปรับปรุงให้รองรับทั้ง String และ Object) ---
        const formatContent = (content) => {
            // ถ้าเป็น String ค่อย Parse ถ้าเป็น Object/Array อยู่แล้วก็ใช้ได้เลย
            let data = typeof content === 'string' ? JSON.parse(content) : content;

            if (Array.isArray(data)) {
                return data.map(item => {
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

        // 1. ดึง Total Count
        const [[{ total }]] = await mysqli.query(`SELECT COUNT(*) AS total FROM lesson`);
        const totalPages = Math.ceil(total / limit);

        // 2. ดึงข้อมูล (เพิ่ม lesson_content เข้าไปใน SELECT)
        const [rows] = await mysqli.query(`
            SELECT 
                lesson.id AS lesson_id, 
                lesson.lesson_name, 
                lesson.lesson_category, 
                lesson.lesson_level, 
                lesson.lesson_status AS status,
                lesson.lesson_content,  -- <--- ต้องมีฟิลด์นี้ด้วยครับ
                lesson.created_at, 
                lesson.updated_at, 
                user_detail.name AS created_by
            FROM lesson
            LEFT JOIN user_detail ON lesson.created_by = user_detail.auth_id
            ORDER BY lesson.id DESC
            LIMIT ? OFFSET ?
        `, [limit, offset]);

        // 3. แปลงข้อมูล
        const lessons = rows.map(r => ({
            ...r,
            lesson_id: r.lesson_id.toString(),
            lesson_content: formatContent(r.lesson_content) // ใช้งานได้ปลอดภัยขึ้น
        }));

        return res.status(200).json({
            summary: {
                total_items: total,
                total_pages: totalPages,
                current_page: page,
                items_per_page: limit
            },
            lessons
        });

    } catch (err) {
        console.error('getAllLessons error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};