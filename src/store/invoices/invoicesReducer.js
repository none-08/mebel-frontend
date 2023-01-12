import * as actionTypes from '../actions';

const initialState = {
    invoices: null,
};

export const invoicesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_INVOICES:
            return action.invoices;
        default: {
            return state;
        }
    }
};
