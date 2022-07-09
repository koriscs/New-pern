import axios from 'axios';
axios.defaults.withCredentials = true;

export async function addItemToCart (body,id) {
    console.log("This is the body.id "+JSON.stringify(body))
    return await axios.post(`http://localhost:3000/cart/${id}`,
    body)
}

export async function fetchCartItems (body) {
    console.log("This is the body.id "+body.id)
    return await axios.get(`http://localhost:3000/cart/${body.id}`)
}

