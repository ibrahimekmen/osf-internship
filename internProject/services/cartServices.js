async function getCart(data){
    const response = await fetch(`${process.env.API_URL}/cart?secretKey=${process.env.SECRET_KEY}`,{
        method: 'GET',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${data}`
        },
        authentication : {
            'token' : data,
            'type' : 'bearer' 
        }
    });

    return response.json();
}

async function addToCart(data){
    const bodyData = {
        "secretKey" : `${process.env.SECRET_KEY}`,
        "productId" : data.productId,
        "variantId" : data.variationId,
        "quantity" : data.quantity, 
    };

    const response = await fetch(`${process.env.API_URL}/cart/addItem`,{
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${data.token}`
        },
        authentication : {
            'token' : data.token,
            'type' : 'bearer' 
        },
        body : JSON.stringify(bodyData)
    }).catch(error =>{
        console.log(error);
    });
    return await response.json();
}

module.exports = {
    addToCart,
    getCart
}