import * as Types from './../constants/ShipperTypes';

var initialState = []

const shipper = (state = initialState, action) => {
    if (action.type === Types.FETCH_SHIPPER) {
        return [...action.shipper];
    }
    else if (action.type === Types.DELETE_SHIPPER) {
        let index = state.findIndex(nvgh => nvgh.shipperId === action.shipperId);
        state.splice(index, 1);
        return [...state];
    }
    return [...state];
}



export default shipper;