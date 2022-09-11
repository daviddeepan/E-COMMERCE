import axios from 'axios'

export const addCartItem = ( id, qty) => async ( dispatch, getState) => {
    const {data} = await axios.get(`/api/product/${id}`)

    dispatch ({
        type : 'CART_ADD_ITEM',
        payload : {
            product : data._id,
            name : data.name,
            price : data.price,
            countInStock : data.countInStock,
            qty
        }
    })

    localStorage.setItem( 'cartItems' , JSON.stringify(getState().cart.cartItems))

    
}

export const removeFromCart = (id) => ( dispatch, getState) => {
    dispatch( {
        type: 'CART_REMOVE_ITEM',
        payload : id,
    })

    localStorage.setItem( 'cartItems' , JSON.stringify(getState().cart.cartItems))

}