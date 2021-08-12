const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

async function getProduct(name){
    const response = await fetch(`https://osf-digital-backend-academy.herokuapp.com/api/products/product_search?name=${name}&secretKey=$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2`);
    const data = await response.json();
    return await data;
}


router.get('/:id', (req,res)=>{
    const { id } = req.params;
    getProduct(id).then(data => {
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




module.exports = router;