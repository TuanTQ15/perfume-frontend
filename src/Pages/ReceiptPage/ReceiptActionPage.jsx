import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import SideBar from '../../Components/Bar/SideBar'
import TopBar from '../../Components/Bar/TopBar'
import callApi from '../../utils/apiCaller'
import { actAddReceiptRequest } from '../../actions/receipt'
import { getNV, getTokenEmployee } from '../../actions/getNV'
import NumberFormat from 'react-number-format'

export const ReceiptActionPage = ({ match, history, onAddReceipt }) => {

    const [order, setOrder] = useState("")
    const [receipt, setReceipt] = useState({
        receiptId: '',
        createdDate: "",
        // MA_NV: '',
        orderSupplyId: "",
        detailReceiptList: []
    })

    useEffect(() => {
        (async () => {
            await callApi(`os/${match.params.id}`, 'GET', null, `Bearer ${getTokenEmployee()}`).then(res => {
                setOrder(res.data)
            });
        })()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (order !== "") {
            setReceipt({
                ...receipt,
                orderSupplyId: match.params.id,
                createdDate: new Date(),
                MA_NV: getNV(history).actort,
                detailReceiptList: order.detailOSList
            })
        }// eslint-disable-next-line
    }, [order])


    function handleSubmit(e) {
        e.preventDefault()
        setOrder({
            ...order,
            status: 1// truyền thằng vô là 1 vì đang chuyển từ chờ hàng sang đặt hàng thành công
        })
        // console.log(receipt)
        onAddReceipt(receipt, history, order)
    }

    return (
        <div id="wrapper">
            <SideBar />
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <TopBar history={history} />
                    <div className="container" >
                        {/* style ={{marginLeft: 220}} */}

                        <div className="py-3 mb-20" >
                            <h3 className="m-0 font-weight-bold text-primary" style={{ textAlign: 'center' }}>
                                Tạo phiếu nhập
                            </h3>
                        </div>

                        <form onSubmit={e => handleSubmit(e)}>
                            {/* <div className="form-group">
                                <label className="control-label" htmlFor="MA_DSP">Mã Phiếu nhập</label>
                                <input id="MA_HOADON" value={receipt.receiptId}
                                    onChange={e => setReceipt({ ...receipt, receiptId: e.target.value })}
                                    placeholder="Mã Phiếu nhập" className="form-control input-md" type="text" />
                                <small className="form-text text-danger">{validationMsg.receiptId}</small>
                            </div> */}
                            <div className="form-group">
                                <label className="control-label" htmlFor="ID_PHIEUDAT">Mã đơn đặt hàng</label>
                                <input id="ID_PHIEUDAT" value={receipt.orderSupplyId}
                                    className="form-control input-md"
                                    readOnly type="text" />
                            </div>


                            <hr />
                            <h5>Các chi tiết Phiếu nhập</h5>
                            <div className="row">
                                <div className="col"><label htmlFor="exampleFormControlSelect1">Mã Sản phẩm</label></div>
                                <div className="col"> <label htmlFor="exampleFormControlSelect1">Số lương</label></div>
                                <div className="col"><label htmlFor="exampleFormControlSelect1">Giá</label> </div>
                            </div>
                            {order === "" ? "" : order.detailOSList.map((ct, index) => {
                                return <div key={index} className="row" style={{ marginBottom: 15 }}>
                                    <div className="col">
                                        <input type="text"
                                            value={ct.productId}
                                            name="productId"
                                            readOnly disabled
                                            className="form-control" placeholder="Mã sản phẩm" />
                                    </div>
                                    <div className="col">
                                        <input type="number"
                                            value={ct.quantity}
                                            name="quantity" readOnly disabled
                                            className="form-control" placeholder="Số lượng" />
                                    </div>
                                    <div className="col">
                                        <NumberFormat value={ct.price} thousandSeparator={true} suffix="đ" className="form-control" disabled />
                                    </div>
                                </div>
                            })}

                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = (state) => ({

})

const mapDispatchToProps = dispatch => {
    return ({
        onAddReceipt: (receipt, history, order) => {
            dispatch(actAddReceiptRequest(receipt, history, order))
        }
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptActionPage)
