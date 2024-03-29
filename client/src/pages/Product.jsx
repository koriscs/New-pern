import React, {useRef} from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductApi } from '../api/products';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import { addItemToCartRedux } from '../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../api/cart';
import { fetchCartItems } from '../api/cart';
import { setItemCount,deleteReduxCart } from '../redux/slices/cartSlice';
import '../styles/Product.css';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Product() {
    let { productId } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [size, setSize] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
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

    const getProduct = async () =>{
        try{
            const response = await getProductApi(productId);
            setProduct(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    const addProduct = () =>{
      if (isAuth) {
        addItemToCart({product_id:product.id,
          quantity: 1,
          size,
          id: user.id})
      } else {
        let data ={product_id:product.id,
          quantity: 1,
          size,
          price:product.price,
          sub_total:product.price,
          item_name: product.item_name,
          image_url: product.image_url}
        dispatch(addItemToCartRedux(data))
      }
      toast.success('Your item was added!', {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
      navigate(`/`);
      
    }
    const sizeChange = (e) =>{
      e.preventDefault();
      setSize(e.target.value);
    } 


    useEffect(() =>{
        getProduct();
        fetchCart();
  },[cart.length]);

  useEffect(() =>{
    if(!firstTimeRender.current) {
    dispatch(setItemCount(cart.length));
    }
  },[cart.length]);

  useEffect(() =>{
    firstTimeRender.current = false;
  },[]);

  return !loading ? (
    <Layout>
    <Container className='product-container' >
        <Card  className='product-card' style={{maxWidth: '22rem'}}  >
          <Card.Img crossOrigin="anonymous" src={product.image_url} />
            <Card.Body>
              <Card.Title>{product.item_name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
              <Form  className='product-form' onChange={sizeChange}>
                <Form.Label>Size's: </Form.Label>
                <Form.Check inline label='S' name="size"  value="S" id='S' type='radio' />
                <Form.Check inline label='M' name="size"  value="M" id='M' type='radio' />
                <Form.Check inline label='L' name="size"  value="L" id='L' type='radio' />
              </Form>
            <Button variant='outline-success' onClick={addProduct} >Add to Cart</Button>
           
          <Card.Footer>{product.price+"Ft"}</Card.Footer>
        </Card>
         <Button variant='danger' onClick={() =>{navigate(-1)}} >Go back</Button>
    </Container>
    </Layout>  ) : (
        <Layout>
        <Container>Loading...</Container>
        </Layout>
    )
  }
