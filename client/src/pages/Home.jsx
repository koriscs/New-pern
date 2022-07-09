import React , {useState, useEffect }from 'react'
import Layout from '../components/Layout'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Card, Row, Container, Button} from 'react-bootstrap';
import { getAllProducts } from '../api/products';
import { useNavigate } from 'react-router-dom';



export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState();

  const navigate = useNavigate();

  const fetchProducts = async () =>{
  
    try{
      const response = await getAllProducts();
      setProducts(response.data)
    } catch (error) {
      console.log(error.response);
      setError(error.response);
    }
  }

  useEffect( () =>{
      fetchProducts();
  });
  
  return (
    <Layout>

<div style={{ color: 'red', margin: '10px 0' }}>{error}</div>

       <Container>
      <Row>
      {products.map((items, index)=>{
      return (
          <Card style={{maxWidth: '22rem'}} key={index} >
          <Card.Img src={items.image_url} />
            <Card.Body>
              <Card.Title>{items.item_name}</Card.Title>
              <Card.Text>{items.description}</Card.Text>
            </Card.Body>
            <Button onClick={() =>{
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
