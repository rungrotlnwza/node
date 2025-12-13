module.exports = async (req, res) => {
    res.status(200).json({
        "first_name": "json",
        "last_name": "javascrip ofjec notation",
        "role": "user",
        "email": "John@doe.com",
        "phone": "+1234567890",
        "address": "Sisaket, Thailand",
        "certpass": "18 อรหรร",
        "skills": {
            "reading": 10,
            "listening": 10,
            "speaking": 10,
            "writing": 10,
            "grammar": 10,
            "vocabbulary": 10
        },
        "level": {
            "reading": "beginner",
            "listening": "beginner",
            "speaking": "beginner",
            "writing": "beginner",
            "grammar": "beginner",
            "vocabbulary": "beginner"
        }
    })
}