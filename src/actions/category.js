import * as Types from './../constants/CategoryTypes';
import callApi from './../utils/apiCaller';
import { getTokenEmployee } from './getNV';
// var employee = localStorage.getItem("employee")


export const actFetchCategorysRequest = () => {
    return async (dispatch) => {
        return await callApi('category', 'GET', null, null).then(res => {
            dispatch(actFetchCategorys(res.data));
        });
    }
}

export const actFetchCategorys = (category) => {
    return {
        type: Types.FETCH_CATEGORY,
        category
    }
}



export const actAddCategoryRequest = (Category) => {
    return async (dispatch) => {
        return await callApi('category', 'POST', Category, `Bearer ${getTokenEmployee()}`).then(res => {
            return res.data
        });
    }
}

export const actUpdateCategoryRequest = (Category) => {
    return async (dispatch) => {
        return await callApi(`category`, 'PUT', Category, `Bearer ${getTokenEmployee()}`).then(res => {
            return res.data
        });
    }
}

export const actDeleteCategoryRequest = (categoryId) => {
    return async (dispatch) => {
        return await callApi(`Category/${categoryId}`, 'DELETE', null, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res.data.result === 1) {
                dispatch(actDeleteCategory(categoryId));
            }
            return res.data
        });
    }
}
export const actDeleteCategory = (categoryId) => {
    return {
        type: Types.DELETE_CATEGORY,
        categoryId
    }
}