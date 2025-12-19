const mysqli = require('../../config/mysqli.config');

module.exports = async (req, res) => {
    try {
        const [userRows] = await mysqli.query('SELECT ud.*, a.role FROM user_detail ud JOIN auth a ON ud.auth_id = a.id WHERE ud.auth_id = ?', [req.user.id]);
        const deatail = userRows[0] || {};

        const [levelRows] = await mysqli.query('SELECT * FROM level_skill WHERE auth_id = ?', [req.user.id]);
        const level = levelRows[0] || {};

        return res.status(200).json({
            id: deatail.auth_id || '-',
            first_name: deatail.name || '-',
            last_name: deatail.lastname || '-',
            role: deatail.role || '-',
            email: deatail.email || '-',
            phone: deatail.phone || '-',
            birth_date: deatail.birth_date || '-',
            province_name: deatail.province_name,
            district_name: deatail.district_name,
            sub_district_name: deatail.sub_district_name,
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
};
