const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('register');
});

router.post('/', (req,res,next)=>{
    if(req.body.name && req.body.email
        && req.body.password
        && req.body.confirmPassword){
        if(req.body.password !== req.body.confirmPassword){
            const err = new Error('Passwords do not match');
            err.status = 400; // bad request
            return next(err);
        }
        const userData = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password 
        };

        User.create(userData , (error,user) =>{
            if(error){
                return next(error);
            }else{
                return res.redirect("/profile");
            }
        });

    }else {
        const err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
});

module.exports = router;