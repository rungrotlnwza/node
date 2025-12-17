const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
    try {
        const protocol = req.protocol;
        const host = req.get('host');
        const baseUrl = `${protocol}://${host}`;

        const { category, level, step } = req.params;
        const stepIdx = parseInt(step) - 1;

        if (isNaN(stepIdx) || stepIdx < 0) return res.status(400).json({ message: 'Step ไม่ถูกต้องครับ' });

        // ดึงข้อมูลโดยใช้ชื่อตารางเต็ม
        const [rows] = await mysqli.query(`
      SELECT lesson.id AS lesson_id, lesson.lesson_name, lesson.lesson_category, 
             lesson.lesson_level, lesson.lesson_status, lesson.lesson_content, 
             user_detail.name AS created_by
      FROM lesson
      LEFT JOIN user_detail ON lesson.created_by = user_detail.auth_id
      WHERE lesson.lesson_category = ? AND lesson.lesson_level = ? AND lesson.lesson_status = 'open'
      ORDER BY lesson.id ASC LIMIT 1 OFFSET ?
    `, [category, level, stepIdx]);

        if (!rows.length) return res.status(404).json({ message: 'ไม่พบบทเรียนลำดับนี้ครับ' });

        const [[{ total }]] = await mysqli.query(`
      SELECT COUNT(*) AS total FROM lesson 
      WHERE lesson_category = ? AND lesson_level = ? AND lesson_status = 'open'
    `, [category, level]);

        res.status(200).json({
            lesson: rows[0],
            pagination: {
                current_step: parseInt(step),
                total_steps: total,
                has_next: parseInt(step) < total,
                has_prev: parseInt(step) > 1
            }
        });
    } catch (err) {
        res.status(500).json({ message: 'Server error ครับ' });
    }
};