const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
    try {
        const protocol = req.protocol;
        const host = req.get('host');
        const baseUrl = `${protocol}://${host}`;

        // 1. รับค่าจาก Path Parameter (:category และ :level)
        const { category, level } = req.params;

        // 2. รับค่า Pagination จาก Query String (เช่น ?page=1&limit=10)
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // --- Helper ฟังก์ชันสำหรับจัดการ URL ของไฟล์ในเนื้อหาบทเรียน ---
        const formatContent = (contentJson) => {
            let content = contentJson ? JSON.parse(contentJson) : [];
            if (Array.isArray(content)) {
                return content.map(item => {
                    // ถ้าเป็นประเภทไฟล์ ให้เพิ่ม baseUrl เข้าไปใน path
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

        // 3. นับจำนวนทั้งหมดที่ตรงตามเงื่อนไข (เพื่อทำ Pagination)
        const [[{ total }]] = await mysqli.query(
            `SELECT COUNT(*) AS total 
       FROM lesson 
       WHERE lesson.lesson_category = ? AND lesson.lesson_level = ?`,
            [category, level]
        );
        const totalPages = Math.ceil(total / limit);

        // 4. ดึงข้อมูลบทเรียนแบบกรอง 2 ชั้น (Category + Level) โดยใช้ชื่อตารางเต็ม
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
      WHERE lesson.lesson_category = ? AND lesson.lesson_level = ?
      ORDER BY lesson.id ASC
      LIMIT ? OFFSET ?
    `, [category, level, limit, offset]);

        // 5. แปลงข้อมูล JSON และจัดรูปแบบข้อมูลก่อนส่งกลับ
        const lessons = rows.map(row => ({
            ...row,
            lesson_id: row.lesson_id.toString(),
            lesson_content: formatContent(row.lesson_content)
        }));

        // 6. ส่งข้อมูลกลับไปยัง Client
        return res.status(200).json({
            filter: {
                category,
                level
            },
            summary: {
                total_items: total,
                total_pages: totalPages,
                current_page: page,
                items_per_page: limit
            },
            lessons
        });

    } catch (err) {
        console.error('getLessonsByFilter error:', err);
        res.status(500).json({ message: 'Internal server error ครับ' });
    }
};