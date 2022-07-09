import axios from 'axios';
axios.defaults.withCredentials = true;

export async function getAllProducts() {
    return await axios.get('http://localhost:3000/products')
}

export async function getProductApi(productId) {
    return await axios.get(`http://localhost:3000/products/${productId}`)
}
