import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actDeleteShipperRequest } from '../../actions/shipper';
import { formatDate } from '../../utils/formatDate';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)


export const ShipperItem = ({ item, onDeleteShipper }) => {

    async function deleteShipper(shipperId) {
        let res = await onDeleteShipper(shipperId)
        if (res.result) {
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
        <tr>
            <td>{item.shipperId}</td>
            <td>{item.fullName}</td>
            <td>{formatDate(new Date(item.dateOfBirth))}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.email}</td>
            <td>{item.shippingCompanyId}</td>
            <td>
                <button type="button" className="btn btn-danger" onClick={() => deleteShipper(item.shipperId)}>Xóa</button>
                <Link to={`/editShipper/${item.shipperId}`}>
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
        onDeleteShipper: (shipperId) => {
            return dispatch(actDeleteShipperRequest(shipperId))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ShipperItem)
