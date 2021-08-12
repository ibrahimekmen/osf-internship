const fetch = require('node-fetch');

async function getCategoriesByParent(gender){
    let response = await fetch(`https://osf-digital-backend-academy.herokuapp.com/api/categories/parent/${gender}?secretKey=$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2`);
    let categoryData = await response.json();

    let subcategories = [];

    for (element of categoryData) {
        const sub = await getSubCategories(element.id);
        subcategories.push(sub);
    }
   
    return [categoryData,subcategories];
}

async function getWomenNavbar(){
    let response = await fetch(`https://osf-digital-backend-academy.herokuapp.com/api/categories/parent/womens?secretKey=$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2`);
    let categoryData = await response.json();

    let subcategories = [];

    for (element of categoryData) {
        const sub = await getSubCategories(element.id);
        subcategories.push(sub);
    }

    return [categoryData,subcategories];
}


async function getMenNavbar(){
    let response = await fetch(`https://osf-digital-backend-academy.herokuapp.com/api/categories/parent/mens?secretKey=$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2`);
    let categoryData = await response.json();

    let subcategories = [];

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

async function getProduct(name){
    const response = await fetch(`https://osf-digital-backend-academy.herokuapp.com/api/products/product_search?name=${name}&secretKey=$2a$08$3ZvBsLPjB7q1Fnw/MmMOKejgVskQuF/4wyqFcqhiZEpQ1SywIVHi2`);
    const data = await response.json();
    return await data;
}

module.exports = {
    getWomenNavbar : getWomenNavbar,
    getCategoriesByParent : getCategoriesByParent,
    getSubCategories : getSubCategories,
    getProducts : getProducts,
    getProduct : getProduct
} 