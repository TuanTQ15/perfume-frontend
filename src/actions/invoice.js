import * as Types from '../constants/InvoiceTypes';
import callApi from './../utils/apiCaller';
import { actUpdateStatusReq } from './order';
import { getTokenEmployee } from './getNV';


export const actFetchInvoiceReq = () => {
    return async (dispatch) => {
        return await callApi('invoice', 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
            console.log(res.data)
            dispatch(actFetchInvoice(res.data));
        });
    }
}

export const actFetchInvoice = (invoice) => {
    return {
        type: Types.FETCH_INVOICE,
        invoice
    }
}

export const actAddInvoiceRequest = (invoice, history) => {
    return async (dispatch) => {
        return await callApi('invoice', 'POST', invoice, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res.data.result) {
                var orderUpdateStatus = {
                    orderId: invoice.orderId,
                    status: 1,//1 hard code vì act req này chỉ dùng cho add hóa đơn từ lúc nó status = 0 => 1
                }
                dispatch(actUpdateStatusReq(orderUpdateStatus, 1, history))
                history.push("/order")
            }
            return res.data
        });
    }
}
