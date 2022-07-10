import React from 'react'
import { useState, useEffect } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchAccountInfo } from '../api/auth';
import { fetchCartItems , addItemToCart, deleteCart, updateCartItem} from '../api/cart';
import Image from 'react-bootstrap/Image';
import { useSelector, useDispatch } from 'react-redux';
import { persistor } from '../redux/store.js';
import { deleteReduxCart, deleteItemFromRedux, increaseQuantity, decreaseQuantity } from '../redux/slices/cartSlice';

export default function Cart() {

      const { isAuth } = useSelector(state=> state.auth);
      const {cartRedux } = useSelector(state =>state.cart);
      const [cart,setCart] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error,setError] = useState(false);
      const dispatch = useDispatch();

      const fetchCart = async () =>{

        if(isAuth === true) {
        try {
          if(cartRedux.length) {
            const { data } = await fetchAccountInfo();
            
            await cartRedux.map(products => {
              const newObj = Object.assign({id:data.id}, products);
              console.log(JSON.stringify(newObj));
              return addItemToCart(newObj)
            });

            dispatch(deleteReduxCart([]));

            const results = await fetchCartItems(data);
            setCart(results.data);
            setLoading(false);
            
          } else {

            const { data } = await fetchAccountInfo();
            const results = await fetchCartItems(data);

            setCart(results.data);
            setLoading(false);
        
          }
        } catch (error) {
          console.log(error)
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
        const { data } = await fetchAccountInfo();
        item.id = data.id;
        await deleteCart(item);
        } else {
          dispatch(deleteItemFromRedux(item));
        }
      }
      const handleDecrease = async (e, item) =>{
        e.preventDefault();
        
        if(isAuth) {
        const { data } = await fetchAccountInfo();
        item.id = data.id;
        item.quantity = item.quantity-1;
        await updateCartItem(item);
        } else {
          dispatch(decreaseQuantity(item));
        }
      }
      const handleIncrease = async (e, item) =>{
        e.preventDefault();
        if(isAuth) {
        const { data } = await fetchAccountInfo();
        item.id = data.id;
        item.quantity = item.quantity+1;
      
        await updateCartItem(item);
      } else {
        dispatch(increaseQuantity(item))
      }
      }

      useEffect(() =>{
        fetchCart();
      },[handleDecrease, handleIncrease, handleDelete])
  return loading ? (
    <Layout>
    <div>Loading...</div>
    </Layout>
  ) : (
    <Layout>
      <Container>
        {error ? <h1>{error}</h1> : null}
        {cart.map((items,index) => {
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
        <Col><Button onClick={() =>{persistor.purge()}} >Purge</Button></Col>
      </Container>
    </Layout>
  )
}
