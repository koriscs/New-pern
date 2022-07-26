import React from 'react'
import Layout from '../components/Layout'
import { onLogin } from '../api/auth'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';
import Google from '../img/google.png'
import { toast } from 'react-toastify';

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
      toast.success('Sucessfull login!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    } catch (error) {
      console.log(error.response.data.errors[0].msg)
      setError(error.response.data.errors[0].msg)
    }
  }
  const googleLogin = async () =>{
      window.open("http://localhost:3000/auth/google","_self");
      
  }

  return (
    <Layout>
       <form onSubmit={(e) => onSubmit(e)} className='container login-container mt-3'>
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
      <div className='d-flex justify-content-center' >
      <button className='btn btn-light ' onClick={googleLogin} ><img className='google-img' src={Google} />
        Google
      </button>
      </div>
    </Layout>
  )
}
