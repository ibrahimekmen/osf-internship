const express = require('express');
const api = require("../api.js");
const router = express.Router();
const mid = require("../middleWare");

router.get('/',mid.requiresLogin, (req,res,next)=>{
    console.log(req);
    if(! req.session.userId){       
        var err = new Error("You must sign up to view your profile(if you already have a account)");
        err.status = 403;
        return next(err);
    }
    console.log(req.session);

    api.getWomenNavbar().then(data =>{
        res.render('profile',{
            gender: "Women",
            breadcrumbs: req.breadcrumbs,
            categories: data[0],
            subcategories: data[1],
            user : req.session.user.user
        });
    }).catch(err=>{
        res.render("error",err.error);
    });

    
});

module.exports = router;