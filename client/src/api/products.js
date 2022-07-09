import axios from 'axios';

axios.defaults.withCredentials = true;


export async function getAllProducts() {
    return await axios.get(`/products`)
}

export async function getProductApi(productId) {
    return await axios.get(`/products/${productId}`)
}
