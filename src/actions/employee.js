import * as Types from '../constants/EmployeeTypes';
import callApi from './../utils/apiCaller';
import { getTokenEmployee } from './getNV';




export const actFetchEmployeesRequest = () => {
    return async (dispatch) => {
        return await callApi('employee', 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
            dispatch(actFetchEmployee(res.data));
        });
    }
}

export const actFetchEmployee = (employee) => {
    return {
        type: Types.FETCH_EMPLOYEE,
        employee
    }
}

export const actAddemployeeRequest = (employee) => {
    return async () => {
        return await callApi('employee', 'POST', employee, `Bearer ${getTokenEmployee()}`).then(res => {
            return res.data
        });
    }
}

export const actUpdateemployeeRequest = (employee, history) => {
    return async (dispatch) => {
        return await callApi(`employee`, 'PUT', employee, `Bearer ${getTokenEmployee()}`).then(res => {
            return res.data
        });
    }
}

export const actDeleteemployeeRequest = (id) => {
    return async (dispatch) => {
        return await callApi(`employee/${id}`, 'DELETE', null, `Bearer ${getTokenEmployee()}`).then(res => {
            if(res.data.result) dispatch(actDeleteEmployee(id))
            return res.data
        });
    }
}
export const actDeleteEmployee = (id) => {
    return {
        type: Types.DELETE_EMPLOYEE,
        id
    }
}

