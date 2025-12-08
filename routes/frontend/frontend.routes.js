const express = require('express');
const router = express.Router();

router.get('/me', (req, res) => {
    console.log('Cookies:', req.cookies);

    const token = req.cookies.token; // เช่น token จาก login
    if (!token) {
        return res.status(401).json({ message: 'No token' });
    }

    res.json({
        message: 'Cookie received',
        token
    });
});


module.exports = router;