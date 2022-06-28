import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actUpdateStatusReq } from '../../actions/order'
import { formatDate } from '../../utils/formatDate'
import DetailOrder from './DetailOrder';
import useModal from './../ToggleModal/useModal'


import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

export const OrderItem = ({ item, onUpdateOrder }) => {
    // var history = useHistory()

    const { isShowing, toggle } = useModal();
    function renderStatus() {
        if (item.status === 0) return "Chờ Xét Duyệt"
        else if (item.status === 1) return "Đang giao hàng"
        else if (item.status === 2) return "Giao hàng thành công"
        else return "Đã bị hủy "
    }

    async function handleUpdateOrder(item, status) {
        var itemUpdate = item
        itemUpdate.status = status// status: 1 là confirm order // 2 là success // 3 là bị hủy
        itemUpdate = {
            ...itemUpdate,
            detailOrderList : itemUpdate.detailOrderList
        }
        let res = await onUpdateOrder(itemUpdate, status, item.transactionId == null ? item.transactionId : item.transactionId.trim())
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

    function renderActionChangeStatus() {
        if (item.status === 0) {
            return <span className="dropdown">
                &nbsp;&nbsp;
                <i className="fas fa-angle-down" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <span className="dropdown-item" onClick={() => handleUpdateOrder(item, 3)}>Hủy đơn đặt hàng</span>
                    <Link to={`addinvoice/${item.orderId}`} className="dropdown-item" >Xác nhận đơn đặt hàng</Link>
                </div>
            </span>
        } else if (item.status === 1) {
            return <span className="dropdown">
                &nbsp;&nbsp;
                <i className="fas fa-angle-down" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <span className="dropdown-item" onClick={() => handleUpdateOrder(item, 2)}>Hoàn thành đơn hàng</span>
                </div>
            </span>
        }
        else return ""
    }

    return (
        <tr>
            <td className="text-center">{item.orderId}</td>
            <td className="text-center">{item.fullName}</td>
            <td className="text-center">{item.phoneNumber}</td>
            <td className="text-center">{item.address}</td>
            <td className="text-center"> {formatDate(new Date(item.bookingDate))}</td>
            <td className="text-center">{formatDate(new Date(item.deliveryDate))}</td>
            <td className="text-center">{renderStatus()}
                {renderActionChangeStatus()}
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" onClick={toggle}>
                    <i className="fas fa-info-circle"></i>&nbsp;Info
                </button>
                {
                    item.status === 0 ? <Link to={`/editOrder/${item.orderId}`}>
                        <button type="button" className="btn btn-info" ><i className="fas fa-edit"></i>&nbsp;Sửa</button>
                    </Link> : ""
                }
            </td>
            <DetailOrder item={item} isShowing={isShowing} hide={toggle} />
        </tr>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
    return ({
        onUpdateOrder: (itemUpdate, status, transactionId) => {//cần chuyền status vô để sửa trong state trong store
            return dispatch(actUpdateStatusReq(itemUpdate, status, transactionId))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem)
