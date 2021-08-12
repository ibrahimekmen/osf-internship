const express = require('express');
const { getWomenNavbar } = require('../api.js');
const api = require("../api.js");
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('home');
});

router.get('/men', (req,res)=>{
    api.getCategoriesByParent("mens").then(data => {
        navbarCategories = data[0];
        res.render('index',{
            gender: "Men",
            categories: data[0],
            subcategories: data[1],
            currentRoute: "men",
            breadcrumbs: req.breadcrumbs
        });
    }, (err) => {
        console.log(err);
    });
});

router.get('/women', (req,res)=>{
    api.getCategoriesByParent("womens").then(data => {
        res.render('index',{
            gender: "Women",
            categories: data[0],
            subcategories: data[1],
            currentRoute: "women",
            breadcrumbs: req.breadcrumbs
        });
    }, (err) => {
        console.log(err);
    });    
});

router.get('/women/:id',(req,res)=>{
    const { id } = req.params;
    api.getProducts(id).then(data =>{
        res.render('subcategory',{
            gender: "Women",
            products: data,
            currentRoute: id,
            breadcrumbs: req.breadcrumbs,
            navbarCategories: [
                {name: "Clothing"},
                {name: "Accessories"},
                {name: "Jewelry"}
            ]
        });
    });
});

router.get('/men/:id',(req,res)=>{
    const { id } = req.params;
    api.getProducts(id).then(data =>{
        res.render('subcategory',{
            gender: "Men",
            products: data,
            currentRoute: id,
            breadcrumbs: req.breadcrumbs,
            categories: [
                {name: "Accessories"},
                {name: "Clothing"}
            ]
        });
    });
});

router.get('/Men/:category/product/:productID', (req,res)=>{
    const { productID } = req.params;
    api.getProduct(productID).then(data => {
        res.render('product',{
            product: data[0],
            gender: "Men",
            breadcrumbs: req.breadcrumbs,
            categories: [
                {name: "Accessories"},
                {name: "Clothing"}
            ]
        });
    }, (err) => {
        console.log(err);
    }); 
});

router.get('/Women/:category/product/:productID', (req,res)=>{
    const { productID } = req.params;
    api.getProduct(productID).then(data => {
        res.render('product',{
            product: data[0],
            gender: "Women",
            breadcrumbs: req.breadcrumbs,
            categories: [
                {name: "Clothing"},
                {name: "Accessories"},
                {name: "Jewelry"}
            ]
        });
    }, (err) => {
        console.log(err);
    }); 
});

module.exports = router;