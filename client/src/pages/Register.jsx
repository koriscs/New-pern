import React, { useState } from 'react'
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { onRegister } from '../api/auth'; 

export default function Register() {

    const [values, setValues] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "" 
    })
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

   const onChange = (e) =>{
    setValues({...values, [e.target.name]: e.target.value})
   } 
   const onSubmit = async (e) => {
    e.preventDefault()
    try{
      const {data} = await onRegister(values);

      setError('');
      setSuccess(data.message);
      setValues({
      firstname: "",
      lastname: "",
      email: "",
      password:""
    })
    } catch (error) {
        setError(error.response.data.errors[0].msg);
        setSuccess('');
    }

}

  return (
    <Layout>
  <form onSubmit={(e) => onSubmit(e) } className="register-container container mt-3">
    <h1>Register</h1>
    <div className='mb-3'>
  <label htmlFor='firstname' className='form-label'>
    Firstname
  </label>
  <input
    onChange={(e) => onChange(e)}
    type='text'
    value={values.firstname}
    className='form-control'
    id='firstname'
    name='firstname'
    placeholder='Lajos'
    required
  />
</div>

<div className='mb-3'>
  <label htmlFor='lastname' className='form-label'>
    Lastname
  </label>
  <input
    onChange={(e) => onChange(e)}
    type='text'
    value={values.lastname}
    className='form-control'
    id='lastname'
    name='lastname'
    placeholder='Kovacs'
    required
  />
</div>


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
<div style={{ color: 'green', margin: '10px 0' }}>{success}</div> 

<button type='submit' className='btn btn-primary'>
  Submit
</button>
    </form>
    </Layout>
  )
}
