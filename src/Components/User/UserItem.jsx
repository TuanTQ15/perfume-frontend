import React from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
// import { actDeleteUserRequest } from '../../actions/user';
import { formatDate } from '../../utils/formatDate';

export const UserItem = ({ onDeleteUser, item }) => {

    // function deleteProduct(MA_NV) {
    //     onDeleteUser(MA_NV)
    // }

    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.fullName}</td>
            <td>{formatDate(new Date(item.dateOfBirth))}</td>
            <td>{item.address}</td>
            <td>{item.phoneNumber}</td>
            <td>{item.email}</td>
            {/* <td>
                <button type="button" className="btn btn-danger" onClick={() => deleteProduct(item.MA_NV)}>Xóa</button>
                 <Link to={`/editUser/${item.id}`}>
                    <button type="button" className="btn btn-info" >Sửa</button>
                </Link>
            </td> */}
        </tr>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
    return ({
        // onDeleteUser: (MA_NV) => {
        //     dispatch(actDeleteUserRequest(MA_NV))
        // }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(UserItem)
