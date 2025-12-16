const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
    const user_id = req.user.id;

    // 1. ตรวจสอบว่ามี user อยู่แล้ว
    const [rows] = await mysqli.query(
        'SELECT * FROM user_detail WHERE auth_id = ?',
        [user_id]
    );

    const detail = rows?.[0] ?? {};
    const body = req.body ?? {};

    // 2. สร้าง object ที่จะ UPDATE/INSERT
    const userData = {
        auth_id: user_id,
        name: body.first_name ?? detail.name,
        lastname: body.last_name ?? detail.lastname,
        phone: body.phone ?? detail.phone,
        email: body.email ?? detail.email,
        birth_date: body.birth_date ?? detail.birth_date,
        education_level: body.education_level ?? detail.education_level,
        education_status: body.education_status ?? detail.education_status,
        province_name: body.province_name ?? detail.province_name,
        district_name: body.district_name ?? detail.district_name,
        sub_district_name: body.sub_district_name ?? detail.sub_district_name
    };

    // 3. ถ้ามี user → UPDATE, ถ้าไม่มี → INSERT
    if (rows.length > 0) {
        await mysqli.query(
            'UPDATE user_detail SET ? WHERE auth_id = ?',
            [userData, user_id]
        );
    } else {
        await mysqli.query(
            'INSERT INTO user_detail SET ?',
            userData
        );
    }
    console.log('ทำงานจาก updateme.controller.js:')
    console.log(userData);
    res.status(200).json(userData);
};
