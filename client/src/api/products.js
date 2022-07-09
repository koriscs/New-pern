import axios from 'axios';
import {baseURL} from '../conts/index';
axios.defaults.withCredentials = true;


export async function getAllProducts() {
    return await axios.get(`${baseURL}/products`)
}

export async function getProductApi(productId) {
    return await axios.get(`${baseURL}/products/${productId}`)
}
