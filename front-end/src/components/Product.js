import React from 'react'
import { Link } from 'react-router-dom'

import { Card } from 'react-bootstrap'


function Product({product}) {
  return (
    <Card className='my-3 py-3 rounded'>
        <Link to= {`/product/${product._id}`}>
            <Card.Img src= {product.image}/>
        </Link>
        <Card.Body>
            <Link to= {`/product/${product._id}`}>
                <Card.Title as ='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>
            <Card.Text as = 'div'>
            {product.rating} from {product.numReviews}
            </Card.Text>
            <Card.Text> ${product.price}</Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product