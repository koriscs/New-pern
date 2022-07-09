import React, { useEffect } from 'react'
import Layout from '../components/Layout'
import { onLogin, onGoogleLogin } from '../api/auth'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';

export default function Login() {

  const [values, setValues] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState(false)
  const dispatch = useDispatch();

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const onSubmit = async (e) =>{
    e.preventDefault()
    try{
      await onLogin(values);
      dispatch(authenticateUser());
    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }
  }
  const googleLogin = async () =>{
      window.open("http://localhost:3000/auth/google","_self");
      
  }

  const getUser = async () =>{
    try{
    const response = await onGoogleLogin();
   if (response.status === 200) {
     dispatch(authenticateUser());
   }
  } catch (error) {
    console.log(error.response);
  }
  }
  
  useEffect ( () =>{
    getUser();
  }) 

  return (
    <Layout>
       <form onSubmit={(e) => onSubmit(e)} className='container mt-3'>
        <h1>Login</h1>

        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={values.email}
            placeholder='test@gmail.com'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            onChange={(e) => onChange(e)}
            type='password'
            value={values.password}
            className='form-control'
            id='password'
            name='password'
            placeholder='passwod'
            required
          />
        </div>

        <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
      <button className='btn btn-secondary ' onClick={googleLogin} >
        Google Login
      </button>
    </Layout>
  )
}
