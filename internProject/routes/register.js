const express = require('express');
const api = require('../api');
const router = express.Router();


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
            password : req.body.password,
            secretKey: "$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2"
        };

        api.createNewUser(userData).then(data =>{
            req.session.userId = data.user._id;
            req.params.userData = data.user;
            return res.redirect('/profile');
        }).catch(error => {
            console.error(error);
        });

    }else {
        const err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
});

module.exports = router;