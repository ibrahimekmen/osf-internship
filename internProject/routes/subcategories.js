const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

async function getProducts(category){
    let response = await fetch(`https://osf-digital-backend-academy.herokuapp.com/api/products/product_search?primary_category_id=${category}&secretKey=$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2`);
    let data = await response.json();
    return data;
}


// router.get('/', (req,res)=>{
//     res.render('subcategory', {
//         products: products
//     });
// });







module.exports = router;