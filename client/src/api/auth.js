import axios from 'axios';
axios.defaults.withCredentials = true;

export async function onRegister( registrationForm) {
    return await axios.post(
        'http://localhost:3000/auth/register',
        registrationForm
        )
}

export async function onLogin (loginForm) {
    return await axios.post('http://localhost:3000/auth/login',
    loginForm)
}

export async function onLogout () {
    return await axios.get('http://localhost:3000/auth/logout')
}

export async function fetchAccountInfo () {
    return await axios.get('http://localhost:3000/auth/account')
}

export async function onGoogleLogin () {
    console.log("Do we get to here?")
    return await axios.get('http://localhost:3000/auth/google/success')
}

