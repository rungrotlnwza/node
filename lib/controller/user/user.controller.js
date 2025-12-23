const mysqli = require('../../config/mysqli.config');
const jwt = require('jsonwebtoken');

module.exports = {
    // =========================
    // GET PROFILE
    // =========================
    getProfile: async (req, res) => {
        try {
            const [userRows] = await mysqli.query(
                `SELECT ud.*, a.role
                 FROM user_detail ud
                 JOIN auth a ON ud.auth_id = a.id
                 WHERE ud.auth_id = ?`,
                [req.user.id]
            );

            const detail = userRows[0] || {};

            const [levelRows] = await mysqli.query(
                'SELECT * FROM level_skill WHERE auth_id = ?',
                [req.user.id]
            );

            const level = levelRows[0] || {};

            return res.status(200).json({
                id: detail.auth_id || '-',
                first_name: detail.name || '-',
                last_name: detail.lastname || '-',
                role: detail.role || '-',
                email: detail.email || '-',
                phone: detail.phone || '-',
                birth_date: detail.birth_date || '-',
                province_name: detail.province_name,
                district_name: detail.district_name,
                sub_district_name: detail.sub_district_name,
                skills: {
                    reading: level.reading_score || 0,
                    listening: level.listening_score || 0,
                    speaking: level.speaking_score || 0,
                    writing: level.writing_score || 0,
                    grammar: level.grammar_score || 0,
                    vocabulary: level.vocabulary_score || 0
                },
                level: {
                    reading: level.reading_level || 'A1',
                    listening: level.listening_level || 'A1',
                    speaking: level.speaking_level || 'A1',
                    writing: level.writing_level || 'A1',
                    grammar: level.grammar_level || 'A1',
                    vocabulary: level.vocabulary_level || 'A1'
                }
            });

        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    // =========================
    // UPDATE PROFILE
    // =========================
    updateProfile: async (req, res) => {
        try {
            const user_id = req.user.id;

            const [rows] = await mysqli.query(
                'SELECT * FROM user_detail WHERE auth_id = ?',
                [user_id]
            );

            const detail = rows?.[0] ?? {};
            const body = req.body ?? {};

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

            return res.status(200).json(userData);

        } catch (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }
    },
    deleteAccount: async (req, res) => {
        try {
            const user_id = req.user.id;

            await mysqli.query(
                'DELETE FROM user_detail WHERE auth_id = ?',
                [user_id]
            );

            await mysqli.query(
                'DELETE FROM auth WHERE id = ?',
                [user_id]
            );

            res.status(200).json({
                message: `ลบ account ${user_id} สำเร็จ ยินดีที่ได้ร่วมเป็นส่วนหนึ่งในชีวิตของท่าน แล้วพบกันใหม่ในวันที่ท่านพร้อมให้เรารับใช้`
            });

            console.log(`ลบ account ${user_id} สำเร็จ`);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'ไม่สามารถลบ account ได้' });
        }
    }
};
