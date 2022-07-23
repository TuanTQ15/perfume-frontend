import * as Types from '../constants/ShipperTypes';
import callApi from '../utils/apiCaller';
import { getTokenEmployee } from './getNV';
// var employee = localStorage.getItem("employee")


export const actFetchshipperReq = () => {
    return async (dispatch) => {
        return await callApi('shipper', 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res != null) {
                dispatch(actFetchshipper(res.data));
            }
        });
    }
}

export const actFetchshipper = (shipper) => {
    return {
        type: Types.FETCH_SHIPPER,
        shipper
    }
}


export const actAddShipperRequest = (Shipper) => {
    return async () => {
        return await callApi('shipper', 'POST', Shipper, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res != null) {
                return res.data
            }

        });
    }
}

export const actUpdateShipperRequest = (Shipper, history) => {
    return async () => {
        return await callApi(`shipper`, 'PUT', Shipper, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res != null) {
                return res.data
            }
        });
    }
}

export const actDeleteShipperRequest = (shipperId) => {
    return async (dispatch) => {
        return await callApi(`shipper/${shipperId}`, 'DELETE', null, `Bearer ${getTokenEmployee()}`).then(res => {

            if (res != null) {
                if (res.data.result) {
                    dispatch(actDeleteShipper(shipperId));
                }
                return res.data
            }
        });
    }
}
export const actDeleteShipper = (shipperId) => {
    return {
        type: Types.DELETE_SHIPPER,
        shipperId
    }
}