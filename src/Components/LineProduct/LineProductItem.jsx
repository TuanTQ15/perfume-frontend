import React from 'react'
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { actDeleteLineProductRequest } from "./../../actions/index";
// import useModal from './../ToggleModal/useModal';
// import ModalDetailLP from './ModalDetailLP'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const LineProductItem = ({ item, onDeleteLineProduct }) => {
    // const { isShowing, toggle } = useModal();

    async function deleteLineProduct(productId) {
        let res = await onDeleteLineProduct(productId)
        if (res.result === true) {
            MySwal.fire({
                icon: 'success',
                title: res.message,
                showConfirmButton: false,
                timer: 1500
            })
            
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: res.message
            })
        }
    }

    return (
        <tr >
            <td>{item.productId}</td>
            <td>{item.productName}</td>
            {/* <td>{item.sex === 1 ? "Nam" : item.sex === 2 ? "Nữ" : "Unisex"}</td> */}
            <td>{item.quantityInStock}</td>
            <td><NumberFormat value={item.price} suffix={'đ'} thousandSeparator={true} displayType={'text'}/></td>
            <td>{item.capacity}</td>
            <td>{item.brand.brandName}</td>
            <td>
                <Link to={`/editlineproduct/${item.productId}`}>
                    <button type="button" className="btn btn-info">
                        <i className="fas fa-edit"></i>&nbsp;Sửa
                    </button>
                </Link>
                <button type="button" className="btn btn-danger" onClick={() => deleteLineProduct(item.productId)}>
                    <i className="fas fa-trash-alt"></i>&nbsp;Xóa
                </button>
                {/* <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={toggle}>
                    <i className="fas fa-info-circle"></i>&nbsp;Info
                </button> */}
            </td>
            {/* <ModalDetailLP item={item} isShowing={isShowing} hide={toggle} /> */}
        </tr>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteLineProduct: (productId) => {
            return dispatch(actDeleteLineProductRequest(productId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LineProductItem)
