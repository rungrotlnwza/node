const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
    try {
        const protocol = req.protocol;
        const host = req.get('host');
        const baseUrl = `${protocol}://${host}`;

        // 1. รับค่า Category จาก URL Parameter และ Pagination จาก Query
        const { category } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // --- Helper ฟังก์ชันจัดการ Path ไฟล์ ---
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

        // 2. ดึงจำนวนทั้งหมดใน Category นี้เพื่อคำนวณหน้า
        const [[{ total }]] = await mysqli.query(
            `SELECT COUNT(*) AS total FROM lesson WHERE lesson_category = ?`,
            [category]
        );
        const totalPages = Math.ceil(total / limit);

        // 3. ดึงข้อมูลบทเรียนเฉพาะหมวดหมู่ที่ระบุ (ใช้ชื่อตารางเต็ม)
        const [rows] = await mysqli.query(`
      SELECT lesson.id AS lesson_id, 
             lesson.lesson_name, 
             lesson.lesson_category, 
             lesson.lesson_level, 
             lesson.lesson_status AS status, 
             lesson.lesson_content, 
             lesson.created_at, 
             user_detail.name AS created_by
      FROM lesson
      LEFT JOIN user_detail ON lesson.created_by = user_detail.auth_id
      WHERE lesson.lesson_category = ?
      ORDER BY lesson.id ASC
      LIMIT ? OFFSET ?
    `, [category, limit, offset]);

        // 4. แปลงข้อมูล JSON และ ID
        const lessons = rows.map(row => ({
            ...row,
            lesson_id: row.lesson_id.toString(),
            lesson_content: formatContent(row.lesson_content)
        }));

        // 5. ส่งข้อมูลกลับ
        return res.status(200).json({
            category: category,
            summary: {
                total_items: total,
                total_pages: totalPages,
                current_page: page
            },
            lessons
        });

    } catch (err) {
        console.error('getLessonsByCategory error:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};