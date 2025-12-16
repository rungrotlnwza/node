const multer = require('multer');
const path = require('path');

module.exports = function uploadFiles(req, res, next) {
    // กำหนด storage ของ Multer
    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads/'),
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const name = path.basename(file.originalname, ext);
            cb(null, `${name}-${Date.now()}${ext}`);
        }
    });

    const upload = multer({ storage });

    // parse ไฟล์ทั้งหมดจาก request
    upload.any()(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        next(); // ส่งต่อไป controller
    });
};
