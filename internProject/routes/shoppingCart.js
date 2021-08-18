const express = require('express');
const { addToCart } = require('../api.js');
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

router.post('/',mid.requiresLogin,(req,res,next)=>{
    var token = req.session.user.token;
    addToCartData = {
        token : token,
        quantity : req.body.quantity,
        productId : req.body.productId,
        variationId : req.body.variationId
    }
    Promise.all([api.getWomenNavbar(),api.addToCart(addToCartData)]).then(data => {
        console.log(data);
        res.render('shoppingCart',{
            gender: "Women",
            breadcrumbs: req.breadcrumbs,
            categories: data[0][0],
            subcategories: data[0][1],
            user : req.session.user,
        });
    }).catch(err=>{
        next(err);
    });
});

module.exports = router;