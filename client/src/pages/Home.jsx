import React ,{ useRef ,useState, useEffect}from 'react'
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Row, Container, Button} from 'react-bootstrap';
import { getAllProducts } from '../api/products';
import { fetchAccountInfo, onGoogleLogin } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { authenticateUser } from '../redux/slices/authSlice';
import { addAccountInfo } from '../redux/slices/usersSlice';
import '../styles/Home.css';
import { setItemCount,deleteReduxCart } from '../redux/slices/cartSlice';
import { addItemToCart } from '../api/cart';
import { fetchCartItems } from '../api/cart';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector(state=> state.auth);
  const { user } = useSelector(state=> state.users);
  const {cartRedux } = useSelector(state =>state.cart);
  const [cart,setCart] = useState([]);
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
        
      } else {

        const results = await fetchCartItems(user);

        setCart(results.data);
    
      }
    } catch (error) {
      console.log(error);
      }
  } else {
    
    setCart(cartRedux);
  }
  
  }

  const fetchProducts = async () =>{
  
    try{
      const response = await getAllProducts();
      setProducts(response.data)
    } catch (error) {
      console.log(error.response);
      setError(error.response);
    }
  }
  const getUser = async () =>{
    try{
    const response = await onGoogleLogin();
   if (response.status === 200) {
     dispatch(authenticateUser());
   }
  } catch (error) {
    console.log(error.response);
  }
  }
  const fetchUserInfo = async() =>{
    const { data } = await fetchAccountInfo();
    dispatch(addAccountInfo(data));
  }

  useEffect( () =>{
      getUser();
      fetchUserInfo();
      fetchProducts();
      fetchCart();
  },[]);
  useEffect(() =>{
    if(!firstTimeRender.current) {
    dispatch(setItemCount(cart.length));
    }
  },[cart]);
  useEffect(() =>{
    firstTimeRender.current = false;
  },[]);
  
  return (
    <Layout>

<div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

       <Container className='main-container'>
      <Row>
      {products.map((items, index)=>{
      return (
          <Card style={{maxWidth: '22rem'}} key={index} className='card' >
          <Card.Img src={items.image_url} className='card-image' />
            <Card.Body>
              <Card.Title>{items.item_name}</Card.Title>
              <Card.Text>{items.description}</Card.Text>
            </Card.Body>
            <Button variant='outline-info' className='card-button' onClick={() =>{
              navigate(`/product/${items.id}`)
            }} >Show Details</Button>
          <Card.Footer>{items.price+"Ft"}</Card.Footer>
        </Card>
        )
    })}
      </Row>
    </Container>
    </Layout>
  )
}
