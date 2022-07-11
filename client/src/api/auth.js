import axios from 'axios';
axios.defaults.withCredentials = true;

export async function onRegister( registrationForm) {
    return await axios.post(
        `/auth/register`,
        registrationForm
        )
}

export async function onLogin (loginForm) {
    return await axios.post(`/auth/login`,
    loginForm)
}

export async function onLogout () {
    return await axios.get(`/auth/logout`)
}

export async function fetchAccountInfo () {
    return await axios.get(`/auth/account`)
}

export async function onGoogleLogin () {
    console.log("Do we get to here?")
    return await axios.get(`/auth/google/success`)
}

export async function addressInformation(id,addressForm) {
    return await axios.post(
        `/auth/address/${id}`,
        addressForm
        )
}

export async function fetchAddressInfo (id) {
    return await axios.get(`/auth/address/${id}`)
}