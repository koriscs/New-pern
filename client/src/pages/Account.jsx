import React from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {  onLogout, fetchAccountInfo} from '../api/auth';
import { unauthenticateUser } from '../redux/slices/authSlice';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import StripeContainer from '../components/StripeContainer';
import { addAccountInfo, deleteAccountInfo } from '../redux/slices/usersSlice';
import { getCustomersOrders } from '../api/cart';

export default function Account() {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [checkout,setCheckout] = useState(false);
  const [orders, setOrders] = useState();
  const { user } = useSelector(state=> state.users)

  const logout = async () => {
    try {
      await onLogout()

      dispatch(unauthenticateUser());
      dispatch(deleteAccountInfo({}));
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
      logout()
    }
  }
  const getOrders = async () =>{
    try{
      if(user) {
      const results = await getCustomersOrders(user);
      setOrders(results.data);
      }
    }catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    accountInfo();
    getOrders();
  },[orders, user])

  return  loading ? (
     <Layout>
      <h1>Loading...</h1>
    </Layout>
  ) : (
    <div>
      <Layout>
        <h1>Account</h1>
        <h2>{`${user.id} , ${user.email}`}</h2>

        <Link to='/account/address' ><Button>Give Address information</Button></Link>
        <button onClick={() => logout()} className='btn btn-primary'>
          Logout
        </button>
        {checkout ? < StripeContainer/> : null}
        <Button variant='secondary' onClick={() => setCheckout(true)} >Checkout</Button>
        {orders ? orders.map((orders, index) =>{
          return (
            <div key={index}>
            <p>{orders.customer_address}</p>
            <p>{orders.date_of_purchase}</p>
            <p>{orders.total_price}</p>
            </div>
          )
        }): <h2>No orders yet!</h2>}
      </Layout>
    </div>
  )
}
