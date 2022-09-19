import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { productListReducers } from "./reducers/productListReducers";
import { cartReducer } from "./reducers/cartReducer";
import { userLoginReducers } from "./reducers/userReducer";

const reducer = combineReducers({
	productList: productListReducers,
	cart: cartReducer,
	userLogin: userLoginReducers,
});

const itemsFromLocal = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];

const userInfofromLocal = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null;

const initialState = {
	cart: { cartItems: itemsFromLocal },
	userLogin: { userInfo: userInfofromLocal },
};

const middleware = [thunk];

const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
