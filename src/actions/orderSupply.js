import * as Types from '../constants/OrderSupplyTypes';
import callApi from './../utils/apiCaller';
import { getTokenEmployee } from './getNV';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export const actFetchOrderSupplysRequest = () => {
    return async (dispatch) => {
        return await callApi('os', 'GET', null, `Bearer ${getTokenEmployee()}`)
            .then(res => {
                dispatch(actFetchOrderSupplys(res.data));
            });
    }
}

export const actFetchOrderSupplys = (orderSupply) => {
    return {
        type: Types.FETCH_ORDER_SUPPLY,
        orderSupply
    }
}

export const actAddOrderSupplyRequest = (orderSupply, history) => {
    return async (dispatch) => {
        return await callApi('os', 'POST', orderSupply, `Bearer ${getTokenEmployee()}`)
            .then(res => {
                return res.data
            });
    }
}

export const actUpdateOrderSupplyRequest = (orderSupply, history, updateStatus) => {
    return async (dispatch) => {
        return await callApi(`os?updateStatus=${updateStatus}`, 'PUT', orderSupply, `Bearer ${getTokenEmployee()}`)
            .then(res => {
                if (updateStatus) {
                    dispatch(actUpdatOrderSupply(orderSupply))
                }
                return res.data
            });
    }
}

export const actUpdatOrderSupply = (orderSupply) => {
    return {
        type: Types.UPDATE_ORDER_SUPPLY,
        orderSupply
    }
}

export const actDeleteOrderSupplyRequest = (orderSupplyId) => {
    return async (dispatch) => {
        return await callApi(`os/${orderSupplyId}`, 'DELETE', null, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res.data.result === 1) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Xóa sản phẩm thành công',
                    showConfirmButton: false,
                    timer: 1500
                })
                dispatch(actDeleteOrderSupply(orderSupplyId));
            } else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message
                })
            }
        });
    }
}
export const actDeleteOrderSupply = (orderSupplyId) => {
    return {
        type: Types.DELETE_ORDER_SUPPLY,
        orderSupplyId
    }
}

export const actDeleteDetailOrderSupplyRequest = (orderSupplyId, MA_SP) => {
    var detailOS = {
        productId : MA_SP,
        orderSupplyId: orderSupplyId
    }
    return async () => {
        return await callApi(`detailOS`, 'DELETE', detailOS, `Bearer ${getTokenEmployee()}`)
            .then(res => {
                return res.data
            });
    }
}



export const actAddOrderSupply = (orderSupply) => {
    return {
        type: Types.ADD_ORDER_SUPPLY,
        orderSupply
    }
}