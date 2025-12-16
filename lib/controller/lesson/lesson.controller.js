module.exports = async (req, res) => {
    res.status(200).json({
        "summary": {
            "total": 100,
            "status_open": 80,
            "status_close": 20
        },
        "lessons": [
            {
                "lesson_id": "1",
                "lesson_name": "AUTHOR’S PURPOSE",
                "lesson_category": "reading",
                "lesson_level": "A1",
                "created_at": "2025-12-16T06:00:00Z",
                "updated_at": "2025-12-16T06:00:00Z",
                "created_by": "Pakawat Boonchoodoung",
                "status": "open",
                "lesson_content": {
                    "p1": "Author’s purpose คือจุดประสงค์ของผู้เขียนงานที่เราอ่านอยู่",
                    "p2": "การเข้าใจ Author’s purpose มีความสำคัญมาก",
                    "p3": "Author’s purpose แบ่งออกเป็น 3 ประเภทหลัก"
                }
            },
            {
                "lesson_id": "2",
                "lesson_name": "MAIN IDEA",
                "lesson_category": "reading",
                "lesson_level": "A1",
                "created_at": "2025-12-16T06:10:00Z",
                "updated_at": "2025-12-16T06:10:00Z",
                "created_by": "Pakawat Boonchoodoung",
                "status": "open",
                "lesson_content": {
                    "p1": "Main idea คือใจความสำคัญของบทอ่าน",
                    "p2": "Main idea มักอยู่ต้นหรือท้ายย่อหน้า"
                }
            }
        ]
    })
}