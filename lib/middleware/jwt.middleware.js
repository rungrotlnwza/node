const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next) {
    try {
        const authHeader = req.headers['authorization'];

        // ตรวจว่ามี header Authorization ไหม
        if (!authHeader) {
            return res.status(401).json({
                message: 'Authorization header missing'
            });
        }

        // รูปแบบต้องเป็น "Bearer <token>"
        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return res.status(401).json({
                message: 'Invalid authorization format'
            });
        }

        const token = parts[1];

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // แนบข้อมูล user ไปกับ request
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(403).json({
            message: 'Invalid or expired token'
        });
    }
};
