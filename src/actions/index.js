import * as Types from './../constants/LineProductTypes';
import callApi from './../utils/apiCaller';
import { getTokenEmployee } from './getNV';


export const actFetchLineProductsRequest = () => {
    return async (dispatch) => {
        return await callApi('product', 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
            if(res!=null){
                dispatch(actFetchLineProducts(res.data));
            }
        });
    }
}

export const actFetchLineProducts = (lineProduct) => {
    return {
        type: Types.FETCH_LINE_PRODUCTS,
        lineProduct
    }
}

export const actAddLineProductRequest = (lineProduct) => {
    lineProduct = {
        ...lineProduct,
        price: parseInt(lineProduct.price.replace(/,/g, ""))
    }
    return async () => {
        return await callApi('product', 'POST', lineProduct, `Bearer ${getTokenEmployee()}`).then(res => {
            if(res!=null){
                return res.data
            }
        });
    }
}

export const actUpdateLineProductRequest = (lineProduct) => {
    //sửa lại giá vì đang ở dạng chuỗi và có chứa dấu phẩy ngăn cách
    if (typeof (lineProduct.price) == 'string') {
        //có thể sửa sản phẩm k sửa lại giá vì ban đầu nó là number 
        //nếu có sửa lại price thì chuyển thành chuỗi mới parseInt về number
        lineProduct = {
            ...lineProduct,
            price: parseInt(lineProduct.price.replace(/,/g, ""))
        }
    }
    return async () => {
        return await callApi(`product`, 'PUT', lineProduct, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res != null) {
                return res.data
            }

        });
    }
}

export const actDeleteLineProductRequest = (MA_DSP) => {
    return async (dispatch) => {
        return callApi(`product/${MA_DSP}`, 'DELETE', null, `Bearer ${getTokenEmployee()}`).then(res => {

            if (res != null) {
                if (res.data.result === true) dispatch(actDeleteLineProduct(MA_DSP));
                return res.data
            }
        });
    }
}
export const actDeleteLineProduct = (MA_DSP) => {
    return {
        type: Types.DELETE_LINE_PRODUCT,
        MA_DSP
    }
}

export const actDeleteProductRequest = (MA_SP) => {
    return async () => {
        return await callApi(`product/${MA_SP}`, 'DELETE', MA_SP, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res != null) {
                return res.data
            }
        });
    }
}


export const actAddLineProduct = (lineProduct) => {
    return {
        type: Types.ADD_LINE_PRODUCT,
        lineProduct
    }
}

export const actUpdateLineProduct = (lineProduct) => {
    console.log(lineProduct)
    return {
        type: Types.UPDATE_LINE_PRODUCT,
        lineProduct
    }
}

