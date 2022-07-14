import { addressInformation, fetchAccountInfo, onLogout } from '../api/auth';
import Layout from '../components/Layout'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Address() {
    const [values, setValues] = useState({
        zipcode: "",
        country: "",
        city: "",
        street_name: "",
        street_number: "",
        mobile_number:"", 
    })
    const [userinfo, setUserinfo] = useState();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

   const onChange = (e) =>{
    setValues({...values, [e.target.name]: e.target.value})
   } 
   const onSubmit = async (e) => {
    e.preventDefault()
    try{
      const {data} = await addressInformation(userinfo.id,values);

      setError('');
      setSuccess(data.message);
      setValues({
        zipcode: "",
        country: "",
        city: "",
        street_name: "",
        street_number: "",
        mobile_number:""
    })
    } catch (error) {
        console.log(error);
        setError(error.response.data.msg);
        setSuccess('');
    }
}
    const logout = async () => {
        try {
          await onLogout()
    
          dispatch(unauthenticateUser())
        } catch (error) {
          console.log(error.response)
        }
      }

    const accountInfo = async () => {
        try {
          const { data } = await fetchAccountInfo()
          setUserinfo(data);          
        } catch (error) {
          logout()
        }
      }
    
      useEffect(() => {
        accountInfo()
      })


  return (
    <Layout>
      <div className='address-container' >
      <Button variant='outline-danger' onClick={() =>{navigate(-1)}} >X</Button>
        <form onSubmit={(e) => onSubmit(e) } className="container mt-3">
    <h1>Give Address Information</h1>
<div className='mb-3'>
  <label htmlFor='Zipcode' className='form-label'>
    Zipcode
  </label>
  <input
    onChange={(e) => onChange(e)}
    type='text'
    value={values.zipcode}
    className='form-control'
    id='zipcode'
    name='zipcode'
    placeholder='7534'
    required
  />
</div>

<div className='mb-3'>
  <label htmlFor='country' className='form-label'>
    Country
  </label>
  <input
    onChange={(e) => onChange(e)}
    type='text'
    value={values.country}
    className='form-control'
    id='country'
    name='country'
    placeholder='Austria'
    required
  />
</div>


<div className='mb-3'>
  <label htmlFor='city' className='form-label'>
    City 
  </label>
  <input
    onChange={(e) => onChange(e)}
    type='text'
    className='form-control'
    id='city'
    name='city'
    value={values.city}
    placeholder='Kaposvar'
    required
  />
</div>

<div className='mb-3'>
  <label htmlFor='street_name' className='form-label'>
    Street name
  </label>
  <input
    onChange={(e) => onChange(e)}
    type='text'
    value={values.street_name}
    className='form-control'
    id='street_name'
    name='street_name'
    placeholder='Zaszlos utca'
    required
  />
</div>
<div className='mb-3'>
  <label htmlFor='street_number' className='form-label'>
    Street number
  </label>
  <input
    onChange={(e) => onChange(e)}
    type='text'
    value={values.street_number}
    className='form-control'
    id='street_number'
    name='street_number'
    placeholder='35'
    required
  />
</div>
<div className='mb-3'>
  <label htmlFor='mobile_number' className='form-label'>
    Phone number
  </label>
  <input
    onChange={(e) => onChange(e)}
    type='text'
    value={values.mobile_number}
    className='form-control'
    id='mobile_number'
    name='mobile_number'
    placeholder='36705443221'
    required
  />
</div>

 <div style={{ color: 'red', margin: '10px 0' }}>{error}</div>
<div style={{ color: 'green', margin: '10px 0' }}>{success}</div> 

<button type='submit' className='btn btn-primary'>
  Submit
</button>
    </form>
    </div>
    </Layout>
    
  )
}
