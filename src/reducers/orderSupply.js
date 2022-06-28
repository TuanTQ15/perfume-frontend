import * as Types from './../constants/OrderSupplyTypes';

var initialState = []

const orderSupply = (state = initialState, action) => {
    // var { lineProduct, MA_DSP } = action;
    
    if (action.type === Types.FETCH_ORDER_SUPPLY) {
        return [...action.orderSupply];
    }
    else if(action.type === Types.UPDATE_ORDER_SUPPLY){
        let index = state.findIndex(x=> x.orderSupplyId === action.orderSupply.orderSupplyId)
        state[index] = {
            ...state[index],
            TRANGTHAI: action.orderSupply.TRANGTHAI
        }
        return [...state]
    }
    else if (action.type === Types.DELETE_ORDER_SUPPLY) {
        let index = state.findIndex(os => os.orderSupplyId === action.orderSupplyId);
        state.splice(index, 1);
        return [...state];
    }
    return [...state];
}


export default orderSupply;