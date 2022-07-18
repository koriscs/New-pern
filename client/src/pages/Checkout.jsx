import React, { useState, useRef , useEffect} from 'react'
import Layout from '../components/Layout'
import { useSelector, useDispatch } from 'react-redux';
import { fetchCartItems } from '../api/cart';
import { fetchAddressInfo } from '../api/auth';
import { addAddressInfo, deleteAddressInfo } from '../redux/slices/usersSlice';
import StripeContainer from '../components/StripeContainer';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Image, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {

    const { user } = useSelector(state=> state.users);
    const [cart,setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total,setTotal] = useState(0);
    const firstTimeRender = useRef(true);
    const dispatch = useDispatch();
    const { address } = useSelector(state=> state.users);
    const navigate = useNavigate();

    const fetchCart = async () =>{
        const results = await fetchCartItems(user);
        setCart(results.data);
        setLoading(false);
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
    const cartTotal = () =>{
        let totalPrice = 0
        if (cart) {
            cart.forEach(items =>{
                 totalPrice = totalPrice +  Number(items.sub_total.replace(/[^0-9.-]+/g,"")/100);
                 console.log("TotalPrice: "+totalPrice);
                 console.log("Subtotal: "+items.sub_total)
                 return totalPrice
                })
            setTotal(totalPrice);
        }
    }
    useEffect(() =>{
        fetchCart();
        getAddressInfo();
    },[cart.length])

    useEffect(() =>{
        if(!firstTimeRender.current) {
            cartTotal();
        }
      },[cart.length]);

      useEffect(() =>{
        firstTimeRender.current = false;
      },[]);
  return (

    <Layout>
         {loading ? null :cart.map((items,index) => {
          return (
            <Row   key={index}>
              <Col className='col-2' ><Image crossorigin="anonymous" src={items.image_url} thumbnail={true}/></Col>
              <Col className='col-3 col2'>{items.item_name}</Col>
              <Col className='col-1 col3'>{items.size}</Col>
              <Col className='col-2 col5'>{items.sub_total}</Col>
            </Row>
          )
        }) }
        <div>
            <p>Cart Total: {total}Ft</p>
        </div>
         {address ? < StripeContainer/>:
         <div className='checkout-box'>
          <p>You can't check out without address information!</p>
          <Button onClick={() => navigate('/account/address')} > Give Address Info</Button>
          </div>}
    </Layout>
  )
}
