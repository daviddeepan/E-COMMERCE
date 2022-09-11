import React , {useEffect}from 'react'
import { Link, useParams , useNavigate, useLocation, useSearchParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {addCartItem, removeFromCart} from '../action/cartAction'
import { ListGroup, Row, Col, Form, Button , Card} from 'react-bootstrap';

const CartScreen = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const [searchParms] = useSearchParams();

  const history = useNavigate()


  const productID = id;
  const qty = search ? Number(decodeURI(search.split("=")[1])) : 1;

  const cart = useSelector( state => state.cart)
  const {cartItems} = cart
  console.log ('cartItems :', cartItems)



  const dispatch = useDispatch()
  useEffect(
    () =>{
      if( productID){
        dispatch(addCartItem( productID, qty))
      }
    
    }, [ dispatch, productID, qty]
  )


    const removeCartItem =(id) =>{
      dispatch(removeFromCart(id))
    }

    const checkOutHandler = () => {
      history(`/login?redirect=shipping`)
    }

  return (
   <Row>
      <Col md ={8}>
        <h1> Shopping Cart</h1>
        { cartItems.length ===0 ? (<h2> Shopping Cart empty <Link to ='/'>Go Back</Link></h2>) :
        
        (
          <ListGroup variant ='flush'>
            { cartItems.map( item =>(
              <ListGroup.Item key = {item.product}>
                <Row>
                  <Col md = {2}><h4> img </h4></Col>
                  <Col md = {3}> 
                    <Link to ={`/product/${item.product}`}>{item.name}</Link>
                  </Col>  
                  <Col md ={2}>{ item.price}</Col>


                <Col  md= {2}>

                  <Form.Select value ={item.qty} onChange ={ (e)=> dispatch(addCartItem(item.product, Number(e.target.value)))}>
                      {

  
                        [...Array(item.countInStock).keys()].map((x) => (
                            <option key ={ x +1} value = {x +1}>
                                {x + 1}
                            </option>
                        ))
                      }
                  </Form.Select>

                </Col>
                <Col md ={2}>
                  <Button type='button' variant ='light' onClick={ () => removeCartItem(item.product)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </Col>



                </Row> 
              </ListGroup.Item>
            ))}
          </ListGroup>
        )
        
        
        }
      </Col>

      <Col md  = {4}>
        <Card>
          <ListGroup variant ='flush'>
            <ListGroup.Item>
              <h3> Subtotal ({ cartItems.reduce( (acc, item) => acc+ item.qty, 0 )}) item</h3>
              ${ cartItems.reduce( (acc, item) => acc+ item.qty * item.price, 0 )}
            </ListGroup.Item>
          </ListGroup>

          <ListGroup.Item>
            <Button type ='button' className='btn-black' disabled = {cartItems.length ===0} onClick={ () => checkOutHandler()}>
              Proceed To Checkout
            </Button>
          </ListGroup.Item>

        </Card>
      </Col>
   </Row>
  );
};
export default CartScreen