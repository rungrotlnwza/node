const mysqli = require('../../config/mysqli.config');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ message: 'ไม่พบข้อมูล' });
        }
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ message: 'ขาดข้อมูลที่จำเป็น' });
        }
        const [check] = await mysqli.query('SELECT * FROM auth WHERE username = ?', [username]);
        if (check.length === 0) {
            return res.status(404).json({ message: 'ไม่พบผู้ใช้งาน' });
        }
        if (check[0].password !== password) {
            return res.status(401).json({ message: 'รหัสผ่านไม่ถูกต้อง' });
        }

        const token = jwt.sign({
            id: check[0].id,
            username: check[0].password,
            role: check[0].role
        }, 'iflovethenus', {
            expiresIn: '1d'
        })
        return res.status(200).json({ message: 'Login สำเร็จ', token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
}