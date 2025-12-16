const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
    try {
        // -----------------------------
        // 1) รับ query params สำหรับ pagination
        // -----------------------------
        const page = parseInt(req.query.page) || 1;   // หน้าเริ่มต้น 1
        const limit = parseInt(req.query.limit) || 10; // จำนวนต่อหน้า
        const offset = (page - 1) * limit;

        // -----------------------------
        // 2) สรุป summary ทั้งหมด
        // -----------------------------
        const [[summary]] = await mysqli.query(`
      SELECT 
        COUNT(*) AS total,
        SUM(CASE WHEN lesson_status='open' THEN 1 ELSE 0 END) AS status_open,
        SUM(CASE WHEN lesson_status='close' THEN 1 ELSE 0 END) AS status_close
      FROM lesson
    `);

        // -----------------------------
        // 3) ดึง lessons ตาม pagination
        // -----------------------------
        const [rows] = await mysqli.query(`
      SELECT 
        l.id AS lesson_id,
        l.lesson_name,
        l.lesson_category,
        l.lesson_level,
        l.lesson_status AS status,
        l.lesson_content,
        l.created_at,
        l.updated_at,
        u.name AS created_by
      FROM lesson l
      LEFT JOIN user_detail u ON l.created_by = u.auth_id
      ORDER BY l.created_at DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

        // -----------------------------
        // 4) แปลง lesson_content จาก JSON string เป็น object
        // -----------------------------
        const lessons = rows.map(r => ({
            lesson_id: r.lesson_id.toString(),
            lesson_name: r.lesson_name,
            lesson_category: r.lesson_category,
            lesson_level: r.lesson_level,
            status: r.status,
            created_at: r.created_at,
            updated_at: r.updated_at,
            created_by: r.created_by || 'Unknown',
            lesson_content: r.lesson_content ? JSON.parse(r.lesson_content) : {}
        }));

        // -----------------------------
        // 5) ส่ง response
        // -----------------------------
        res.status(200).json({
            summary,
            page,
            limit,
            lessons
        });

    } catch (err) {
        console.error('get-lesson.controller error:', err);
        res.status(500).json({ message: 'เกิดข้อผิดพลาดภายใน server' });
    }
};
