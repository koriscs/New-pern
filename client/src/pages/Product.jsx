import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Container, Card, Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductApi } from '../api/products';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import { addItemToCartRedux } from '../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAccountInfo } from '../api/auth';
import { addItemToCart } from '../api/cart';

export default function Product() {
    let { productId } = useParams();
    const [product, setProduct] = useState();
    const [loading, setLoading] = useState(true);
    const [size, setSize] = useState('');
    const [userinfo, setUserinfo] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuth } = useSelector(state=> state.auth);

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
          id: userinfo.id})
      } else {
        let data ={product_id:product.id,
          quantity: 1,
          size,
          sub_total:product.price,
          item_name: product.item_name,
          image_url: product.image_url}
        dispatch(addItemToCartRedux(data))
      }
    }
    const sizeChange = (e) =>{
      e.preventDefault();
      console.log("This is the event target"+e.target.value)
      setSize(e.target.value);
    } 
    const accountInfo = async () => {
      try {
        const { data } = await fetchAccountInfo()
        
        setUserinfo(data);
        
      } catch (error) {
        console.log(error);
        }
    }


    useEffect(() =>{
        getProduct();
        accountInfo();
  },[])

  return !loading ? (
    <Layout>
    <Container>
        <Card style={{maxWidth: '22rem'}}  >
          <Card.Img src={product.image_url} />
            <Card.Body>
              <Card.Title>{product.item_name}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
            </Card.Body>
              <Form onChange={sizeChange}>
                <Form.Label>Size's</Form.Label>
                <Form.Check inline label='S' name="size"  value="S" id='S' type='radio' />
                <Form.Check inline label='M' name="size"  value="M" id='M' type='radio' />
                <Form.Check inline label='L' name="size"  value="L" id='L' type='radio' />
              </Form>
            <Button variant='success' onClick={addProduct} >Add to Cart</Button>
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
