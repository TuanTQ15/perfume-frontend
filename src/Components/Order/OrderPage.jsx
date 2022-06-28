import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { actFetchOrderReq } from '../../actions/order'
import OrderItem from './OrderItem'
import NavigationSwitchPage from './../Navigation/NavigationSwitchPage'


export const OrderPage = ({ status, onFetchOrderByStatus, order }) => {


    const [pages, setPages] = useState(1)
    useEffect(() => {
        (async () => {
            await onFetchOrderByStatus(status)//page chính là status luôn
        })()//eslint-disable-next-line
    }, [status])

    function renderListOrder() {
        var list
        if (status === 0) list = order.pending
        else if (status === 1) list = order.shipping
        else if (status === 2) list = order.success
        else list = order.cancel
        var orderList = list.map((order, index) => {
            if (index >= (pages - 1) * 10 && index < pages * 10) {
                return <OrderItem item={order} key={index} />
            }
            return null
        })
        return orderList
    }

    function returnEntries() {
        if (status === 0) return order.pending.length
        else if (status === 1) return order.shipping.length
        else if (status === 2) return order.success.length
        else return order.cancel.length
    }
    return (
        <>
            <div className="container">
                <div className="table-responsive">
                    <table className="table align-items-center table-flush" id="dataTable" width="100%" cellSpacing="0">
                        <thead>
                            <tr>
                                <th className="col-md-1 text-center">ID</th>
                                <th className="col-md-2 text-center">Họ và tên người nhận</th>
                                <th className="col-md-1 text-center">Số điện thoại</th>
                                <th className="col-md-2 text-center">Địa chỉ</th>
                                <th className="col-md-1 text-center">Ngày đặt</th>
                                <th className="col-md-1 text-center">Ngày giao</th>
                                <th className="col-md-2 text-center">Trạng thái</th>
                            </tr>
                        </thead>
                        <tbody>
                            {renderListOrder()}
                        </tbody>
                    </table>
                    <NavigationSwitchPage entries={returnEntries()} onReceivePage={p => setPages(p)} />
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    order: state.order
})

const mapDispatchToProps = dispatch => {
    return ({
        onFetchOrderByStatus: (status) => {//status thì trùng với page luôn
            dispatch(actFetchOrderReq(status))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage)
