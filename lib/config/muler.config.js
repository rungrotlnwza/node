const multer = require('multer');

// ใช้ memoryStorage เพื่อให้ไฟล์ถูกเก็บไว้ในหน่วยความจำ (Buffer) 
// สิ่งนี้จะทำให้ Controller สามารถอ่าน file.buffer ไปเขียนลง Disk เองได้ครับ
const storage = multer.memoryStorage();

// ตั้งค่า Filter เพื่อความปลอดภัย (Optional)
const fileFilter = (req, file, cb) => {
    // รองรับเฉพาะไฟล์รูปภาพ, วิดีโอ และเสียง
    const allowedMimeTypes = [
        'image/jpeg', 'image/png', 'image/gif', 'image/webp',
        'video/mp4', 'video/mpeg', 'video/quicktime',
        'audio/mpeg', 'audio/wav', 'audio/mp3'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('ประเภทไฟล์ไม่รองรับครับ! (อนุญาตเฉพาะ Image, Video และ Audio)'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 100 * 1024 * 1024 // จำกัดขนาดไฟล์ที่ 100MB (ปรับเพิ่มได้ตามความเหมาะสมครับ)
    }
});

module.exports = upload;