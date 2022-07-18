import React from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {  onLogout, fetchAccountInfo, fetchAddressInfo} from '../api/auth';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { Button, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {deleteAddressInfo, addAccountInfo, deleteAccountInfo, addAddressInfo } from '../redux/slices/usersSlice';
import { getCustomersOrders } from '../api/cart';
import '../styles/Account.css'


export default function Account() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState();
  const { user } = useSelector(state=> state.users)
  const { address } = useSelector(state=> state.users)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser());
      dispatch(deleteAccountInfo({}));
      dispatch(deleteAddressInfo({}));
    } catch (error) {
      console.log(error.response)
    }
  }

  const accountInfo = async () => {
    try {
      const { data } = await fetchAccountInfo();
      dispatch(addAccountInfo(data));
      setLoading(false)
      
    } catch (error) {
      logout();
    }
  }
  const getAddressInfo = async () =>{
    if(user.id) {
      try{
        console.log(user);
    const results = await fetchAddressInfo(user.id);
    console.log(results.data[0]);
    dispatch(addAddressInfo(results.data[0]));
      } catch(error) {
        console.log(error.response.data.success);
        if(error.response.data.success === false)
        {
          dispatch(deleteAddressInfo());
        }
      }
    }
  }
  const getOrders = async () =>{
    if(user.id) {
    try{
      const results = await getCustomersOrders(user);
      setOrders(results.data);
      
    }catch (error) {
      console.log(error);
    }
  }
}

  useEffect(() => {
    accountInfo();
    getAddressInfo();
    getOrders();
  },[user.id])

  return  loading ? (
     <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    
      <Layout>
        <div>
        <Container className='account-container' >
        <h1>Your Address Information</h1>
          { address ? <div className='address-container' >
            <p>{`${address.zipcode} ${address.country} ${address.city} ${address.street_name} ${address.street_number}`}</p>
            
            <p className='phone'>Your Phone Number: <span>{address.mobile_number}</span></p>
          </div>
       : <Link to='/account/address' ><Button variant='outline-info' >Give Address Info</Button></Link>}
        <div className='order-container'>
          <h1>Order History</h1>
        {orders ? orders.map((orders, index) =>{
          return (
            <div className='order-details' key={index}>
            <p>{orders.customer_address}</p>
            <p>{orders.date_of_purchase}</p>
            <p>{orders.total_price}</p>
            </div>
          )
        }): <div className='order-details' ><h2>No orders yet!</h2></div>}
        </div>
       
        <button onClick={() => logout()} className='logout-btn btn btn-primary'>
          Logout
        </button>
        </Container>
        </div>
      </Layout>
    
  )
}
