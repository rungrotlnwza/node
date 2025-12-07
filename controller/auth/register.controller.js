const mysqli = require('../../config/mysqli.config');
module.exports = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'ไม่พบข้อมูล' });
        }

        const { username, password, confirm } = req.body;

        if (!username || !password || !confirm) {
            return res.status(400).json({ message: 'ขาดข้อมูลที่จำเป็น' });
        }

        if (password !== confirm) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // CHECK username exists
        const [row] = await mysqli.query('SELECT username FROM auth WHERE username = ?', [username]);

        if (row.length > 0) {
            return res.status(409).json({ message: 'username ถูกไช้งานแล้ว' });
        }

        // INSERT user (ไม่ hash)
        await mysqli.query('INSERT INTO auth (username, password) VALUES (?, ?)', [username, password]);

        return res.status(201).json({ message: 'สมัครสามชิกสำเร็จกรุณา login เพื่อไช้งานระบบ' });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
};
