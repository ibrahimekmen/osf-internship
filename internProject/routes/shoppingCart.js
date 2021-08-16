const express = require('express');
const api = require("../api.js");
const router = express.Router();
const mid = require("../middleWare");


router.get('/',mid.requiresLogin,(req,res)=>{
    api.getWomenNavbar().then(data =>{
        res.render('shoppingCart',{
            gender: "Women",
            breadcrumbs: req.breadcrumbs,
            categories: data[0],
            subcategories: data[1],
            user : req.session.user
        });
    }).catch(err=>{
        res.render("error",err.error);
    });
});

module.exports = router;