const express = require('express');
const { getCart } = require('../api.js');
const api = require("../api.js");
const router = express.Router();
const mid = require("../middleWare");

router.get('/',mid.requiresLogin, (req,res,next)=>{
    if(! req.session.userId){       
        var err = new Error("You must sign up to view your profile(if you already have a account)");
        err.status = 403;
        return next(err);
    }

    // token for calling wishlist and cart
    var token = req.session.user.token;

    Promise.all([api.getCart(token),api.getWomenNavbar(),api.getWishlist(token)]).then(data =>{
        var cartError = false;
        var wishlistError = false;
        if(data[0].error){
            cartError = true;
        }
        
        if(data[2].error){
            wishlistError = true;
        }
        
        res.render('profile',{
            gender: "Women",
            breadcrumbs: req.breadcrumbs,
            categories: data[1][0],
            subcategories: data[1][1],
            user : req.session.user.user,
            cartError: cartError,
            wishlistError : wishlistError
        });

    }).catch(err=>{
        res.render("error",err.error);
    });
});

module.exports = router;