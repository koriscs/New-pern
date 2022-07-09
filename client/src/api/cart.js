import axios from 'axios';
import {baseURL} from '../conts/index';
axios.defaults.withCredentials = true;



export async function addItemToCart (body,id) {
    console.log("This is the body.id "+JSON.stringify(body))
    return await axios.post(`${baseURL}/cart/${id}`,
    body)
}

export async function fetchCartItems (body) {
    console.log("This is the body.id "+body.id)
    return await axios.get(`${baseURL}/cart/${body.id}`)
}

