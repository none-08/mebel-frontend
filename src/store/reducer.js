import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { invoicesReducer } from './invoices';
import { isLoadingReducer } from './invoices';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    customization: customizationReducer,
    invoices: invoicesReducer,
    isLoading: isLoadingReducer,
});

export default reducer;
