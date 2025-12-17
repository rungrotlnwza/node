const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
  try {
    const protocol = req.protocol;
    const host = req.get('host');
    const baseUrl = `${protocol}://${host}`;

    const lessonId = req.query.id || (req.body && req.body.id);

    // --- ฟังก์ชันช่วยแปลง Content ให้มี URL ---
    const formatContent = (contentJson) => {
      let content = contentJson ? JSON.parse(contentJson) : [];
      if (Array.isArray(content)) {
        return content.map(item => {
          if (item.type === 'file' && item.path) {
            return {
              ...item,
              // เปลี่ยน path ในเครื่องเป็น URL (แก้ \ เป็น / สำหรับ Windows)
              url: `${baseUrl}/${item.path.replace(/\\/g, '/')}`
            };
          }
          return item;
        });
      }
      return [];
    };

    if (lessonId) {
      const [rows] = await mysqli.query(`
                SELECT l.id AS lesson_id, l.lesson_name, l.lesson_category, l.lesson_level, 
                       l.lesson_status AS status, l.lesson_content, l.created_at, l.updated_at, 
                       u.name AS created_by
                FROM lesson l
                LEFT JOIN user_detail u ON l.created_by = u.auth_id
                WHERE l.id = ?
            `, [lessonId]);

      if (!rows.length) return res.status(404).json({ message: 'ไม่พบบทเรียนนี้' });

      const lesson = {
        ...rows[0],
        lesson_id: rows[0].lesson_id.toString(),
        lesson_content: formatContent(rows[0].lesson_content)
      };

      return res.status(200).json({ lesson });
    }

    // --- กรณีดึงแบบ Pagination ---
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const [[summary]] = await mysqli.query(`SELECT COUNT(*) AS total FROM lesson`);
    const [rows] = await mysqli.query(`
            SELECT l.*, l.lesson_status AS status, u.name AS created_by 
            FROM lesson l 
            LEFT JOIN user_detail u ON l.created_by = u.auth_id 
            ORDER BY l.created_at DESC LIMIT ? OFFSET ?
        `, [limit, offset]);

    const lessons = rows.map(r => ({
      ...r,
      lesson_id: r.id.toString(),
      lesson_content: formatContent(r.lesson_content)
    }));

    res.status(200).json({ summary, page, limit, lessons });

  } catch (err) {
    console.error('get-lesson error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};