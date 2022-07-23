import * as Types from '../constants/ProductTypes';
import callApi from './../utils/apiCaller';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { getTokenEmployee } from './getNV';

const MySwal = withReactContent(Swal)


export const actFetchProductsRequest = () => {
    return async (dispatch) => {
        return await callApi('product', 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
            dispatch(actFetchProducts(res.data));
        });
    }
}


export const actFetchProductsSearchReq = () => {
    return async (dispatch) => {
        return await callApi('product/search', 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
            if(res!=null){
                dispatch(actFetchProductsSearch(res.data));
            }
        });
    }
}

export const actFetchProductsSearch = (product) => {
    return {
        type: Types.FETCH_PRODUCTS_SEARCH,
        product
    }
}




export const actFetchProducts = (product) => {
    return {
        type: Types.FETCH_PRODUCTS,
        product
    }
}



export const actAddProductRequest = (product, history) => {
    return async (dispatch) => {
        return await callApi('product', 'POST', product, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res.data.result === 1) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Thêm sản phẩm thành công',
                    showConfirmButton: false,
                    timer: 1500
                })
                // dispatch(actAddLineProduct(res.data));
                history.goBack()
            }
            else {
                MySwal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: res.data.message
                })
            }
        });
    }
}

export const actUpdateProductRequest = (product, history) => {
    return async (dispatch) => {
        return await callApi(`product`, 'PUT', product, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res.data.result === 1) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Sửa sản phẩm thành công',
                    showConfirmButton: false,
                    timer: 1500
                })
                history.goBack()
                // dispatch(actUpdateLineProduct(lineProduct));
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

export const actDeleteProductRequest = (MA_SP) => {
    return async (dispatch) => {
        return await callApi(`/product/${MA_SP}`, 'DELETE', null, `Bearer ${getTokenEmployee()}`).then(res => {
            if (res.data.result === 1) {
                MySwal.fire({
                    icon: 'success',
                    title: 'Xóa sản phẩm thành công',
                    showConfirmButton: false,
                    timer: 1500
                })
                dispatch(actDeleteProduct(MA_SP));
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
export const actDeleteProduct = (MA_SP) => {
    return {
        type: Types.DELETE_PRODUCT,
        MA_SP
    }
}


export const actAddProduct = (product) => {
    return {
        type: Types.ADD_PRODUCT,
        product
    }
}

export const actUpdateProduct = (product) => {
    return {
        type: Types.UPDATE_PRODUCT,
        product
    }
}

