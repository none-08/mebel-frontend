import * as actionTypes from '../actions';

const initialState = {
    isLoading: false,
};

export const isLoadingReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.INVOICES_LOADING:
            return {
                isLoading: action.isLoading,
            };
        default:
            return state;
    }
};
