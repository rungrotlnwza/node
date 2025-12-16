const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
    const { id } = req.params;

    try {
        // ลบบทเรียน
        await mysqli.query('DELETE FROM lesson WHERE id = ?', [id]);

        // อัปเดต summary
        const [[summary]] = await mysqli.query(`
      SELECT 
        COUNT(*) AS total,
        SUM(lesson_status='open') AS status_open,
        SUM(lesson_status='close') AS status_close
      FROM lesson
    `);

        res.status(200).json({
            message: 'ลบบทเรียนเรียบร้อย',
            summary
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'ลบบทเรียนล้มเหลว' });
    }
};
