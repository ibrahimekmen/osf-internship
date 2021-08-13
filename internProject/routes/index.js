const express = require('express');
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
    Promise.all([api.getProducts(id),api.getWomenNavbar()]).then(data =>{
        res.render('subcategory',{
            gender: "Women",
            products: data[0],
            currentRoute: id,
            breadcrumbs: req.breadcrumbs,
            categories: data[1][0],
            subcategories: data[1][1]
        });
    }).catch(err=>{
        console.log(err);
    });
});

router.get('/men/:id',(req,res)=>{
    const { id } = req.params;
    Promise.all([api.getProducts(id),api.getMenNavbar()]).then(data =>{
        res.render('subcategory',{
            gender: "Men",
            products: data[0],
            currentRoute: id,
            breadcrumbs: req.breadcrumbs,
            categories: data[1][0],
            subcategories: data[1][1]
        });
    }).catch(err=>{
        console.log(err);
    });
    
});

router.get('/Men/:category/product/:productID', (req,res)=>{
    const { productID } = req.params;
    Promise.all([api.getProduct(productID),api.getMenNavbar()]).then(data =>{
        res.render('product',{
            gender: "Men",
            product: data[0][0],    
            breadcrumbs: req.breadcrumbs,
            categories: data[1][0],
            subcategories: data[1][1]
        });
    }).catch(err=>{
        console.log(err);
    });
    
    
});

router.get('/Women/:category/product/:productID', (req,res)=>{
    const { productID } = req.params;
    Promise.all([api.getProduct(productID),api.getWomenNavbar()]).then(data =>{
        res.render('product',{
            gender: "Women",
            product: data[0][0],    
            breadcrumbs: req.breadcrumbs,
            categories: data[1][0],
            subcategories: data[1][1]
        });
    }).catch(err=>{
        console.log(err);
    });
});

module.exports = router;