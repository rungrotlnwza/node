const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
    try {
        const protocol = req.protocol;
        const host = req.get('host');
        const baseUrl = `${protocol}://${host}`;

        // 1. รับค่าการแบ่งหน้าจาก Query Parameters (ค่าเริ่มต้น: หน้า 1, หน้าละ 10 รายการ)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // --- Helper ฟังก์ชันจัดการ Path ใน JSON Content ---
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

        // 2. ดึงจำนวนทั้งหมดเพื่อคำนวณหน้า (Total Count)
        const [[{ total }]] = await mysqli.query(`SELECT COUNT(*) AS total FROM lesson`);
        const totalPages = Math.ceil(total / limit);

        // 3. ดึงข้อมูลบทเรียนทั้งหมด เรียงตามการสร้างล่าสุด (หรือตาม ID)
        // 3. ดึงข้อมูลบทเรียนทั้งหมด (ใช้ชื่อตารางเต็ม ไม่ใช้ตัวย่อ)
        const [rows] = await mysqli.query(`
      SELECT lesson.id AS lesson_id, 
             lesson.lesson_name, 
             lesson.lesson_category, 
             lesson.lesson_level, 
             lesson.lesson_status AS status, 
             lesson.lesson_content, 
             lesson.created_at, 
             lesson.updated_at, 
             user_detail.name AS created_by
      FROM lesson
      LEFT JOIN user_detail ON lesson.created_by = user_detail.auth_id
      ORDER BY lesson.id DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

        // 4. แปลงข้อมูล JSON และจัดรูปแบบ Lesson ID
        const lessons = rows.map(r => ({
            ...r,
            lesson_id: r.lesson_id.toString(),
            lesson_content: formatContent(r.lesson_content)
        }));

        // 5. ส่งข้อมูลกลับ
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