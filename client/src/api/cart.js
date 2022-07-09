import axios from 'axios';
axios.defaults.withCredentials = true;

require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction ? process.env.HEROKU_URL : process.env.SERVER_URL;

export async function addItemToCart (body,id) {
    console.log("This is the body.id "+JSON.stringify(body))
    return await axios.post(`${baseURL}/cart/${id}`,
    body)
}

export async function fetchCartItems (body) {
    console.log("This is the body.id "+body.id)
    return await axios.get(`${baseURL}/cart/${body.id}`)
}

