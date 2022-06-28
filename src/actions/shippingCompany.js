import * as Types from '../constants/ShippingCompanyTypes';
import callApi from '../utils/apiCaller';
import { getTokenEmployee } from './getNV';

export const actFetchShippingCompanyReq = () => {
    return async (dispatch) => {
        return await callApi('sc', 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
            dispatch(actFetchShippingCompany(res.data));
        });
    }
}

export const actFetchShippingCompany = (ShippingCompany) => {
    return {
        type: Types.FETCH_SHIPPING_COMPANY,
        ShippingCompany
    }
}


export const actAddShippingCompanyRequest = (ShippingCompany) => {
    return async () => {
        return await callApi('sc', 'POST', ShippingCompany, `Bearer ${getTokenEmployee()}`).then(res => {
            return res.data
        });
    }
}

export const actUpdateShippingCompanyRequest = (ShippingCompany, history) => {
    return async () => {
        return await callApi(`sc`, 'PUT', ShippingCompany, `Bearer ${getTokenEmployee()}`).then(res => {
            return res.data
        });
    }
}

export const actDeleteShippingCompanyRequest = (MA_CTVC) => {
    return async (dispatch) => {
        return await callApi(`sc/${MA_CTVC}`, 'DELETE', null, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res.data.result) {
                dispatch(actDeleteShippingCompany(MA_CTVC));
            }
            return res.data
        });
    }
}
export const actDeleteShippingCompany = (MA_CTVC) => {
    return {
        type: Types.DELETE_SHIPPING_COMPANY,
        MA_CTVC
    }
}