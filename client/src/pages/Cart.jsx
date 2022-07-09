import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAccountInfo } from '../api/auth';
import { fetchCartItems , addItemToCart} from '../api/cart';
import Image from 'react-bootstrap/Image';
import { useSelector } from 'react-redux';
import { persistor } from '../redux/store.js';
//import { combineArrays } from '../utils/utils';

export default function Cart() {

      const { isAuth } = useSelector(state=> state.auth);
      const {cartRedux } = useSelector(state =>state.cart);
      const [cart,setCart] = useState([]);
      const [loading, setLoading] = useState(true);

      const fetchCart = async () =>{

        if(isAuth === true) {
        try {
          if(cartRedux.length) {
            const { data } = await fetchAccountInfo();
            cartRedux.id = data.id;
            console.log("This is the id in cart"+cartRedux.id);

            await cartRedux.map(products => addItemToCart(products,data.id));
            
            const results = await fetchCartItems(data);
            setCart(results.data);
            setLoading(false);
          } else {
            const { data } = await fetchAccountInfo()
            const results = await fetchCartItems(data);
            setCart(results.data);
            setLoading(false);
          }
        } catch (error) {
          console.log(error)
        }
      } else {
        
        setCart(cartRedux);
        setLoading(false);
      }
      }
  

      useEffect(() =>{
        fetchCart();
      })
  return loading ? (
    <Layout>
    <div>Loading...</div>
    </Layout>
  ) : (
    <Layout>
      <Container>
        {cart.map((items,index) => {
          return (
            <Row key={index}>
              <Col ><Image src={items.image_url} thumbnail={true}/></Col>
              <Col>{items.item_name}</Col>
              <Col>{items.size}</Col>
              <Col>{items.quantity}</Col>
              <Col>{items.sub_total}</Col>
              <Col><Button onClick={() =>{persistor.purge()}} >Purge</Button></Col>
            </Row>
          )
        }) 
}  
      </Container>
    </Layout>
  )
}
