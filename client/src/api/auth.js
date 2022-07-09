import axios from 'axios';
axios.defaults.withCredentials = true;
require('dotenv').config();
const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction ? process.env.HEROKU_URL : process.env.SERVER_URL;

export async function onRegister( registrationForm) {
    return await axios.post(
        `${baseURL}/auth/register`,
        registrationForm
        )
}

export async function onLogin (loginForm) {
    return await axios.post(`${baseURL}/auth/login`,
    loginForm)
}

export async function onLogout () {
    return await axios.get(`${baseURL}/auth/logout`)
}

export async function fetchAccountInfo () {
    return await axios.get(`${baseURL}/auth/account`)
}

export async function onGoogleLogin () {
    console.log("Do we get to here?")
    return await axios.get(`${baseURL}/auth/google/success`)
}

