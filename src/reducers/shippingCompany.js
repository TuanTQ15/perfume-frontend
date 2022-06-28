import * as Types from './../constants/ShippingCompanyTypes';

var initialState = []

const shippingCompany = (state = initialState, action) => {
    if (action.type === Types.FETCH_SHIPPING_COMPANY) {
        return [...action.ShippingCompany];
    }
    else if (action.type === Types.DELETE_SHIPPING_COMPANY) {
        let index = state.findIndex(nvgh => nvgh.shippingCompanyId === action.shippingCompanyId);
        state.splice(index, 1);
        return [...state];
    }
    return [...state];
}



export default shippingCompany;