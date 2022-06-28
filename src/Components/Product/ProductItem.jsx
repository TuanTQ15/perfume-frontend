import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actDeleteProductRequest } from "./../../actions/product";
import NumberFormat from "react-number-format";

export const ProductItem = ({item,onDeleteProduct}) => {

    function deleteProduct(MA_SP) {
        onDeleteProduct(MA_SP)
    }

    return (
        <tr>
            <td>{item.MA_SP}</td>
            <td>{item.DUNGTICH}</td>
            <td><NumberFormat value={item.GIA} displayType={'text'} thousandSeparator={true} />đ</td>
            <td>{item.SOLUONGTON}</td>
            <td>{item.MA_DSP}</td>
            <td>{item.TEN}</td>
            <td>
                <button type="button" className="btn btn-danger" onClick={() => deleteProduct(item.MA_SP)}>Xóa</button>
                <Link to={`/editproduct/${item.MA_SP}`}>
                    <button type="button" className="btn btn-info" >Sửa</button>
                </Link>
            </td>
        </tr>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
    return ({
        onDeleteProduct: (MA_SP) => {
            dispatch(actDeleteProductRequest(MA_SP))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)
