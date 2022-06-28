import * as Types from './../constants/LineProductTypes';

var initialState = []

const lineProducts = (state = initialState, action) => {
    // var { lineProduct, MA_DSP } = action;
    
    if (action.type === Types.FETCH_LINE_PRODUCTS) {
        return [...action.lineProduct];
    }
    else if (action.type === Types.DELETE_LINE_PRODUCT) {
        let index = state.findIndex(product => product.productId === action.MA_DSP);
        state.splice(index, 1);
        return [...state];
    }
    return [...state];
}



export default lineProducts;