const { getMainCarrier } = require('@sentry/hub');
const fetch = require('node-fetch');



async function createNewUser(userData){
    const response = await fetch(`https://osf-digital-backend-academy.herokuapp.com/api/auth/signup`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(userData) // body data type must match "Content-Type" header
      });
    return response.json();
}

async function logIn(userData){
    const response = await fetch(`https://osf-digital-backend-academy.herokuapp.com/api/auth/signin`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(userData) // body data type must match "Content-Type" header
      });
    return response.json();
}

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
    logIn: logIn,
    createNewUser : createNewUser,
    getMenNavbar : getMenNavbar,
    getWomenNavbar : getWomenNavbar,
    getCategoriesByParent : getCategoriesByParent,
    getSubCategories : getSubCategories,
    getProducts : getProducts,
    getProduct : getProduct
} 