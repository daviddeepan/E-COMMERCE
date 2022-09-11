export const productListReducers = (state = { product: []}, action) => {
    switch(action.type){

         case 'PRODUCT_LIST_REQUEST':
            return  { loading: true, products: []}

        case 'PRODUCT_LIST_SUCCESS':
            return { loading: true, products: action.payload}

        case 'PRODUCT_LIST_FAIL':
            return { loading: true, error: action.payload}
        
        default:
            return state
    }
} 