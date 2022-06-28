import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import { actDeleteemployeeRequest } from '../../actions/employee';
import { formatDate } from '../../utils/formatDate';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export const EmployeeItem = ({ onDeleteEmployee, item }) => {

    // console.log();
    async function deleteProduct(id) {
        let res = await onDeleteEmployee(id)

        if (res.result) {
            MySwal.fire({
                icon: 'success',
                title: res.message,
                showConfirmButton: false,
                timer: 1500
            })
            // dispatch(actUpdateLineemployee(lineemployee));
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
            <td>{item.id}</td>
            <td>{item.fullName}</td>
            <td>{formatDate(new Date(item.dateOfBirth))}</td>
            <td>{item.address}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.email}</td>
            <td>
                <button type="button" className="btn btn-danger" onClick={() => deleteProduct(item.id)}>Xóa</button>
                {/* <Link to={`/editEmployee/${item.id}`}>
                    <button type="button" className="btn btn-info" >Sửa</button>
                </Link> */}
            </td>
        </tr>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
    return ({
        onDeleteEmployee: (id) => {
            return dispatch(actDeleteemployeeRequest(id))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeItem)
