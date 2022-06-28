import * as Types from './../constants/BrandTypes';
import callApi from './../utils/apiCaller';
import { getTokenEmployee } from './getNV';
// var employee = localStorage.getItem("employee")


export const actFetchBrandsRequest = () => {
    return async (dispatch) => {
        return await callApi('brand', 'GET', null, null).then(res => {
            dispatch(actFetchBrands(res.data));
        });
    }
}

export const actFetchBrands = (brand) => {
    return {
        type: Types.FETCH_BRAND,
        brand
    }
}



export const actAddBrandRequest = (Brand) => {
    return async (dispatch) => {
        return await callApi('brand', 'POST', Brand, `Bearer ${getTokenEmployee()}`).then(res => {
            return res.data
        });
    }
}

export const actUpdateBrandRequest = (Brand) => {
    return async (dispatch) => {
        return await callApi(`brand`, 'PUT', Brand, `Bearer ${getTokenEmployee()}`).then(res => {
            return res.data
        });
    }
}

export const actDeleteBrandRequest = (brandId) => {
    return async (dispatch) => {
        return await callApi(`brand/${brandId}`, 'DELETE', null, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res.data.result === 1) {
                dispatch(actDeleteBrand(brandId));
            }
            return res.data
        });
    }
}
export const actDeleteBrand = (brandId) => {
    return {
        type: Types.DELETE_BRAND,
        brandId
    }
}