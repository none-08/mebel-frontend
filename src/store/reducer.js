import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { invoicesReducer } from './invoices';
import { ordersReducer } from './orders';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    invoices: invoicesReducer,
    orders: ordersReducer,
});

export default reducer;
