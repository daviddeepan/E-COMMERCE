import {React, useState, useEffect} from 'react'
import { Link, useParams , useNavigate, useLocation, useSearchParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {addCartItem, removeFromCart} from '../action/cartAction'
import { ListGroup, Row, Col, Form, Button , Card} from 'react-bootstrap';
import { login} from '../action/userAction'

function LoginScreen() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')






  return (
    <div>LoginScreen</div>
  )
}

export default LoginScreen