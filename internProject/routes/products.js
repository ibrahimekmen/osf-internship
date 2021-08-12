const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const api = require("../api.js");

router.get('/:id', (req,res)=>{
    const { id } = req.params;
    api.getProduct(id).then(data => {
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