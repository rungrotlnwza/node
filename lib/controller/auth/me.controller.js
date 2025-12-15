const mysqli = require('../../config/mysqli.config');
module.exports = async (req, res) => {
    try {
        const [deatail] = await mysqli.query('SELECT * FROM user_detail WHERE auth_id = ?', [req.user.id])
        const [level] = await mysqli.query('SELECT * FROM level_skill WHERE auth_id = ?', [req.user.id])
        return res.status(200).json({

            "id": deatail.auth_id || '-',
            "first_name": deatail.first_name || '-',
            "last_name": deatail.last_name || '-',
            "role": deatail.role || '-',
            "email": deatail.email || '-',
            "phone": deatail.phone || '-',
            "address": deatail.address || '-',
            "certpass": deatail.certpass || '-',
            "skills": {
                "reading": level.reading_score || '0',
                "listening": level.listening_score || '0',
                "speaking": level.speaking_score || '0',
                "writing": level.writing_score || '0',
                "grammar": level.grammar_score || '0',
                "vocabbulary": level.vocabbulary_score || '0'
            }, "level": {
                "reading": level.reading_level || 'beginner',
                "listening": level.listening_level || 'beginner',
                "speaking": level.speaking_level || 'beginner',
                "writing": level.writing_level || 'beginner',
                "grammar": level.grammar_level || 'beginner',
                "vocabbulary": level.vocabbulary_level || 'beginner'
            }
            // level.reading_level || '-'

            // level.listening_level || '-',
            // level.speaking_level || '-',
            // level.speaking_score || '0',
            // level.writing_level || '-',
            // level.writing_score || '0',
            // level.grammar_level || '-',
            // level.grammar_score || '0',
            // level.vocabbulary_level || '-',
            // level.vocabbulary_score || '0'
        })
    } catch (err) {
        console.log(err);
    }

}