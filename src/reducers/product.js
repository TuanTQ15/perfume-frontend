import * as Types from './../constants/ProductTypes';

var initialState = []

const products = (state = initialState, action) => {
    // var { lineProduct, MA_DSP } = action;

    if (action.type === Types.FETCH_PRODUCTS) {
        return [...action.product];
    }
    else if (action.type === Types.DELETE_PRODUCT) {
        let index = state.findIndex(x=> x.MA_SP === action.MA_SP);
        state.splice(index, 1);
        return [...state];
    }
    return [...state];
}



export default products;