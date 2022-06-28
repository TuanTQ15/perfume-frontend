import { actDeleteShippingCompanyRequest } from './../../actions/shippingCompany'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const ShippingCompanyItem = ({ item,onDeleteShippingCompanyReq }) => {

    async function deleteShippingCompany(shippingCompanyId) {
        var res = await onDeleteShippingCompanyReq(shippingCompanyId)
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
            <td>{item.shippingCompanyId}</td>
            <td>{item.name}</td>
            <td>{item.address}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.email}</td>
            <td>
                <button type="button" className="btn btn-danger" onClick={() => deleteShippingCompany(item.shippingCompanyId)}>Xóa</button>
                <Link to={`/editShippingCompany/${item.shippingCompanyId}`}>
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
        onDeleteShippingCompanyReq: (shippingCompanyId) => {
            return dispatch(actDeleteShippingCompanyRequest(shippingCompanyId))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ShippingCompanyItem)
