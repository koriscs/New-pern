import React, { useState, useRef } from 'react'
import Layout from '../components/Layout'
import { useSelector } from 'react-redux';
import { fetchCartItems } from '../api/cart';
import StripeContainer from '../components/StripeContainer';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Image } from 'react-bootstrap';

export default function Checkout() {

    const { user } = useSelector(state=> state.users);
    const [cart,setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [total,setTotal] = useState(0);
    const firstTimeRender = useRef(true);

    const fetchCart = async () =>{
        const results = await fetchCartItems(user);

        setCart(results.data);
        setLoading(false);
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
    },[])
    useEffect(() =>{
        if(!firstTimeRender.current) {
            cartTotal();
        }
      },[cart]);
      useEffect(() =>{
        firstTimeRender.current = false;
      },[]);
  return (

    <Layout>
         {loading ? null :cart.map((items,index) => {
          return (
            <Row   key={index}>
              <Col className='col-2' ><Image src={items.image_url} thumbnail={true}/></Col>
              <Col className='col-3 col2'>{items.item_name}</Col>
              <Col className='col-1 col3'>{items.size}</Col>
              <Col className='col-2 col5'>{items.sub_total}</Col>
            </Row>
          )
        }) }
        <div>
            <p>Cart Total: {total}Ft</p>
        </div>
         < StripeContainer/>
    </Layout>
  )
}
