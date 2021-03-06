import * as actionTypes from 'src/store/actions/actionTypes';
import { updateObject } from 'src/shared/utility';

const initialState = {
	orders: [],
	loading: false,
	purchased: false
};

/**
 * extract function from each case handler in reducers
 */
const purchaseInit = (state, action) => {
	return updateObject(state, { loading: false });
};

const purchaseBurgerStart = (state, action) => {
	return updateObject(state, { loading: true });
};
const purchaseBurgerSuccess = (state, action) => {
	const newOrder = updateObject(action.orderData, { id: action.orderId });
	return updateObject(state, {
		loading: false,
		purchased: true,
		orders: state.orders.concat(newOrder)
	});
};
const purchaseBurgerFail = (state, action) => {
	return {
		...state,
		loading: false
	};
};
const fetchOrderStart = (state, action) => {
	return {
		...state,
		loading: true
	};
};
const fetchOrderSuccess = (state, action) => {
	return {
		...state,
		orders: action.orders,
		loading: false
	};
};

const fetchOrderFail = (state, action) => {
	return {
		...state,
		loading: false
	};
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.PURCHASE_INIT:
			return purchaseInit(state, action);
		case actionTypes.PURCHASE_BURGER_START:
			return purchaseBurgerStart(state, action);
		case actionTypes.PURCHASE_BURGER_SUCCESS:
			return purchaseBurgerSuccess(state, action);
		case actionTypes.PURCHASE_BURGER_FAILED:
			return purchaseBurgerFail(state, action);
		case actionTypes.FETCH_ORDERS_START:
			return fetchOrderStart(state, action);
		case actionTypes.FETCH_ORDERS_SUCCESS:
			return fetchOrderSuccess(state, action);
		case actionTypes.FETCH_ORDERS_FAIL:
			return fetchOrderFail(state, action);
		default:
			return state;
	}
};
export default orderReducer;
