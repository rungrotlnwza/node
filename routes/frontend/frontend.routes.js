const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../views/index.ejs'))
});
router.get('/auth/login', (req, res) => {
    res.render(path.join(__dirname, '../../views/auth/login.ejs'))
})
router.get('/auth/register', (req, res) => {
    res.render(path.join(__dirname, '../../views/auth/register.ejs'))
})
router.get('/admin/admin', (req, res) => [
    res.render(path.join(__dirname, '../../views/admin/admin.ejs'))
])
router.get('/user/me', (req, res) => {
    res.render(path.join(__dirname, '../../views/user/me.ejs'))
})
router.get('/user/editme', (req, res) => {
    res.render(path.join(__dirname, '../../views/user/editme.ejs'))
})
router.get('/user/changpassword', (req, res) => {
    res.render(path.join(__dirname, '../../views/user/changpassword.ejs'))
})
router.get('/t', (req, res) => {
    res.render(path.join(__dirname, '../../views/components/t.ejs'))
})
module.exports = router;