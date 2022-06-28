import * as Types from '../constants/OrderTypes';
import callApi from "../utils/apiCaller";
import { getTokenEmployee } from './getNV';
import callApiForPaypal from '../utils/apiCallerPaypal';
import callApiForPaypalGetToken from '../utils/apiCallerGettoken';

export const actFetchOrderReq = (status) => {
    return async (dispatch) => {
        return await callApi(`order?status=${status}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
            dispatch(actFetchOrder(res.data, status));
        });
    }
}

export const actFetchOrder = (orders, status) => {
    if (status === 0) {
        return {
            type: Types.FETCH_ORDER_PENDING,
            orders
        }
    } else if (status === 1) {
        return {
            type: Types.FETCH_ORDER_SHIPPING,
            orders
        }
    }
    else if (status === 2) {
        return {
            type: Types.FETCH_ORDER_SUCCESS,
            orders
        }
    }
    else {
        return {
            type: Types.FETCH_ORDER_CANCEL,
            orders
        }
    }
}

export const actUpdateStatusReq = (itemUpdate, status, transactionID) => {
    console.log(itemUpdate)

    // itemUpdate.MA_NV = getNV(history).actort
    return async (dispatch) => {
        if (itemUpdate.status === 3) {
            const res = await callApiForPaypalGetToken("/v1/oauth2/token", "POST")
            console.log(res)
            if (res !== undefined) {
                dispatch(actRefundPaypal(transactionID, res.data.access_token))
            }
        }
        return await callApi(`order?isUpdateStatus=${true}`, 'PUT', itemUpdate, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res.data.result)
                dispatch(actUpdateStatus(itemUpdate, status))
            return res.data
        });
    }
}

export const actUpdateStatus = (order, status) => {
    return {
        type: Types.UPDATE_STATUS,
        order,
        status
    }
}

export const actRefundPaypal = (transactionID, access_token) => {
    return async () => {
        return await callApiForPaypal(`v1/payments/sale/${transactionID}/refund`, "POST", {}, `Bearer ${access_token}`)
    }
}

export const actUpdateNgayGiaoReq = (order) => {
    return async () => {// chỉ cập nhật ngày giao nên truyền update status false
        return await callApi(`order?isUpdateStatus=${false}`, 'PUT', order, `Bearer ${getTokenEmployee()}`).then(res => {
            return res.data
        });
    }
}
