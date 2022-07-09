import axios from 'axios';
axios.defaults.withCredentials = true;

require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction ? process.env.HEROKU_URL : process.env.SERVER_URL;

export async function getAllProducts() {
    return await axios.get(`${baseURL}/products`)
}

export async function getProductApi(productId) {
    return await axios.get(`${baseURL}/products/${productId}`)
}
