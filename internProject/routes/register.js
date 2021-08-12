const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();

router.get('/', (req,res)=>{
    res.render('register');
});

module.exports = router;