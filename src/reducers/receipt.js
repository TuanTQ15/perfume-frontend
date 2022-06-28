import * as Types from './../constants/ReceiptType';

var initialState = []

const receipt = (state = initialState, action) => {
    if (action.type === Types.FETCH_RECEIPT) {
        return [...action.receipt];
    }
    // else if (action.type === Types.ADD_SHIPPER) {
    //     state.push(shipper);
    //     return [...state];
    // }
    // else if (action.type === Types.UPDATE_SHIPPER) {
    //     let index = findIndex(state, shipper.MA_HANG);
    //     state[index] = shipper;
    //     return [...state];
    // }
    // else if (action.type === Types.d) {
    //     let index = state.findIndex(nvgh => nvgh.MA_NVGH === action.MA_NVGH);
    //     state.splice(index, 1);
    //     return [...state];
    // }
    return [...state];
}



export default receipt;