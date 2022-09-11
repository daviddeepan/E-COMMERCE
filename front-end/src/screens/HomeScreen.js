import React, { useEffect,useState} from 'react'
import { Row,Col } from 'react-bootstrap'
import axios from 'axios'

import Product from '../components/Product'


function HomeScreen() {
  const [loading,setLoading] = useState(false);
  const [products,setProducts]= useState([]);
  const [error,setError]= useState("");
   useEffect(  ()=>{
    setLoading(true);
    axios.get('/api/products/').then((res)=>{
        setProducts(res.data);
        setLoading(false);
    }).catch((res)=>{
      setError(res);
    })
    
  }, [])

  return (
    <div>
      <h1>Latest Products</h1>
      { loading ? <h2> loading ....</h2>
          : error ? <h3>{error}</h3>
            :
            <Row>
              {products && products.map(product =>(
                <Col key ={product._id} sm={12} lg={4} md={6} xl={3}>
                   <Product product={product}/>
                </Col>
              ))}
            </Row>
      }
    </div>
  )
}

export default HomeScreen