import React, { useState, useEffect }from 'react'
import { Link, useParams , useNavigate} from 'react-router-dom'
import { Row, Col, ListGroup, Button, Card, Image, ListGroupItem, Form } from 'react-bootstrap'


import axios from 'axios'

function ProductScreen( {match} ) {
    


    const [product, setProduct] = useState([])
    const [qty, setQty] = useState(1)
    const { id } = useParams()
    const history = useNavigate()
    useEffect( ()=>{

        async function fetchProduct(){
        const { data } = await axios.get(`/api/product/${encodeURIComponent(id)}`)
        setProduct(data)
        }
        
        fetchProduct()
        console.log(product)
    }, [])

    const addCartHandler =()=>{
        history(`/cart/${encodeURIComponent(id)}?qty = ${qty}`)
        console.log(qty, id)
    }
  return (
    <div>
        <Link to = '/' className='btn btn-light my-3'>Go Back</Link>
        <Row>            
            <Col md = {6}>
                <Image src = {product.image} fluid />
            </Col>

            <Col md = {3}>
                <ListGroup variant = 'flush'>
                    <ListGroupItem>
                        <h3>
                            {product.name}
                        </h3>
                    </ListGroupItem>
                    <ListGroupItem>
                        {product.rating} by {product.numReviews}
                    </ListGroupItem>
                    <ListGroupItem>
                        Price: {product.price}
                    </ListGroupItem>
                    <ListGroupItem>
                        Description: {product.description}
                    </ListGroupItem>
                </ListGroup>
            </Col>
            <Col md = {3}>
                <Card>
                    <ListGroup variant  = 'flush'>
                        <ListGroupItem>
                            <Row>
                                <Col> Price:</Col>
                                <Col>
                                    <strong> ${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Row>
                                
                                <Col>Status :</Col>
                                <Col>{product.countInStock>0 ? 'InStock' : 'Out of Stock'}</Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button onClick={addCartHandler} className='btn-block' type='button' disabled= {product.countInStock == 0} > Add to Cart</Button>
                        </ListGroupItem>


                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col> Qty</Col>
                                    <Col xs= 'auto' className = 'my-1'>
                                        <Form.Select  value ={qty} onChange ={ (e)=> setQty(e.target.value)}>
                                            {
                                                [...Array(product.countInStock).keys()].map((x) => (
                                                    <option key ={ x +1} value = {x +1}>
                                                        {x + 1}
                                                    </option>
                                                ))
                                            }
                                        </Form.Select>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}

                        
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default ProductScreen 