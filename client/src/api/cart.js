import axios from 'axios';
axios.defaults.withCredentials = true;

export async function addItemToCart (body) {
    return await axios.post(`/cart/${body.id}`,
    body)
}

export async function fetchCartItems (body) {
    return await axios.get(`/cart/${body.id}`)
}

export async function deleteCart (body) {
    return await axios.delete(`/cart/${body.id}/${body.cartid}`)
}

export async function updateCartItem (body) {
    return await axios.put(`/cart/${body.id}/${body.cartid}`,
    body)
}
