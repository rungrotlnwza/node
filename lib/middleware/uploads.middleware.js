const multer = require('multer');

module.exports = function uploadFiles(req, res, next) {
    // 1. ใช้ memoryStorage แทน diskStorage
    // วิธีนี้ไฟล์จะไม่ถูกเขียนลงเครื่องจนกว่าคุณจะสั่งใน Controller
    const storage = multer.memoryStorage();

    const upload = multer({
        storage,
        limits: { fileSize: 50 * 1024 * 1024 } // ตัวอย่าง: จำกัดขนาด 50MB
    });

    // 2. parse ข้อมูลทั้งหมด
    upload.any()(req, res, (err) => {
        if (err) {
            console.error("Multer Error:", err);
            return res.status(400).json({ error: err.message });
        }

        // ตอนนี้ req.body และ req.files (แบบ buffer) พร้อมใช้งานใน Controller แล้วครับ
        next();
    });
};