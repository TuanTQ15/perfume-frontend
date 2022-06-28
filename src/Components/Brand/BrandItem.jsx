import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actDeleteBrandRequest } from '../../actions/brand'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const BrandItem = ({ item,onDeleteBrandReq }) => {

    async function deleteBrand(brandId) {
        var res = await onDeleteBrandReq(brandId)
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
            <td>{item.brandId}</td>
            <td>{item.brandName}</td>
            <td>{item.address}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.email}</td>
            <td>
                <button type="button" className="btn btn-danger" onClick={() => deleteBrand(item.brandId)}>Xóa</button>
                <Link to={`/editBrand/${item.brandId}`}>
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
        onDeleteBrandReq: (brandId) => {
            return dispatch(actDeleteBrandRequest(brandId))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandItem)
