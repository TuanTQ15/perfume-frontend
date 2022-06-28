import * as Types from './../constants/OrderTypes';

var initialState = {
    pending : [],
    shipping: [],
    success : [],
    cancel: []
}

const order = (state = initialState, action) => {
    if (action.type === Types.FETCH_ORDER_PENDING) {
        state.pending = action.orders
        return {...state};
    }
    if (action.type === Types.FETCH_ORDER_SHIPPING) {
        state.shipping = action.orders
        return {...state};
    }
    if (action.type === Types.FETCH_ORDER_SUCCESS) {
        state.success = action.orders
        return {...state};
    }
    if (action.type === Types.FETCH_ORDER_CANCEL) {
        state.cancel = action.orders
        return {...state};
    }
    if(action.type === Types.UPDATE_STATUS){
        if(action.status === 3 || action.status === 1){
            let index = state.pending.findIndex(order => order.orderId === action.order.orderId)
            state.pending.splice(index,1)
        }//chỉ cần xóa để nó mất trong state  để nó tự re-render lại 
        //k cần thêm mới vì khi click qua cái mới thì nó fetch lại nên có dữ liệu
        if(action.status === 2){
            let index = state.shipping.findIndex(order => order.orderId === action.order.orderId)
            state.shipping.splice(index,1)
        }
        return {...state}
    }
    return state;
}

export default order