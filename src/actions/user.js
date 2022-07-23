import * as Types from '../constants/UserTypes';
import callApi from './../utils/apiCaller';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getTokenEmployee } from './getNV';

const MySwal = withReactContent(Swal)



export const actFetchUsersRequest = () => {
    return async (dispatch) => {
        return await callApi('customer', 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
            if(res!=null){
                dispatch(actFetchUser(res.data));
            }
        });
    }
}

export const actFetchUser = (User) => {
    return {
        type: Types.FETCH_USER,
        User
    }
}

export const actAddUserRequest = (customer, history) => {
    return async () => {
        return await callApi('customer', 'POST', customer, `Bearer ${getTokenEmployee()}`).then(res => {
            if(res!=null){
                if (res.data.result === 1) {
                    MySwal.fire({
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    // dispatch(actAddLineUser(res.data));
                    history.goBack()
                }
                else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message
                    })
                }
            }
        });
    }
}

export const actUpdateUserRequest = (customer, history) => {
    return async (dispatch) => {
        return await callApi(`customer`, 'PUT', customer, `Bearer ${getTokenEmployee()}`).then(res => {
            if(res!=null){
                if (res.data.result === 1) {
                    MySwal.fire({
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    history.goBack()
                    // dispatch(actUpdateLineUser(lineUser));
                } else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message
                    })
                }
            }
        });
    }
}

export const actDeleteUserRequest = (customerId) => {
    return async (dispatch) => {
        return await callApi(`customer/${customerId}`, 'DELETE', null, `Bearer ${getTokenEmployee()}`).then(res => {
            if(res!=null){
                if (res.data.result === 1) {
                    MySwal.fire({
                        icon: 'success',
                        title: res.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    dispatch(actDeleteUser(customerId));
                } else {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: res.data.message
                    })
                }
            }
        });
    }
}
export const actDeleteUser = (id) => {
    return {
        type: Types.DELETE_USER,
        id
    }
}

