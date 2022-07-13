import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchCartItems , addItemToCart, deleteCart, updateCartItem} from '../api/cart';
import Image from 'react-bootstrap/Image';
import { useSelector, useDispatch } from 'react-redux';
import { persistor } from '../redux/store.js';
import { setItemCount,deleteReduxCart, deleteItemFromRedux, increaseQuantity, decreaseQuantity } from '../redux/slices/cartSlice';
import { useRef } from 'react';

export default function Cart() {

      const { isAuth } = useSelector(state=> state.auth);
      const {cartRedux } = useSelector(state =>state.cart);
      const [cart,setCart] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error,setError] = useState(false);
      const dispatch = useDispatch();
      const { user } = useSelector(state=> state.users);
      const firstTimeRender = useRef(true);


      const fetchCart = async () =>{

        if(isAuth === true) {
        try {
          if(cartRedux.length) {
            
            await cartRedux.map(products => {
              const newObj = Object.assign({id:user.id}, products);
              console.log(JSON.stringify(newObj));
              return addItemToCart(newObj);
            });

            dispatch(deleteReduxCart([]));

            const results = await fetchCartItems(user);
            setCart(results.data);
            setLoading(false);
            
          } else {

            const results = await fetchCartItems(user);

            setCart(results.data);
            setLoading(false);
        
          }
        } catch (error) {
          if(error.response.status === 404) {
            setError(error.response.data.msg)
            setLoading(false);
          }
        }
      } else {
        
        setCart(cartRedux);
        setLoading(false);
      }
      
      }
      const handleDelete = async (e,item) =>{
        e.preventDefault();
        if (isAuth) {
        console.log(JSON.stringify(item));
        item.id = user.id;
         const results = await deleteCart(item);
         if (!results.data.results.rows.length) {
          dispatch(setItemCount(0));
         }
        } else {
          dispatch(deleteItemFromRedux(item));
        }
      }
      const handleDecrease = async (e, item) =>{
        e.preventDefault();
        
        if(isAuth) {
        item.id = user.id;
        if(item.quantity === 1) {
          return;
        } else {
          item.quantity = item.quantity-1;
          await updateCartItem(item);
        }
       
        } else {
          dispatch(decreaseQuantity(item));
        }
      }
      const handleIncrease = async (e, item) =>{
        e.preventDefault();
        if(isAuth) {
        item.id = user.id;
        item.quantity = item.quantity+1;
      
        await updateCartItem(item);
      } else {
        dispatch(increaseQuantity(item))
      }
      }

      useEffect(() =>{
        fetchCart();
      },[handleDecrease, handleIncrease, handleDelete,dispatch])

      useEffect(() =>{
        if(!firstTimeRender.current) {
        dispatch(setItemCount(cart.length));
        }
      },[cart]);
      useEffect(() =>{
        firstTimeRender.current = false;
      },[]);
    

  return loading ? (
    <Layout>
    <div>Loading...</div>
    </Layout>
  ) : (
    <Layout>
      <Container>
        {error ? <h1>{error}</h1> :cart.map((items,index) => {
          return (
            <Row key={index}>
              <Col ><Image src={items.image_url} thumbnail={true}/></Col>
              <Col>{items.item_name}</Col>
              <Col>{items.size}</Col>
              <Col><Button variant='secondary' onClick={(e) => handleDecrease(e,items) }>-</Button>{items.quantity}<Button variant='secondary' onClick={(e) => handleIncrease(e,items) } >+</Button></Col>
              <Col>{items.sub_total}</Col>
              <Col><Button variant='danger' onClick={(e) => handleDelete(e,items) } >X</Button></Col>
            </Row>
          )
        }) }
      </Container>
    </Layout>
  )
}
