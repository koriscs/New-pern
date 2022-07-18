import React, { useState, useEffect, useRef } from 'react'
import { Container, Row, Col, Button, Image} from 'react-bootstrap';
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import { fetchCartItems , addItemToCart, deleteCart, updateCartItem} from '../api/cart';
import { useSelector, useDispatch } from 'react-redux';
import { setItemCount,deleteReduxCart, deleteItemFromRedux, updateQuantity} from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

export default function Cart() {

      const { isAuth } = useSelector(state=> state.auth);
      const {cartRedux } = useSelector(state =>state.cart);
      const [cart,setCart] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error,setError] = useState(false);
      const dispatch = useDispatch();
      const { user } = useSelector(state=> state.users);
      const firstTimeRender = useRef(true);
      const navigate = useNavigate();

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
            setError("Your cart is empty!")
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
      const handleUpdate = async (e, item) =>{
        e.preventDefault();
        item = {...item, quantity:e.target.value}
        if(isAuth) {
          item.id = user.id;
          await updateCartItem(item);
        } else {
          console.log("Event target"+e.target.value);
          console.log(JSON.stringify(item));
          dispatch(updateQuantity(item));
        }
      }
      const checkout = (e) =>{
        e.preventDefault ();
        if(isAuth) {
          navigate('/checkout');
        }else (
          setError('Please log in!')
        )

      } 

      useEffect(() =>{
        fetchCart();
      },[handleDelete, handleUpdate])

      useEffect(() =>{
        if(!firstTimeRender.current) {
        dispatch(setItemCount(cart.length));
        }
      },[cart.length]);
      useEffect(() =>{
        firstTimeRender.current = false;
      },[]);
    

  return loading ? (
    <Layout>
    <div>Loading...</div>
    </Layout>
  ) : (
    <Layout>
      <Container className='cart-container' >
        {error ? <h3>{error}</h3>: (
          <Row className='row-name' >
            <Col className='col-2' ></Col>
            <Col className='col-3' >Item Name</Col>
            <Col className='col-1' >Size</Col>
            <Col className='col-2' >Quantity</Col>
            <Col className='col-2' >Price</Col>
            <Col className='col-1' >Delete</Col>
          </Row>
        )}
        {error ? null :cart.map((items,index) => {
          return (
            <Row   key={index}>
              <Col className='col-2' ><Image src={items.image_url} thumbnail={true}/></Col>
              <Col className='col-3 col2'>{items.item_name}</Col>
              <Col className='col-1 col3'>{items.size}</Col>
              <Col className='col-2 col4'>
                <select className="m-2 border border-solid" value={items.quantity} onChange={(e)=>handleUpdate(e, items)}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                </select>
              </Col>
              <Col className='col-2 col5'>{items.sub_total}</Col>
              <Col className='col-1 col6'><Button variant='danger' onClick={(e) => handleDelete(e,items) } >x</Button></Col>
            </Row>
          )
        }) }
      </Container>
      <div className='d-flex justify-content-center' >
        <Button onClick={(e)=>checkout(e)} className='checkout-btn' variant='outline-info' >Go To Checkout</Button>
        </div>
    </Layout>
  )
}
