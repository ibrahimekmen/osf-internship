const express = require('express');
const api = require('../api');
const router = express.Router();


router.post('/', (req,res,next)=>{
    if(req.body.email
        && req.body.password){
        const userData = {
            email : req.body.email,
            password : req.body.password,
            secretKey: "$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2"
        };

        api.logIn(userData).then(data =>{
            if(data.error){
                const err = new Error(data.error);
                res.locals.error = err;
                res.status(401);
                console.error(err);
                res.render("error");
            }else
                req.session.userId = data.user._id;
                req.session.user = data;
                res.redirect('back');
        }).catch(error => {
            console.log(error);
        });

    }else {
        const err = new Error('All fields required');
        err.status = 400;
        return next(err);
    }
});

module.exports = router;