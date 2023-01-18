import * as actionTypes from '../actions';

const initialState = {
    orders: null,
};

export const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORDERS:
            return action.orders;
        default: {
            return state;
        }
    }
};
