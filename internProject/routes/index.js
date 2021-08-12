const express = require('express');
const fetch = require('node-fetch');

const router = express.Router();


async function getCategories(gender){
    let response = await fetch(`https://osf-digital-backend-academy.herokuapp.com/api/categories/parent/${gender}?secretKey=$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2`);
    let categoryData = await response.json();

    let subcategories = [];
    let temp;

    for (element of categoryData) {
        const sub = await getSubCategories(element.id);
        subcategories.push(sub);
      }
    
    return [categoryData,subcategories];
}

async function getSubCategories(category){
    let response = await fetch(`https://osf-digital-backend-academy.herokuapp.com/api/categories/parent/${category}?secretKey=$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2`);
    let data = await response.json();
    return data;
}

async function getProducts(category){
    let response = await fetch(`https://osf-digital-backend-academy.herokuapp.com/api/products/product_search?primary_category_id=${category}&secretKey=$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2`);
    let data = await response.json();
    return data;
}


// --- index
// /:id 
// --- subcategory
// /:id/subcategory/:id
// --- product
// /:id/subcategory/:id/product/:id



router.get('/', (req,res)=>{
    res.render('home');
});

router.get('/men', (req,res)=>{
    getCategories("mens").then(data => {
        navbarCategories = data[0];
        res.render('index',{
            gender: "Men",
            categories: data[0],
            subcategories: data[1],
            currentRoute: "men",
            breadcrumbs: req.breadcrumbs,
            navbarCategories: data[0]
        });
    }, (err) => {
        console.log(err);
    });
});

router.get('/women', (req,res)=>{
    getCategories("womens").then(data => {
        res.render('index',{
            gender: "Women",
            categories: data[0],
            subcategories: data[1],
            currentRoute: "women",
            breadcrumbs: req.breadcrumbs,
            navbarCategories: data[0]
        });
    }, (err) => {
        console.log(err);
    });    
});

router.get('/women/:id',(req,res)=>{
    const { id } = req.params;
    getProducts(id).then(data =>{
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
    getProducts(id).then(data =>{
        res.render('subcategory',{
            gender: "Men",
            products: data,
            currentRoute: id,
            breadcrumbs: req.breadcrumbs,
            navbarCategories: [
                {name: "Accessories"},
                {name: "Clothing"}
            ]
        });
    });
});

router.get('/Men/:category/product/:productID', (req,res)=>{
    const { productID } = req.params;
    getProduct(productID).then(data => {
        res.render('product',{
            product: data[0],
            gender: "Men",
            breadcrumbs: req.breadcrumbs,
            navbarCategories: [
                {name: "Accessories"},
                {name: "Clothing"}
            ]
        });
    }, (err) => {
        console.log(err);
    }); 
});

async function getProduct(name){
    const response = await fetch(`https://osf-digital-backend-academy.herokuapp.com/api/products/product_search?name=${name}&secretKey=$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2`);
    const data = await response.json();
    console.log("Kardeşim helikopter: ", data);
    return await data;
}






module.exports = router;