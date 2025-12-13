const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/', (req, res) => {
    res.render(path.join(__dirname, '../../views/index.ejs'))
});
router.get('/auth/login',(req,res)=>{
    res.render(path.join(__dirname,'../../views/auth/login.ejs'))
})
router.get('/auth/register',(req,res)=>{
    res.render(path.join(__dirname,'../../views/auth/register.ejs'))
})
router.get('/admin/admin',(req,res)=>[
    res.render(path.join(__dirname,'../../views/admin/admin.ejs'))
])
router.get('/user/profile',(req,res)=>{
    res.render(path.join(__dirname,'../../views/user/profile.ejs'))
})
module.exports = router;