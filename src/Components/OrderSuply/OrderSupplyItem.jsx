import React from 'react'
// import { useState } from 'react';
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import { actDeleteOrderSupply, actUpdateOrderSupplyRequest } from '../../actions/orderSupply';
import { formatDate } from '../../utils/formatDate';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import useModal from '../ToggleModal/useModal';
import ModalDetailOS from './ModalDetailOS'

const MySwal = withReactContent(Swal)

export const OrderSupplyItem = ({ item, onDeleteOrderSupply, onUpdateStatus }) => {
    var history = useHistory()

    const { isShowing, toggle } = useModal();
    function renderStatus(order) {
        if (order.status === 0) return "Đang chờ nhận hàng"
        else if (order.status === 1) return "Đặt hàng thành công"
        else return "Bị hủy"
    }

    async function handleUpdateOrder(item, status) {
        var os = {
            ...item,
            status: status
        }
        console.log(os);
        let res = await onUpdateStatus(os, history, true)
        if (res.result === 1) {
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

    function renderActionChangeStatus() {
        if (item.status === 0) {
            return <span className="dropdown">
                &nbsp;&nbsp;
                <i className="fas fa-angle-down" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <span className="dropdown-item" onClick={() => handleUpdateOrder(item, 2)}>Hủy đơn đặt hàng</span>
                    <Link to={`addReceipt/${item.orderSupplyId}`} className="dropdown-item" >Đặt hàng thành công</Link>
                </div>
            </span>
        }
    }

    return (
        <tr>
            {/* onMouseEnter={() =>toggleHover} onMouseLeave={() =>toggleHover} */}
            <td>{item.orderSupplyId}</td>
            <td>{formatDate(new Date(item.bookingDate))}</td>
            <td>{formatDate(new Date(item.receivedDate))}</td>
            <td>
                {renderStatus(item)}
                {renderActionChangeStatus()}
            </td>
            <td>{item.brandId}</td>
            <td>{item.employeeId}</td>
            <td>
                {
                    item.status === 0 ? <Link to={`/editOrderSupply/${item.orderSupplyId}`}>
                        <button type="button" className="btn btn-info" ><i className="fas fa-edit"></i>&nbsp;Sửa</button>
                    </Link> : ""
                }
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={toggle}>
                    <i className="fas fa-info-circle"></i>&nbsp;Info
                </button>
            </td>
            <ModalDetailOS item={item} isShowing={isShowing} hide={toggle} />
        </tr>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteOrderSupply: (orderSupplyId) => {
            dispatch(actDeleteOrderSupply(orderSupplyId))
        },
        onUpdateStatus: (item, history, updateStatus) => {
            return dispatch(actUpdateOrderSupplyRequest(item, history, updateStatus))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSupplyItem)
